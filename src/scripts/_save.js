export function setLanguage(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function getLanguage(name, lang = '"en"') {
  return JSON.parse(window.localStorage.getItem(name) || lang);
}
