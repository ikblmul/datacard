import { jqueryEventClick, jqueryType } from "../../global/interfaces";
import DataCard from "../DataCard";

const DataName = "data-pagination-card";

const DataCardPlugins = (): DataCard => window["DataCard"];

const renderPagination = (TotalPage: number) => {
  const DC = DataCardPlugins();
  const page = DC.configure.page;
  const html = `
    \n
      <li class="page-item ${page === 1 ? "disabled" : ""}">
        <a class="page-link" href="javscript:void(0)" ${DataName}=${page - 1}>
          &laquo;
        </a>
      </li>

      ${renderPaginationItems(TotalPage)}
 

    <li class="page-item ${page === TotalPage ? "disabled" : ""}">
      <a class="page-link" href="javscript:void(0)" ${DataName}=${page + 1}>
      &raquo;
      </a>
    </li>
    \n
    `;

  compileToDOM(html);
};

const renderPaginationItems = (totalPage: number) =>
  pagination(DataCardPlugins().configure.page, totalPage)
    .map(paginateItems)
    .join("\n");

const paginateItems = (num: number | string) => `
  \n
  <li class="page-item ${num === "..." ? "disabled" : ""} 
  ${DataCardPlugins().configure.page === num ? "active" : ""}">
    <a class="page-link" href="javscript:void(0)" ${DataName}=${num}>
      ${num}
    </a>
  </li>
  \n
  `;

const compileToDOM = (html: string) => {
  var p = $("#pagination-card");
  p.html(html);

  // After Render Adding Active To First Pagination Link
  componentDidMount(p);
};
// create event after rendering page
const componentDidMount = (p: JQuery<HTMLElement>) => {
  const DataPlugins = DataCardPlugins();
  p.find(`[${DataName}="${DataPlugins.configure.page}"]`).addClass("active");

  // Event Click On link page
  const listItemClick = (event: jqueryEventClick) => {
    const pgLink = $(event.target);
    const pageNum = parseInt(pgLink.attr(DataName));
    const hasPage = DataPlugins.configure.page === pageNum;
    const totalPage = DataPlugins.setting.totalPage;
    if (hasPage || pageNum === NaN || pageNum > totalPage || pageNum < 1)
      return;

    DataPlugins.loadPage(pageNum);

    renderPagination(totalPage);
  };

  p.find("a.page-link").on("click", listItemClick);
};

function pagination(c, m) {
  // execute when one page only
  console.log(m);
  if (m === 0 || m === 1) return [1];

  var delta = 2,
    range = [],
    rangeWithDots = [],
    l;

  range.push(1);
  for (let i = c - delta; i <= c + delta; i++) {
    if (i < m && i > 1) {
      range.push(i);
    }
  }
  range.push(m);

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push("...");
      }
    }
    rangeWithDots.push(i);
    l = i;
  }

  return rangeWithDots;
}

export default renderPagination;
