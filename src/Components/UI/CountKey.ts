import {
  BackpackSettingResource,
  DataCardConfigure,
} from "../../global/interfaces";

export const CountKey = (
  data: BackpackSettingResource,
  configure: DataCardConfigure
): string => {
  const curr = configure.perPage * configure.page;
  const to = curr + configure.count;
  return `Showing ${curr} to ${to} of ${data.totalRows} entries.`;
};
