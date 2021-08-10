import { evt } from "../event/eventHandler";
export default class Modal {
  private e = $("#content-detail");
  private f = $("#video-preview");

  constructor(public data) {}

  RegisterEvent() {
    const _this = this;

    $("[data-detail-index]").on("click", (event) =>
      _this.showDetail.apply(_this, [event])
    );
  }

  modalDetail({ title, videoPath, description, subscriptionType }: any) {
    videojs("my-video").src({
      src: videoPath,
    });
    this.e.find("#detail-description").text(description);
    this.e.find("#detail-level").text(subscriptionType);
    this.e.find("#detail-title").text(title);
  }

  showDetail(event: evt<HTMLCollection>) {
    $("#content-detail").modal("show");
    const index = parseInt($(event.target).attr("data-detail-index"));

    const Selected = this.data[index];

    this.modalDetail(Selected);
  }
}
