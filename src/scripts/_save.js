export function set(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function get(name, lang = "en") {
  return JSON.parse(window.localStorage.getItem(name) || lang);
}
