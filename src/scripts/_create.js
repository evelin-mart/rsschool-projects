export default function createHtmlNode(tag, styles, content) {
  let element = document.createElement(tag);
  element.className = styles;
  if (content) {
    element.innerHTML = content;
  }
  return element;
}
