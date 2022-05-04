export default class Key {
  constructor({ small, shift, code }) {
    this.small = small;
    this.shift = shift;
    this.code = code;
    this.fn = !shift;
  }
}
