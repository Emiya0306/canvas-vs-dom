export function findParents(el: Node) {
  let currentEl = el;
  const parents = [];
  while (currentEl.parentNode && currentEl.nodeType !== 9) {
    currentEl = currentEl.parentNode;
    if (currentEl.nodeType === 1) {
      parents.push(currentEl);
    }
  }
  return parents;
}

export function isElementParent(element: Node, parent: Node) {
  return findParents(element).includes(parent);
}
