/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _navigator = __webpack_require__(1);

$.fn.tabNav = function (options) {
	this.each(function () {
		this._navigator = new _navigator.Navigator($(this));
	});
};

$(document).ready(function () {
	$('[data-tabnav]').tabNav();
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Navigator = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _tab = __webpack_require__(2);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Navigator = exports.Navigator = function () {
	function Navigator($source) {
		_classCallCheck(this, Navigator);

		this.$source = $source;
		this.list = [];
		this.active = 0;
		this._create();
	}

	_createClass(Navigator, [{
		key: "_create",
		value: function _create() {
			var self = this,
			    count = 0,
			    active = parseInt(this.$source.attr("data-active")) || 0,
			    list = this.$source.find(">div");

			this.$source.addClass("tabnav-wrapper");
			this.$buttonCont = $("<div class='button-wrapper'></div>");
			this.$tabsCont = $("<div class='tabs-wrapper'></div>");
			this.$source.prepend(this.$buttonCont);
			this.$source.append(this.$tabsCont.append(list));

			list.each(function () {

				var $element = $(this),
				    num = count++,
				    activeSelf = $element.attr("data-active");

				activeSelf && !active ? (active = num, activeSelf = true) : activeSelf = false;

				var tab = new _tab.Tab({
					$element: $(this),
					container: self.$buttonCont,
					active: activeSelf,
					number: num,
					onClick: function onClick(index) {
						self.show(index);
					}
				});

				self.list.push(tab);
			});

			this.show(active);
		}
	}, {
		key: "show",
		value: function show(index) {
			this._hideAll();
			this.list[index].show();
			this.active = index;
		}
	}, {
		key: "_hideAll",
		value: function _hideAll() {
			this.list.forEach(function (item) {
				item.hide();
			});
		}
	}]);

	return Navigator;
}();

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Tab = exports.Tab = function () {
	function Tab(options) {
		_classCallCheck(this, Tab);

		var self = this;

		this.$element = options.$element;
		this.active = options.active || false;
		this.number = options.number;
		this.title = options.$element.attr("data-title") || "Tab title - " + options.number;
		this.onClick = options.onClick;

		this.$button = $("<a class='button'>" + this.title + "</a>");
		options.container.append(this.$button);

		this.$button.click(function () {
			if (!self.active) self.onClick(self.number);
		});
	}

	_createClass(Tab, [{
		key: "show",
		value: function show() {
			this.$element.show();
			this.active = true;
			this.$button.addClass("active");
		}
	}, {
		key: "hide",
		value: function hide() {
			this.$element.hide();
			this.active = false;
			this.$button.removeClass("active");
		}
	}]);

	return Tab;
}();

/***/ })
/******/ ]);