import "./style.scss";
import { setLanguage, getLanguage } from "~/_save";
import createHtmlNode from "~/_create";
import Keyboard from "~/_keyboard";

const language = getLanguage("vkLang-EM");

const main = createHtmlNode("main", "container");
const textarea = createHtmlNode("textarea", "textarea");
const container = createHtmlNode("div", "keyboard");

document.body.append(main);
main.append(
  createHtmlNode("h1", "title", "Virtual Keyboard"),
  createHtmlNode("h3", "subtitle", "made under Windows OS"),
  createHtmlNode(
    "p",
    "text",
    "Use left <kbd>Shift</kbd> + <kbd>Alt</kbd> to switch language"
  ),
  textarea,
  container
);

const keyboard = new Keyboard(language, textarea, container);
keyboard.init().render();

document.addEventListener("keydown", keyboard.handleEvent);
document.addEventListener("keyup", keyboard.handleEvent);
container.addEventListener("mousedown", keyboard.handleEvent);
container.addEventListener("mouseup", keyboard.handleEvent);

window.addEventListener(
  "beforeunload",
  setLanguage("vkLang-EM", keyboard.lang)
);
