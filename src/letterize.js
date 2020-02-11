/*jshint esversion: 6 */

const deconstructText = (node, wrapper, className) => {
  const text = node.textContent.trim();
  const textLength = text.length;
  const list = [];
  node.textContent = "";

  for (let n = 0; n < textLength; n++) {
    const letterNode = document.createElement(wrapper);
    if (className && className.length) letterNode.classList.add(className);
    letterNode.textContent = text[n];
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
            // Check if current nodeList[j] wasn't deconstructed (it can happen if target node is in another target node).
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
    if (
      NodeList.prototype.isPrototypeOf(params.targets) ||
      HTMLCollection.prototype.isPrototypeOf(params.targets) ||
      Array.isArray(params.targets)
    ) {
      this.targets = params.targets;
    } else if (HTMLElement.prototype.isPrototypeOf(params.targets)) {
      this.targets = [params.targets];
    } else if (typeof params.targets === "string") {
      this.targets = document.querySelectorAll(params.targets);
    }

    const targetsLength = this.targets.length;
    console.log(this.targets);
    console.log(this.targets.length);

    if (!this.targets.length) {
      console.error(
        `Letterize: targets '${this.targets}' not found or not specified`
      );
      return false;
    }

    Letterize.numInstances = (Letterize.numInstances || 0) + 1;
    this.wrapper = params.wrapper || "span";
    this.className = params.className;
    this.id = Letterize.numInstances;
    this.list = [];
    this.listAll = [];

    for (let i = 0; i < targetsLength; i++) {
      this.list[i] = [];
      deconstructObjects(
        this.targets,
        this.targets[i],
        this.wrapper,
        this.className,
        this.list,
        this.listAll,
        i,
        this.id
      );
    }
  }

  deletterize() {
    const listLength = this.listAll.length;
    for (let i = 0; i < listLength; i++) {
      this.listAll[i].before(...this.listAll[i].childNodes);
      this.listAll[i].remove();
    }
    this.targets = undefined;
    this.wrapper = undefined;
    this.className = undefined;
    this.list = undefined;
    this.listAll = undefined;
    this.id = undefined;
    this.deletterize = undefined;
  }
}
