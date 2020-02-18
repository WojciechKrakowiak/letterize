/*jshint esversion: 6 */

"use strict";

const getTargets = targets => {
  if (
    NodeList.prototype.isPrototypeOf(targets) ||
    HTMLCollection.prototype.isPrototypeOf(targets) ||
    Array.isArray(targets)
  ) {
    return targets;
  } else if (HTMLElement.prototype.isPrototypeOf(targets)) {
    return [targets];
  } else if (typeof targets === "string") {
    return document.querySelectorAll(targets);
  }
  return null;
};

const deconstructText = (node, wrapper, className) => {
  const text = node.textContent.trim();
  const textLength = text.length;
  const list = [];
  node.textContent = "";

  for (let n = 0; n < textLength; n++) {
    const letterNode = document.createElement(wrapper);
    if (className && className.length) letterNode.classList.add(className);

    // Replace spaces with &nbsp; so it has width after letterizing
    letterNode.textContent = text[n] === " " ? "\xa0" : text[n];

    node.before(letterNode);
    list.push(letterNode);
  }
  return list;
};

const deconstructObjects = (
  targets,
  target,
  wrapper,
  className,
  list,
  listAll,
  i,
  id
) => {
  if (!Array.isArray(target.letterize_id)) {
    target.letterize_id = [];
  }

  if (!target.letterize_id.includes(id)) {
    target.letterize_id.push(id);
    const nodeList = [...target.childNodes];
    const nodeListLength = nodeList.length;
    for (let j = 0; j < nodeListLength; j++) {
      let listPart;
      switch (nodeList[j].nodeType) {
        case 1:
          if (Array.prototype.indexOf.call(targets, nodeList[j]) === -1) {
            // Check if current nodeList[j] wasn't deconstructed (it can happen if a target node is in another target node).
            deconstructObjects(
              targets,
              nodeList[j],
              wrapper,
              className,
              list,
              listAll,
              i,
              id
            );
          }
          break;
        case 3:
          listPart = deconstructText(nodeList[j], wrapper, className);
          listAll.push(...listPart);
          list[i].push(...listPart);
          break;
      }
    }
  }
};

export default class Letterize {
  constructor(params = {}) {
    const targets = getTargets(params.targets);

    if (!targets || !targets.length) {
      console.error(
        `Letterize: targets '${this.targets}' not found or not specified`
      );
      return false;
    }

    const targetsLength = targets.length;

    Letterize.numInstances = (Letterize.numInstances || 0) + 1;
    const wrapper = params.wrapper || "span";
    const className = params.className;
    const id = Letterize.numInstances;
    const list = [];
    const listAll = [];

    for (let i = 0; i < targetsLength; i++) {
      list[i] = [];
      deconstructObjects(
        targets,
        targets[i],
        wrapper,
        className,
        list,
        listAll,
        i,
        id
      );
    }

    this.getWrapper = () => wrapper;
    this.getTargets = () => targets;
    this.list = () => list;
    this.listAll = () => listAll;
    this.getClassName = () => className;
  }

  deletterize() {
    const listLength = this.listAll().length;
    for (let i = 0; i < listLength; i++) {
      this.listAll()[i].before(...this.listAll()[i].childNodes);
      this.listAll()[i].remove();
    }
    this.getWrapper = undefined;
    this.getTargets = undefined;
    this.list = undefined;
    this.listAll = undefined;
    this.getClassName = undefined;
    this.deletterize = undefined;
  }
}
