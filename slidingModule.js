/*!
 * 拖动滑块 v0.0.1
 * cqh
 * 2018-10-10
 */
(function (win, doc) {
  let defaultOptions = {
    limitTop: 50,
    limitBottom: 50,
    limitLeft: 10,
    limitRight: 10,
    onClick: function () {

    }
  };

  function slideModule(options) {
    let v = this;
    if (!options) {
      throw new Error("请传入配置参数！");
    }
    v = Object.assign(v, defaultOptions, options);
    v.container = document.getElementById(v.container);
    if (!v.container) {
      throw new Error("配置 id 错误！");
    }
    v._bindSliding();
  }

  slideModule.prototype = {
    _bindSliding: function () {
      let v = this;
      v.container.addEventListener("mousedown", function (event) {
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
            event.preventDefault();
          }
        }
        down(v.container);
      }, false);

      v.container.addEventListener("touchstart", function (event) {
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
            event.preventDefault();
          }
        }
        firstTime = new Date().getTime();
        down(v.container);
      }, false);

      v.container.addEventListener("mousemove", function (event) {
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
            event.preventDefault();
          }
        }
        move(v.container, v.limitTop, v.limitBottom);
      }, false);

      v.container.addEventListener("touchmove", function (event) {
        // event.stopPropagation();
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
            event.preventDefault();
          }
        }
        move(v.container, v.limitTop, v.limitBottom);
      }, false);

      v.container.addEventListener("mouseup", function (event) {
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
            if (event.preventDefault)
              event.preventDefault();
            else
              event.returnValue = false;
          }
        }
        end(v.container, v.limitLeft, v.limitRight);
      }, false);

      v.container.addEventListener("touchend", function (event) {
        // event.stopPropagation();
        if (event.cancelable) {
          // 判断默认行为是否已经被禁用
          if (!event.defaultPrevented) {
            if (event.preventDefault)
              event.preventDefault();
            else
              event.returnValue = false;
          }
        }
        lastTime = new Date().getTime();
        if ((lastTime - firstTime) < 100) {
          v.onClick();
          key = true;
        } else {
          end(v.container, v.limitLeft, v.limitRight);
        }
      }, false);
    }
  };

  let key = false;//设置了一个标志 false为点击事件 ture为鼠标移动事件
  let firstTime = 0;
  let lastTime = 0;

  let flag = false;
  let cur = {
    x: 0,
    y: 0
  };
  let nx, ny, dx, dy, x, y;

  function down(dom) {
    let event = arguments.callee.caller.arguments[0] || window.event;
    flag = true;
    let touch;
    if (event.touches) {
      touch = event.touches[0];
    } else {
      touch = event;
    }
    cur.x = touch.clientX;
    cur.y = touch.clientY;
    dx = dom.offsetLeft;
    dy = dom.offsetTop;
  }

  function move(dom, limitTop, limitBottom) {
    let event = arguments.callee.caller.arguments[0] || window.event;
    if (flag) {
      let touch;
      if (event.touches) {
        touch = event.touches[0];
      } else {
        touch = event;
      }
      nx = touch.clientX - cur.x;
      ny = touch.clientY - cur.y;
      x = dx + nx;
      y = dy + ny;
      dom.style.left = x + "px";
      dom.style.top = y + "px";

      if (dom.style.top.substr(0, dom.style.top.length - 2) <= limitTop) {
        dom.style.top = limitTop + 'px';
      }
      if (dom.style.top.substr(0, dom.style.top.length - 2) >= window.screen.height - limitBottom - dom.offsetHeight) {
        dom.style.top = (window.screen.height - limitBottom - dom.offsetHeight) + 'px';
      }
      //阻止页面的滑动默认事件
      document.addEventListener("touchmove", function () {
        event.preventDefault();
      }, false);
    }
  }

  //鼠标释放时候的函数
  function end(dom, limitLeft, limitRight) {
    let left = parseInt(dom.style.left.substr(0, dom.style.left.length - 2));
    if (left < document.body.clientWidth / 2 && left + dom.offsetWidth / 2 < document.body.clientWidth / 2) {
      let t = setInterval(function () {
        left = left - 4;
        dom.style.left = left + "px";
        if (left <= limitLeft) {
          dom.style.left = limitLeft + "px";
          clearInterval(t);
        }
      }, 1);
    } else {
      let t = setInterval(function () {
        left = left + 4;
        dom.style.left = left + "px";
        if (left >= (document.body.clientWidth - limitRight - dom.offsetWidth)) {
          dom.style.left = (document.body.clientWidth - limitRight - dom.offsetWidth) + "px";
          clearInterval(t);
        }
      }, 1);
    }
    flag = false;
  }

  win.slideModule = slideModule;
})(window, document);
