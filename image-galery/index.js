const input = document.getElementById("search");
const gallery = document.querySelector(".gallery");
const cleaner = document.querySelector(".clear");
const enter = document.querySelector(".enter");

cleaner.addEventListener("click", () => (input.value = ""));
input.addEventListener("keyup", (e) => {
  if (e.key === "Enter") makeUrl();
});
enter.addEventListener("click", makeUrl);

const api = "https://api.unsplash.com/search/photos?query=";
const myId = "&client_id=6ZdbFfCvoSKtMFAZYhY86hQZkI_5BvBPSfD87Em7A5M";
const page = "&page=1";
const perPage = "&per_page=30";
let totalPages = 0;
let currentPage = 1;

let keyWord = "horse";

function makeUrl() {
  keyWord = input.value;
  // keyWord = input.value.split(" ").join(",");
  if (!keyWord) return;
  let url = api + keyWord + page + perPage + myId;
  currentPage = 1;
  getData(url);
}

async function getData(url) {
  const result = await fetch(url);
  const data = await result.json();

  if (!data.results.length) {
    div = document.createElement("div");
    div.classList.add("not-found");
    gallery.innerHTML = "";
    gallery.appendChild(div);
    div.textContent = "Sorry, not found...";
    return;
  }

  totalPages = data.total_pages;

  showData(data.results);
  return data;
}

function showData(collection) {
  gallery.innerHTML = "";

  collection.forEach((element) => {
    const div = document.createElement("div");
    div.classList.add("gallery__item");
    gallery.appendChild(div);
    div.appendChild(createImg(element));
  });

  images = Array.from(document.querySelectorAll(".gallery__item img"));

  let div = document.createElement("div");
  div.classList.add("page-slider");
  gallery.appendChild(div);

  let btn = document.createElement("button");
  btn.textContent = "<<";
  btn.id = "previousPage";
  btn.title = "previous page";
  btn.addEventListener("click", pageSlider);
  div.appendChild(btn);

  let inputPage = document.createElement("input");
  inputPage.type = "number";
  inputPage.min = 1;
  inputPage.max = totalPages;
  inputPage.id = "goToPage";
  inputPage.placeholder = currentPage;
  inputPage.addEventListener("keyup", (e) => {
    if (e.key === "Enter") pageSlider(e);
  });
  div.appendChild(inputPage);

  btn = document.createElement("button");
  btn.textContent = ">>";
  btn.id = "nextPage";
  btn.title = "next page";
  btn.addEventListener("click", pageSlider);
  div.appendChild(btn);

  div = document.createElement("div");
  div.textContent = `Page ${currentPage} of ${totalPages}`;
  div.classList.add("page-info");
  gallery.appendChild(div);
}

function createImg(obj) {
  const img = document.createElement("img");
  img.src = `${obj.urls.regular}`;
  img.alt = `image`;
  return img;
}

//fullscreen

let images = Array.from(document.querySelectorAll(".gallery__item img"));
let index = 0;
gallery.addEventListener("click", showImg);

function showImg(e) {
  if (e.target.tagName !== "IMG") return;

  const div = document.createElement("div"),
    previous = document.createElement("div"),
    next = document.createElement("div"),
    img = e.target.cloneNode();

  div.classList.add("full");
  previous.classList.add("full__previous");
  next.classList.add("full__next");

  document.body.appendChild(div);

  div.appendChild(previous);
  div.appendChild(img);
  div.appendChild(next);

  previous.addEventListener("click", previousImg);
  img.addEventListener("click", closeImg);
  next.addEventListener("click", nextImg);

  //correct scrollY defect
  div.style.top = window.scrollY + "px";
  document.body.classList.add("hidden");
  div.scrollIntoView();

  index = images.indexOf(e.target);
}

function closeImg() {
  document.querySelector(".full").remove();
  document.body.classList.remove("hidden");
  images[index].scrollIntoView();
}

//slider

function previousImg() {
  index--;
  if (index < 0) index = images.length - 1;
  document.querySelector(".full img").src = images[index].src;
}
function nextImg() {
  index++;
  if (index === images.length) index = 0;
  document.querySelector(".full img").src = images[index].src;
}

//preload

window.addEventListener("load", hiPage);

function hiPage() {
  let url = api + "horse" + "&page=20&per_page=3" + myId;
  sayHi(url);

  async function sayHi(url) {
    getData(url).then(() => {
      const hi = document.createElement("h2");
      hi.classList.add("hi");
      hi.textContent = "Image anything...";
      gallery.insertBefore(hi, gallery.firstChild);
      gallery.querySelector(".page-slider").remove();
      gallery.querySelector(".page-info").remove();
    });
  }
}

//page slider

function pageSlider(e) {
  if (e.target.id === "nextPage") {
    if (currentPage === totalPages) return;
    currentPage++;
  }
  if (e.target.id === "previousPage") {
    if (currentPage === 1) return;
    currentPage--;
  }
  if (e.target.id === "goToPage") {
    if (e.target.value > totalPages || e.target.value < 1) return;
    currentPage = e.target.value;
  }

  let url = api + keyWord + "&page=" + currentPage + perPage + myId;
  getData(url);
  input.scrollIntoView();
}
