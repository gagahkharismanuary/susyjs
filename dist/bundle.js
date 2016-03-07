/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(1);


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	__webpack_require__(2);

	__webpack_require__(26);

	__webpack_require__(28);

	__webpack_require__(29);

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.oppositePosition = exports.rem = exports.convertLength = exports.unitSpliter = undefined;

	var _expect = __webpack_require__(3);

	var _expect2 = _interopRequireDefault(_expect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// Return a the unit from given string containing value and unit.
	//
	// string     : a string with value and unit

	var unitSpliter = exports.unitSpliter = function unitSpliter(string) {
		var unit = string.match(/[a-zA-Z%]+/g);
		return unit[0];
	};

	//console.log(unitSpliter("2em") === unitSpliter("3em") ? true : false);

	var convertLength = exports.convertLength = function convertLength(length, toUnit) {
		var fromContext = arguments.length <= 2 || arguments[2] === undefined ? "16px" : arguments[2];
		var toContext = arguments.length <= 3 || arguments[3] === undefined ? fromContext : arguments[3];


		var fromUnit = unitSpliter(length);

		if (fromUnit === toUnit) {

			return length;
		}

		if (unitSpliter(fromContext) !== "px") {

			console.warn("Parameter fromContext must resolve to a value in pixel units.");
		}

		if (unitSpliter(toContext) !== "px") {

			console.warn("Parameter toContext must resolve to a value in pixel units.");
		}

		var pxLength = length;

		if (fromUnit !== "px") {

			switch (fromUnit) {
				case "em":
					pxLength = parseFloat(length, 10) * parseFloat(fromContext, 10) + "px";
					break;
				case "rem":
					pxLength = parseFloat(length, 10) * parseFloat(fromContext, 10) + "px";
					break;
				case "%":
					pxLength = parseFloat(length, 10) * parseFloat(fromContext, 10) + "px";
					break;

			}
		}

		var outputLength = pxLength;

		if (toUnit !== "px") {

			switch (toUnit) {
				case "em":
					outputLength = parseFloat(pxLength, 10) / parseFloat(toContext) + "em";
					break;
				case "rem":
					outputLength = parseFloat(pxLength, 10) / parseFloat(toContext) + "rem";
					break;
				case "%":
					outputLength = parseFloat(pxLength, 10) / parseFloat(toContext) + "%";
					break;

			}
		}

		return outputLength;
	};

	var rem = exports.rem = function rem(property, value) {

		var unit = unitSpliter(value);

		var val = {};
		val[property] = value;

		if (unit === "px" || unit === "em" || unit === "rem" || unit === "%") {
			val[property] = convertLength(value, "rem");
			return val;
		}
		return val;
	};

	// expect(rem("width", "5%")).toEqual({width: "5rem"});
	// console.log("rem passed");

	var oppositePosition = exports.oppositePosition = function oppositePosition(position) {
		switch (position) {
			case "left":
				return "right";
			case "right":
				return "left";
		}
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Expectation = __webpack_require__(4);

	var _Expectation2 = _interopRequireDefault(_Expectation);

	var _SpyUtils = __webpack_require__(23);

	var _assert = __webpack_require__(21);

	var _assert2 = _interopRequireDefault(_assert);

	var _extend = __webpack_require__(25);

	var _extend2 = _interopRequireDefault(_extend);

	function expect(actual) {
	  return new _Expectation2['default'](actual);
	}

	expect.createSpy = _SpyUtils.createSpy;
	expect.spyOn = _SpyUtils.spyOn;
	expect.isSpy = _SpyUtils.isSpy;
	expect.restoreSpies = _SpyUtils.restoreSpies;
	expect.assert = _assert2['default'];
	expect.extend = _extend2['default'];

	exports['default'] = expect;
	module.exports = exports['default'];

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	var _isEqual = __webpack_require__(5);

	var _isEqual2 = _interopRequireDefault(_isEqual);

	var _isRegex = __webpack_require__(16);

	var _isRegex2 = _interopRequireDefault(_isRegex);

	var _assert = __webpack_require__(21);

	var _assert2 = _interopRequireDefault(_assert);

	var _SpyUtils = __webpack_require__(23);

	var _TestUtils = __webpack_require__(24);

	/**
	 * An Expectation is a wrapper around an assertion that allows it to be written
	 * in a more natural style, without the need to remember the order of arguments.
	 * This helps prevent you from making mistakes when writing tests.
	 */

	var Expectation = (function () {
	  function Expectation(actual) {
	    _classCallCheck(this, Expectation);

	    this.actual = actual;

	    if (_TestUtils.isFunction(actual)) {
	      this.context = null;
	      this.args = [];
	    }
	  }

	  Expectation.prototype.toExist = function toExist(message) {
	    _assert2['default'](this.actual, message || 'Expected %s to exist', this.actual);

	    return this;
	  };

	  Expectation.prototype.toNotExist = function toNotExist(message) {
	    _assert2['default'](!this.actual, message || 'Expected %s to not exist', this.actual);

	    return this;
	  };

	  Expectation.prototype.toBe = function toBe(value, message) {
	    _assert2['default'](this.actual === value, message || 'Expected %s to be %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toNotBe = function toNotBe(value, message) {
	    _assert2['default'](this.actual !== value, message || 'Expected %s to not be %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toEqual = function toEqual(value, message) {
	    try {
	      _assert2['default'](_isEqual2['default'](this.actual, value), message || 'Expected %s to equal %s', this.actual, value);
	    } catch (e) {
	      // These attributes are consumed by Mocha to produce a diff output.
	      e.showDiff = true;
	      e.actual = this.actual;
	      e.expected = value;
	      throw e;
	    }

	    return this;
	  };

	  Expectation.prototype.toNotEqual = function toNotEqual(value, message) {
	    _assert2['default'](!_isEqual2['default'](this.actual, value), message || 'Expected %s to not equal %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toThrow = function toThrow(value, message) {
	    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).toThrow() must be a function, %s was given', this.actual);

	    _assert2['default'](_TestUtils.functionThrows(this.actual, this.context, this.args, value), message || 'Expected %s to throw %s', this.actual, value || 'an error');

	    return this;
	  };

	  Expectation.prototype.toNotThrow = function toNotThrow(value, message) {
	    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).toNotThrow() must be a function, %s was given', this.actual);

	    _assert2['default'](!_TestUtils.functionThrows(this.actual, this.context, this.args, value), message || 'Expected %s to not throw %s', this.actual, value || 'an error');

	    return this;
	  };

	  Expectation.prototype.toBeA = function toBeA(value, message) {
	    _assert2['default'](_TestUtils.isFunction(value) || typeof value === 'string', 'The "value" argument in toBeA(value) must be a function or a string');

	    _assert2['default'](_TestUtils.isA(this.actual, value), message || 'Expected %s to be a %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toNotBeA = function toNotBeA(value, message) {
	    _assert2['default'](_TestUtils.isFunction(value) || typeof value === 'string', 'The "value" argument in toNotBeA(value) must be a function or a string');

	    _assert2['default'](!_TestUtils.isA(this.actual, value), message || 'Expected %s to be a %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toMatch = function toMatch(pattern, message) {
	    _assert2['default'](typeof this.actual === 'string', 'The "actual" argument in expect(actual).toMatch() must be a string');

	    _assert2['default'](_isRegex2['default'](pattern), 'The "value" argument in toMatch(value) must be a RegExp');

	    _assert2['default'](pattern.test(this.actual), message || 'Expected %s to match %s', this.actual, pattern);

	    return this;
	  };

	  Expectation.prototype.toNotMatch = function toNotMatch(pattern, message) {
	    _assert2['default'](typeof this.actual === 'string', 'The "actual" argument in expect(actual).toNotMatch() must be a string');

	    _assert2['default'](_isRegex2['default'](pattern), 'The "value" argument in toNotMatch(value) must be a RegExp');

	    _assert2['default'](!pattern.test(this.actual), message || 'Expected %s to not match %s', this.actual, pattern);

	    return this;
	  };

	  Expectation.prototype.toBeLessThan = function toBeLessThan(value, message) {
	    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeLessThan() must be a number');

	    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeLessThan(value) must be a number');

	    _assert2['default'](this.actual < value, message || 'Expected %s to be less than %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toBeLessThanOrEqualTo = function toBeLessThanOrEqualTo(value, message) {
	    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeLessThanOrEqualTo() must be a number');

	    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeLessThanOrEqualTo(value) must be a number');

	    _assert2['default'](this.actual <= value, message || 'Expected %s to be less than or equal to %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toBeGreaterThan = function toBeGreaterThan(value, message) {
	    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeGreaterThan() must be a number');

	    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeGreaterThan(value) must be a number');

	    _assert2['default'](this.actual > value, message || 'Expected %s to be greater than %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toBeGreaterThanOrEqualTo = function toBeGreaterThanOrEqualTo(value, message) {
	    _assert2['default'](typeof this.actual === 'number', 'The "actual" argument in expect(actual).toBeGreaterThanOrEqualTo() must be a number');

	    _assert2['default'](typeof value === 'number', 'The "value" argument in toBeGreaterThanOrEqualTo(value) must be a number');

	    _assert2['default'](this.actual >= value, message || 'Expected %s to be greater than or equal to %s', this.actual, value);

	    return this;
	  };

	  Expectation.prototype.toInclude = function toInclude(value, compareValues, message) {
	    _assert2['default'](_TestUtils.isArray(this.actual) || typeof this.actual === 'string', 'The "actual" argument in expect(actual).toInclude() must be an array or a string');

	    if (typeof compareValues === 'string') {
	      message = compareValues;
	      compareValues = null;
	    }

	    message = message || 'Expected %s to include %s';

	    if (_TestUtils.isArray(this.actual)) {
	      _assert2['default'](_TestUtils.arrayContains(this.actual, value, compareValues), message, this.actual, value);
	    } else {
	      _assert2['default'](_TestUtils.stringContains(this.actual, value), message, this.actual, value);
	    }

	    return this;
	  };

	  Expectation.prototype.toExclude = function toExclude(value, compareValues, message) {
	    _assert2['default'](_TestUtils.isArray(this.actual) || typeof this.actual === 'string', 'The "actual" argument in expect(actual).toExclude() must be an array or a string');

	    if (typeof compareValues === 'string') {
	      message = compareValues;
	      compareValues = null;
	    }

	    message = message || 'Expected %s to exclude %s';

	    if (_TestUtils.isArray(this.actual)) {
	      _assert2['default'](!_TestUtils.arrayContains(this.actual, value, compareValues), message, this.actual, value);
	    } else {
	      _assert2['default'](!_TestUtils.stringContains(this.actual, value), message, this.actual, value);
	    }

	    return this;
	  };

	  Expectation.prototype.toHaveBeenCalled = function toHaveBeenCalled(message) {
	    var spy = this.actual;

	    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toHaveBeenCalled() must be a spy');

	    _assert2['default'](spy.calls.length > 0, message || 'spy was not called');

	    return this;
	  };

	  Expectation.prototype.toHaveBeenCalledWith = function toHaveBeenCalledWith() {
	    var spy = this.actual;

	    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toHaveBeenCalledWith() must be a spy');

	    var expectedArgs = Array.prototype.slice.call(arguments, 0);

	    _assert2['default'](spy.calls.some(function (call) {
	      return _isEqual2['default'](call.arguments, expectedArgs);
	    }), 'spy was never called with %s', expectedArgs);

	    return this;
	  };

	  Expectation.prototype.toNotHaveBeenCalled = function toNotHaveBeenCalled(message) {
	    var spy = this.actual;

	    _assert2['default'](_SpyUtils.isSpy(spy), 'The "actual" argument in expect(actual).toNotHaveBeenCalled() must be a spy');

	    _assert2['default'](spy.calls.length === 0, message || 'spy was not supposed to be called');

	    return this;
	  };

	  Expectation.prototype.withContext = function withContext(context) {
	    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).withContext() must be a function');

	    this.context = context;

	    return this;
	  };

	  Expectation.prototype.withArgs = function withArgs() {
	    _assert2['default'](_TestUtils.isFunction(this.actual), 'The "actual" argument in expect(actual).withArgs() must be a function');

	    if (arguments.length) this.args = this.args.concat(Array.prototype.slice.call(arguments, 0));

	    return this;
	  };

	  return Expectation;
	})();

	var aliases = {
	  toBeAn: 'toBeA',
	  toNotBeAn: 'toNotBeA',
	  toBeTruthy: 'toExist',
	  toBeFalsy: 'toNotExist',
	  toBeFewerThan: 'toBeLessThan',
	  toBeMoreThan: 'toBeGreaterThan',
	  toContain: 'toInclude',
	  toNotContain: 'toExclude'
	};

	for (var alias in aliases) {
	  Expectation.prototype[alias] = Expectation.prototype[aliases[alias]];
	}exports['default'] = Expectation;
	module.exports = exports['default'];

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var whyNotEqual = __webpack_require__(6);

	module.exports = function isEqual(value, other) {
		return whyNotEqual(value, other) === '';
	};


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var ObjectPrototype = Object.prototype;
	var toStr = ObjectPrototype.toString;
	var booleanValue = Boolean.prototype.valueOf;
	var has = __webpack_require__(7);
	var isArrowFunction = __webpack_require__(10);
	var isBoolean = __webpack_require__(12);
	var isDate = __webpack_require__(13);
	var isGenerator = __webpack_require__(14);
	var isNumber = __webpack_require__(15);
	var isRegex = __webpack_require__(16);
	var isString = __webpack_require__(17);
	var isSymbol = __webpack_require__(18);
	var isCallable = __webpack_require__(11);

	var isProto = Object.prototype.isPrototypeOf;

	var foo = function foo() {};
	var functionsHaveNames = foo.name === 'foo';

	var symbolValue = typeof Symbol === 'function' ? Symbol.prototype.valueOf : null;
	var symbolIterator = __webpack_require__(19)();

	var collectionsForEach = __webpack_require__(20)();

	var getPrototypeOf = Object.getPrototypeOf;
	if (!getPrototypeOf) {
		/* eslint-disable no-proto */
		if (typeof 'test'.__proto__ === 'object') {
			getPrototypeOf = function (obj) {
				return obj.__proto__;
			};
		} else {
			getPrototypeOf = function (obj) {
				var constructor = obj.constructor,
					oldConstructor;
				if (has(obj, 'constructor')) {
					oldConstructor = constructor;
					if (!(delete obj.constructor)) { // reset constructor
						return null; // can't delete obj.constructor, return null
					}
					constructor = obj.constructor; // get real constructor
					obj.constructor = oldConstructor; // restore constructor
				}
				return constructor ? constructor.prototype : ObjectPrototype; // needed for IE
			};
		}
		/* eslint-enable no-proto */
	}

	var isArray = Array.isArray || function (value) {
		return toStr.call(value) === '[object Array]';
	};

	var normalizeFnWhitespace = function normalizeFnWhitespace(fnStr) {
		// this is needed in IE 9, at least, which has inconsistencies here.
		return fnStr.replace(/^function ?\(/, 'function (').replace('){', ') {');
	};

	var tryMapSetEntries = function tryMapSetEntries(collection) {
		var foundEntries = [];
		try {
			collectionsForEach.Map.call(collection, function (key, value) {
				foundEntries.push([key, value]);
			});
		} catch (notMap) {
			try {
				collectionsForEach.Set.call(collection, function (value) {
					foundEntries.push([value]);
				});
			} catch (notSet) {
				return false;
			}
		}
		return foundEntries;
	};

	module.exports = function whyNotEqual(value, other) {
		if (value === other) { return ''; }
		if (value == null || other == null) {
			return value === other ? '' : String(value) + ' !== ' + String(other);
		}

		var valToStr = toStr.call(value);
		var otherToStr = toStr.call(value);
		if (valToStr !== otherToStr) {
			return 'toStringTag is not the same: ' + valToStr + ' !== ' + otherToStr;
		}

		var valIsBool = isBoolean(value);
		var otherIsBool = isBoolean(other);
		if (valIsBool || otherIsBool) {
			if (!valIsBool) { return 'first argument is not a boolean; second argument is'; }
			if (!otherIsBool) { return 'second argument is not a boolean; first argument is'; }
			var valBoolVal = booleanValue.call(value);
			var otherBoolVal = booleanValue.call(other);
			if (valBoolVal === otherBoolVal) { return ''; }
			return 'primitive value of boolean arguments do not match: ' + valBoolVal + ' !== ' + otherBoolVal;
		}

		var valIsNumber = isNumber(value);
		var otherIsNumber = isNumber(value);
		if (valIsNumber || otherIsNumber) {
			if (!valIsNumber) { return 'first argument is not a number; second argument is'; }
			if (!otherIsNumber) { return 'second argument is not a number; first argument is'; }
			var valNum = Number(value);
			var otherNum = Number(other);
			if (valNum === otherNum) { return ''; }
			var valIsNaN = isNaN(value);
			var otherIsNaN = isNaN(other);
			if (valIsNaN && !otherIsNaN) {
				return 'first argument is NaN; second is not';
			} else if (!valIsNaN && otherIsNaN) {
				return 'second argument is NaN; first is not';
			} else if (valIsNaN && otherIsNaN) {
				return '';
			}
			return 'numbers are different: ' + value + ' !== ' + other;
		}

		var valIsString = isString(value);
		var otherIsString = isString(other);
		if (valIsString || otherIsString) {
			if (!valIsString) { return 'second argument is string; first is not'; }
			if (!otherIsString) { return 'first argument is string; second is not'; }
			var stringVal = String(value);
			var otherVal = String(other);
			if (stringVal === otherVal) { return ''; }
			return 'string values are different: "' + stringVal + '" !== "' + otherVal + '"';
		}

		var valIsDate = isDate(value);
		var otherIsDate = isDate(other);
		if (valIsDate || otherIsDate) {
			if (!valIsDate) { return 'second argument is Date, first is not'; }
			if (!otherIsDate) { return 'first argument is Date, second is not'; }
			var valTime = +value;
			var otherTime = +other;
			if (valTime === otherTime) { return ''; }
			return 'Dates have different time values: ' + valTime + ' !== ' + otherTime;
		}

		var valIsRegex = isRegex(value);
		var otherIsRegex = isRegex(other);
		if (valIsRegex || otherIsRegex) {
			if (!valIsRegex) { return 'second argument is RegExp, first is not'; }
			if (!otherIsRegex) { return 'first argument is RegExp, second is not'; }
			var regexStringVal = String(value);
			var regexStringOther = String(other);
			if (regexStringVal === regexStringOther) { return ''; }
			return 'regular expressions differ: ' + regexStringVal + ' !== ' + regexStringOther;
		}

		var valIsArray = isArray(value);
		var otherIsArray = isArray(other);
		if (valIsArray || otherIsArray) {
			if (!valIsArray) { return 'second argument is an Array, first is not'; }
			if (!otherIsArray) { return 'first argument is an Array, second is not'; }
			if (value.length !== other.length) {
				return 'arrays have different length: ' + value.length + ' !== ' + other.length;
			}
			if (String(value) !== String(other)) { return 'stringified Arrays differ'; }

			var index = value.length - 1;
			var equal = '';
			var valHasIndex, otherHasIndex;
			while (equal === '' && index >= 0) {
				valHasIndex = has(value, index);
				otherHasIndex = has(other, index);
				if (!valHasIndex && otherHasIndex) { return 'second argument has index ' + index + '; first does not'; }
				if (valHasIndex && !otherHasIndex) { return 'first argument has index ' + index + '; second does not'; }
				equal = whyNotEqual(value[index], other[index]);
				index -= 1;
			}
			return equal;
		}

		var valueIsSym = isSymbol(value);
		var otherIsSym = isSymbol(other);
		if (valueIsSym !== otherIsSym) {
			if (valueIsSym) { return 'first argument is Symbol; second is not'; }
			return 'second argument is Symbol; first is not';
		}
		if (valueIsSym && otherIsSym) {
			return symbolValue.call(value) === symbolValue.call(other) ? '' : 'first Symbol value !== second Symbol value';
		}

		var valueIsGen = isGenerator(value);
		var otherIsGen = isGenerator(other);
		if (valueIsGen !== otherIsGen) {
			if (valueIsGen) { return 'first argument is a Generator; second is not'; }
			return 'second argument is a Generator; first is not';
		}

		var valueIsArrow = isArrowFunction(value);
		var otherIsArrow = isArrowFunction(other);
		if (valueIsArrow !== otherIsArrow) {
			if (valueIsArrow) { return 'first argument is an Arrow function; second is not'; }
			return 'second argument is an Arrow function; first is not';
		}

		if (isCallable(value) || isCallable(other)) {
			if (functionsHaveNames && whyNotEqual(value.name, other.name) !== '') {
				return 'Function names differ: "' + value.name + '" !== "' + other.name + '"';
			}
			if (whyNotEqual(value.length, other.length) !== '') {
				return 'Function lengths differ: ' + value.length + ' !== ' + other.length;
			}

			var valueStr = normalizeFnWhitespace(String(value));
			var otherStr = normalizeFnWhitespace(String(other));
			if (whyNotEqual(valueStr, otherStr) === '') { return ''; }

			if (!valueIsGen && !valueIsArrow) {
				return whyNotEqual(valueStr.replace(/\)\s*\{/, '){'), otherStr.replace(/\)\s*\{/, '){')) === '' ? '' : 'Function string representations differ';
			}
			return whyNotEqual(valueStr, otherStr) === '' ? '' : 'Function string representations differ';
		}

		if (typeof value === 'object' || typeof other === 'object') {
			if (typeof value !== typeof other) { return 'arguments have a different typeof: ' + typeof value + ' !== ' + typeof other; }
			if (isProto.call(value, other)) { return 'first argument is the [[Prototype]] of the second'; }
			if (isProto.call(other, value)) { return 'second argument is the [[Prototype]] of the first'; }
			if (getPrototypeOf(value) !== getPrototypeOf(other)) { return 'arguments have a different [[Prototype]]'; }

			if (symbolIterator) {
				var valueIteratorFn = value[symbolIterator];
				var valueIsIterable = isCallable(valueIteratorFn);
				var otherIteratorFn = other[symbolIterator];
				var otherIsIterable = isCallable(otherIteratorFn);
				if (valueIsIterable !== otherIsIterable) {
					if (valueIsIterable) { return 'first argument is iterable; second is not'; }
					return 'second argument is iterable; first is not';
				}
				if (valueIsIterable && otherIsIterable) {
					var valueIterator = valueIteratorFn.call(value);
					var otherIterator = otherIteratorFn.call(other);
					var valueNext, otherNext, nextWhy;
					do {
						valueNext = valueIterator.next();
						otherNext = otherIterator.next();
						if (!valueNext.done && !otherNext.done) {
							nextWhy = whyNotEqual(valueNext, otherNext);
							if (nextWhy !== '') {
								return 'iteration results are not equal: ' + nextWhy;
							}
						}
					} while (!valueNext.done && !otherNext.done);
					if (valueNext.done && !otherNext.done) { return 'first argument finished iterating before second'; }
					if (!valueNext.done && otherNext.done) { return 'second argument finished iterating before first'; }
					return '';
				}
			} else if (collectionsForEach.Map || collectionsForEach.Set) {
				var valueEntries = tryMapSetEntries(value);
				var otherEntries = tryMapSetEntries(other);
				var valueEntriesIsArray = isArray(valueEntries);
				var otherEntriesIsArray = isArray(otherEntries);
				if (valueEntriesIsArray && !otherEntriesIsArray) { return 'first argument has Collection entries, second does not'; }
				if (!valueEntriesIsArray && otherEntriesIsArray) { return 'second argument has Collection entries, first does not'; }
				if (valueEntriesIsArray && otherEntriesIsArray) {
					var entriesWhy = whyNotEqual(valueEntries, otherEntries);
					return entriesWhy === '' ? '' : 'Collection entries differ: ' + entriesWhy;
				}
			}

			var key, valueKeyIsRecursive, otherKeyIsRecursive, keyWhy;
			for (key in value) {
				if (has(value, key)) {
					if (!has(other, key)) { return 'first argument has key "' + key + '"; second does not'; }
					valueKeyIsRecursive = value[key] && value[key][key] === value;
					otherKeyIsRecursive = other[key] && other[key][key] === other;
					if (valueKeyIsRecursive !== otherKeyIsRecursive) {
						if (valueKeyIsRecursive) { return 'first argument has a circular reference at key "' + key + '"; second does not'; }
						return 'second argument has a circular reference at key "' + key + '"; second does not';
					}
					if (!valueKeyIsRecursive && !otherKeyIsRecursive) {
						keyWhy = whyNotEqual(value[key], other[key]);
						if (keyWhy !== '') {
							return 'value at key "' + key + '" differs: ' + keyWhy;
						}
					}
				}
			}
			for (key in other) {
				if (has(other, key)) {
					if (!has(value, key)) { return 'second argument has key "' + key + '"; first does not'; }
					valueKeyIsRecursive = value[key] && value[key][key] === value;
					otherKeyIsRecursive = other[key] && other[key][key] === other;
					if (valueKeyIsRecursive !== otherKeyIsRecursive) {
						if (valueKeyIsRecursive) { return 'first argument has a circular reference at key "' + key + '"; second does not'; }
						return 'second argument has a circular reference at key "' + key + '"; second does not';
					}
					if (!valueKeyIsRecursive && !otherKeyIsRecursive) {
						keyWhy = whyNotEqual(other[key], value[key]);
						if (keyWhy !== '') {
							return 'value at key "' + key + '" differs: ' + keyWhy;
						}
					}
				}
			}
			return '';
		}

		return false;
	};


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	var bind = __webpack_require__(8);

	module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	var implementation = __webpack_require__(9);

	module.exports = Function.prototype.bind || implementation;


/***/ },
/* 9 */
/***/ function(module, exports) {

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};


/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isCallable = __webpack_require__(11);
	var fnToStr = Function.prototype.toString;
	var isNonArrowFnRegex = /^\s*function/;
	var isArrowFnWithParensRegex = /^\([^\)]*\) *=>/;
	var isArrowFnWithoutParensRegex = /^[^=]*=>/;

	module.exports = function isArrowFunction(fn) {
		if (!isCallable(fn)) { return false; }
		var fnStr = fnToStr.call(fn);
		return fnStr.length > 0 &&
			!isNonArrowFnRegex.test(fnStr) &&
			(isArrowFnWithParensRegex.test(fnStr) || isArrowFnWithoutParensRegex.test(fnStr));
	};


/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	var fnToStr = Function.prototype.toString;

	var constructorRegex = /\s*class /;
	var isES6ClassFn = function isES6ClassFn(value) {
		try {
			var fnStr = fnToStr.call(value);
			var singleStripped = fnStr.replace(/\/\/.*\n/g, '');
			var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, '');
			var spaceStripped = multiStripped.replace(/\n/mg, ' ').replace(/ {2}/g, ' ');
			return constructorRegex.test(spaceStripped);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionObject(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isCallable(value) {
		if (!value) { return false; }
		if (typeof value !== 'function' && typeof value !== 'object') { return false; }
		if (hasToStringTag) { return tryFunctionObject(value); }
		if (isES6ClassFn(value)) { return false; }
		var strClass = toStr.call(value);
		return strClass === fnClass || strClass === genClass;
	};


/***/ },
/* 12 */
/***/ function(module, exports) {

	'use strict';

	var boolToStr = Boolean.prototype.toString;

	var tryBooleanObject = function tryBooleanObject(value) {
		try {
			boolToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var boolClass = '[object Boolean]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isBoolean(value) {
		if (typeof value === 'boolean') { return true; }
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryBooleanObject(value) : toStr.call(value) === boolClass;
	};


/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	var getDay = Date.prototype.getDay;
	var tryDateObject = function tryDateObject(value) {
		try {
			getDay.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};

	var toStr = Object.prototype.toString;
	var dateClass = '[object Date]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isDateObject(value) {
		if (typeof value !== 'object' || value === null) { return false; }
		return hasToStringTag ? tryDateObject(value) : toStr.call(value) === dateClass;
	};


/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;
	var fnToStr = Function.prototype.toString;
	var isFnRegex = /^\s*function\*/;

	module.exports = function isGeneratorFunction(fn) {
		if (typeof fn !== 'function') { return false; }
		var fnStr = toStr.call(fn);
		return (fnStr === '[object Function]' || fnStr === '[object GeneratorFunction]') && isFnRegex.test(fnToStr.call(fn));
	};



/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	var numToStr = Number.prototype.toString;
	var tryNumberObject = function tryNumberObject(value) {
		try {
			numToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var numClass = '[object Number]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isNumberObject(value) {
		if (typeof value === 'number') { return true; }
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryNumberObject(value) : toStr.call(value) === numClass;
	};


/***/ },
/* 16 */
/***/ function(module, exports) {

	'use strict';

	var regexExec = RegExp.prototype.exec;
	var tryRegexExec = function tryRegexExec(value) {
		try {
			regexExec.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var regexClass = '[object RegExp]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isRegex(value) {
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryRegexExec(value) : toStr.call(value) === regexClass;
	};


/***/ },
/* 17 */
/***/ function(module, exports) {

	'use strict';

	var strValue = String.prototype.valueOf;
	var tryStringObject = function tryStringObject(value) {
		try {
			strValue.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var strClass = '[object String]';
	var hasToStringTag = typeof Symbol === 'function' && typeof Symbol.toStringTag === 'symbol';

	module.exports = function isString(value) {
		if (typeof value === 'string') { return true; }
		if (typeof value !== 'object') { return false; }
		return hasToStringTag ? tryStringObject(value) : toStr.call(value) === strClass;
	};


/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	var toStr = Object.prototype.toString;
	var hasSymbols = typeof Symbol === 'function' && typeof Symbol() === 'symbol';

	if (hasSymbols) {
		var symToStr = Symbol.prototype.toString;
		var symStringRegex = /^Symbol\(.*\)$/;
		var isSymbolObject = function isSymbolObject(value) {
			if (typeof value.valueOf() !== 'symbol') { return false; }
			return symStringRegex.test(symToStr.call(value));
		};
		module.exports = function isSymbol(value) {
			if (typeof value === 'symbol') { return true; }
			if (toStr.call(value) !== '[object Symbol]') { return false; }
			try {
				return isSymbolObject(value);
			} catch (e) {
				return false;
			}
		};
	} else {
		module.exports = function isSymbol(value) {
			// this environment does not support Symbols.
			return false;
		};
	}


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var isSymbol = __webpack_require__(18);

	module.exports = function getSymbolIterator() {
		var symbolIterator = typeof Symbol === 'function' && isSymbol(Symbol.iterator) ? Symbol.iterator : null;

		if (typeof Object.getOwnPropertyNames === 'function' && typeof Map === 'function' && typeof Map.prototype.entries === 'function') {
			Object.getOwnPropertyNames(Map.prototype).forEach(function (name) {
				if (name !== 'entries' && name !== 'size' && Map.prototype[name] === Map.prototype.entries) {
					symbolIterator = name;
				}
			});
		}

		return symbolIterator;
	};


/***/ },
/* 20 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function () {
		var mapForEach = (function () {
			if (typeof Map !== 'function') { return null; }
			try {
				Map.prototype.forEach.call({}, function () {});
			} catch (e) {
				return Map.prototype.forEach;
			}
			return null;
		}());

		var setForEach = (function () {
			if (typeof Set !== 'function') { return null; }
			try {
				Set.prototype.forEach.call({}, function () {});
			} catch (e) {
				return Set.prototype.forEach;
			}
			return null;
		}());

		return { Map: mapForEach, Set: setForEach };
	};


/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _objectInspect = __webpack_require__(22);

	var _objectInspect2 = _interopRequireDefault(_objectInspect);

	function assert(condition, messageFormat) {
	  for (var _len = arguments.length, extraArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	    extraArgs[_key - 2] = arguments[_key];
	  }

	  if (condition) return;

	  var index = 0;

	  throw new Error(messageFormat.replace(/%s/g, function () {
	    return _objectInspect2['default'](extraArgs[index++]);
	  }));
	}

	exports['default'] = assert;
	module.exports = exports['default'];

/***/ },
/* 22 */
/***/ function(module, exports) {

	var hasMap = typeof Map === 'function' && Map.prototype;
	var mapSizeDescriptor = Object.getOwnPropertyDescriptor && hasMap ? Object.getOwnPropertyDescriptor(Map.prototype, 'size') : null;
	var mapSize = hasMap && mapSizeDescriptor && typeof mapSizeDescriptor.get === 'function' ? mapSizeDescriptor.get : null;
	var mapForEach = hasMap && Map.prototype.forEach;
	var hasSet = typeof Set === 'function' && Set.prototype;
	var setSizeDescriptor = Object.getOwnPropertyDescriptor && hasSet ? Object.getOwnPropertyDescriptor(Set.prototype, 'size') : null;
	var setSize = hasSet && setSizeDescriptor && typeof setSizeDescriptor.get === 'function' ? setSizeDescriptor.get : null;
	var setForEach = hasSet && Set.prototype.forEach;

	module.exports = function inspect_ (obj, opts, depth, seen) {
	    if (!opts) opts = {};
	    
	    var maxDepth = opts.depth === undefined ? 5 : opts.depth;
	    if (depth === undefined) depth = 0;
	    if (depth >= maxDepth && maxDepth > 0
	    && obj && typeof obj === 'object') {
	        return '[Object]';
	    }
	    
	    if (seen === undefined) seen = [];
	    else if (indexOf(seen, obj) >= 0) {
	        return '[Circular]';
	    }
	    
	    function inspect (value, from) {
	        if (from) {
	            seen = seen.slice();
	            seen.push(from);
	        }
	        return inspect_(value, opts, depth + 1, seen);
	    }
	    
	    if (typeof obj === 'string') {
	        return inspectString(obj);
	    }
	    else if (typeof obj === 'function') {
	        var name = nameOf(obj);
	        return '[Function' + (name ? ': ' + name : '') + ']';
	    }
	    else if (obj === null) {
	        return 'null';
	    }
	    else if (isSymbol(obj)) {
	        var symString = Symbol.prototype.toString.call(obj);
	        return typeof obj === 'object' ? 'Object(' + symString + ')' : symString;
	    }
	    else if (isElement(obj)) {
	        var s = '<' + String(obj.nodeName).toLowerCase();
	        var attrs = obj.attributes || [];
	        for (var i = 0; i < attrs.length; i++) {
	            s += ' ' + attrs[i].name + '="' + quote(attrs[i].value) + '"';
	        }
	        s += '>';
	        if (obj.childNodes && obj.childNodes.length) s += '...';
	        s += '</' + String(obj.nodeName).toLowerCase() + '>';
	        return s;
	    }
	    else if (isArray(obj)) {
	        if (obj.length === 0) return '[]';
	        var xs = Array(obj.length);
	        for (var i = 0; i < obj.length; i++) {
	            xs[i] = has(obj, i) ? inspect(obj[i], obj) : '';
	        }
	        return '[ ' + xs.join(', ') + ' ]';
	    }
	    else if (isError(obj)) {
	        var parts = [];
	        for (var key in obj) {
	            if (!has(obj, key)) continue;
	            
	            if (/[^\w$]/.test(key)) {
	                parts.push(inspect(key) + ': ' + inspect(obj[key]));
	            }
	            else {
	                parts.push(key + ': ' + inspect(obj[key]));
	            }
	        }
	        if (parts.length === 0) return '[' + obj + ']';
	        return '{ [' + obj + '] ' + parts.join(', ') + ' }';
	    }
	    else if (typeof obj === 'object' && typeof obj.inspect === 'function') {
	        return obj.inspect();
	    }
	    else if (isMap(obj)) {
	        var parts = [];
	        mapForEach.call(obj, function (value, key) {
	            parts.push(inspect(key, obj) + ' => ' + inspect(value, obj));
	        });
	        return 'Map (' + mapSize.call(obj) + ') {' + parts.join(', ') + '}';
	    }
	    else if (isSet(obj)) {
	        var parts = [];
	        setForEach.call(obj, function (value ) {
	            parts.push(inspect(value, obj));
	        });
	        return 'Set (' + setSize.call(obj) + ') {' + parts.join(', ') + '}';
	    }
	    else if (typeof obj === 'object' && !isDate(obj) && !isRegExp(obj)) {
	        var xs = [], keys = [];
	        for (var key in obj) {
	            if (has(obj, key)) keys.push(key);
	        }
	        keys.sort();
	        for (var i = 0; i < keys.length; i++) {
	            var key = keys[i];
	            if (/[^\w$]/.test(key)) {
	                xs.push(inspect(key) + ': ' + inspect(obj[key], obj));
	            }
	            else xs.push(key + ': ' + inspect(obj[key], obj));
	        }
	        if (xs.length === 0) return '{}';
	        return '{ ' + xs.join(', ') + ' }';
	    }
	    else return String(obj);
	};

	function quote (s) {
	    return String(s).replace(/"/g, '&quot;');
	}

	function isArray (obj) { return toStr(obj) === '[object Array]' }
	function isDate (obj) { return toStr(obj) === '[object Date]' }
	function isRegExp (obj) { return toStr(obj) === '[object RegExp]' }
	function isError (obj) { return toStr(obj) === '[object Error]' }
	function isSymbol (obj) { return toStr(obj) === '[object Symbol]' }

	var hasOwn = Object.prototype.hasOwnProperty || function (key) { return key in this; };
	function has (obj, key) {
	    return hasOwn.call(obj, key);
	}

	function toStr (obj) {
	    return Object.prototype.toString.call(obj);
	}

	function nameOf (f) {
	    if (f.name) return f.name;
	    var m = f.toString().match(/^function\s*([\w$]+)/);
	    if (m) return m[1];
	}

	function indexOf (xs, x) {
	    if (xs.indexOf) return xs.indexOf(x);
	    for (var i = 0, l = xs.length; i < l; i++) {
	        if (xs[i] === x) return i;
	    }
	    return -1;
	}

	function isMap (x) {
	    if (!mapSize) {
	        return false;
	    }
	    try {
	        mapSize.call(x);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isSet (x) {
	    if (!setSize) {
	        return false;
	    }
	    try {
	        setSize.call(x);
	        return true;
	    } catch (e) {}
	    return false;
	}

	function isElement (x) {
	    if (!x || typeof x !== 'object') return false;
	    if (typeof HTMLElement !== 'undefined' && x instanceof HTMLElement) {
	        return true;
	    }
	    return typeof x.nodeName === 'string'
	        && typeof x.getAttribute === 'function'
	    ;
	}

	function inspectString (str) {
	    var s = str.replace(/(['\\])/g, '\\$1').replace(/[\x00-\x1f]/g, lowbyte);
	    return "'" + s + "'";
	    
	    function lowbyte (c) {
	        var n = c.charCodeAt(0);
	        var x = { 8: 'b', 9: 't', 10: 'n', 12: 'f', 13: 'r' }[n];
	        if (x) return '\\' + x;
	        return '\\x' + (n < 0x10 ? '0' : '') + n.toString(16);
	    }
	}


/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.createSpy = createSpy;
	exports.spyOn = spyOn;
	exports.isSpy = isSpy;
	exports.restoreSpies = restoreSpies;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _assert = __webpack_require__(21);

	var _assert2 = _interopRequireDefault(_assert);

	var _TestUtils = __webpack_require__(24);

	function noop() {}

	var spies = [];

	function createSpy(fn) {
	  var restore = arguments.length <= 1 || arguments[1] === undefined ? noop : arguments[1];

	  if (fn == null) fn = noop;

	  _assert2['default'](_TestUtils.isFunction(fn), 'createSpy needs a function');

	  var targetFn = undefined,
	      thrownValue = undefined,
	      returnValue = undefined;

	  var spy = function spy() {
	    spy.calls.push({
	      context: this,
	      arguments: Array.prototype.slice.call(arguments, 0)
	    });

	    if (targetFn) return targetFn.apply(this, arguments);

	    if (thrownValue) throw thrownValue;

	    return returnValue;
	  };

	  spy.calls = [];

	  spy.andCall = function (fn) {
	    targetFn = fn;
	    return spy;
	  };

	  spy.andCallThrough = function () {
	    return spy.andCall(fn);
	  };

	  spy.andThrow = function (object) {
	    thrownValue = object;
	    return spy;
	  };

	  spy.andReturn = function (value) {
	    returnValue = value;
	    return spy;
	  };

	  spy.getLastCall = function () {
	    return spy.calls[spy.calls.length - 1];
	  };

	  spy.reset = function () {
	    spy.calls = [];
	  };

	  spy.restore = spy.destroy = restore;

	  spy.__isSpy = true;

	  spies.push(spy);

	  return spy;
	}

	function spyOn(object, methodName) {
	  var original = object[methodName];

	  if (!isSpy(original)) {
	    _assert2['default'](_TestUtils.isFunction(original), 'Cannot spyOn the %s property; it is not a function', methodName);

	    object[methodName] = createSpy(original, function () {
	      object[methodName] = original;
	    });
	  }

	  return object[methodName];
	}

	function isSpy(object) {
	  return object && object.__isSpy === true;
	}

	function restoreSpies() {
	  for (var i = spies.length - 1; i >= 0; i--) {
	    spies[i].restore();
	  }spies = [];
	}

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.functionThrows = functionThrows;
	exports.arrayContains = arrayContains;
	exports.stringContains = stringContains;
	exports.isArray = isArray;
	exports.isFunction = isFunction;
	exports.isA = isA;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _isEqual = __webpack_require__(5);

	var _isEqual2 = _interopRequireDefault(_isEqual);

	var _isRegex = __webpack_require__(16);

	var _isRegex2 = _interopRequireDefault(_isRegex);

	/**
	 * Returns true if the given function throws the given value
	 * when invoked. The value may be:
	 *
	 * - undefined, to merely assert there was a throw
	 * - a constructor function, for comparing using instanceof
	 * - a regular expression, to compare with the error message
	 * - a string, to find in the error message
	 */

	function functionThrows(fn, context, args, value) {
	  try {
	    fn.apply(context, args);
	  } catch (error) {
	    if (value == null) return true;

	    if (isFunction(value) && error instanceof value) return true;

	    var message = error.message || error;

	    if (typeof message === 'string') {
	      if (_isRegex2['default'](value) && value.test(error.message)) return true;

	      if (typeof value === 'string' && message.indexOf(value) !== -1) return true;
	    }
	  }

	  return false;
	}

	/**
	 * Returns true if the given array contains the value, false
	 * otherwise. The compareValues function must return false to
	 * indicate a non-match.
	 */

	function arrayContains(array, value, compareValues) {
	  if (compareValues == null) compareValues = _isEqual2['default'];

	  return array.some(function (item) {
	    return compareValues(item, value) !== false;
	  });
	}

	/**
	 * Returns true if the given string contains the value, false otherwise.
	 */

	function stringContains(string, value) {
	  return string.indexOf(value) !== -1;
	}

	/**
	 * Returns true if the given object is an array.
	 */

	function isArray(object) {
	  return Array.isArray(object);
	}

	/**
	 * Returns true if the given object is a function.
	 */

	function isFunction(object) {
	  return typeof object === 'function';
	}

	/**
	 * Returns true if the given object is an instanceof value
	 * or its typeof is the given value.
	 */

	function isA(object, value) {
	  if (isFunction(value)) return object instanceof value;

	  if (value === 'array') return Array.isArray(object);

	  return typeof object === value;
	}

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Expectation = __webpack_require__(4);

	var _Expectation2 = _interopRequireDefault(_Expectation);

	var Extensions = [];

	function extend(extension) {
	  if (Extensions.indexOf(extension) === -1) {
	    Extensions.push(extension);

	    for (var p in extension) {
	      if (extension.hasOwnProperty(p)) _Expectation2['default'].prototype[p] = extension[p];
	    }
	  }
	}

	exports['default'] = extend;
	module.exports = exports['default'];

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.isDefaultLayout = exports.getLayout = exports.mediaLayout = exports.fixEms = exports.absoluteEms = exports.baseEms = exports.formatNth = exports.splitColumnsValue = exports.space = exports.gutter = exports.columns = exports.column = exports.relativeWidth = exports.columnsWidth = exports.fixStaticMisalignment = exports.containerOuterWidth = exports.handleGridPadding = exports.unitSpliter = exports.unitParse = exports.percentage = exports.filter = undefined;

	var _settings = __webpack_require__(27);

	var _expect = __webpack_require__(3);

	var _expect2 = _interopRequireDefault(_expect);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// ---------------------------------------------------------

	// Imports

	// We need access to some basic font-settings for handling media-queries.

	// ...... ?? need verticalRhythm ??

	// For now, we alson need this...

	var browserDefaultFontSizePX = "16px";
	var browserDefaultFontSizePercent = "100%";
	var browserDefaultFontSizePT = "12pt";

	var remWithPXFallback = true;

	// ---------------------------------------------------------
	// Import Settings

	// Return a list with specific items removed
	//
	// filter(list, target)
	// - list    : The list Array to filter
	// - target  : An item to be removed from the list Array.

	var filter = exports.filter = function filter(list, target) {

		return list.filter(function (i) {
			return i !== target;
		});
	};

	//expect(filter(["a", "b", "c"], "b")).toEqual(["a", "c"], "filter function");
	// console.log('filter passed');

	var percentage = exports.percentage = function percentage(val) {
		return val + "%";
	};

	// expect(percentage(7)).toEqual("7%");
	// console.log("percentage passed");

	// Return a the unit from given string containing value and unit.
	//
	// string     : a string with value and unit

	var unitParse = exports.unitParse = function unitParse(string, unit) {
		var rgxp = new RegExp(unit, "g");
		return string.match(rgxp);
	};

	// expect(unitParse("1px", "px")).toEqual(["px"]);
	// console.log("test passed");

	var unitSpliter = exports.unitSpliter = function unitSpliter(string) {
		var unit = string.match(/[a-zA-Z%]+/g);
		return unit[0];
	};

	//console.log(unitSpliter("2em") === unitSpliter("3em") ? true : false);

	// --------------------------------------------------------
	// -----------------------------------------------------------
	// Grid Functions

	// Return the grid width after adding or subtracting grid padding
	//
	// width       : the width of the grid without padding;
	//operation    : ( add | subtract ) if padding should be added or subtracted;

	var handleGridPadding = exports.handleGridPadding = function handleGridPadding(width) {
		var operation = arguments.length <= 1 || arguments[1] === undefined ? "subtract" : arguments[1];


		var unit = unitSpliter(width);

		var _width = parseFloat(width, 10);

		var pad = parseFloat(_settings.gridPadding, 10) * 2;

		if (unitSpliter(width) === unitSpliter(_settings.gridPadding)) {
			return operation === "subtract" ? "" + (_width - pad) + unit : "" + (_width + pad) + unit;
		} else {
			console.warn("_gridPadding must be set in units comperable to the container width.");
		}
	};

	// expect(handleGridPadding("31em", "subtract")).toEqual("29em", "handle grid padding");
	// console.log('handleGridPadding passed');

	// Return the full outer width of a Container element.
	//
	// columns    : The number of columns in the grid Layout.
	// width      : containerWidth

	var containerOuterWidth = exports.containerOuterWidth = function containerOuterWidth() {
		var columns = arguments.length <= 0 || arguments[0] === undefined ? _settings.totalColumns : arguments[0];
		var width = arguments.length <= 1 || arguments[1] === undefined ? _settings.containerWidth : arguments[1];


		var _width = parseFloat(width, 10);

		var outerWidth = width ? width : columnsWidth(columns);
		if (width) {
			if (!_settings.borderBoxSizing) {
				outerWidth = handleGridPadding(outerWidth, "subtract");
			}
		} else {
			if (_settings.borderBoxSizing) {
				outerWidth = handleGridPadding(outerWidth, "add");
			}
		}

		return outerWidth;
	};

	// expect(containerOuterWidth(12, "90em")).toEqual("88em", "container outer width");
	// console.log("containerOuterWidth passed");

	// Don't use static output when it will break things

	// Switch element-level output to fluid, when container-width is wrong for static
	//
	// fixStaticMisalignment(style, width)
	// - style: containerStyle.
	// - width: containerWidth.

	var fixStaticMisalignment = exports.fixStaticMisalignment = function fixStaticMisalignment() {
		var style = arguments.length <= 0 || arguments[0] === undefined ? _settings.containerStyle : arguments[0];
		var width = arguments.length <= 1 || arguments[1] === undefined ? _settings.containerWidth : arguments[1];


		if (width && width != containerOuterWidth(false)) {
			return "fluid";
		} else {

			return style;
		}
	};

	// expect(fixStaticMisalignment("static", "80em")).toEqual("fluid", "fix static misalignment");
	// console.log('fixStaticMisalignment passed');

	// Return the full width of a grid based on your grid settings.
	//
	// columns : The number of columns to get width for.

	var columnsWidth = exports.columnsWidth = function columnsWidth() {
		var columns = arguments.length <= 0 || arguments[0] === undefined ? _settings.totalColumns : arguments[0];


		var unit = unitSpliter(_settings.columnWidth);

		var _columnWidth = parseFloat(_settings.columnWidth);

		var totalWidthOfColumns = columns * _columnWidth;
		var totalGutterWidth = (columns >= 1 ? Math.ceil(columns - 1) : 0) * parseFloat(_settings.gutterWidth, 10);
		var total = totalWidthOfColumns + totalGutterWidth;

		if (Math.round(columns) !== columns) {
			console.warn("Susy.js works best with integer column-spans. For partial-columns, you may need to finesse the math by hand using functions directly.");
		} else {

			return "" + total + unit;
		}
	};

	// expect(columnsWidth()).toEqual("59em", "columns Width");
	// console.log('columnsWidth passed');

	// Return the percentage width of a given value in a given 'context'.
	//
	// width         : Any given width value.
	// context       : The grid context in columns, if nested.

	var relativeWidth = exports.relativeWidth = function relativeWidth(width) {
		var context = arguments.length <= 1 || arguments[1] === undefined ? _settings.totalColumns : arguments[1];


		return percentage(Math.floor(parseFloat(width, 10) / parseFloat(columnsWidth(context)) * 100));
	};

	// expect(relativeWidth(12)).toEqual("20%", "relativeWidth");
	// console.log("relativeWidth passed");

	// Return the percentage width of a single column in a given 'context'
	//
	// context     : The grid context in columns, if nested.
	// style       : The container style to use.

	var column = exports.column = function column() {
		var context = arguments.length <= 0 || arguments[0] === undefined ? _settings.totalColumns : arguments[0];
		var style = arguments.length <= 1 || arguments[1] === undefined ? fixStaticMisalignment() : arguments[1];


		return style === "static" ? _settings.columnWidth : relativeWidth(_settings.columnWidth, context);
	};

	// expect(column(12, "static")).toEqual("4em", "column");
	// console.log("column passed");

	// Return the percentage width of multiple 'columns' in a given 'context'.
	//
	// columns      : The number of columns to get relative width for.
	// context      : The grid context in columns, if nested.
	// style        : The container style to use.

	var columns = exports.columns = function columns(_columns) {
		var context = arguments.length <= 1 || arguments[1] === undefined ? _settings.totalColumns : arguments[1];
		var style = arguments.length <= 2 || arguments[2] === undefined ? fixStaticMisalignment() : arguments[2];


		return style === "static" ? columnsWidth(_columns) : relativeWidth(columnsWidth(_columns), context);
	};

	// expect(columns(12, 12, "static")).toEqual("59em", "columns");
	// console.log("columns passed");

	// Return the percentage width of a single gutter in a given 'context'.
	//
	// context       : The grid context in columns, if nested.
	// style         : The container style to use.

	var gutter = exports.gutter = function gutter() {
		var context = arguments.length <= 0 || arguments[0] === undefined ? _settings.totalColumns : arguments[0];
		var style = arguments.length <= 1 || arguments[1] === undefined ? fixStaticMisalignment() : arguments[1];


		var _gutterWidth = parseFloat(_settings.gutterWidth, 10);

		return style === "static" ? _settings.gutterWidth : relativeWidth(_gutterWidth, context);
	};

	// expect(gutter(12,"magic")).toEqual("1%", "gutter");
	// console.log("gutter passed");

	// Return the total space occupied by multiple columns and associated gutters.
	// Useful for adding padding or margins (prefix, suffix, push, pull, etc.)
	//
	// columns        : The number of columns to get relative space for.
	// context        : The grid context in columns, if nested.
	// style          : The container style to use.

	var space = exports.space = function space(column) {
		var context = arguments.length <= 1 || arguments[1] === undefined ? _settings.totalColumns : arguments[1];
		var style = arguments.length <= 2 || arguments[2] === undefined ? fixStaticMisalignment() : arguments[2];


		var unit = unitSpliter(columns(column, context, style));

		var widthColumns = parseFloat(columns(column, context, style), 10);
		var widthGutter = column >= 1 ? parseFloat(gutter(context, style), 10) : 0;

		var total = widthColumns + widthGutter;

		return "" + total + unit;
	};

	// expect(space(12, 12, "static")).toEqual("60em", "space");
	// console.log("space passed");

	// Accept a list including column-count and (optional) position.
	// Return either the column count or the position alone.
	//
	// columns       : the list to split and interprate.
	// request       : The value to return, either 'columns' or 'position'.

	var splitColumnsValue = exports.splitColumnsValue = function splitColumnsValue(columns) {
		var request = arguments.length <= 1 || arguments[1] === undefined ? "columns" : arguments[1];
	};

	// Accept nth-selector variables, and format them as a valid CSS3 selector.
	//
	// n               : [first | only | last | <equation>]
	// selector        : [child | last-child | of-type | last-of-type]

	var formatNth = exports.formatNth = function formatNth() {
		var n = arguments.length <= 0 || arguments[0] === undefined ? "last" : arguments[0];
		var selector = arguments.length <= 1 || arguments[1] === undefined ? "child" : arguments[1];


		if (n === "last" || n === "first" || n === "only") {
			return n + "-" + selector;
		} else {
			return "nth-" + selector + "(" + n + ")";
		}
	};

	// expect(formatNth(2)).toEqual("nth-child(2)", "formatNth");
	// console.log("formatNth passed");

	// ---------------------------------------------------------------
	// Media Functions

	// Return and em value adjusted to match the browser default font size.
	// Note: This only works if actual sizes are set relative to browser defaults.
	//
	// ems              : The initial value to be converted.
	// fontSize         : The current font-size in.

	var baseEms = exports.baseEms = function baseEms(ems) {
		var fontSize = arguments.length <= 1 || arguments[1] === undefined ? "16px" : arguments[1];


		var fontSizes = unitSpliter(ems, "rem") === "rem" ? "16px" : fontSize;
		var mult = parseFloat(ems, 10) / (parseFloat(ems, 10) * 0 + 1);

		if (unitSpliter(fontSizes, "px") == "px") {

			return parseFloat(fontSizes) / parseFloat(browserDefaultFontSizePX, 10) * mult * 1 + "em";
		} else if (unitSpliter(fontSizes, "%") == "%") {

			return parseFloat(fontSizes, 10) / parseFloat(browserDefaultFontSizePercent, 10) * mult * 1 + "em";
		} else if (unitSpliter(fontSizes, "em") == "em") {

			return parseFloat(fontSizes, 10) / 1 * mult * 1 + "em";
		} else if (unitSpliter(fontSizes, "pt") == "pt") {

			return parseFloat(fontSizes, 10) / browserDefaultFontSizePT * mult * 1 + "em";
		} else {

			console.warn('Variable $base-font-size does not have a valid font unit. Valid units for fonts in CSS are px, pt, em, and %.');
		}
	};

	// expect(baseEms("16px")).toEqual("16em", "baseEms");
	// console.log("baseEms passed");

	// This name will be deprecated...

	var absoluteEms = exports.absoluteEms = function absoluteEms(ems, fontSize) {

		return baseEms(ems, fontSize);
	};

	// Return a length, after any em-values have been sent through absoluteEms().
	//
	// length      : The length value to be checked and adjusted if necessary.
	// font-size   : The current font-size in px.

	var fixEms = exports.fixEms = function fixEms(length) {
		var fontSize = arguments.length <= 1 || arguments[1] === undefined ? "16px" : arguments[1];


		if (length) {

			if (unitSpliter(length) == "em" || unitSpliter(length) == "rem") {
				return absoluteEms(length, fontSize);
			}
		}
	};

	// Sort a list of arguments into "min layout max" order, and return the list.
	//
	// mdiea-layout    : a list of values [min layout max] .......

	var mediaLayout = exports.mediaLayout = function mediaLayout(layout) {
		var fontSize = arguments.length <= 1 || arguments[1] === undefined ? "16px" : arguments[1];


		var media = {};

		media.min = typeof layout.min === 'undefined' ? false : fixEms(layout.min);
		media.max = typeof layout.max === 'undefined' ? false : fixEms(layout.max);
		media.layout = typeof layout.layout === 'undefined' ? false : layout.layout;

		return media;
	};

	// expect(mediaLayout({min: "50em", max: "60em", layout: 12})).toEqual({min: "50em", max: "60em", layout: 12});
	// console.log('mediaLayout passed');

	// Return the nearest layout (column-count) above a given breakpoint.
	//
	// min : The min-width media-query breakpoint above which to establish a new layout.

	var getLayout = exports.getLayout = function getLayout(min) {

		min = fixEms(min);

		if (unitSpliter(min) === unitSpliter(_settings.columnWidth)) {

			return Math.ceil((parseFloat(min) + parseFloat(_settings.gutterWidth)) / (parseFloat(_settings.columnWidth) + parseFloat(_settings.gutterWidth)));
		} else {
			console.warn("Can't determine a layout, because min and columnWidth are not comparable");
		}
	};

	// console.log(getLayout("20em"));

	// Check to see if a given mediaLayout list is simply the default.
	//
	// mediaLayout    : a list of values including ............
	//                : One unitless number (columns in a layout)
	//                : Two optional lengths (min and max-width media-query breakpoints).

	var isDefaultLayout = exports.isDefaultLayout = function isDefaultLayout(layout) {

		var media = mediaLayout(layout);

		if (media.min || media.max) {
			return false;
		} else {
			return media.layout === _settings.totalColumns ? true : false;
		}
	};

	// expect(isDefaultLayout({min: "80em", layout: 12})).toEqual(false);
	// console.log("isDefaultLayout passed");

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.breakpointRawOutput = exports.breakpointIEOutput = exports.breakpointMediaOutput = exports.borderBoxSizing = exports.containerStyle = exports.containerWidth = exports.omegaFloat = exports.fromDirection = exports.gridPadding = exports.gutterWidth = exports.columnWidth = exports.totalColumns = undefined;

	var _func = __webpack_require__(2);

	// Settings

	// The total number of columns in the grid
	var totalColumns = exports.totalColumns = 12;

	// The width of columns and gutters.
	// These must all be set with the comparable units.
	// Import Helpers

	var columnWidth = exports.columnWidth = "4em"; // em
	var gutterWidth = exports.gutterWidth = "1em"; // em

	// Padding on the left and right of a Grid Container.
	var gridPadding = exports.gridPadding = gutterWidth;

	// ------------------------------------------------------------

	// Advance Settings

	// From Direction:
	// Controls for right-to-left or bi-directional sites.
	var fromDirection = exports.fromDirection = "left";

	// Omega Float Direction:
	// The direction that +omega elements are floated by defult.

	var omegaFloat = exports.omegaFloat = (0, _func.oppositePosition)(fromDirection);

	// Container Width:
	// Override the total width of your grid, using any length(50em, 75%, etc.)
	var containerWidth = exports.containerWidth = false;

	//Container Style:
	// 'magic'  -  Static (fixed or elastic) when there's enough space,
	//             fluid when there isn't. This the SUSY MAGIC SAUCE(TM).
	// 'static' -  Forces the grid container to remain static at all times.
	// 'fluid'  -  Forces the grid to remain fluid at all times.
	//             (this will overrule any static containerWidth settings)
	var containerStyle = exports.containerStyle = "magic";

	// Border-Box Sizing
	// Adjust the grid math appropriately for box-sizing: border-box;
	// Warning: This does not actually apply the new box model!
	// In most cases you can ignore this setting,
	// and simply apply the border-box-sizing mixin.
	var borderBoxSizing = exports.borderBoxSizing = false;

	// ---------------------------------------------------------------------------
	// IE Settings

	// When you are using a seperate IE stylesheet,
	// you can use these settings to control the output of at-breakpoint.
	// By default, at-breakpoint will output media-queries as well as
	// any defined ie-fallback classes.

	var breakpointMediaOutput = exports.breakpointMediaOutput = true;
	var breakpointIEOutput = exports.breakpointIEOutput = true;

	// Danger Zone! Only set as 'true' in IE-specific style sheets.
	var breakpointRawOutput = exports.breakpointRawOutput = false;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.removeOmega = exports.resetColumns = exports.omega = exports.SpanColumns = exports.container = exports.applyContainer = exports.SetContainerWidth = undefined;

	var _expect = __webpack_require__(3);

	var _expect2 = _interopRequireDefault(_expect);

	var _settings = __webpack_require__(27);

	var _functions = __webpack_require__(26);

	var _func = __webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	// ------------------------------------------------------------
	// container

	// Set the width of a container
	//
	// columns   : The number of columns in the Grid Layout.

	// Imports

	var SetContainerWidth = exports.SetContainerWidth = function SetContainerWidth() {
		var columns = arguments.length <= 0 || arguments[0] === undefined ? _settings.totalColumns : arguments[0];
		var style = arguments.length <= 1 || arguments[1] === undefined ? _settings.containerStyle : arguments[1];


		var width = (0, _functions.containerOuterWidth)(columns);

		if (style === "static") {

			return (0, _func.rem)("width", width);
		} else {

			if (style === "fluid") {

				if ((0, _func.unitSpliter)(width) === "%") {

					return (0, _func.rem)("width", width);
				}
			} else {

				return (0, _func.rem)("maxWidth", width);
			}
		}
	};

	// expect(SetContainerWidth(12, "magic")).toEqual({"max-width": "59em"});
	// console.log("SetContainerWidth passed");

	// Set the outer grid-containing element(s).
	//
	// columns    : The number of columns in the container.

	var applyContainer = exports.applyContainer = function applyContainer() {
		var columns = arguments.length <= 0 || arguments[0] === undefined ? _settings.totalColumns : arguments[0];


		var widthValue = SetContainerWidth(columns);

		var prop = undefined,
		    val = undefined;

		Object.keys(widthValue).map(function (i) {
			prop = i;
			val = widthValue[i];
		});

		return Object.assign({}, { clear: "both" }, (0, _func.rem)(prop, val), (0, _func.rem)("paddingLeft", _settings.gridPadding), (0, _func.rem)("paddingRight", _settings.gridPadding), { marginLeft: "auto", marginRight: "auto" });
	};

	// expect(applyContainer(12)).toEqual(
	// { clear: "both", marginLeft: "auto", marginRight: "auto", maxWdth: "59em", paddingLeft: "1em", paddingRight: "1em"});

	// console.log("applyContainer passed");

	var container = exports.container = function container() {
		var layout = arguments.length <= 0 || arguments[0] === undefined ? _settings.totalColumns : arguments[0];


		return applyContainer(layout);
	};

	// console.log(container(12));

	// ---------------------------------------------------------------

	// Columns

	// Create a grid element spanning any number of 'columns' in a grid 'context'.
	// columns   : The number of columns to span.
	// context   : [optional] The context (columns spanned by parent).
	//           : Context is required on any nested elements.
	//           : Context MUST NOT be declared on a root element.
	// padding   : [optional] Padding applied to the inside of individual grid columns.
	//           : Padding is only output if one or two values are specified (e.g. 1em or 10px 20px)
	//          : Padding values are applied only on the horizontal axis in from-to order
	// from    : The start direction of your layout (e.g. 'left' for ltr languages)
	// style   : The container style to use.

	var SpanColumns = exports.SpanColumns = function SpanColumns(cols) {
		var context = arguments.length <= 1 || arguments[1] === undefined ? _settings.totalColumns : arguments[1];
		var omegaPos = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];
		var From = arguments.length <= 3 || arguments[3] === undefined ? _settings.fromDirection : arguments[3];
		var style = arguments.length <= 4 || arguments[4] === undefined ? (0, _functions.fixStaticMisalignment)() : arguments[4];


		var to = (0, _func.oppositePosition)(From) === "left" ? "Left" : "Right";

		var margin = 'margin' + to;

		var obj = {};
		obj.width = (0, _functions.columns)(cols, context, style);
		obj[margin] = (0, _functions.gutter)(context, style);
		obj.float = From;

		if (omegaPos) {
			return omega(From);
		} else {

			return Object.assign({}, obj);
		}
	};

	// console.log(SpanColumns(5));

	var omega = exports.omega = function omega() {
		var From = arguments.length <= 0 || arguments[0] === undefined ? _settings.fromDirection : arguments[0];


		var to = (0, _func.oppositePosition)(From) === "left" ? "Left" : "Right";

		var hack = (0, _func.oppositePosition)(_settings.omegaFloat);

		var margin = 'margin' + to;

		var obj = {};

		obj.float = _settings.omegaFloat;
		obj[margin] = 0;

		return Object.assign({}, obj);
	};

	// console.log(omega());

	// ------------------------------------------------------------

	// Reset

	// Reset a '+columns' grid element to default block behavior
	//
	// from   : The start direction of your layout (e.g. 'left' for itr languages)

	var resetColumns = exports.resetColumns = function resetColumns() {
		var From = arguments.length <= 0 || arguments[0] === undefined ? _settings.fromDirection : arguments[0];


		var to = (0, _func.oppositePosition)(From) === "left" ? "Left" : "Right";

		var obj = {};

		obj.float = "none";
		obj.width = "auto";
		var margin = 'margin' + to;

		obj[margin] = "auto";

		console.log(obj);

		return obj;
	};

	// console.log(resetColumns());

	// Apply to elements previously set as omega.
	// This will return floats and margins back to non-omega settings.
	//
	// context    : [optional] The context (columns spanned by parent).
	// from       : The start-direction for your document.
	// style      : The container style to use.

	var removeOmega = exports.removeOmega = function removeOmega() {
		var context = arguments.length <= 0 || arguments[0] === undefined ? _settings.totalColumns : arguments[0];
		var From = arguments.length <= 1 || arguments[1] === undefined ? _settings.fromDirection : arguments[1];
		var style = arguments.length <= 2 || arguments[2] === undefined ? (0, _functions.fixStaticMisalignment)() : arguments[2];


		var to = (0, _func.oppositePosition)(From) === "left" ? "Left" : "Right";

		var obj = {};

		obj.float = From;

		var margin = 'margin' + to;

		obj[margin] = (0, _functions.gutter)(context, style);

		return obj;
	};

	// console.log(removeOmega());

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
				value: true
	});
	exports.atBreakpoint = undefined;

	var _settings = __webpack_require__(27);

	var _grid = __webpack_require__(28);

	// Nest a block of code inside a new media-query.

	// media      : a list of values [min max]

	// -----------------------------------------------------------------------

	// Media Functions

	// Imports

	var atBreakpoint = exports.atBreakpoint = function atBreakpoint(media, content) {
				var fontSize = arguments.length <= 2 || arguments[2] === undefined ? "16px" : arguments[2];


				if (media.min || media.max) {

							if (media.min && media.max) {

										var obj = {};

										var mediaQuery = '@media (min-width: ' + media.min + ') and (max-width: ' + media.max + ')';

										obj[mediaQuery] = content;

										return obj;
							} else {

										if (!media.min && !media.max) {

													console.error("min-width is not specified");
										}

										if (media.min) {

													var obj = {};

													var mediaQuery = '@media (min-width: ' + media.min + ')';

													obj[mediaQuery] = content;

													return obj;
										}

										if (media.max) {

													var obj = {};

													var mediaQuery = '@media (max-width: ' + media.max + ')';

													obj[mediaQuery] = content;

													return obj;
										}
							}
				}
	};

	// console.log(atBreakpoint({max: "30em"}, {display: "inline", margin: "1px"}));

/***/ }
/******/ ]);