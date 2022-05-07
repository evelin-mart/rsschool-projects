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
    "Backspace",
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
    "Backslash",
    "Delete",
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
    "Enter",
  ],
  [
    "ShiftLeft",
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
import { node } from "webpack";

export default class Keyboard {
  constructor(language, output, container) {
    this.lang = language;
    this.output = output;
    this.container = container;
  }

  init() {
    this.isCaps = false;
    this.isShift = false;
    this.langLayout = i18n[this.lang];
    this.buttons = rowsOrder.map((row) => {
      return row.map((code) => new Key(code, this.langLayout[code]));
    });
    return this;
  }

  render() {
    this.container.innerHTML = "";
    this.buttons.forEach((row) => {
      const keyRow = createHtmlNode("div", "keyboard__row");
      row.forEach((button) => {
        keyRow.append(button.key);
      });
      this.container.append(keyRow);
    });
    this.buttons = this.buttons.flat();
  }

  handleEvent = (e) => {
    // e.target.closest(".key");

    // var down = false;
    // document.addEventListener(
    //   "keydown",
    //   function () {
    //     if (down) return;
    //     down = true;
    //     // your magic code here
    //   },
    //   false
    // );

    // document.addEventListener(
    //   "keyup",
    //   function () {
    //     down = false;
    //   },
    //   false
    // );

    const code = e.code || e.target.closest(".key").dataset.code;
    const type = e.type;
    const targetKey = this.buttons.find((key) => key.code === code);
    if (!targetKey) return;

    e.stopPropagation();
    e.preventDefault();
    this.output.focus();

    if (code.match(/Shift.*/)) {
      this.handleShift(type, targetKey);
      return;
    }
    if (code.match(/CapsLock/)) {
      this.handleCaps(type, targetKey);
      return;
    }

    if (type.match(/(key|mouse)down/)) {
      targetKey.key.classList.add("key_active");
      if (code.match(/AltLeft/)) {
        this.isAlt = true;
        this.isShift && this.toggleLanguage();
      }

      if (!targetKey.isFn) {
        if (this.isShift || (this.isCaps && targetKey.isLetter)) {
          console.log(targetKey.shift);
        } else {
          console.log(targetKey.small);
        }
      }
    }

    if (type.match(/(key|mouse)up/)) {
      targetKey.key.classList.remove("key_active");
      if (code.match(/AltLeft/)) {
        this.isAlt = false;
      }
    }
  };

  toggleLanguage() {
    const langs = Object.keys(i18n);
    let index = langs.indexOf(this.lang) + 1;
    index === langs.length && (index = 0);
    this.lang = langs[index];
    this.init().render();
  }

  handleShift(type, targetKey) {
    switch (type) {
      case "keydown":
        this.isShift = true;
        targetKey.key.classList.add("key_active");
        break;
      case "mousedown":
        this.isShift = !this.isShift;
        targetKey.key.classList.toggle("key_active");
        break;
      case "keyup":
        this.isShift = false;
        targetKey.key.classList.remove("key_active");
        break;
    }
  }
  handleCaps(type, targetKey) {
    if (type.match(/(key|mouse)down/)) {
      this.isCaps = !this.isCaps;
      targetKey.key.classList.toggle("key_active");
      this.buttons.map((button) => {
        if (button.isLetter) {
          button.key.childNodes.forEach((node) => {
            node.classList.toggle("inactive");
            node.classList.toggle("active");
          });
        }
      });
    }
  }
}
