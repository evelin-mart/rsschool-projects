import i18Obj from "./translate.js";

function editClass(array, method, cl) {
  array.forEach((elem) => {
    elem.classList[method](cl);
  });
}

// Адаптивное меню

const hamburger = document.querySelector(".hamburger");
const nav = document.querySelector(".navigation");
const shade = document.querySelector(".shade");
const wrapper = document.querySelector(".body-wrapper");
const menuAddictedElements = [hamburger, nav, shade, wrapper];

function toggleClass() {
  editClass(menuAddictedElements, "toggle", "menu-open");
}
hamburger.addEventListener("click", toggleClass);

function deleteClass(event) {
  if (event.target.classList.contains("nav-link")) {
    editClass(menuAddictedElements, "remove", "menu-open");
  }
}
nav.addEventListener("click", deleteClass);

// Предзагрузка фото

const seasons = ["winter", "spring", "summer", "autumn"];

function preloadSeasonImages(season) {
  for (let i = 1; i <= 6; i++) {
    const img = new Image();
    img.src = `assets/img/${season}/${i}.jpg`;
  }
}

seasons.forEach((item) => preloadSeasonImages(item));

// Смена фото сезонов

const portfolioButtons = document.querySelector(".seasons-container");
const portfolioPhotos = document.querySelectorAll(".photo");

function changeSeason(event) {
  if (event.target.tagName === "BUTTON") {
    const activeBtn = event.target;
    const previousActiveBtn = document.querySelector(
      ".seasons-container .button-light"
    );
    previousActiveBtn.classList.add("button-dark");
    previousActiveBtn.classList.remove("button-light");
    activeBtn.classList.add("button-light");
    activeBtn.classList.remove("button-dark");

    const season = activeBtn.dataset.i18n;
    portfolioPhotos.forEach((item, index) => {
      item.src = `assets/img/${season}/${index + 1}.jpg`;
    });
  }
}

portfolioButtons.addEventListener("click", changeSeason);

// Перевод

const textTranslate = document.querySelectorAll("[data-i18n]");
const langSwitch = document.querySelector(".switch");

let lang;

function toggleLang(event) {
  if (event.target.classList.contains("language")) {
    lang = event.target.textContent.toLowerCase();
    getTranslate(lang);
    toggleLangSwitch();
  }
}
function getTranslate(lang) {
  document.documentElement.lang = lang;
  textTranslate.forEach((item) => {
    item.textContent = `${i18Obj[lang][item.dataset.i18n]}`;
    if (item.placeholder) {
      item.placeholder = `${i18Obj[lang][item.dataset.i18n]}`;
      item.textContent = "";
    }
  });
}
function toggleLangSwitch() {
  Array.from(langSwitch.children).forEach((child) => {
    child.classList.toggle("is-active");
  });
}

langSwitch.addEventListener("click", toggleLang);

// Действия кнопок

const buttons = document.querySelectorAll("BUTTON");

function buttonClick(event) {
  const x = event.clientX;
  const y = event.clientY;
  const button = event.target.getBoundingClientRect();

  const xInside = x - button.left;
  const yInside = y - button.top;

  const circle = document.createElement("span");
  circle.classList.add("circle");
  circle.style.top = yInside + "px";
  circle.style.left = xInside + "px";

  this.appendChild(circle);
  setTimeout(() => circle.remove(), 500);

  if (event.target.dataset.i18n === "hire") {
    document.getElementById("price").scrollIntoView();
  }
  if (event.target.dataset.i18n === "order") {
    document.getElementById("contacts").scrollIntoView();
    const message = document.querySelector("[data-i18n='Message']");
    const price = event.target.parentElement.firstElementChild.textContent;
    if (lang === "en") {
      message.textContent = `Hi!\nI want to order ${price.toUpperCase()} shooting.`;
    } else {
      message.textContent = `Привет!\nЯ хочу заказать фотосессию ${price.toUpperCase()}.`;
    }
  }
}

buttons.forEach((btn) => {
  btn.addEventListener("click", buttonClick);
});
document
  .querySelector(".video-button")
  .removeEventListener("click", buttonClick);

// Переключение темы

const elemTheme = document.querySelectorAll("[data-theme]");

let theme = elemTheme[0].dataset.theme;
function toggleTheme() {
  theme = theme === "dark-theme" ? "light-theme" : "dark-theme";
  setTheme(theme);
}
function setTheme(theme) {
  if (theme === "dark-theme") {
    document.documentElement.style.setProperty("--section-title-bg", "black");
    document.documentElement.style.setProperty("--section-title-cl", "#bdae82");
    document.documentElement.style.setProperty("--nav-a-color", "white");
    document.querySelector(".theme-switch").src = "assets/svg/sun.svg";
  } else {
    document.documentElement.style.setProperty("--section-title-bg", "white");
    document.documentElement.style.setProperty("--section-title-cl", "black");
    document.documentElement.style.setProperty("--nav-a-color", "black");
    document.querySelector(".theme-switch").src = "assets/svg/moon.svg";
  }
  elemTheme.forEach((elem) => (elem.dataset.theme = theme));
}

document.querySelector(".theme-switch").addEventListener("click", toggleTheme);

// Локальное хранилище

function setLocalStorage() {
  localStorage.setItem("lang", lang);
  localStorage.setItem("theme", theme);
}
window.addEventListener("beforeunload", setLocalStorage);

function getLocalStorage() {
  lang = localStorage.getItem("lang") || "en";
  if (lang === "ru") toggleLangSwitch();
  getTranslate(lang);

  theme = localStorage.getItem("theme") || "light-theme";
  setTheme(theme);
}
window.addEventListener("load", getLocalStorage);

// Видеоплейер

const videoWrapper = document.querySelector(".video-player");
const player = videoWrapper.querySelector(".player");
const playBtn = videoWrapper.querySelector(".video-button");
const controlPlayBtn = videoWrapper.querySelector(".play-icon");
const controlVolBtn = videoWrapper.querySelector(".volume-icon");
const progressRange = videoWrapper.querySelector(".progress");
const volumeRange = videoWrapper.querySelector(".volume");
const controls = document.querySelector(".controls");

function togglePlay() {
  const method = player.paused ? "play" : "pause";
  player[method]();
  if (method === "play") {
    playBtn.classList.add("inactive");
    controlPlayBtn.classList.add("pause");
  } else {
    playBtn.classList.remove("inactive");
    controlPlayBtn.classList.remove("pause");
  }
}

playBtn.addEventListener("click", togglePlay);
playBtn.addEventListener("click", () => {
  editClass([player, playBtn, controls], "add", "on");
});

player.addEventListener("click", togglePlay);
controlPlayBtn.addEventListener("click", togglePlay);

let currentVolume = 0.4;

function toggleMute() {
  player.volume = +player.volume ? 0 : currentVolume;
  controlVolBtn.classList.toggle("mute");
  volumeRange.style.setProperty("--value", player.volume * 100);
  volumeRange.value = player.volume * 100;
}
controlVolBtn.addEventListener("click", toggleMute);

function volUpdate() {
  currentVolume = this.value / 100;
  player.volume = currentVolume;
  if (!currentVolume) controlVolBtn.classList.add("mute");
  else controlVolBtn.classList.remove("mute");
  handleProgress.call(this);
}
volumeRange.addEventListener("input", volUpdate);

function videoUpdate() {
  player.currentTime = (this.value / 100) * player.duration;
  handleProgress.call(this);
}

function handleProgress() {
  this.style.setProperty("--value", this.value);
}

function videoFlow() {
  progressRange.value = (player.currentTime / player.duration) * 100;
  handleProgress.call(progressRange);
}

progressRange.addEventListener("input", videoUpdate);
player.addEventListener("timeupdate", videoFlow);
