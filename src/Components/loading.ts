class loading {
  load = true;
  l = $("#crud-loader");
  constructor(public c: JQuery<HTMLElement>) {}

  show() {
    //   stop if has show
    if (this.load) return;

    this.l.removeClass("d-none");
    this.c.addClass("d-none");
    this.load = true;
  }

  hide() {
    //   stop if has hide
    if (!this.load) return;

    this.c.removeClass("d-none");
    this.l.addClass("d-none");
    this.load = false;
  }

  toggle() {
    this.load ? this.show() : this.hide();
  }
}

export default loading;
