export default function createHtmlNode(tag, styles, textContent) {
  let element = document.createElement(tag);
  element.className = styles;
  if (textContent) {
    element.innerText = textContent;
  }
  return element;
}
