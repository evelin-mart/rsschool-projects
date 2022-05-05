import createHtmlNode from "./_create";

export default class Key {
  constructor({ small, shift, code }) {
    this.small = small;
    this.shift = shift;
    this.code = code;
    this.isFn = !shift;
    this.isLetter = small.toUpperCase() === shift;
    this.isSymbol = !this.isFn && !this.isLetter;

    if (this.isSymbol) {
      this.shiftTitle = createHtmlNode("div", "key__symbol inactive", this.shift);
      this.title = createHtmlNode("div", "key__symbol active", this.small);
    } else {
      this.title = createHtmlNode("div", "key__title active", this.small);
      if (this.isLetter) {
        this.shiftTitle = createHtmlNode("div", "key__title inactive", this.shift);
      }
      if (this.isFn) {
        this.shiftTitle = "";
      }
    }
    this.key = createHtmlNode("div", "key", this.shiftTitle.concat(this.title));
    if (this.isFn) {
      this.key.classList.add("key_fn");
    }
  }
}
