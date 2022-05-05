import { setLanguage, getLanguage } from "./scripts/_save";
import Keyboard from "./scripts/_keyboard";

const language = getLanguage("vkLang-EM");

new Keyboard.init(language).render();

window.addEventListener("beforeunload", setLanguage("vkLang-EM", language));
