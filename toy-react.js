export class Component {
  constructor(){
    this.props = Object.create(null)
    // this.props.children = []
    this._root = null
  }
  setAttribute(name, value) {
    this.props[name] = value
  }
  appendChild(component) {
    if(!this.props.children){
      this.props.children = []
    }
    this.props.children.push(component)
  }
  get root(){
    if(!this._root) {
      this._root = this.render().root
    }
    return this._root
  }
}

class ElementWrapper {
  constructor(type){
    this.root = document.createElement(type)
  }
  setAttribute(name, value) {
    this.root.setAttribute(name, value)
  }
  appendChild(component) {
    this.root.appendChild(component.root)
  }
}

class TextWrapper {
  constructor(content) {
    this.root = document.createTextNode(content)
  }
}

export function createElement(type, attrs, ...children) {
  let e;
  if (typeof type === "string") {
    e = new ElementWrapper(type);
  } else {
    e = new type();
  }
  for (let a in attrs) {
    e.setAttribute(a, attrs[a]);
  }
  let insertChildren = (children) => {
    for (let child of children) {
      if (typeof child === "string") {
        child = new TextWrapper(child);
      }
      if (typeof child === "object" && child instanceof Array) {
        insertChildren(child);
      } else {
        e.appendChild(child);
      }
    }
  };
  insertChildren(children)
  return e
}

export function render(component, parent) {
  parent.appendChild(component.root)
}
