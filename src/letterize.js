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
          deconstructObjects(
            nodeList[j],
            wrapper,
            className,
            list,
            listAll,
            i,
            id
          );
          break;
        case 3:
          listPart = deconstructText(nodeList[j], wrapper, className);
          listAll = listAll.concat(listPart);
          list[i] = list[i].concat(listPart);
          break;
      }
    }
  }
};

export default class Letterize {
  constructor(params = {}) {
    if (!params.targets || !params.targets.length) {
      console.error("Letterize: targets not specified.");
      return;
    }

    Letterize.numInstances = (Letterize.numInstances || 0) + 1;

    this.targets = params.targets;
    this.wrapper = params.wrapper || "span";
    this.className = params.className;
    this.id = Letterize.numInstances;
    console.log(this.id);

    this.list = [];
    this.listAll = [];

    const targetsLength = this.targets.length;

    if (typeof this.targets === "string") {
      this.targets = document.querySelectorAll(this.targets);
    }

    if (!this.targets.length) {
      console.error(`Letterize: targets '${this.targets}' not found`);
      return;
    }

    for (let i = 0; i < targetsLength; i++) {
      this.list[i] = [];
      deconstructObjects(
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
}
