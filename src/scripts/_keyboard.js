import createHtmlNode from './_create';
import i18n from './_langs';
import Key from './_key';

const rowsOrder = [
  [
    'Backquote',
    'Digit1',
    'Digit2',
    'Digit3',
    'Digit4',
    'Digit5',
    'Digit6',
    'Digit7',
    'Digit8',
    'Digit9',
    'Digit0',
    'Minus',
    'Equal',
    'Backspace',
  ],
  [
    'Tab',
    'KeyQ',
    'KeyW',
    'KeyE',
    'KeyR',
    'KeyT',
    'KeyY',
    'KeyU',
    'KeyI',
    'KeyO',
    'KeyP',
    'BracketLeft',
    'BracketRight',
    'Backslash',
    'Delete',
  ],
  [
    'CapsLock',
    'KeyA',
    'KeyS',
    'KeyD',
    'KeyF',
    'KeyG',
    'KeyH',
    'KeyJ',
    'KeyK',
    'KeyL',
    'Semicolon',
    'Quote',
    'Enter',
  ],
  [
    'ShiftLeft',
    'KeyZ',
    'KeyX',
    'KeyC',
    'KeyV',
    'KeyB',
    'KeyN',
    'KeyM',
    'Comma',
    'Period',
    'Slash',
    'ArrowUp',
    'ShiftRight',
  ],
  [
    'ControlLeft',
    'Win',
    'AltLeft',
    'Space',
    'AltRight',
    'ArrowLeft',
    'ArrowDown',
    'ArrowRight',
    'ControlRight',
  ],
];

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
    this.buttons = rowsOrder.map((row) => row.map((code) => new Key(code, this.langLayout[code])));
    return this;
  }

  render() {
    this.container.innerHTML = '';
    this.buttons.forEach((row) => {
      const keyRow = createHtmlNode('div', 'keyboard__row');
      row.forEach((button) => {
        keyRow.append(button.key);
      });
      this.container.append(keyRow);
    });
    this.buttons = this.buttons.flat();
  }

  handleEvent = (e) => {
    if (!(e.code || e.target.closest('.key'))) return;
    const code = e.code || e.target.closest('.key').dataset.code;
    if (code.match(/Tab|CapsLock|Shift.*|Control.*|Alt.*|Win/) && e.repeat) return;
    const targetKey = this.buttons.find((key) => key.code === code);
    if (!targetKey) return;
    const { type } = e;

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
      if (type.match(/mousedown/)) {
        targetKey.key.addEventListener('mouseleave', this.handleEvent);
      }
      targetKey.key.classList.add('key_active');
      if (code.match(/Alt.*/)) {
        this.isAlt = true;
        if (this.isShift) this.toggleLanguage();
      }

      if (!targetKey.isFn) {
        if (
          // Shift + Caps gives a small letter
          (this.isShift && !(this.isCaps && targetKey.isLetter))
          || (!this.isShift && this.isCaps && targetKey.isLetter)
        ) {
          this.printToOutput(targetKey.shift);
        } else {
          this.printToOutput(targetKey.small);
        }
      } else {
        if (code.match(/Control.*|Alt.*|Win/)) return;
        this.printToOutput(null, code);
      }
    }

    if (type.match(/keyup|mouseup|mouseleave/)) {
      if (type.match(/mouseup|mouseleave/)) {
        targetKey.key.removeEventListener('mouseleave', this.handleEvent);
      }
      targetKey.key.classList.remove('key_active');
      if (code.match(/Alt.*/)) {
        this.isAlt = false;
      }
    }
  };

  toggleLanguage() {
    const langs = Object.keys(i18n);
    let index = langs.indexOf(this.lang) + 1;
    if (index === langs.length) index = 0;
    this.lang = langs[index];
    this.init().render();
  }

  handleShift(type, targetKey) {
    switch (type) {
      case 'keydown':
        this.isShift = true;
        targetKey.key.classList.add('key_active');
        break;
      case 'mousedown':
        this.isShift = !this.isShift;
        targetKey.key.classList.toggle('key_active');
        break;
      case 'keyup':
        if (this.isShift === false) return; // prevent toggle class after toggle language
        this.isShift = false;
        targetKey.key.classList.remove('key_active');
        break;
      default:
        return;
    }
    this.buttons.forEach((button) => {
      if (!button.isFn) {
        button.key.childNodes.forEach((node) => {
          node.classList.toggle('inactive');
          node.classList.toggle('active');
        });
      }
    });
    if (this.isShift && this.isAlt) this.toggleLanguage();
  }

  handleCaps(type, targetKey) {
    if (type.match(/(key|mouse)down/)) {
      this.isCaps = !this.isCaps;
      targetKey.key.classList.toggle('key_active');
      this.buttons.forEach((button) => {
        if (button.isLetter) {
          button.key.childNodes.forEach((node) => {
            node.classList.toggle('inactive');
            node.classList.toggle('active');
          });
        }
      });
    }
  }

  printToOutput(symbol, code) {
    let cursorPosition = this.output.selectionStart;
    const endPosition = this.output.selectionEnd;
    const selected = endPosition - cursorPosition;
    const left = this.output.value.slice(0, cursorPosition);
    const right = this.output.value.slice(endPosition);

    if (symbol) {
      this.output.value = `${left}${symbol}${right}`;
      cursorPosition++;
    } else {
      const fnBtnHandler = {
        Tab: () => {
          this.output.value = `${left}\t${right}`;
          cursorPosition++;
        },
        Enter: () => {
          this.output.value = `${left}\n${right}`;
          cursorPosition++;
        },
        Delete: () => {
          this.output.value = selected ? `${left}${right}` : `${left}${right.slice(1)}`;
        },
        Backspace: () => {
          this.output.value = selected ? `${left}${right}` : `${left.slice(0, -1)}${right}`;
          if (!selected && cursorPosition) cursorPosition--;
        },
        ArrowLeft: () => {
          if (cursorPosition === 0) return;
          cursorPosition--;
        },
        ArrowRight: () => {
          if (cursorPosition === this.output.value.length) return;
          cursorPosition++;
        },
        ArrowUp: () => {
          const positionFromLeft = this.output.value
            .slice(0, cursorPosition)
            .match(/(\n).*$(?!\1)/g) || [[1]];
          cursorPosition -= positionFromLeft[0].length;
        },
        ArrowDown: () => {
          const positionFromLeft = this.output.value
            .slice(cursorPosition)
            .match(/^.*(\n).*(?!\1)/) || [[1]];
          cursorPosition += positionFromLeft[0].length;
        },
        Space: () => {
          this.output.value = `${left} ${right}`;
          cursorPosition++;
        },
      };
      fnBtnHandler[code]();
    }
    this.output.setSelectionRange(cursorPosition, cursorPosition);
  }
}
