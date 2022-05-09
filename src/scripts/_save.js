export function setLanguage(name, value) {
  localStorage.setItem(name, JSON.stringify(value));
}

export function getLanguage(name, lang = '"en"') {
  return JSON.parse(localStorage.getItem(name) || lang);
}
