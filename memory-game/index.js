alert("Привет!\nПравила игры и допфункционал в консоли\nСпасибо за проверку!");
console.log(
  "Score: 70 / 70\n1. Вёрстка +10\n2. Логика игры +10\n3. Игра завершается, когда открыты все карточки +10\n4. По окончанию игры выводится её результат - количество ходов, которые понадобились для завершения игры +10\n5. Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой сохраняются результаты предыдущих 10 игр +10\n6. По клику на карточку – она переворачивается плавно, если пара не совпадает – обе карточки так же плавно переворачиваются рубашкой вверх +10 \n7. Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10 \n - усовершенствованная логика игры: если карточки совпадают - они удаляются с игрового поля, если нет - остаются открытыми, пока не будет открыта следующая\n - лучший результат сохраняется в local storage и выводится после окончания игры\n - добавлен выбор размера поля\n - добавлен выбор карт\n - результаты и лучший результат отсортированы по сложности"
);

let cardVariant = localStorage.getItem("cardVariant") || 1;

function preloadImages(v) {
  for (let i = 1; i <= 12; i++) {
    const img = new Image();
    img.src = `./assets/img/${v}/${i}.jpg`;
  }
}

//start params
let results = localStorage.getItem("results")
  ? JSON.parse(localStorage.getItem("results"))
  : { small: [], medium: [], large: [], ultra: [] };
let cardsOrder = [];
let pairs = [];
let score = 0;
let openPairs = 0;
let bestScore = JSON.parse(localStorage.getItem("bestScore")) || {};
let difficulty = localStorage.getItem("difficulty") || "large";
const difficultyVariant = ["small", "medium", "large", "ultra"];
const fieldSize = { small: 16, medium: 24, large: 32, ultra: 48 };

let gameFieldSize = fieldSize[difficulty];
let playingCardsNumber = gameFieldSize / 4;

function getGameField(gameFieldSize, playingCardsNumber) {
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  let S = new Set();
  while (S.size < gameFieldSize) {
    S.add(getRandomInt(1, gameFieldSize));
  }

  for (let value of S) {
    while (value > playingCardsNumber) value -= playingCardsNumber;
    cardsOrder.push(value);
  }
}

const gameField = document.querySelector(".field");
let playingCards = Array.from(document.querySelectorAll(".field__card"));
const menu = document.querySelector(".menu");
const startMenu = document.querySelector(".navigation");
const startNewGame = document.getElementById("new game");
startNewGame.addEventListener("click", newGame);
const scoresBtn = document.getElementById("scores");
scoresBtn.addEventListener("click", showScores);
const settings = document.getElementById("settings");
settings.addEventListener("click", showSettings);

function newGame() {
  cardsOrder = [];
  pairs = [];
  score = 0;
  openPairs = 0;

  getGameField(gameFieldSize, playingCardsNumber);
  preloadImages(cardVariant);

  //render game field
  gameField.classList.add(`${difficulty}`);

  for (let i = 0; i < gameFieldSize; i++) {
    const wrapper = document.createElement("div");
    wrapper.classList.add("field__item");
    gameField.appendChild(wrapper);

    const card = new Image();
    card.src = "./assets/img/card.jpg";
    card.alt = "card";
    card.classList.add("field__card");
    wrapper.appendChild(card);
  }

  gameField.classList.remove("clear");

  //array of playing cards
  playingCards = Array.from(document.querySelectorAll(".field__card"));
  playingCards.forEach((card) => card.addEventListener("click", openCard));

  startMenu.classList.remove("appear");
  menu.classList.remove("appear");
}

function openCard(e) {
  if (pairs.includes(e.target)) return;

  score++;

  let card = e.target;
  let cardNumber = playingCards.indexOf(e.target);

  card.classList.add("open");
  setTimeout(() => {
    card.src = `./assets/img/${cardVariant}/${cardsOrder[cardNumber]}.jpg`;
  }, 300);

  pairs.push(card);

  if (pairs.length === 2 && isPair(pairs)) removeCards();
  if (pairs.length === 3) closeCards(pairs[0], pairs[1]);
}

function closeCards(...args) {
  args.forEach((card) => {
    card.classList.remove("open");
    setTimeout(() => {
      card.src = `./assets/img/card.jpg`;
    }, 300);
    pairs.shift();
  });
}

function removeCards() {
  let temp = pairs;
  pairs = [];
  openPairs++;
  setTimeout(() => {
    temp.forEach((card) => {
      card.classList.add("remove");
      setTimeout(() => card.remove(), 300);
    });
  }, 600);
  if (openPairs === gameFieldSize / 2) setTimeout(() => win(), 900);
}

function isPair([a, b]) {
  return (
    cardsOrder[playingCards.indexOf(a)] === cardsOrder[playingCards.indexOf(b)]
  );
}

//show win message
function win() {
  menu.classList.add("appear");
  gameField.classList.add("clear");
  gameField.innerHTML = "";

  if (results[difficulty].length > 9) results[difficulty].shift();

  results[difficulty].push({
    date: Date().slice(4, 21),
    score: score,
  });

  localStorage.setItem("results", JSON.stringify(results));
  bestScore[difficulty] = Math.min(bestScore[difficulty] || score, score);
  localStorage.setItem("bestScore", JSON.stringify(bestScore));

  //render win message
  const wrapper = document.createElement("div");
  wrapper.classList.add("win");
  menu.appendChild(wrapper);

  const header = document.createElement("h2");
  header.classList.add("menu__header", "winner");
  header.textContent = "You win!";
  wrapper.appendChild(header);

  const body = document.createElement("div");
  body.classList.add("menu__list");
  wrapper.appendChild(body);

  //best result
  let result = document.createElement("div");
  result.classList.add("menu__list__item");
  body.appendChild(result);

  let resultHeader = document.createElement("div");
  resultHeader.classList.add("list__item");
  resultHeader.textContent = "Best score";
  result.appendChild(resultHeader);

  let resultScore = document.createElement("div");
  resultScore.classList.add("list__item", "score");
  resultScore.textContent = `${bestScore[difficulty]}`;
  result.appendChild(resultScore);

  //current result
  result = document.createElement("div");
  result.classList.add("menu__list__item", "current");
  body.appendChild(result);

  resultHeader = document.createElement("div");
  resultHeader.classList.add("list__item");
  resultHeader.textContent = "Your score";
  result.appendChild(resultHeader);

  resultScore = document.createElement("div");
  resultScore.classList.add("list__item", "score");
  resultScore.textContent = `${score}`;
  result.appendChild(resultScore);

  const close = document.createElement("div");
  close.classList.add("win__close");
  let span = document.createElement("span");
  span.classList.add("line");
  wrapper.appendChild(close);
  close.appendChild(span);
  close.appendChild(span.cloneNode());

  close.addEventListener("click", goBack);
}

//show scores

function showScores() {
  startMenu.classList.remove("appear");

  const wrapper = document.createElement("div");
  wrapper.classList.add("menu__item");
  menu.appendChild(wrapper);

  for (let i = 0; i < 4; i++) {
    const button = document.createElement("button");
    button.classList.add("diff-btn");
    button.textContent = `${difficultyVariant[i]}`;
    button.id = `${difficultyVariant[i]}`;
    wrapper.appendChild(button);
    button.addEventListener("click", showDiffScores);
  }

  const button = document.createElement("button");
  button.classList.add("back");
  button.textContent = "«back";
  wrapper.appendChild(button);
  button.addEventListener("click", goBack);
}

function showDiffScores(e) {
  const wrapper = document.querySelector(".menu__item");
  wrapper.innerHTML = "";

  const header = document.createElement("h2");
  header.classList.add("menu__header");
  header.textContent = `${e.target.id}`;
  wrapper.appendChild(header);

  const ul = document.createElement("ul");
  ul.classList.add("menu__list");
  wrapper.appendChild(ul);

  for (let i = 0; i < results[e.target.id].length; i++) {
    const result = document.createElement("li");
    result.classList.add("menu__list__item");

    const resultDate = document.createElement("div");
    resultDate.classList.add("list__item");
    resultDate.textContent = `${results[e.target.id][i].date}`;

    const resultScore = document.createElement("div");
    resultScore.classList.add("list__item", "score");
    resultScore.textContent = `${results[e.target.id][i].score}`;

    ul.appendChild(result);
    result.appendChild(resultDate);
    result.appendChild(resultScore);
  }

  const button = document.createElement("button");
  button.classList.add("back");
  button.textContent = "«back";
  wrapper.appendChild(button);
  button.addEventListener("click", () => {
    wrapper.remove();
    showScores();
  });
}

function goBack() {
  menu.lastChild.remove();
  startMenu.classList.add("appear");
}

//show settings

function showSettings() {
  startMenu.classList.remove("appear");

  const wrapper = document.createElement("div");
  wrapper.classList.add("menu__item");
  menu.appendChild(wrapper);

  const header = document.createElement("h2");
  header.classList.add("menu__header");
  header.textContent = "Settings";
  wrapper.appendChild(header);

  //difficulty
  let sizeSet = document.createElement("div");
  sizeSet.classList.add("menu__list__item");
  wrapper.appendChild(sizeSet);

  let setHead = document.createElement("div");
  setHead.classList.add("list__item");
  setHead.textContent = "difficulty";
  sizeSet.appendChild(setHead);

  let sizeControls = document.createElement("span");
  sizeControls.textContent = "<";
  sizeControls.id = "minus_size";
  sizeControls.classList.add("settings");
  sizeSet.appendChild(sizeControls);

  sizeControls = document.createElement("span");
  sizeControls.textContent = `${difficulty}`;
  sizeControls.id = "field_size";
  sizeSet.appendChild(sizeControls);

  sizeControls = document.createElement("span");
  sizeControls.textContent = ">";
  sizeControls.id = "plus_size";
  sizeControls.classList.add("settings");
  sizeSet.appendChild(sizeControls);

  //cards
  sizeSet = document.createElement("div");
  sizeSet.classList.add("menu__list__item");
  wrapper.appendChild(sizeSet);

  setHead = document.createElement("div");
  setHead.classList.add("list__item");
  setHead.textContent = "cards variant";
  sizeSet.appendChild(setHead);

  sizeControls = document.createElement("span");
  sizeControls.textContent = "<";
  sizeControls.id = "minus_variant";
  sizeControls.classList.add("settings");
  sizeSet.appendChild(sizeControls);

  sizeControls = document.createElement("span");
  sizeControls.textContent = `${cardVariant}`;
  sizeControls.id = "cardVariant";
  sizeSet.appendChild(sizeControls);

  sizeControls = document.createElement("span");
  sizeControls.textContent = ">";
  sizeControls.id = "plus_variant";
  sizeControls.classList.add("settings");
  sizeSet.appendChild(sizeControls);

  const button = document.createElement("button");
  button.classList.add("back");
  button.textContent = "«back";
  wrapper.appendChild(button);
  button.addEventListener("click", goBack);

  //controls
  const fieldMinus = wrapper.querySelector("#minus_size");
  const fieldPlus = wrapper.querySelector("#plus_size");
  [fieldMinus, fieldPlus].forEach((elem) =>
    elem.addEventListener("click", setFieldSize)
  );
  const variantMinus = wrapper.querySelector("#minus_variant");
  const variantPlus = wrapper.querySelector("#plus_variant");
  [variantMinus, variantPlus].forEach((elem) =>
    elem.addEventListener("click", setCardVariant)
  );
}

function setFieldSize(e) {
  gameField.classList.remove(`${difficulty}`);
  let index = difficultyVariant.indexOf(difficulty);
  if (e.target.id === "minus_size") {
    index--;
    if (index < 0) index = 3;
  }
  if (e.target.id === "plus_size") {
    index++;
    if (index === 4) index = 0;
  }
  difficulty = difficultyVariant[index];
  localStorage.setItem("difficulty", difficulty);
  gameFieldSize = fieldSize[difficulty];
  playingCardsNumber = gameFieldSize / 4;

  const span = document.querySelector("#field_size");
  span.textContent = difficulty;
}

function setCardVariant(e) {
  if (e.target.id === "minus_variant") {
    cardVariant--;
    if (cardVariant === 0) cardVariant = 3;
  }
  if (e.target.id === "plus_variant") {
    cardVariant++;
    if (cardVariant === 4) cardVariant = 1;
  }
  localStorage.setItem("cardVariant", cardVariant);
  const span = document.querySelector("#cardVariant");
  span.textContent = cardVariant;
}
