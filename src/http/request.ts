const RequestAJAX = {
  settingHeader: {
    "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content"),
    "Content-Type": "application/json",
  },

  defaultMethod: "POST",

  url(setting: JQuery.AjaxSettings<any>) {
    $.ajax(setting);
  },

  setup() {
    $.ajaxSetup({
      async: true,
      headers: this.settingHeader,
      method: this.defaultMethod,
      processData: false,
    });
  },
};
export default RequestAJAX;
