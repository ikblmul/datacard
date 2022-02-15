import RequestAJAX from "../http/request";
import Card from "./UI/Card";
import loading from "./loading";
import Modal from "./Modal";
import NotFoundCard from "./UI/NotFoundCard";
import {
  BackpackSettingResource,
  DataCardConfigure,
} from "../global/interfaces";
import renderPagination from "./UI/PaginationOrigin";
import { CountKey } from "./UI/countKey";

export default class DataCard {
  configure: DataCardConfigure = {
    url: "/search",
    search: false,
    page: 1,
    count: 0,
    perPage: 12,
  };

  setting: BackpackSettingResource = {};

  data = [];
  loading = new loading(this.c);
  stackCount = $("#count_stack_info");

  constructor(public c: JQuery<HTMLElement>) { }

  ajax(url = null, search = null, draw = 1) {
    const data = {};
    const hasSearchEmpty = search === null;
    // ========================== Event Binding ==========================
    const beforeSend = this.bindThisForce(this.eventBeforeSend);
    const complete = this.bindThisForce(this.eventComplete);
    const error = this.bindThisForce(this.eventError);
    const success = this.eventSuccess;
    const _this = this;

    // Ignore Empty String
    if (search === "") this.configure.search = false;
    // Check if Search is filled by value
    else if (!hasSearchEmpty) this.configure.search = search;

    // if is not pagination this page num will reset to 1
    this.configure.page = draw;

    // is search mode push data to object
    if (this.configure.search) data["search"] = this.configure.search;

    // set Pagination number
    data["page"] = this.configure.page;

    // if url doesnt exist
    url = url || this.configure.url;

    this.configure.url = url;

    RequestAJAX.url({
      url,
      data: JSON.stringify(data),
      success: (data) => {
        // console.log(data);
        success.apply(_this, [data]);
      },
      beforeSend,
      complete,
      error,
    });
  }

  loadPage(pageNumber: number) {
    this.ajax(null, null, pageNumber);
  }

  /**
   * Jquery Event beforeSend Ajax
   *
   */
  eventBeforeSend() {
    this.loading.show();
  }

  /**
   * Error Handling
   *
   */
  eventError() {
    new Noty({
      type: "error",
      text: "<strong>Error</strong><br>Error loading page. Please refresh the page.",
    }).show();
  }

  /**
   * Jquery Event complete Ajax
   *
   */
  eventComplete() {
    this.renderCard();
    this.stackCount.html(CountKey(this.setting, this.configure));
    // register detail model into model
    // new Modal(this.data).RegisterEvent();

    // Render Pagination Number
    if (this.configure.page === 1) renderPagination(this.setting.totalPage);

    this.loading.hide();
  }

  eventSuccess(result) {
    this.data = result.data;

    this.configure.count = result.length;
    // deleting Data
    delete result.data;
    // fetching Setup
    this.setting = result;
  }

  /**
   * Rendering Card Into Html Format
   *
   */
  renderCard() {
    var content: String = "";

    if (this.data.length <= 0) content = NotFoundCard();

    console.log(this.data);

    // this.data.forEach((data, index) => {
    //   content += Card(data, index);
    // });
    content = Card(this.data, 0);

    this.c.html(content.toString());

    // Trigger Event Locally

  }

  updateUrl(url) {
    this.configure.url = url;
  }

  bindThisForce(closure: () => void, ...param) {
    return closure.bind(this, param);
  }
}
