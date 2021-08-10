export type subsType = "Low" | "Medium" | "High";

export type jqueryType = JQuery<HTMLElement>;
export type jqueryEventClick = JQuery.ClickEvent<
  HTMLElement,
  undefined,
  HTMLElement,
  HTMLElement
>;

export interface DataCardConfigure {
  search: string | boolean;
  page: number;
  url: string;
  count: number;
  perPage: number;
}

export interface BackpackSettingResource {
  filteredRows?: number;
  totalPage?: number;
  totalRows?: number;
}
