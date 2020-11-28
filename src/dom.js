window.dom = {
  // 查
  findOne(selector, container) {
    return (container || document).querySelector(selector);
  },
  find(selectors, container) {
    return (container || document).querySelectorAll(selectors);
  },
  parent(node) {
    return node.parentNode;
  },
  children(node) {
    return node.children;
  },
  siblings(node) {
    return Array.from(node.parentNode.children).filter((item) => item !== node);
  },
  previous(node) {
    let p = node.previousSibling;
    while (p && p.nodeType === 3) {
      p = p.previousSibling;
    }
    return p;
  },
  next(node) {
    let n = node.nextSibling;
    while (n && n.nodeType === 3) {
      n = n.nextSibling;
    }
    return n;
  },
  travel(nodeList, callback) {
    for (let i = 0; i < nodeList.length; i++) {
      callback.call(null, nodeList[i]);
    }
  },
  index(node) {
    const nodeList = dom.children(dom.parent(node));
    const arrNodeList = Array.from(nodeList);
    for (let i = 0; i < arrNodeList.length; i++) {
      if (arrNodeList[i] === node) {
        return i;
      }
    }
  },
  // 增
  create(string) {
    const template = document.createElement("template");
    template.innerHTML = string.trim();
    return template.content.firstChild;
  },
  before(node, referenceNode) {
    dom.parent(referenceNode).insertBefore(node, referenceNode);
  },
  after(node, referenceNode) {
    dom.parent(referenceNode).insertBefore(node, dom.next(referenceNode));
  },
  append(node, parentNode) {
    parentNode.appendChild(node);
  },
  wrap(node, childNode) {
    dom.before(node, childNode);
    dom.append(childNode, node);
  },
  // 删
  remove(node) {
    node.remove();
    return node;
  },
  empty(node) {
    const arrChildren = Array.from(dom.children(node));
    let array = [];
    for (let i = 0; i < arrChildren.length; i++) {
      array.push(dom.remove(arrChildren[i]));
    }
    return array;
  },
  // 改
  attribute(node, name, value) {
    // 重载
    if (arguments.length === 2) {
      return node.getAttribute(name);
    } else if (arguments.length === 3) {
      node.setAttribute(name, value);
    }
  },
  style(node, name, value) {
    // 重载
    if (arguments.length === 2) {
      if (typeof name === "string") {
        return node.style[name];
      } else if (name instanceof Object) {
        for (let key in name) {
          node.style[key] = name[key];
        }
      }
    } else if (arguments.length === 3) {
      node.style[name] = value;
    }
  },
  class: {
    has(node, className) {
      return node.classList.contains(className);
    },
    add(node, className) {
      node.classList.add(className);
    },
    remove(node, className) {
      node.classList.remove(className);
    },
  },
  text(node, string) {
    // 重载
    if (arguments.length === 1) {
      // 适配
      return document.all ? node.innerText : node.textContent;
    } else if (arguments.length === 2) {
      document.all ? (node.innerText = string) : (node.textContent = string);
    }
  },
  html(node, string) {
    // 重载
    if (arguments.length === 1) {
      return node.innerHTML;
    } else if (arguments.length === 2) {
      node.innerHTML = string;
    }
  },
  on(node, eventType, listener, useCapture = false) {
    node.addEventListener(eventType, listener, useCapture);
  },
  off(node, eventType, listener, useCapture = false) {
    node.removeEventListener(eventType, listener, useCapture);
  }
};
