// 别名
window.$ = window.jQuery = function (selectorsOrArrayOrTemplateOrElement) {
  let elements;
  // 重载
  if (typeof selectorsOrArrayOrTemplateOrElement === "string") {
    if (selectorsOrArrayOrTemplateOrElement[0] === "<") {
      elements = [create(selectorsOrArrayOrTemplateOrElement)];
    } else {
      elements = document.querySelectorAll(selectorsOrArrayOrTemplateOrElement);
    }
  } else if (selectorsOrArrayOrTemplateOrElement instanceof Array) {
    elements = selectorsOrArrayOrTemplateOrElement;
  } else if (selectorsOrArrayOrTemplateOrElement instanceof HTMLElement) {
    elements = [selectorsOrArrayOrTemplateOrElement]
  }
  function create(string) {
    const template = document.createElement("template");
    template.innerHTML = string.trim();
    return template.content.firstChild;
  }
  // jQuery 对象的共有属性
  const api = Object.create(jQuery.prototype);
  Object.assign(api, {
    elements: elements,
    oldApi: selectorsOrArrayOrTemplateOrElement.oldApi,
    jquery: true,
  });
  // 闭包
  return api;
};

jQuery.fn = jQuery.prototype = {
  constructor: jQuery,
  print() {
    console.log(this.elements);
    return this;
  },
  each(fn) {
    for (let index = 0; index < this.elements.length; index++) {
      const element = this.elements[index];
      fn.call(this, element, index);
    }
    return this;
  },
  find(selectors) {
    const array = [];
    this.each((element) => {
      array.push(...element.querySelectorAll(selectors));
    });
    array.oldApi = this;
    return jQuery(array);
  },
  end() {
    return this.oldApi || this;
  },
  get(index) {
    const length = this.elements.length;
    if (index < 0) {
      index = index + length < 0 ? 0 : index + length;
    } else if (index >= length) {
      index = length - 1;
    }
    return this.elements[index];
  },
  eq(index) {
    const length = this.elements.length;
    if (index < 0) {
      index = index + length < 0 ? 0 : index + length;
    } else if (index >= length) {
      index = length - 1;
    }
    return jQuery([this.elements[index]]);
  },
  parent() {
    const array = [];
    this.each((element) => {
      const parentElement = element.parentNode;
      if (array.indexOf(parentElement) === -1) {
        array.push(parentElement);
      }
    });
    array.oldApi = this;
    return jQuery(array);
  },
  children() {
    const array = [];
    this.each((element) => {
      array.push(...element.children);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  siblings() {
    const array = [];
    this.each((element) => {
      const siblingsElements = Array.from(element.parentNode.children).filter(
        (item) => item !== element
      );
      array.push(...siblingsElements);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  prev() {
    const array = [];
    this.each((element) => {
      let p = element.previousSibling;
      while (p && p.nodeType === 3) {
        p = p.previousSibling;
      }
      array.push(p);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  next() {
    const array = [];
    this.each((element) => {
      let n = element.nextSibling;
      while (n && n.nodeType === 3) {
        n = n.nextSibling;
      }
      array.push(n);
    });
    array.oldApi = this;
    return jQuery(array);
  },
  // 增
  before(jQueryOrNode) {
    const element = this.get(0);
    if (jQueryOrNode.jquery) {
      element.parentNode.insertBefore(jQueryOrNode.get(0), element);
    } else if (jQueryOrNode instanceof Node) {
      element.parentNode.insertBefore(jQueryOrNode, element);
    }
    return this;
  },
  after(jQueryOrNode) {
    const element = this.get(0);
    if (jQueryOrNode.jquery) {
      element.parentNode.insertBefore(
        jQueryOrNode.get(0),
        jQuery([element]).next().get(0)
      );
    } else if (jQueryOrNode instanceof Node) {
      element.parentNode.insertBefore(
        jQueryOrNode,
        jQuery([element]).next().get(0)
      );
    }
    return this;
  },
  append(jQueryOrNode) {
    const element = this.get(0);
    if (jQueryOrNode.jquery) {
      element.appendChild(jQueryOrNode.get(0));
    } else if (jQueryOrNode instanceof Node) {
      element.appendChild(jQueryOrNode);
    }
    return this;
  },
  appendTo(jQueryOrNode) {
    const element = this.get(0);
    if (jQueryOrNode.jquery) {
      jQueryOrNode.get(0).appendChild(element);
    } else if (jQueryOrNode instanceof Node) {
      jQueryOrNode.appendChild(element);
    }
    return this;
  },
  // 删
  remove() {
    this.each((element) => {
      element.remove();
    });
    return this;
  },
  empty() {
    this.each((element) => {
      console.log(element.children)
      const children = Array.from(element.children);
      for (let i = 0; i < children.length; i++) {
        children[i].remove();
      }
    });
    return this;
  },
  // 改
  attr(name, value) {
    // 重载
    if (arguments.length === 1) {
      return this.get(0).getAttribute(name);
    } else if (arguments.length === 2) {
      this.each((element) => {
        element.setAttribute(name, value);
      });
    }
    return this;
  },
  css(name, value) {
    // 重载
    if (arguments.length === 1) {
      if (typeof name === "string") {
        return this.get(0).style[name];
      } else if (name instanceof Object) {
        this.each((element) => {
          for (let key in name) {
            element.style[key] = name[key];
          }
        });
      }
    } else if (arguments.length === 2) {
      this.each((element) => {
        element.style[name] = value;
      });
    }
    return this;
  },
  hasClass(className) {
    return this.get(0).classList.contains(className);
  },
  addClass(className) {
    this.each((element) => {
      element.classList.add(className);
    });
    return this;
  },
  removeClass(className) {
    this.each((element) => {
      element.classList.remove(className);
    });
    return this;
  },
  text(textString) {
    // 重载
    if (arguments.length === 0) {
      let string = "";
      this.each((element) => {
        // 适配
        string += document.all ? element.innerText : element.textContent;
      });
      return string;
    } else if (arguments.length === 1) {
      this.each((element) => {
        document.all
          ? (element.innerText = textString)
          : (element.textContent = textString);
      });
    }
    return this;
  },
  html(htmlString) {
    // 重载
    if (arguments.length === 0) {
      return this.get(0).innerHTML;
    } else if (arguments.length === 1) {
      this.each((element) => {
        element.innerHTML = htmlString;
      });
    }
    return this;
  },
  on(eventType, listener, useCapture = false) {
    this.each((element) => {
      element.addEventListener(eventType, listener, useCapture);
    });
    return this;
  },
  off(eventType, listener, useCapture = false) {
    this.each((element) => {
      element.removeEventListener(eventType, listener, useCapture);
    });
    return this;
  },
};

