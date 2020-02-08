export default class {
  constructor(selector) {
    this.selector = selector;
    this.container;
    this.wrapper;
    this.className = "";
    this.textContent = [];
    this.list = [];
    this.listAll = [];
  }

  letterize(wrapper, className = "") {
    this.wrapper = wrapper;
    this.className = className;
    console.log(this.className);
    if (this.selector.length) {
      if (!this.container) {
        this.container = document.querySelectorAll(this.selector);
        if (this.container.length) {
          for (let i = 0; i < this.container.length; i++) {
            this.textContent[i] = this.container[i].textContent;
            this.container[i].textContent = "";
            this.list[i] = [];
            for (let n = 0; n < this.textContent[i].length; n++) {
              const node = document.createElement(this.wrapper);
              this.className.length ? node.classList.add(this.className) : "";
              node.textContent = this.textContent[i][n];
              this.container[i].appendChild(node);
              this.list[i].push(node);
              this.listAll.push(node);
            }
          }
        } else {
          console.warn("Letterize: selector doesn't match any object.");
        }
      } else {
        console.error(
          "Letterize: letterize has been already initialized. Aborting."
        );
      }
    } else {
      console.error("Letterize: selector not specified.");
    }
  }
}
