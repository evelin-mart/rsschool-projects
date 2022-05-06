import "./style.scss";
import { setLanguage, getLanguage } from "~/_save";
import createHtmlNode from "~/_create";
import Keyboard from "~/_keyboard";

const language = getLanguage("vkLang-EM");

export const main = createHtmlNode("main", "container");
document.body.append(main);
main.append(
  createHtmlNode("h1", "title", "RSS Virtual Keyboard"),
  createHtmlNode("h3", "subtitle", "made under Windows OS"),
  createHtmlNode("p", "text", "Use left <kbd>Shift</kbd> + <kbd>Alt</kbd> to switch language")
);

new Keyboard().init(language).render();

window.addEventListener("beforeunload", setLanguage("vkLang-EM", language));
