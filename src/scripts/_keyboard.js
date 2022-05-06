const rowsOrder = [
  [
    "Backquote",
    "Digit1",
    "Digit2",
    "Digit3",
    "Digit4",
    "Digit5",
    "Digit6",
    "Digit7",
    "Digit8",
    "Digit9",
    "Digit0",
    "Minus",
    "Equal",
    "Delete",
  ],
  [
    "Tab",
    "KeyQ",
    "KeyW",
    "KeyE",
    "KeyR",
    "KeyT",
    "KeyY",
    "KeyU",
    "KeyI",
    "KeyO",
    "KeyP",
    "BracketLeft",
    "BracketRight",
    "Backspace",
  ],
  [
    "CapsLock",
    "KeyA",
    "KeyS",
    "KeyD",
    "KeyF",
    "KeyG",
    "KeyH",
    "KeyJ",
    "KeyK",
    "KeyL",
    "Semicolon",
    "Quote",
    "Backslash",
    "Enter",
  ],
  [
    "ShiftLeft",
    "IntlBackslash",
    "KeyZ",
    "KeyX",
    "KeyC",
    "KeyV",
    "KeyB",
    "KeyN",
    "KeyM",
    "Comma",
    "Period",
    "Slash",
    "ArrowUp",
    "ShiftRight",
  ],
  [
    "ControlLeft",
    "Win",
    "AltLeft",
    "Space",
    "AltRight",
    "ArrowLeft",
    "ArrowDown",
    "ArrowRight",
    "ControlRight",
  ],
];

import createHtmlNode from "./_create";
import i18n from "./_langs";
import Key from "./_key";
import { main } from "../index";

export default class Keyboard {
  constructor() {
    this.keyPressed = {};
    this.isCaps = false;
  }

  init(lang) {
    this.lang = i18n[lang];
    this.output = createHtmlNode("textarea", "textarea");
    this.container = createHtmlNode("div", "keyboard");
    this.buttons = rowsOrder.map((row) => {
      return row.map((code) => new Key(code, this.lang[code]));
    });
    return this;
  }
  render() {
    main.append(this.output, this.container);
    this.buttons.forEach((row) => {
      const keyRow = createHtmlNode("div", "keyboard__row");
      row.forEach((button) => {
        keyRow.append(button.key);
      });
      this.container.append(keyRow);
    });

    console.log(this.buttons);
  }
}
