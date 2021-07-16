// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/index.js":[function(require,module,exports) {
// Start slider
var $container = document.querySelector('#slider');
var $slideRow = $container.querySelector('.slider__row');
var $slideWrap = $container.querySelector('.slider__wrap');
var $slideSelector = $container.querySelectorAll('.slider__slides');
var $next = document.querySelector('#next');
var $back = document.querySelector('#back');
var $pagination = $container.querySelector('.slider__pagination');
var slideWirth = $slideRow.clientWidth;
var slideLength = $slideSelector.length;
var count = 0;
var marginValue = 0;

function slideWirthFu(slideWirth) {
  $slideSelector.forEach(function (item) {
    item.style.width = "".concat(slideWirth, "px");
  });
}

;
slideWirthFu(slideWirth);

function createPagination() {
  for (var i = 0; i < slideLength; i++) {
    var span = document.createElement('span');
    span.className = "pagination__items";
    $pagination.prepend(span);
  }

  $container.querySelector('.pagination__items').classList.add('active');
}

;
createPagination(); // placeholder

function sliderEvent() {
  var pg = $container.querySelectorAll('.pagination__items');
  $next.addEventListener('click', function () {
    if (count < slideLength - 1) {
      pgRemoveActive();
      count++;
      marginValue = marginValue + slideWirth;
      $slideWrap.style.left = "-".concat(marginValue, "px");
      pg[count].classList.add('active');
    }
  });
  $back.addEventListener('click', function () {
    if (count > 0) {
      pgRemoveActive();
      count--;
      marginValue = marginValue - slideWirth;
      $slideWrap.style.left = "-".concat(marginValue, "px");
      pg[count].classList.add('active');
    }
  });
}

;
sliderEvent();

function pgRemoveActive() {
  var pg = $container.querySelectorAll('.pagination__items');
  pg.forEach(function (item) {
    item.classList.remove('active');
  });
}

; // Video modal

function wsVideoModalInit(opnions) {
  var id = options[0].src;
  var widthVideo = null;
  var heightVideo = null; // Рендер модального окна

  function _renderModal(idVideo, widthVideo, heightVideo) {
    var $body = document.querySelector('body');
    $body.classList.add('hiden');
    videoBlock = " \n\t\t\t<div class=\"ws-modal__overlay\">\n            <span class=\"ws-modal__close\">&#10006;</span>\n            <iframe class=\"ws-modal__block\" style=\"width: ".concat(widthVideo || '870px', "; height: ").concat(heightVideo || '500px', ";\" src=\"https://www.youtube.com/embed/").concat(id || '', "\" title=\"YouTube video player\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture\" allowfullscreen></iframe>\n        </div>\n\t\t");
    var div = document.createElement('div');
    div.className = "ws-modal__video";
    div.innerHTML = "".concat(videoBlock);
    document.body.prepend(div);
    var overlay = document.querySelector('.ws-modal__overlay');

    function _close(event) {
      var modalVideo = document.querySelector('.ws-modal__video');
      $body.classList.remove('hiden');
      modalVideo.remove();
      overlay.removeEventListener('click', _close);
    }

    overlay.addEventListener('click', _close);
  } // Функция рендера превью


  function _renderBlock(container) {
    var src = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    var alt = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
    var videoImgBlock = "\n\t\t\t<div class=\"ws-modal__wrap\">\n          <div class=\"ws-video__icon\">\n              <svg xmlns=\"http://www.w3.org/2000/svg\" aria-hidden=\"true\" focusable=\"false\" data-prefix=\"fab\" data-icon=\"youtube\" class=\"svg-inline--fa fa-youtube fa-w-18\" role=\"img\" viewBox=\"0 0 576 512\">\n                  <path fill=\"currentColor\" d=\"M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z\" /></svg>\n              <img src=\"http://img.youtube.com/vi/".concat(id || '', "/hqdefault.jpg\" alt=\"").concat(alt || '', "\" class=\"ws-video__img\">\n          </div>\n      </div>\n\t  ");
    var div = document.createElement('div');
    div.className = "ws-modal__wrap";
    div.innerHTML = "".concat(videoImgBlock);
    container.prepend(div);
  } // Функция рендера модального окна
  // Проверяем не пуст ли массив и запускаем рендер


  if (options.langth !== 0) {
    // Навешиваем события клика на превью
    var _eventClick = function _eventClick() {
      var blockEvent = document.querySelectorAll('.ws-video__icon');
      blockEvent.forEach(function (item) {
        item.addEventListener('click', function () {
          // console.log()
          _renderModal();
        });
      });
    };

    // const container = document.querySelector(options.container);
    for (var i = 0; i < options.length; i++) {
      var container = document.querySelector(opnions[i].container);

      if (!container) {
        return '';
      }

      widthVideo = opnions[i].widthVideo;
      heightVideo = opnions[i].widthVideo;

      _renderBlock(container, opnions[i].src, opnions[i].alt);
    }

    _eventClick();
  }
}

wsVideoModalInit(options = [{
  container: '.slide-video',
  src: 'efwL2aV54sY',
  alt: 'video alt',
  widthVideo: '870px',
  heightVideo: '500px',
  title: 'Title',
  decription: 'Text Text Text Text Text Text Text Text Text Text Text Text'
}]);
},{}],"C:/Users/kaiot/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49872" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["C:/Users/kaiot/AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/index.js"], null)
//# sourceMappingURL=/js.00a46daa.js.map