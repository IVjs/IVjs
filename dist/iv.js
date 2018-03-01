(function(e, a) { for(var i in a) e[i] = a[i]; }(window, /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["b"] = getRandomInt;
/* harmony export (immutable) */ __webpack_exports__["e"] = wait;
/* harmony export (immutable) */ __webpack_exports__["c"] = nearClone;
/* harmony export (immutable) */ __webpack_exports__["a"] = directDescendants;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_happy_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_happy_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__test_support_dom_commands__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_1__test_support_dom_commands__["a"]; });



function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function wait(time) {
    return new Promise(function (res) {
        setTimeout(res, time);
    });
}
function safeCloneObject(obj) {
    var outgoing = {};
    Object(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__["traverseObject"])(obj, function (prop, value) {
        if (Object(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__["toType"])(value) === 'array') {
            outgoing[prop] = nearClone(value);
        }
        else if (Object(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__["toType"])(value) === 'object') {
            outgoing[prop] = safeCloneObject(value);
        }
        else {
            outgoing[prop] = value;
        }
    }, false, false);
    return outgoing;
}
function nearClone(obj) {
    var type = Object(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__["toType"])(obj);
    if (type === 'object') {
        return safeCloneObject(obj);
    }
    else if (type === 'array') {
        return obj.map(function (x) { return nearClone(x); });
    }
    else {
        return obj;
    }
}
function directDescendants(element, selector) {
    var oldClass = element.getAttribute('class');
    element.setAttribute('class', oldClass + " IV-searching");
    var qsa = element.parentNode.querySelectorAll('.IV-searching > ' + selector);
    element.setAttribute('class', oldClass);
    return Object(__WEBPACK_IMPORTED_MODULE_1__test_support_dom_commands__["a" /* qsaToArray */])(qsa);
}


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;(function (global, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [exports], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.main = mod.exports;
  }
})(this, function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.toType = toType;
  exports.round = round;
  exports.clone = clone;
  exports.isEmpty = isEmpty;
  exports.isNotEmpty = isNotEmpty;
  exports.wrapObjectWithProperty = wrapObjectWithProperty;
  exports.isObject = isObject;
  exports.traverseObject = traverseObject;
  exports.nestedPropertyDetails = nestedPropertyDetails;
  exports.nestedPropertyTest = nestedPropertyTest;
  exports.nestedPropertyExists = nestedPropertyExists;
  exports.changePropsInitialCase = changePropsInitialCase;
  exports.firstCharToUpper = firstCharToUpper;
  exports.firstCharToLower = firstCharToLower;
  exports.convertPropKeysForAsp = convertPropKeysForAsp;
  exports.convertPropKeysForJs = convertPropKeysForJs;
  exports.valuesArrayFromObject = valuesArrayFromObject;
  exports.objectContainsValue = objectContainsValue;
  exports.objectKeyForValue = objectKeyForValue;
  exports.forceArray = forceArray;
  exports.stringify = stringify;
  exports.mediaWidth = mediaWidth;
  exports.mediaHeight = mediaHeight;

  var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
    return typeof obj;
  } : function (obj) {
    return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
  };

  function _toConsumableArray(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) {
        arr2[i] = arr[i];
      }

      return arr2;
    } else {
      return Array.from(arr);
    }
  }

  // see https://javascriptweblog.wordpress.com/2011/08/08/fixing-the-javascript-typeof-operator/
  // via http://stackoverflow.com/a/7390612/1386201
  /*
      toType({a: 4}); //"object"
      toType([1, 2, 3]); //"array"
      (function() {console.log(toType(arguments))})(); //"arguments"
      toType(new ReferenceError); //"error"
      toType(new Date); //"date"
      toType(/a-z/); //"regexp"
      toType(Math); //"math"
      toType(JSON); //"json"
      toType(new Number(4)); //"number"
      toType(new String("abc")); //"string"
      toType(new Boolean(true)); //"boolean"
      toType(null); //"null"
      toType(); //"undefined"
      toType( () => {} ); //"function"
  */
  function toType(val) {
    return {}.toString.call(val).match(/\s([a-zA-Z]+)/)[1].toLowerCase();
  }

  function round(value, decimals) {
    decimals = decimals === undefined ? 2 : decimals;
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
  }

  function clone(obj) {
    return JSON.parse(JSON.stringify(obj));
  }

  function isEmpty(val) {
    var emptyTypes = ['null', 'undefined'];
    var checkableTypes = ['object', 'array', 'arguments', 'json', 'string'];
    var type = toType(val);
    if (emptyTypes.indexOf(type) > -1) {
      return true;
    }
    if (checkableTypes.indexOf(type) > -1) {
      if (type === 'string') return val.length === 0; // IE fails on the next line if a string.
      if (Object.getOwnPropertyNames(val).length === 0) return true;
      return val.length === 0;
    }
    // other types return false because they are, by nature, filled ()
    return false;
  }

  function isNotEmpty(val) {
    return !isEmpty(val);
  }

  function wrapObjectWithProperty(obj, propName) {
    var preserveOriginal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

    var wrapper = {};
    var newObj = preserveOriginal ? clone(obj) : obj;
    wrapper[propName] = newObj;
    return wrapper;
  }

  function isObject(x) {
    return toType(x) === 'object';
  }

  // Traverses an object.
  // callback should return an array with a key, then a value if constructing a
  // new object is desired. Kind of like Array.map, but for objects
  function traverseObject(obj, callback) {
    var recursive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var preserveOriginal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var newObject = preserveOriginal ? clone(obj) : obj;
    var returnedObj = {};
    for (var key in newObject) {
      if (newObject.hasOwnProperty(key) === false) continue;
      if (isObject(newObject[key]) && recursive) {
        var argsMinusFirst = [].concat(Array.prototype.slice.call(arguments)).slice(1);
        var recursedObject = traverseObject.apply(this, [newObject[key]].concat(_toConsumableArray(argsMinusFirst)));
        if (!isEmpty(recursedObject)) {
          newObject[key] = recursedObject;
        }
      }
      var keyValArray = callback(key, newObject[key]);
      if (Array.isArray(keyValArray) && keyValArray.length === 2) {
        returnedObj[keyValArray[0]] = keyValArray[1];
      } else if (!isEmpty(keyValArray)) {
        throw new Error('It looks like you might have been trying to construct a new object, but you returned something other than an array that looks like [key, value]. You returned ' + keyValArray);
      }
    }
    return returnedObj;
  }

  function nestedPropertyDetails(obj, propertyPathString) {
    var pathParts = propertyPathString.split('.');
    var reducedObj = clone(obj);
    var exists = true;
    var existingPath = [];
    while (exists && pathParts.length > 0) {
      var newPart = pathParts.shift();
      if (reducedObj[newPart]) {
        existingPath.push(newPart);
        reducedObj = reducedObj[newPart];
      } else {
        exists = false;
      }
    }
    return { exists: exists, existingPath: existingPath.join('.'), finalValidProperty: reducedObj };
  }

  function nestedPropertyTest(obj, propertyPathString, callback) {
    var details = nestedPropertyDetails(obj, propertyPathString);
    if (details.exists) {
      return !!callback(details.finalValidProperty);
    }
    return false;
  }

  function nestedPropertyExists(obj, propertyPathString) {
    return nestedPropertyDetails(obj, propertyPathString).exists;
  }

  function changePropsInitialCase(obj, whichCase) {
    var recursive = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
    var preserveOriginal = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

    var makeAspVersion = whichCase === 'UpperFirst' ? true : false;
    var newObj = preserveOriginal ? clone(obj) : obj;
    var regex = makeAspVersion ? /[a-z]/ : /[A-z]/;
    return traverseObject(newObj, function (key, prop) {
      var originals = [key, prop];
      if (typeof key !== 'string') return originals;
      if (key.charAt(0).match(regex) === null) return originals;
      var newKey = makeAspVersion ? firstCharToUpper(key) : firstCharToLower(key);
      return [newKey, prop];
    }, recursive);
  }

  function firstCharToUpper(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  function firstCharToLower(string) {
    return string.charAt(0).toLowerCase() + string.slice(1);
  }

  function convertPropKeysForAsp(obj) {
    return changePropsInitialCase(obj, 'UpperFirst', true);
  }

  function convertPropKeysForJs(obj) {
    return changePropsInitialCase(obj, 'lowerFirst', true);
  }

  function valuesArrayFromObject(obj) {
    if (!isObject(obj)) {
      throw new Error('\'obj\' was not an object. Was ' + toType(obj));
    }
    return Object.keys(obj).map(function (key) {
      return obj[key];
    });
  }

  function objectContainsValue(val, obj) {
    return valuesArrayFromObject(obj).indexOf(val) !== -1;
  }

  function objectKeyForValue(val, obj) {
    if (!objectContainsValue(val, obj)) return false;
    return Object.keys(obj).reduce(function (a, currentKey) {
      if (obj[currentKey] === val) {
        a = currentKey;
      }
      return a;
    }, '');
  }

  function forceArray(val) {
    var emptyReturns = ['null', 'undefined'];
    if (emptyReturns.indexOf(toType(val)) != -1) return [];
    if (toType(val) !== 'array') {
      return [val];
    }
    return val;
  }

  var noCircularRefs = function noCircularRefs() {
    var valCache = [];
    var keyCache = [];
    var isFirstRun = true;

    return function (key, value) {
      if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value !== null) {
        if (isFirstRun) {
          key = '__BASE_OBJECT__'; // eslint-disable-line no-param-reassign
          isFirstRun = false;
        }
        var indexOfFoundValue = valCache.indexOf(value);
        if (indexOfFoundValue !== -1) {
          // Circular reference found, discard key
          return '[circular reference of ' + keyCache[indexOfFoundValue] + ']';
        }
        // Store value in our collection
        valCache.push(value);
        keyCache.push(key);
      }
      return value; // eslint-disable-line consistent-return
    };
  };

  function stringify(obj) {
    var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        tabLength = _ref.tabLength,
        stripQuotes = _ref.stripQuotes;

    var string = JSON.stringify(obj, noCircularRefs(), tabLength || 2);
    if (stripQuotes) {
      string = string.replace(/"(.*?)": /g, '$1: ');
    }
    return string;
  }

  /*
    The following are not tested with `npm test` and are unreliable for certain situations.
    see http://stackoverflow.com/a/8876069
  */
  function mediaWidth() {
    return Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
  }

  function mediaHeight() {
    return Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYWluLmpzIl0sIm5hbWVzIjpbInRvVHlwZSIsInJvdW5kIiwiY2xvbmUiLCJpc0VtcHR5IiwiaXNOb3RFbXB0eSIsIndyYXBPYmplY3RXaXRoUHJvcGVydHkiLCJpc09iamVjdCIsInRyYXZlcnNlT2JqZWN0IiwibmVzdGVkUHJvcGVydHlEZXRhaWxzIiwibmVzdGVkUHJvcGVydHlUZXN0IiwibmVzdGVkUHJvcGVydHlFeGlzdHMiLCJjaGFuZ2VQcm9wc0luaXRpYWxDYXNlIiwiZmlyc3RDaGFyVG9VcHBlciIsImZpcnN0Q2hhclRvTG93ZXIiLCJjb252ZXJ0UHJvcEtleXNGb3JBc3AiLCJjb252ZXJ0UHJvcEtleXNGb3JKcyIsInZhbHVlc0FycmF5RnJvbU9iamVjdCIsIm9iamVjdENvbnRhaW5zVmFsdWUiLCJvYmplY3RLZXlGb3JWYWx1ZSIsImZvcmNlQXJyYXkiLCJzdHJpbmdpZnkiLCJtZWRpYVdpZHRoIiwibWVkaWFIZWlnaHQiLCJ2YWwiLCJ0b1N0cmluZyIsImNhbGwiLCJtYXRjaCIsInRvTG93ZXJDYXNlIiwidmFsdWUiLCJkZWNpbWFscyIsInVuZGVmaW5lZCIsIk51bWJlciIsIk1hdGgiLCJvYmoiLCJKU09OIiwicGFyc2UiLCJlbXB0eVR5cGVzIiwiY2hlY2thYmxlVHlwZXMiLCJ0eXBlIiwiaW5kZXhPZiIsImxlbmd0aCIsIk9iamVjdCIsImdldE93blByb3BlcnR5TmFtZXMiLCJwcm9wTmFtZSIsInByZXNlcnZlT3JpZ2luYWwiLCJ3cmFwcGVyIiwibmV3T2JqIiwieCIsImNhbGxiYWNrIiwicmVjdXJzaXZlIiwibmV3T2JqZWN0IiwicmV0dXJuZWRPYmoiLCJrZXkiLCJoYXNPd25Qcm9wZXJ0eSIsImFyZ3NNaW51c0ZpcnN0IiwiYXJndW1lbnRzIiwic2xpY2UiLCJyZWN1cnNlZE9iamVjdCIsImFwcGx5Iiwia2V5VmFsQXJyYXkiLCJBcnJheSIsImlzQXJyYXkiLCJFcnJvciIsInByb3BlcnR5UGF0aFN0cmluZyIsInBhdGhQYXJ0cyIsInNwbGl0IiwicmVkdWNlZE9iaiIsImV4aXN0cyIsImV4aXN0aW5nUGF0aCIsIm5ld1BhcnQiLCJzaGlmdCIsInB1c2giLCJqb2luIiwiZmluYWxWYWxpZFByb3BlcnR5IiwiZGV0YWlscyIsIndoaWNoQ2FzZSIsIm1ha2VBc3BWZXJzaW9uIiwicmVnZXgiLCJwcm9wIiwib3JpZ2luYWxzIiwiY2hhckF0IiwibmV3S2V5Iiwic3RyaW5nIiwidG9VcHBlckNhc2UiLCJrZXlzIiwibWFwIiwicmVkdWNlIiwiYSIsImN1cnJlbnRLZXkiLCJlbXB0eVJldHVybnMiLCJub0NpcmN1bGFyUmVmcyIsInZhbENhY2hlIiwia2V5Q2FjaGUiLCJpc0ZpcnN0UnVuIiwiaW5kZXhPZkZvdW5kVmFsdWUiLCJ0YWJMZW5ndGgiLCJzdHJpcFF1b3RlcyIsInJlcGxhY2UiLCJtYXgiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsaWVudFdpZHRoIiwid2luZG93IiwiaW5uZXJXaWR0aCIsImNsaWVudEhlaWdodCIsImlubmVySGVpZ2h0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7VUFrQmdCQSxNLEdBQUFBLE07VUFJQUMsSyxHQUFBQSxLO1VBS0FDLEssR0FBQUEsSztVQUlBQyxPLEdBQUFBLE87VUFjQUMsVSxHQUFBQSxVO1VBSUFDLHNCLEdBQUFBLHNCO1VBT0FDLFEsR0FBQUEsUTtVQU9BQyxjLEdBQUFBLGM7VUFzQkFDLHFCLEdBQUFBLHFCO1VBaUJBQyxrQixHQUFBQSxrQjtVQVFBQyxvQixHQUFBQSxvQjtVQUlBQyxzQixHQUFBQSxzQjtVQWFBQyxnQixHQUFBQSxnQjtVQUlBQyxnQixHQUFBQSxnQjtVQUlBQyxxQixHQUFBQSxxQjtVQUlBQyxvQixHQUFBQSxvQjtVQUlBQyxxQixHQUFBQSxxQjtVQU9BQyxtQixHQUFBQSxtQjtVQUlBQyxpQixHQUFBQSxpQjtVQVFBQyxVLEdBQUFBLFU7VUFpQ0FDLFMsR0FBQUEsUztVQVlBQyxVLEdBQUFBLFU7VUFJQUMsVyxHQUFB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bWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vIHNlZSBodHRwczovL2phdmFzY3JpcHR3ZWJsb2cud29yZHByZXNzLmNvbS8yMDExLzA4LzA4L2ZpeGluZy10aGUtamF2YXNjcmlwdC10eXBlb2Ytb3BlcmF0b3IvXG4vLyB2aWEgaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvNzM5MDYxMi8xMzg2MjAxXG4vKlxuICAgIHRvVHlwZSh7YTogNH0pOyAvL1wib2JqZWN0XCJcbiAgICB0b1R5cGUoWzEsIDIsIDNdKTsgLy9cImFycmF5XCJcbiAgICAoZnVuY3Rpb24oKSB7Y29uc29sZS5sb2codG9UeXBlKGFyZ3VtZW50cykpfSkoKTsgLy9cImFyZ3VtZW50c1wiXG4gICAgdG9UeXBlKG5ldyBSZWZlcmVuY2VFcnJvcik7IC8vXCJlcnJvclwiXG4gICAgdG9UeXBlKG5ldyBEYXRlKTsgLy9cImRhdGVcIlxuICAgIHRvVHlwZSgvYS16Lyk7IC8vXCJyZWdleHBcIlxuICAgIHRvVHlwZShNYXRoKTsgLy9cIm1hdGhcIlxuICAgIHRvVHlwZShKU09OKTsgLy9cImpzb25cIlxuICAgIHRvVHlwZShuZXcgTnVtYmVyKDQpKTsgLy9cIm51bWJlclwiXG4gICAgdG9UeXBlKG5ldyBTdHJpbmcoXCJhYmNcIikpOyAvL1wic3RyaW5nXCJcbiAgICB0b1R5cGUobmV3IEJvb2xlYW4odHJ1ZSkpOyAvL1wiYm9vbGVhblwiXG4gICAgdG9UeXBlKG51bGwpOyAvL1wibnVsbFwiXG4gICAgdG9UeXBlKCk7IC8vXCJ1bmRlZmluZWRcIlxuICAgIHRvVHlwZSggKCkgPT4ge30gKTsgLy9cImZ1bmN0aW9uXCJcbiovXG5leHBvcnQgZnVuY3Rpb24gdG9UeXBlICh2YWwpIHtcbiAgcmV0dXJuICh7fSkudG9TdHJpbmcuY2FsbCh2YWwpLm1hdGNoKC9cXHMoW2EtekEtWl0rKS8pWzFdLnRvTG93ZXJDYXNlKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByb3VuZCh2YWx1ZSwgZGVjaW1hbHMpIHtcbiAgZGVjaW1hbHMgPSBkZWNpbWFscyA9PT0gdW5kZWZpbmVkID8gMiA6IGRlY2ltYWxzO1xuICByZXR1cm4gTnVtYmVyKE1hdGgucm91bmQodmFsdWUrJ2UnK2RlY2ltYWxzKSsnZS0nK2RlY2ltYWxzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsb25lKG9iaikge1xuICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeShvYmopKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW1wdHkgKHZhbCkge1xuICBsZXQgZW1wdHlUeXBlcyA9IFsnbnVsbCcsICd1bmRlZmluZWQnXTtcbiAgbGV0IGNoZWNrYWJsZVR5cGVzID0gWydvYmplY3QnLCAnYXJyYXknLCAnYXJndW1lbnRzJywgJ2pzb24nLCAnc3RyaW5nJ107XG4gIGxldCB0eXBlID0gdG9UeXBlKHZhbCk7XG4gIGlmIChlbXB0eVR5cGVzLmluZGV4T2YodHlwZSkgPiAtMSkgeyByZXR1cm4gdHJ1ZTsgfVxuICBpZiAoY2hlY2thYmxlVHlwZXMuaW5kZXhPZih0eXBlKSA+IC0xKSB7XG4gICAgaWYgKHR5cGUgPT09ICdzdHJpbmcnKSByZXR1cm4gdmFsLmxlbmd0aCA9PT0gMDsgLy8gSUUgZmFpbHMgb24gdGhlIG5leHQgbGluZSBpZiBhIHN0cmluZy5cbiAgICBpZiAoT2JqZWN0LmdldE93blByb3BlcnR5TmFtZXModmFsKS5sZW5ndGggPT09IDApIHJldHVybiB0cnVlO1xuICAgIHJldHVybiB2YWwubGVuZ3RoID09PSAwO1xuICB9XG4gIC8vIG90aGVyIHR5cGVzIHJldHVybiBmYWxzZSBiZWNhdXNlIHRoZXkgYXJlLCBieSBuYXR1cmUsIGZpbGxlZCAoKVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc05vdEVtcHR5ICh2YWwpIHtcbiAgcmV0dXJuICFpc0VtcHR5KHZhbCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB3cmFwT2JqZWN0V2l0aFByb3BlcnR5IChvYmosIHByb3BOYW1lLCBwcmVzZXJ2ZU9yaWdpbmFsID0gdHJ1ZSkge1xuICBsZXQgd3JhcHBlciA9IHt9O1xuICBsZXQgbmV3T2JqID0gcHJlc2VydmVPcmlnaW5hbCA/IGNsb25lKG9iaikgOiBvYmo7XG4gIHdyYXBwZXJbcHJvcE5hbWVdID0gbmV3T2JqO1xuICByZXR1cm4gd3JhcHBlcjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzT2JqZWN0KHgpIHtcbiAgcmV0dXJuICggdG9UeXBlKHgpID09PSAnb2JqZWN0JyApO1xufVxuXG4vLyBUcmF2ZXJzZXMgYW4gb2JqZWN0LlxuLy8gY2FsbGJhY2sgc2hvdWxkIHJldHVybiBhbiBhcnJheSB3aXRoIGEga2V5LCB0aGVuIGEgdmFsdWUgaWYgY29uc3RydWN0aW5nIGFcbi8vIG5ldyBvYmplY3QgaXMgZGVzaXJlZC4gS2luZCBvZiBsaWtlIEFycmF5Lm1hcCwgYnV0IGZvciBvYmplY3RzXG5leHBvcnQgZnVuY3Rpb24gdHJhdmVyc2VPYmplY3QgKG9iaiwgY2FsbGJhY2ssIHJlY3Vyc2l2ZSA9IGZhbHNlLCBwcmVzZXJ2ZU9yaWdpbmFsID0gdHJ1ZSkge1xuICBsZXQgbmV3T2JqZWN0ID0gcHJlc2VydmVPcmlnaW5hbCA/IGNsb25lKG9iaikgOiBvYmo7XG4gIGxldCByZXR1cm5lZE9iaiA9IHt9O1xuICBmb3IgKGxldCBrZXkgaW4gbmV3T2JqZWN0KSB7XG4gICAgaWYgKG5ld09iamVjdC5oYXNPd25Qcm9wZXJ0eShrZXkpID09PSBmYWxzZSkgY29udGludWU7XG4gICAgaWYgKCBpc09iamVjdChuZXdPYmplY3Rba2V5XSkgJiYgcmVjdXJzaXZlICkge1xuICAgICAgbGV0IGFyZ3NNaW51c0ZpcnN0ID0gWy4uLmFyZ3VtZW50c10uc2xpY2UoMSk7XG4gICAgICBsZXQgcmVjdXJzZWRPYmplY3QgPSB0cmF2ZXJzZU9iamVjdC5hcHBseSh0aGlzLCBbbmV3T2JqZWN0W2tleV0sIC4uLmFyZ3NNaW51c0ZpcnN0XSk7XG4gICAgICBpZiAoIWlzRW1wdHkocmVjdXJzZWRPYmplY3QpKSB7XG4gICAgICAgIG5ld09iamVjdFtrZXldID0gcmVjdXJzZWRPYmplY3Q7XG4gICAgICB9XG4gICAgfVxuICAgIGxldCBrZXlWYWxBcnJheSA9IGNhbGxiYWNrKGtleSwgbmV3T2JqZWN0W2tleV0pO1xuICAgIGlmIChBcnJheS5pc0FycmF5KGtleVZhbEFycmF5KSAmJiBrZXlWYWxBcnJheS5sZW5ndGggPT09IDIpIHtcbiAgICAgIHJldHVybmVkT2JqW2tleVZhbEFycmF5WzBdXSA9IGtleVZhbEFycmF5WzFdO1xuICAgIH0gZWxzZSBpZiAoIWlzRW1wdHkoa2V5VmFsQXJyYXkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYEl0IGxvb2tzIGxpa2UgeW91IG1pZ2h0IGhhdmUgYmVlbiB0cnlpbmcgdG8gY29uc3RydWN0IGEgbmV3IG9iamVjdCwgYnV0IHlvdSByZXR1cm5lZCBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBhcnJheSB0aGF0IGxvb2tzIGxpa2UgW2tleSwgdmFsdWVdLiBZb3UgcmV0dXJuZWQgJHtrZXlWYWxBcnJheX1gKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJldHVybmVkT2JqO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbmVzdGVkUHJvcGVydHlEZXRhaWxzIChvYmosIHByb3BlcnR5UGF0aFN0cmluZykge1xuICBsZXQgcGF0aFBhcnRzID0gcHJvcGVydHlQYXRoU3RyaW5nLnNwbGl0KCcuJyk7XG4gIGxldCByZWR1Y2VkT2JqID0gY2xvbmUob2JqKTtcbiAgbGV0IGV4aXN0cyA9IHRydWU7XG4gIGxldCBleGlzdGluZ1BhdGggPSBbXTtcbiAgd2hpbGUgKGV4aXN0cyAmJiBwYXRoUGFydHMubGVuZ3RoID4gMCkge1xuICAgIGxldCBuZXdQYXJ0ID0gcGF0aFBhcnRzLnNoaWZ0KCk7XG4gICAgaWYgKHJlZHVjZWRPYmpbbmV3UGFydF0pIHtcbiAgICAgIGV4aXN0aW5nUGF0aC5wdXNoKG5ld1BhcnQpO1xuICAgICAgcmVkdWNlZE9iaiA9IHJlZHVjZWRPYmpbbmV3UGFydF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGV4aXN0cyA9IGZhbHNlO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge2V4aXN0czogZXhpc3RzLCBleGlzdGluZ1BhdGg6IGV4aXN0aW5nUGF0aC5qb2luKCcuJyksIGZpbmFsVmFsaWRQcm9wZXJ0eTogcmVkdWNlZE9ian07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXN0ZWRQcm9wZXJ0eVRlc3QgKG9iaiwgcHJvcGVydHlQYXRoU3RyaW5nLCBjYWxsYmFjaykge1xuICBsZXQgZGV0YWlscyA9IG5lc3RlZFByb3BlcnR5RGV0YWlscyhvYmosIHByb3BlcnR5UGF0aFN0cmluZyk7XG4gIGlmIChkZXRhaWxzLmV4aXN0cykge1xuICAgIHJldHVybiAhIWNhbGxiYWNrKGRldGFpbHMuZmluYWxWYWxpZFByb3BlcnR5KTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBuZXN0ZWRQcm9wZXJ0eUV4aXN0cyAob2JqLCBwcm9wZXJ0eVBhdGhTdHJpbmcpIHtcbiAgcmV0dXJuIG5lc3RlZFByb3BlcnR5RGV0YWlscyhvYmosIHByb3BlcnR5UGF0aFN0cmluZykuZXhpc3RzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2hhbmdlUHJvcHNJbml0aWFsQ2FzZSAob2JqLCB3aGljaENhc2UsIHJlY3Vyc2l2ZSA9IGZhbHNlLCBwcmVzZXJ2ZU9yaWdpbmFsID0gdHJ1ZSkge1xuICBsZXQgbWFrZUFzcFZlcnNpb24gPSAod2hpY2hDYXNlID09PSAnVXBwZXJGaXJzdCcpID8gdHJ1ZSA6IGZhbHNlIDtcbiAgbGV0IG5ld09iaiA9IHByZXNlcnZlT3JpZ2luYWwgPyBjbG9uZShvYmopIDogb2JqO1xuICBsZXQgcmVnZXggPSBtYWtlQXNwVmVyc2lvbiA/IC9bYS16XS8gOiAvW0Etel0vO1xuICByZXR1cm4gdHJhdmVyc2VPYmplY3QobmV3T2JqLCAoa2V5LCBwcm9wKSA9PiB7XG4gICAgbGV0IG9yaWdpbmFscyA9IFtrZXksIHByb3BdO1xuICAgIGlmICh0eXBlb2Yga2V5ICE9PSAnc3RyaW5nJykgcmV0dXJuIG9yaWdpbmFscztcbiAgICBpZiAoa2V5LmNoYXJBdCgwKS5tYXRjaChyZWdleCkgPT09IG51bGwpIHJldHVybiBvcmlnaW5hbHM7XG4gICAgbGV0IG5ld0tleSA9IG1ha2VBc3BWZXJzaW9uID8gZmlyc3RDaGFyVG9VcHBlcihrZXkpIDogZmlyc3RDaGFyVG9Mb3dlcihrZXkpO1xuICAgIHJldHVybiBbbmV3S2V5LCBwcm9wXTtcbiAgfSwgcmVjdXJzaXZlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZpcnN0Q2hhclRvVXBwZXIgKHN0cmluZykge1xuICByZXR1cm4gc3RyaW5nLmNoYXJBdCgwKS50b1VwcGVyQ2FzZSgpICsgc3RyaW5nLnNsaWNlKDEpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZmlyc3RDaGFyVG9Mb3dlciAoc3RyaW5nKSB7XG4gIHJldHVybiBzdHJpbmcuY2hhckF0KDApLnRvTG93ZXJDYXNlKCkgKyBzdHJpbmcuc2xpY2UoMSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0UHJvcEtleXNGb3JBc3AgKG9iaikge1xuICByZXR1cm4gY2hhbmdlUHJvcHNJbml0aWFsQ2FzZShvYmosICdVcHBlckZpcnN0JywgdHJ1ZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb252ZXJ0UHJvcEtleXNGb3JKcyAob2JqKSB7XG4gIHJldHVybiBjaGFuZ2VQcm9wc0luaXRpYWxDYXNlKG9iaiwgJ2xvd2VyRmlyc3QnLCB0cnVlKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHZhbHVlc0FycmF5RnJvbU9iamVjdCAob2JqKSB7XG4gIGlmICghaXNPYmplY3Qob2JqKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgJ29iaicgd2FzIG5vdCBhbiBvYmplY3QuIFdhcyAke3RvVHlwZShvYmopfWApO1xuICB9XG4gIHJldHVybiBPYmplY3Qua2V5cyhvYmopLm1hcChrZXkgPT4gb2JqW2tleV0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gb2JqZWN0Q29udGFpbnNWYWx1ZSAodmFsLCBvYmopIHtcbiAgcmV0dXJuIHZhbHVlc0FycmF5RnJvbU9iamVjdChvYmopLmluZGV4T2YodmFsKSAhPT0gLTE7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBvYmplY3RLZXlGb3JWYWx1ZSAodmFsLCBvYmopIHtcbiAgaWYgKCFvYmplY3RDb250YWluc1ZhbHVlKHZhbCwgb2JqKSkgcmV0dXJuIGZhbHNlO1xuICByZXR1cm4gT2JqZWN0LmtleXMob2JqKS5yZWR1Y2UoKGEsIGN1cnJlbnRLZXkpID0+IHtcbiAgICBpZiAob2JqW2N1cnJlbnRLZXldID09PSB2YWwpIHthID0gY3VycmVudEtleTt9XG4gICAgcmV0dXJuIGE7XG4gIH0sICcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZvcmNlQXJyYXkgKHZhbCkge1xuICBjb25zdCBlbXB0eVJldHVybnMgPSBbJ251bGwnLCAndW5kZWZpbmVkJ107XG4gIGlmIChlbXB0eVJldHVybnMuaW5kZXhPZih0b1R5cGUodmFsKSkgIT0gLTEpIHJldHVybiBbXTtcbiAgaWYgKHRvVHlwZSh2YWwpICE9PSAnYXJyYXknKSB7XG4gICAgcmV0dXJuIFt2YWxdO1xuICB9XG4gIHJldHVybiB2YWw7XG59XG5cbmNvbnN0IG5vQ2lyY3VsYXJSZWZzID0gKCkgPT4ge1xuICBjb25zdCB2YWxDYWNoZSA9IFtdO1xuICBjb25zdCBrZXlDYWNoZSA9IFtdO1xuICBsZXQgaXNGaXJzdFJ1biA9IHRydWU7XG5cbiAgcmV0dXJuIChrZXksIHZhbHVlKSA9PiB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgIT09IG51bGwpIHtcbiAgICAgIGlmIChpc0ZpcnN0UnVuKSB7XG4gICAgICAgIGtleSA9ICdfX0JBU0VfT0JKRUNUX18nOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgIGlzRmlyc3RSdW4gPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluZGV4T2ZGb3VuZFZhbHVlID0gdmFsQ2FjaGUuaW5kZXhPZih2YWx1ZSk7XG4gICAgICBpZiAoaW5kZXhPZkZvdW5kVmFsdWUgIT09IC0xKSB7XG4gICAgICAgIC8vIENpcmN1bGFyIHJlZmVyZW5jZSBmb3VuZCwgZGlzY2FyZCBrZXlcbiAgICAgICAgcmV0dXJuIGBbY2lyY3VsYXIgcmVmZXJlbmNlIG9mICR7a2V5Q2FjaGVbaW5kZXhPZkZvdW5kVmFsdWVdfV1gO1xuICAgICAgfVxuICAgICAgLy8gU3RvcmUgdmFsdWUgaW4gb3VyIGNvbGxlY3Rpb25cbiAgICAgIHZhbENhY2hlLnB1c2godmFsdWUpO1xuICAgICAga2V5Q2FjaGUucHVzaChrZXkpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7IC8vIGVzbGludC1kaXNhYmxlLWxpbmUgY29uc2lzdGVudC1yZXR1cm5cbiAgfTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBzdHJpbmdpZnkgKG9iaiwge3RhYkxlbmd0aDogdGFiTGVuZ3RoLCBzdHJpcFF1b3Rlczogc3RyaXBRdW90ZXN9ID0ge30pIHtcbiAgbGV0IHN0cmluZyA9IEpTT04uc3RyaW5naWZ5KG9iaiwgbm9DaXJjdWxhclJlZnMoKSwgdGFiTGVuZ3RoIHx8IDIpO1xuICBpZiAoc3RyaXBRdW90ZXMpIHtcbiAgICBzdHJpbmcgPSBzdHJpbmcucmVwbGFjZSgvXCIoLio/KVwiOiAvZywgJyQxOiAnKTtcbiAgfVxuICByZXR1cm4gc3RyaW5nO1xufVxuXG4vKlxuICBUaGUgZm9sbG93aW5nIGFyZSBub3QgdGVzdGVkIHdpdGggYG5wbSB0ZXN0YCBhbmQgYXJlIHVucmVsaWFibGUgZm9yIGNlcnRhaW4gc2l0dWF0aW9ucy5cbiAgc2VlIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzg4NzYwNjlcbiovXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFXaWR0aCAoKSB7XG4gIHJldHVybiBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbWVkaWFIZWlnaHQgKCkge1xuICByZXR1cm4gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xufVxuIl19

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export __extends */
/* unused harmony export __assign */
/* unused harmony export __rest */
/* unused harmony export __decorate */
/* unused harmony export __param */
/* unused harmony export __metadata */
/* harmony export (immutable) */ __webpack_exports__["a"] = __awaiter;
/* harmony export (immutable) */ __webpack_exports__["b"] = __generator;
/* unused harmony export __exportStar */
/* unused harmony export __values */
/* unused harmony export __read */
/* unused harmony export __spread */
/* unused harmony export __await */
/* unused harmony export __asyncGenerator */
/* unused harmony export __asyncDelegator */
/* unused harmony export __asyncValues */
/* unused harmony export __makeTemplateObject */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = Object.setPrototypeOf ||
    ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
    function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = Object.assign || function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
}

function __rest(s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) if (e.indexOf(p[i]) < 0)
            t[p[i]] = s[p[i]];
    return t;
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __param(paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
}

function __metadata(metadataKey, metadataValue) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}

function __awaiter(thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

function __exportStar(m, exports) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}

function __values(o) {
    var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
    if (m) return m.call(o);
    return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
}

function __read(o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
}

function __spread() {
    for (var ar = [], i = 0; i < arguments.length; i++)
        ar = ar.concat(__read(arguments[i]));
    return ar;
}

function __await(v) {
    return this instanceof __await ? (this.v = v, this) : new __await(v);
}

function __asyncGenerator(thisArg, _arguments, generator) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var g = generator.apply(thisArg, _arguments || []), i, q = [];
    return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
    function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
    function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
    function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);  }
    function fulfill(value) { resume("next", value); }
    function reject(value) { resume("throw", value); }
    function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
}

function __asyncDelegator(o) {
    var i, p;
    return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
    function verb(n, f) { if (o[n]) i[n] = function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; }; }
}

function __asyncValues(o) {
    if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
    var m = o[Symbol.asyncIterator];
    return m ? m.call(o) : typeof __values === "function" ? __values(o) : o[Symbol.iterator]();
}

function __makeTemplateObject(cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return defaults; });
var defaults = {
    baseElementId: 'IV-view',
    buttonContainerClass: 'IV-button-container',
};


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createEngine;
/* unused harmony export IvCommandEngine */
function createEngine(input) {
    var functionFactories = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        functionFactories[_i - 1] = arguments[_i];
    }
    var settings = input.settings, nodes = input.nodes, commandRunnerClass = input.commandRunnerClass, variables = input.variables;
    var engine = new IvCommandEngine(settings, nodes, commandRunnerClass, variables);
    functionFactories.forEach(function (factory) {
        engine.registerTargetFunction(factory);
    });
    return engine;
}
var IvCommandEngine = /** @class */ (function () {
    function IvCommandEngine(settings, nodes, commandRunnerClass, variables) {
        this.settings = settings;
        this.nodes = nodes;
        this.commandRunnerClass = commandRunnerClass;
        this.variables = variables;
        this.targetFunctions = {};
        this.runners = {};
    }
    IvCommandEngine.prototype.registerTargetFunction = function (factory) {
        var _a = this, settings = _a.settings, variables = _a.variables;
        var input = { settings: settings, variables: variables, commandEngine: this };
        Object.assign(this.targetFunctions, factory(input));
    };
    IvCommandEngine.prototype.run = function () {
        this.createRunners();
        this.runFirstNode();
    };
    IvCommandEngine.prototype.runCommands = function (commands) {
        return this.createCommandRunner(commands).run();
    };
    IvCommandEngine.prototype.createRunners = function () {
        var _this = this;
        var targetFunctions = this.targetFunctions;
        this.nodes.forEach(function (node) {
            var commands = node.getCommands();
            _this.runners[node.name] = _this.createCommandRunner(commands);
        });
    };
    IvCommandEngine.prototype.createCommandRunner = function (commands) {
        return new this.commandRunnerClass({
            variables: this.variables,
            targetFunctions: this.targetFunctions,
            commands: commands
        });
    };
    IvCommandEngine.prototype.runFirstNode = function () {
        if (this.nodes[0]) {
            this.getRunnerForNode(this.nodes[0].name).run();
        }
    };
    IvCommandEngine.prototype.runNodeByName = function (name) {
        return this.getRunnerForNode(name).run();
    };
    IvCommandEngine.prototype.getRunnerForNode = function (name) {
        return this.runners[name];
    };
    return IvCommandEngine;
}());



/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(6);


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__iv__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "IV", function() { return __WEBPACK_IMPORTED_MODULE_0__iv__["a"]; });



/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IV; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__command_engine__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mobile_detector__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_mobile_detector___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_mobile_detector__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__utils__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__config__ = __webpack_require__(3);





var IV = /** @class */ (function () {
    function IV(initialState) {
        if (initialState === void 0) { initialState = {}; }
        this.variables = {};
        this.settings = {};
        this.defaultSettings = {
            baseContainer: document.getElementById(__WEBPACK_IMPORTED_MODULE_4__config__["a" /* defaults */].baseElementId),
            baseVideoUrl: '',
            bgAudioUrl: null,
        };
        this.nodes = [];
        this.defineNode = this.node;
        var variables = initialState.variables, settings = initialState.settings;
        if (variables) {
            this.variables = variables;
        }
        if (settings) {
            this.settings = settings;
        }
        this.validateDom();
        this.setup();
    }
    IV.prototype.validateDom = function () {
        if (!this.getSetting('baseContainer')) {
            throw new Error("No valid node present in HTML");
        }
    };
    IV.prototype.setup = function () {
    };
    IV.prototype.getSetting = function (name) {
        if (this.settings[name])
            return this.settings[name];
        return this.defaultSettings[name];
    };
    IV.prototype.getSettings = function () {
        var settings = {};
        for (var key in this.defaultSettings) {
            settings[key] = this.getSetting(key);
        }
        return settings;
    };
    IV.prototype.node = function (name) {
        var newNode = new __WEBPACK_IMPORTED_MODULE_0__node__["a" /* Node */](name);
        this.nodes.push(newNode);
        return newNode; // Beginning of chainable node
    };
    IV.prototype.run = function (name) {
        var _a = this, nodes = _a.nodes, variables = _a.variables;
        var engine = Object(__WEBPACK_IMPORTED_MODULE_1__command_engine__["a" /* createDomEngine */])({
            settings: this.getSettings(),
            nodes: nodes,
            variables: variables,
        });
        this.runOnAnyPlatform(engine);
    };
    IV.prototype.runOnAnyPlatform = function (engine) {
        if (Object(__WEBPACK_IMPORTED_MODULE_2_mobile_detector__["isMobileOrTablet"])()) {
            this.runViaButton(this.createKickoffButton(), engine);
        }
        else {
            engine.run();
        }
    };
    IV.prototype.createKickoffButton = function () {
        var startBtn = document.createElement('button');
        startBtn.type = 'button';
        startBtn.id = 'IV-kickoff';
        startBtn.innerHTML = 'Kickoff';
        this.getSettings().baseContainer.appendChild(startBtn);
        return startBtn;
    };
    IV.prototype.runViaButton = function (btn, engine) {
        var _this = this;
        var handleClick = function () {
            btn.removeEventListener('click', handleClick);
            _this.prepVideosForMobile();
            btn.remove();
            engine.run();
        };
        btn.addEventListener('click', handleClick);
    };
    IV.prototype.prepVideosForMobile = function () {
        // TODO: move this method to VideoController
        // and call from here, or with registered kickoff event
        var videos = Object(__WEBPACK_IMPORTED_MODULE_3__utils__["d" /* qsaToArray */])(document.querySelectorAll('video'));
        videos.forEach(function (vid) {
            vid.play();
            vid.pause();
        });
    };
    return IV;
}());



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Node; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__node_builders_video_video_commands_builder__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__node_builders_button_commands_builder__ = __webpack_require__(10);


var Node = /** @class */ (function () {
    function Node(name) {
        this.name = name;
        this.commands = [];
        this.pushType = 'main';
        this.videoCommands = new __WEBPACK_IMPORTED_MODULE_0__node_builders_video_video_commands_builder__["a" /* VideoCommandsBuilder */]();
        this.buttonCommands = new __WEBPACK_IMPORTED_MODULE_1__node_builders_button_commands_builder__["a" /* ButtonCommandsBuilder */]();
    }
    Node.prototype.getCommands = function () {
        return this.commands;
    };
    Node.prototype.pusher = function (command) {
        var _this = this;
        if (Array.isArray(command))
            return command.forEach(function (c) { return _this.pusher(c); });
        if (this.pushType == 'condition') {
            this.switchDo.do[this.switchDo.do.length - 1].commands.push(command);
        }
        else if (this.pushType == 'default') {
            this.switchDo.defaultCommands.push(command);
        }
        else {
            this.commands.push(command);
        }
    };
    Node.prototype.addButton = function (input) {
        var cmd = this.buttonCommands.addButton(input);
        this.pusher(cmd);
        return this;
    };
    Node.prototype.removeAllButtons = function () {
        var cmd = this.buttonCommands.removeAllButtons();
        this.pusher(cmd);
        return this;
    };
    Node.prototype.if = function (optionsObj) {
        //TODO: need to instantiate a new for each if.
        if (this.switchDo == null) {
            this.switchDo = { name: 'switch', do: [], defaultCommands: [] };
        }
        this.pushType = 'condition';
        if (optionsObj['is']) {
            this.switchDo.do.push({ varName: optionsObj.var, is: optionsObj['is'], commands: [] });
        }
        else if (optionsObj['isGreaterThan']) {
            this.switchDo.do.push({ varName: optionsObj.var, isGreaterThan: optionsObj['isGreaterThan'], commands: [] });
        }
        else if (optionsObj['isLessThan']) {
            this.switchDo.do.push({ varName: optionsObj.var, isLessThan: optionsObj['isLessThan'], commands: [] });
        }
        else if (optionsObj['isBetween']) {
            this.switchDo.do.push({ varName: optionsObj.var, isBetween: optionsObj['isBetween'], commands: [] });
        }
        else if (optionsObj['isGreaterThanOrEqualTo']) {
            this.switchDo.do.push({ varName: optionsObj.var, isGreaterThanOrEqualTo: optionsObj['isGreaterThanOrEqualTo'], commands: [] });
        }
        else if (optionsObj['isLessThanOrEqualTo']) {
            this.switchDo.do.push({ varName: optionsObj.var, isGreaterThanOrEqualTo: optionsObj['isLessThanOrEqualTo'], commands: [] });
        }
        return this;
    };
    Node.prototype.else = function () {
        this.pushType = 'default';
        return this;
    };
    Node.prototype.endIf = function () {
        this.pushType = 'main';
        this.pusher(this.switchDo);
        return this;
    };
    Node.prototype.playVideo = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        this.pusher((_a = this.videoCommands).playVideo.apply(_a, input));
        return this;
        var _a;
    };
    Node.prototype.js = function (func) {
        this.pusher({ name: 'executeJs', func: func });
        return this;
    };
    Node.prototype.videoPlay = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        console.warn('The `videoPlay` command is deprecated. Please Use `playVideo`');
        this.pusher((_a = this.videoCommands).playVideo.apply(_a, input));
        return this;
        var _a;
    };
    Node.prototype.getRandom = function (objSettings) {
        var command = { name: 'getRandomNumber', min: objSettings.min, max: objSettings.max, assignTo: objSettings.storeIn };
        this.pusher(command);
        return this;
    };
    Node.prototype.setVariable = function (objSettings) {
        if (objSettings['var']) {
            var command = { name: 'assignFromVariable', varName: objSettings['var'], assignTo: objSettings.storeIn };
            this.pusher(command);
        }
        else {
            if (objSettings['value']) {
                var command = { name: 'assignVariable', value: objSettings['value'], assignTo: objSettings.storeIn };
                this.pusher(command);
            }
        }
        return this;
    };
    Node.prototype.wait = function (time) {
        var msTime = time * 1000;
        var command = { name: 'wait', time: msTime };
        this.pusher(command);
        return this;
    };
    Node.prototype.calculate = function (optionsObj) {
        var op = '';
        var val = 0;
        if (optionsObj['add']) {
            op = 'add';
            val = optionsObj['add'];
        }
        else if (optionsObj['subtract']) {
            op = 'subtract';
            val = optionsObj['subtract'];
        }
        else if (optionsObj['multiply']) {
            op = 'multiply';
            val = optionsObj['multiply'];
        }
        else if (optionsObj['divide']) {
            op = 'divide';
            val = optionsObj['divide'];
        }
        else {
            var received = [];
            for (var prop in optionsObj) {
                if (optionsObj.hasOwnProperty(prop)) {
                    received.push("\"" + prop + "\"");
                }
            }
            var message = "Unknown options passed into Calculate(). Was expecting \"var\", \"storeIn\" and then one of \"add\", \"subtract\", \"multiply\", or \"delete\". Received [" + received.join(', ') + "]";
            throw new Error(message);
        }
        var command = {
            name: 'calculate',
            varName: optionsObj.var,
            operation: op,
            value: val,
            assignTo: optionsObj.storeIn
        };
        this.pusher(command);
        return this;
    };
    Node.prototype.goto = function (nodeName) {
        var _this = this;
        var commands = this.buildGoToNodeCommandSet(nodeName);
        commands.forEach(function (c) { return _this.pusher(c); });
        return this;
    };
    Node.prototype.buildGoToNodeCommandSet = function (nodeName) {
        return [
            { name: 'goToNode', nodeName: nodeName },
            { name: 'stopExecution' }
        ];
    };
    Node.prototype.execute = function (nodeName) {
        var command = { name: 'executeAsync', nodeName: nodeName };
        this.pusher(command);
        return this;
    };
    Node.prototype.log = function (anything) {
        var command = {
            name: 'log',
            value: anything,
        };
        this.pusher(command);
        return this;
    };
    Node.prototype.goSub = function (nodeName) {
        var command = { name: 'executeSync', nodeName: nodeName };
        this.pusher(command);
        return this;
    };
    Node.prototype.return = function () {
        var commandStop = { name: 'stopExecution' };
        this.pusher(commandStop);
        return this;
    };
    Node.prototype.bgAudio = function (input) {
        var command = this.bgAudioCommand(input);
        this.pusher(command);
        return this;
    };
    Node.prototype.bgAudioCommand = function (input) {
        if (typeof input === 'string') {
            return {
                name: 'audioSource',
                target: 'BG',
                do: input,
            };
        }
        else {
            return {
                name: 'audioSource',
                target: 'BG',
                do: 'load',
                file: input.load
            };
        }
    };
    Node.prototype.setVolume = function (input) {
        var volume = input.volume, target = input.target, time = input.time;
        var command = {
            name: 'audioVolume',
            target: target.toUpperCase(),
            volume: volume,
            time: time ? time * 1000 : time,
        };
        this.pusher(command);
        return this;
    };
    Node.prototype.clearVideo = function (time) {
        this.pusher(this.videoCommands.clearVideo(time));
        return this;
    };
    return Node;
}());



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VideoCommandsBuilder; });
var VideoCommandsBuilder = /** @class */ (function () {
    function VideoCommandsBuilder() {
    }
    VideoCommandsBuilder.prototype.playVideo = function () {
        var input = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            input[_i] = arguments[_i];
        }
        if (Array.isArray(input[0])) {
            return this.handleDepricatedArrayInput(input[0]);
        }
        else {
            return this.handleArrayInput(input);
        }
    };
    VideoCommandsBuilder.prototype.clearVideo = function (time) {
        var commands = [];
        if (time) {
            var msTime = time * 1000;
            var command = { name: 'wait', time: msTime };
            commands.push(command);
        }
        var clearVideoCommand = { name: 'clearVideo' };
        commands.push(clearVideoCommand);
        return commands;
    };
    VideoCommandsBuilder.prototype.handleDepricatedArrayInput = function (array) {
        console.warn('Passing an array to playVideo (or the alias "videoPlay") is deprecated. Just pass values as individual arguments. (Remove the `[` and `]` from the method call.)');
        return this.playVideo.apply(this, array);
    };
    VideoCommandsBuilder.prototype.handleArrayInput = function (input) {
        var _this = this;
        var singleCommand = input
            .map(function (objOrStr) { return _this.guaranteedOptionsObject(objOrStr); })
            .reduce(this.mergeMissingUrlsReducer, [])
            .map(function (vo) { return _this.createPlayCommandFromOptions(vo); })
            .reduceRight(this.reduceOnCompleteIntoPrevious, null);
        return [singleCommand];
    };
    VideoCommandsBuilder.prototype.mergeMissingUrlsReducer = function (a, current) {
        if (current.url) {
            a.push(current);
        }
        else {
            var lastObj = a[a.length - 1];
            if (!lastObj) {
                throw new Error('Previous object does not exist. This error can occur if the first object passed to `playVideo` does not contain a url.');
            }
            Object.assign(lastObj, current);
        }
        return a;
    };
    VideoCommandsBuilder.prototype.reduceOnCompleteIntoPrevious = function (a, command) {
        if (!a)
            return command;
        command.onComplete = command.onComplete || [];
        command.onComplete.push(a);
        return command;
    };
    VideoCommandsBuilder.prototype.guaranteedOptionsObject = function (singleInput) {
        if (typeof singleInput === 'object') {
            return singleInput;
        }
        else {
            return { url: singleInput };
        }
    };
    VideoCommandsBuilder.prototype.createPlayCommandFromOptions = function (obj) {
        var addedProps = { name: 'playVideo' };
        var remappedProps = { file: obj.url };
        var commandProps = this.commandOptionsToCommands(obj);
        var finalObj = Object.assign({}, addedProps, remappedProps, commandProps);
        return finalObj;
    };
    VideoCommandsBuilder.prototype.commandOptionsToCommands = function (inputObj) {
        var onComplete = [];
        function addCommands(commands) {
            onComplete = onComplete.concat(commands);
        }
        if (inputObj.runAsync) {
            addCommands({
                name: 'executeAsync',
                nodeName: inputObj.runAsync
            });
        }
        if (inputObj.js) {
            addCommands({
                name: 'executeJs',
                func: inputObj.js
            });
        }
        if (inputObj.runSync) {
            addCommands({
                name: 'executeSync',
                nodeName: inputObj.runSync
            });
        }
        if (inputObj.goTo) {
            addCommands([
                { name: 'goToNode', nodeName: inputObj.goTo },
                { name: 'stopExecution' }
            ]);
        }
        return onComplete.length > 0 ? { onComplete: onComplete } : {};
    };
    return VideoCommandsBuilder;
}());



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ButtonCommandsBuilder; });
var ButtonCommandsBuilder = /** @class */ (function () {
    function ButtonCommandsBuilder() {
    }
    ButtonCommandsBuilder.prototype.addButton = function (input) {
        var id = input.id, text = input.text;
        var cmd = {
            name: 'addButton',
            id: id,
            text: text,
            onClick: this.createCommands(input)
        };
        return cmd;
    };
    ButtonCommandsBuilder.prototype.removeAllButtons = function () {
        return {
            name: 'removeAllButtons'
        };
    };
    ButtonCommandsBuilder.prototype.createCommands = function (input) {
        var runAsync = input.runAsync, goTo = input.goTo, js = input.js, remove = input.remove, id = input.id;
        var commands = [];
        if (runAsync) {
            commands.push({
                name: 'executeAsync',
                nodeName: runAsync,
            });
        }
        if (js) {
            commands.push({
                name: 'executeJs',
                func: js
            });
        }
        if (remove) {
            commands.push({
                name: 'removeButton',
                id: id
            });
        }
        if (goTo) {
            commands.push({
                name: 'goToNode',
                nodeName: goTo
            }, {
                name: 'stopExecution'
            });
        }
        return commands;
    };
    return ButtonCommandsBuilder;
}());



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__command_engine__ = __webpack_require__(4);
/* unused harmony namespace reexport */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dom_engine__ = __webpack_require__(12);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__dom_engine__["a"]; });




/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = createDomEngine;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__command_engine__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__command_runner__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dom_commands__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__general_commands__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__log_commands__ = __webpack_require__(36);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__unserializable_commands__ = __webpack_require__(38);






var factories = [
    __WEBPACK_IMPORTED_MODULE_2__dom_commands__["d" /* playVideoFactory */],
    __WEBPACK_IMPORTED_MODULE_2__dom_commands__["b" /* audioSourceFactory */],
    __WEBPACK_IMPORTED_MODULE_2__dom_commands__["c" /* audioVolumeFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["g" /* goToNodeFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["i" /* stopExecutionFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["b" /* assignVariableFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["a" /* assignFromVariableFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["f" /* getRandomNumberFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["c" /* calculateFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["j" /* switchFactory */],
    __WEBPACK_IMPORTED_MODULE_4__log_commands__["a" /* logFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["h" /* pauseExecutionFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["e" /* executeSyncFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["k" /* waitFactory */],
    __WEBPACK_IMPORTED_MODULE_3__general_commands__["d" /* executeAsyncFactory */],
    __WEBPACK_IMPORTED_MODULE_5__unserializable_commands__["a" /* executeJsFactory */],
    __WEBPACK_IMPORTED_MODULE_2__dom_commands__["a" /* addButtonFactory */],
    __WEBPACK_IMPORTED_MODULE_2__dom_commands__["e" /* removeAllButtonsFactory */],
    __WEBPACK_IMPORTED_MODULE_2__dom_commands__["f" /* removeButtonFactory */],
];
function createDomEngine(input) {
    var settings = input.settings, nodes = input.nodes, variables = input.variables;
    return __WEBPACK_IMPORTED_MODULE_0__command_engine__["a" /* createEngine */].apply(void 0, [{
            commandRunnerClass: __WEBPACK_IMPORTED_MODULE_1__command_runner__["a" /* CommandRunner */],
            settings: settings,
            nodes: nodes,
            variables: variables
        }].concat(factories));
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return CommandRunner; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_eventemitter3__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_eventemitter3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_eventemitter3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_happy_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_happy_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_happy_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lib_partial_liquid__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__utils__ = __webpack_require__(0);





var CommandRunner = /** @class */ (function () {
    function CommandRunner(_a) {
        var commands = _a.commands, targetFunctions = _a.targetFunctions, variables = _a.variables;
        this.events = new __WEBPACK_IMPORTED_MODULE_1_eventemitter3__["EventEmitter"]();
        this.targets = {};
        this.runQueue = [];
        this.nextIndex = 0;
        this.commands = commands;
        this.targets = targetFunctions;
        this.variables = variables;
        this.replacer = new __WEBPACK_IMPORTED_MODULE_3__lib_partial_liquid__["a" /* PartialLiquid */](this.variables);
        this.setStatus('ready');
    }
    CommandRunner.prototype.getFunctionFor = function (name) {
        if (!this.targets[name]) {
            throw new Error("There is no registered function to execute the \"" + name + "\" command.");
        }
        return this.targets[name];
    };
    CommandRunner.prototype.run = function () {
        if (this.canRun()) {
            return this.doRun();
        }
        else {
            return this.enqueueRun();
        }
    };
    CommandRunner.prototype.on = function (event, listener) {
        return this.events.on(event, listener);
    };
    CommandRunner.prototype.once = function (event, listener) {
        return this.events.once(event, listener);
    };
    CommandRunner.prototype.doRun = function () {
        this.setStatus('running');
        this.runNextCommand();
        return Promise.resolve(this);
    };
    CommandRunner.prototype.enqueueRun = function () {
        var _this = this;
        var doRun;
        var willRun = new Promise(function (resolve) {
            doRun = function () {
                resolve(_this.doRun());
            };
        });
        this.runQueue.push(doRun);
        return willRun;
    };
    CommandRunner.prototype.canRun = function () {
        return this.status !== 'running' && this.status !== 'waiting';
    };
    CommandRunner.prototype.setStatus = function (status) {
        this.events.emit(status);
        this.status = status;
    };
    CommandRunner.prototype.resetIndex = function () {
        this.nextIndex = 0;
    };
    CommandRunner.prototype.advanceIndex = function () {
        this.nextIndex++;
    };
    CommandRunner.prototype.runNextCommand = function () {
        var _this = this;
        if (this.status !== 'running')
            return;
        var cmd = this.commands[this.nextIndex];
        if (cmd) {
            this.advanceIndex();
            this.runCommand(cmd)
                .then(function (cmdReturn) { return _this.evaluateReturn(cmdReturn); })
                .then(function () { return _this.runNextCommand(); });
        }
        else {
            this.exit();
        }
    };
    CommandRunner.prototype.evaluateReturn = function (theReturn) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function () {
            var commands, requests, asyncCommands;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __generator */](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        commands = theReturn.commands, requests = theReturn.requests, asyncCommands = theReturn.asyncCommands;
                        if (asyncCommands)
                            this.asyncSeries(asyncCommands);
                        if (!commands) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.runNewSeries(commands)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [4 /*yield*/, this.evaluateRequests(requests)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    CommandRunner.prototype.evaluateRequests = function (requests) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function () {
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __generator */](this, function (_a) {
                if (!requests)
                    return [2 /*return*/];
                if (requests.some(function (r) { return r === 'exit'; }))
                    return [2 /*return*/, this.exit()];
                if (requests.some(function (r) { return r === 'pause'; }))
                    return [2 /*return*/, this.pause()];
                return [2 /*return*/];
            });
        });
    };
    CommandRunner.prototype.exit = function () {
        this.resetIndex();
        var runImmediately = this.runQueue.shift();
        if (runImmediately)
            return runImmediately();
        this.setStatus('done');
    };
    CommandRunner.prototype.pause = function () {
        this.setStatus('paused');
    };
    CommandRunner.prototype.asyncSeries = function (eventualCommands) {
        var _this = this;
        eventualCommands.then(function (commands) {
            _this.runNewSeries(commands)
                .catch(function (err) {
                var beginningMessage = err.message.slice(0, 10) + '...';
                console.error("the error thrown above (beginning \"" + beginningMessage + "\") was in an async branch");
            });
        });
    };
    CommandRunner.prototype.runNewSeries = function (commands) {
        var _this = this;
        return new Promise(function (res) {
            var runner = new CommandRunner({
                targetFunctions: _this.targets,
                commands: commands,
                variables: _this.variables
            });
            runner.once('done', res);
            runner.run();
        }).catch(function (err) {
            console.error('a child runner threw an error:');
            console.error(err);
            throw err;
        });
    };
    CommandRunner.prototype.runCommand = function (incomingCommand) {
        var cmd = this.replaceVariables(incomingCommand);
        var targetFunction = this.getFunctionFor(cmd.name);
        return targetFunction(cmd);
    };
    CommandRunner.prototype.replaceVariables = function (incoming) {
        var _this = this;
        var outgoing = Object(__WEBPACK_IMPORTED_MODULE_4__utils__["c" /* nearClone */])(incoming);
        outgoing = Object(__WEBPACK_IMPORTED_MODULE_2_happy_helpers__["traverseObject"])(outgoing, function (prop, value) {
            if (Object(__WEBPACK_IMPORTED_MODULE_2_happy_helpers__["toType"])(value) === 'string') {
                value = _this.replaceVariableInString(value);
            }
            return [prop, value];
        }, true, false);
        return outgoing;
    };
    CommandRunner.prototype.replaceVariableInString = function (str) {
        return this.replacer.replace(str);
    };
    return CommandRunner;
}());



/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var has = Object.prototype.hasOwnProperty
  , prefix = '~';

/**
 * Constructor to create a storage for our `EE` objects.
 * An `Events` instance is a plain object whose properties are event names.
 *
 * @constructor
 * @private
 */
function Events() {}

//
// We try to not inherit from `Object.prototype`. In some engines creating an
// instance in this way is faster than calling `Object.create(null)` directly.
// If `Object.create(null)` is not supported we prefix the event names with a
// character to make sure that the built-in object properties are not
// overridden or used as an attack vector.
//
if (Object.create) {
  Events.prototype = Object.create(null);

  //
  // This hack is needed because the `__proto__` property is still inherited in
  // some old browsers like Android 4, iPhone 5.1, Opera 11 and Safari 5.
  //
  if (!new Events().__proto__) prefix = false;
}

/**
 * Representation of a single event listener.
 *
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} [once=false] Specify if the listener is a one-time listener.
 * @constructor
 * @private
 */
function EE(fn, context, once) {
  this.fn = fn;
  this.context = context;
  this.once = once || false;
}

/**
 * Add a listener for a given event.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} context The context to invoke the listener with.
 * @param {Boolean} once Specify if the listener is a one-time listener.
 * @returns {EventEmitter}
 * @private
 */
function addListener(emitter, event, fn, context, once) {
  if (typeof fn !== 'function') {
    throw new TypeError('The listener must be a function');
  }

  var listener = new EE(fn, context || emitter, once)
    , evt = prefix ? prefix + event : event;

  if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
  else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
  else emitter._events[evt] = [emitter._events[evt], listener];

  return emitter;
}

/**
 * Clear event by name.
 *
 * @param {EventEmitter} emitter Reference to the `EventEmitter` instance.
 * @param {(String|Symbol)} evt The Event name.
 * @private
 */
function clearEvent(emitter, evt) {
  if (--emitter._eventsCount === 0) emitter._events = new Events();
  else delete emitter._events[evt];
}

/**
 * Minimal `EventEmitter` interface that is molded against the Node.js
 * `EventEmitter` interface.
 *
 * @constructor
 * @public
 */
function EventEmitter() {
  this._events = new Events();
  this._eventsCount = 0;
}

/**
 * Return an array listing the events for which the emitter has registered
 * listeners.
 *
 * @returns {Array}
 * @public
 */
EventEmitter.prototype.eventNames = function eventNames() {
  var names = []
    , events
    , name;

  if (this._eventsCount === 0) return names;

  for (name in (events = this._events)) {
    if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
  }

  if (Object.getOwnPropertySymbols) {
    return names.concat(Object.getOwnPropertySymbols(events));
  }

  return names;
};

/**
 * Return the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Array} The registered listeners.
 * @public
 */
EventEmitter.prototype.listeners = function listeners(event) {
  var evt = prefix ? prefix + event : event
    , handlers = this._events[evt];

  if (!handlers) return [];
  if (handlers.fn) return [handlers.fn];

  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i].fn;
  }

  return ee;
};

/**
 * Return the number of listeners listening to a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Number} The number of listeners.
 * @public
 */
EventEmitter.prototype.listenerCount = function listenerCount(event) {
  var evt = prefix ? prefix + event : event
    , listeners = this._events[evt];

  if (!listeners) return 0;
  if (listeners.fn) return 1;
  return listeners.length;
};

/**
 * Calls each of the listeners registered for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @returns {Boolean} `true` if the event had listeners, else `false`.
 * @public
 */
EventEmitter.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return false;

  var listeners = this._events[evt]
    , len = arguments.length
    , args
    , i;

  if (listeners.fn) {
    if (listeners.once) this.removeListener(event, listeners.fn, undefined, true);

    switch (len) {
      case 1: return listeners.fn.call(listeners.context), true;
      case 2: return listeners.fn.call(listeners.context, a1), true;
      case 3: return listeners.fn.call(listeners.context, a1, a2), true;
      case 4: return listeners.fn.call(listeners.context, a1, a2, a3), true;
      case 5: return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
      case 6: return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
    }

    for (i = 1, args = new Array(len -1); i < len; i++) {
      args[i - 1] = arguments[i];
    }

    listeners.fn.apply(listeners.context, args);
  } else {
    var length = listeners.length
      , j;

    for (i = 0; i < length; i++) {
      if (listeners[i].once) this.removeListener(event, listeners[i].fn, undefined, true);

      switch (len) {
        case 1: listeners[i].fn.call(listeners[i].context); break;
        case 2: listeners[i].fn.call(listeners[i].context, a1); break;
        case 3: listeners[i].fn.call(listeners[i].context, a1, a2); break;
        case 4: listeners[i].fn.call(listeners[i].context, a1, a2, a3); break;
        default:
          if (!args) for (j = 1, args = new Array(len -1); j < len; j++) {
            args[j - 1] = arguments[j];
          }

          listeners[i].fn.apply(listeners[i].context, args);
      }
    }
  }

  return true;
};

/**
 * Add a listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.on = function on(event, fn, context) {
  return addListener(this, event, fn, context, false);
};

/**
 * Add a one-time listener for a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn The listener function.
 * @param {*} [context=this] The context to invoke the listener with.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.once = function once(event, fn, context) {
  return addListener(this, event, fn, context, true);
};

/**
 * Remove the listeners of a given event.
 *
 * @param {(String|Symbol)} event The event name.
 * @param {Function} fn Only remove the listeners that match this function.
 * @param {*} context Only remove the listeners that have this context.
 * @param {Boolean} once Only remove one-time listeners.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeListener = function removeListener(event, fn, context, once) {
  var evt = prefix ? prefix + event : event;

  if (!this._events[evt]) return this;
  if (!fn) {
    clearEvent(this, evt);
    return this;
  }

  var listeners = this._events[evt];

  if (listeners.fn) {
    if (
      listeners.fn === fn &&
      (!once || listeners.once) &&
      (!context || listeners.context === context)
    ) {
      clearEvent(this, evt);
    }
  } else {
    for (var i = 0, events = [], length = listeners.length; i < length; i++) {
      if (
        listeners[i].fn !== fn ||
        (once && !listeners[i].once) ||
        (context && listeners[i].context !== context)
      ) {
        events.push(listeners[i]);
      }
    }

    //
    // Reset the array, or remove it completely if we have no more listeners.
    //
    if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
    else clearEvent(this, evt);
  }

  return this;
};

/**
 * Remove all listeners, or those of the specified event.
 *
 * @param {(String|Symbol)} [event] The event name.
 * @returns {EventEmitter} `this`.
 * @public
 */
EventEmitter.prototype.removeAllListeners = function removeAllListeners(event) {
  var evt;

  if (event) {
    evt = prefix ? prefix + event : event;
    if (this._events[evt]) clearEvent(this, evt);
  } else {
    this._events = new Events();
    this._eventsCount = 0;
  }

  return this;
};

//
// Alias methods names because people roll like that.
//
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.addListener = EventEmitter.prototype.on;

//
// Expose the prefix.
//
EventEmitter.prefixed = prefix;

//
// Allow `EventEmitter` to be imported as module namespace.
//
EventEmitter.EventEmitter = EventEmitter;

//
// Expose the module.
//
if (true) {
  module.exports = EventEmitter;
}


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PartialLiquid; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_happy_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_happy_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);
// Liquid markup (https://shopify.github.io/liquid/) inspired


var PartialLiquid = /** @class */ (function () {
    function PartialLiquid(variables) {
        this.variables = variables;
        this.LIQUID_ONE = /\{\{(.*?)( ?\| ?(.*)?)?\}\}/;
        this.LIQUID_ALL = new RegExp(this.LIQUID_ONE, 'g');
        this.implementedFilters = {
            'random': this.randomFilter.bind(this)
        };
    }
    PartialLiquid.prototype.replace = function (str) {
        var parts = this.getParts(str);
        if (!parts)
            return str;
        if (parts.whole === str) {
            return this.sendRawVar(str);
        }
        else {
            return this.replaceAsString(str);
        }
    };
    PartialLiquid.prototype.replaceAsString = function (str) {
        var _this = this;
        return str.replace(this.LIQUID_ALL, function (substring) {
            return _this.filteredVariable(substring).toString();
        });
    };
    PartialLiquid.prototype.getParts = function (str) {
        var matches = str.match(this.LIQUID_ONE);
        if (!matches)
            return null;
        var whole = matches[0], varName = matches[1], pipePhrase = matches[2], filter = matches[3];
        return { whole: whole, varName: varName, filter: filter };
    };
    PartialLiquid.prototype.sendRawVar = function (str) {
        var _this = this;
        var variable;
        str.replace(this.LIQUID_ALL, function (substring) {
            variable = _this.filteredVariable(substring);
            return substring;
        });
        return variable;
    };
    PartialLiquid.prototype.filteredVariable = function (substring) {
        var _a = this.getParts(substring), whole = _a.whole, varName = _a.varName, filter = _a.filter;
        if (filter) {
            return this.doFilter(varName, filter);
        }
        else {
            return this.variables[varName];
        }
    };
    PartialLiquid.prototype.doFilter = function (varName, filter) {
        var method = this.implementedFilters[filter];
        if (!method) {
            throw new Error("There is no filter called \"" + filter + "\"");
        }
        return method(varName);
    };
    PartialLiquid.prototype.randomFilter = function (varName) {
        var values = this.variables[varName];
        if (Object(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__["toType"])(values) !== 'array') {
            throw new Error('You cannot use the random filter on a non-array');
        }
        var randomIndex = Object(__WEBPACK_IMPORTED_MODULE_1__utils__["b" /* getRandomInt */])(0, values.length - 1);
        return values[randomIndex];
    };
    return PartialLiquid;
}());



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = qsaToArray;
/* unused harmony export querySelectorAll */
/* unused harmony export getAllVideos */
/* unused harmony export getCurrentVideo */
/* unused harmony export getNextVideo */
/* unused harmony export getAllAudioPlayers */
/* unused harmony export getAudioPlayerNamed */
/* unused harmony export getBgAudioPlayer */
/* unused harmony export getSfxAudioPlayer */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__scripts_lib_config__ = __webpack_require__(3);

function qsaToArray(qsa) {
    var index = 0;
    var outArray = [];
    for (index = 0; index < qsa.length; index++) {
        outArray.push(qsa[index]);
    }
    return outArray;
}
function querySelectorAll(selector) {
    return qsaToArray(document.querySelectorAll(selector));
}
function getAllVideos() {
    return qsaToArray(document.querySelectorAll("#" + __WEBPACK_IMPORTED_MODULE_0__scripts_lib_config__["a" /* defaults */].baseElementId + " video"));
}
function getCurrentVideo() {
    return document.getElementById('IV-video-player-1');
}
function getNextVideo() {
    return document.getElementById('IV-video-player-2');
}
function getAllAudioPlayers() {
    return qsaToArray(document.querySelectorAll("#" + __WEBPACK_IMPORTED_MODULE_0__scripts_lib_config__["a" /* defaults */].baseElementId + " audio"));
}
function getAudioPlayerNamed(name) {
    return document.getElementById("IV-audio-player-" + name.toLowerCase());
}
function getBgAudioPlayer() {
    return getAudioPlayerNamed('BG');
}
function getSfxAudioPlayer() {
    return getAudioPlayerNamed('SFX');
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__video_play_video__ = __webpack_require__(18);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_0__video_play_video__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__audio_audio_commands__ = __webpack_require__(20);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_1__audio_audio_commands__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_1__audio_audio_commands__["b"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__buttons_button_commands__ = __webpack_require__(22);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_2__buttons_button_commands__["a"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_2__buttons_button_commands__["b"]; });
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__buttons_button_commands__["c"]; });





/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return playVideoFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__video_controller__ = __webpack_require__(19);

var playVideoFactory = function (input) {
    var baseEl = input.settings.baseContainer;
    __WEBPACK_IMPORTED_MODULE_0__video_controller__["a" /* videoController */].createPlayers(baseEl);
    return { 'playVideo': function (cmd) {
            var ending = __WEBPACK_IMPORTED_MODULE_0__video_controller__["a" /* videoController */].playVideo("" + input.settings.baseVideoUrl + cmd.file);
            var returnObj = {};
            if (cmd.onComplete) {
                var completing = new Promise(function (res) {
                    ending.then(function () { return res(cmd.onComplete); });
                });
                returnObj.asyncCommands = completing;
            }
            return Promise.resolve(returnObj);
        } };
};


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return videoController; });
function createVideoPlayer(id) {
    var player = document.createElement('video');
    player.id = id;
    player.setAttribute('playsinline', 'true');
    player.setAttribute('disableRemotePlayback', 'true');
    var style = 'block'; // fixes the android black frame issue.  Aparently it does not like 'inline'
    player.style.display = style;
    return player;
}
var VideoController = /** @class */ (function () {
    function VideoController() {
        this.baseElement = document.body;
        this.isFirstPlay = true;
        this.players = {
            current: createVideoPlayer('IV-video-player-1'),
            standby: createVideoPlayer('IV-video-player-2'),
        };
    }
    VideoController.prototype.playVideo = function (url) {
        var standby = this.getStandbyPlayer();
        var current = this.getCurrentPlayer();
        standby.onloadeddata = function () {
            current.src = url;
            current.play();
        };
        standby.src = url;
        standby.load(); // essential for mobile safari
        return this.whenPlayerEnds(current);
    };
    VideoController.prototype.whenPlayerEnds = function (player) {
        return new Promise(function (resolve) {
            var onEnded = function () {
                resolve('video ended');
                player.removeEventListener('ended', onEnded);
            };
            player.addEventListener('ended', onEnded);
        });
    };
    VideoController.prototype.createPlayers = function (baseElement) {
        this.baseElement = baseElement;
        this.attachPlayers(); // multiple calls are fine... does not duplicate
    };
    VideoController.prototype.attachPlayers = function () {
        this.baseElement.appendChild(this.players.standby);
        this.baseElement.appendChild(this.players.current);
    };
    VideoController.prototype.getCurrentPlayer = function () {
        return this.players.current;
    };
    VideoController.prototype.getStandbyPlayer = function () {
        return this.players.standby;
    };
    return VideoController;
}());
var videoController = new VideoController();


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return audioSourceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return audioVolumeFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__audio_controller__ = __webpack_require__(21);

var audioSourceFactory = function (input) {
    var baseEl = input.settings.baseContainer;
    __WEBPACK_IMPORTED_MODULE_0__audio_controller__["a" /* audioController */].createPlayers(baseEl);
    if (input.settings.bgAudioUrl) {
        __WEBPACK_IMPORTED_MODULE_0__audio_controller__["a" /* audioController */].load('BG', input.settings.bgAudioUrl);
    }
    return { 'audioSource': function (cmd) {
            switch (cmd.do) {
                case 'play':
                    __WEBPACK_IMPORTED_MODULE_0__audio_controller__["a" /* audioController */].play(cmd.target, cmd.file);
                    break;
                case 'load':
                    __WEBPACK_IMPORTED_MODULE_0__audio_controller__["a" /* audioController */].load(cmd.target, cmd.file);
                    break;
                case 'pause':
                    __WEBPACK_IMPORTED_MODULE_0__audio_controller__["a" /* audioController */].pause(cmd.target);
                    break;
                default:
                    throw new Error("unexpected command for audio source: \"" + cmd.do + "\"");
            }
            var returnObj = {};
            return Promise.resolve(returnObj);
        } };
};
var audioVolumeFactory = function (input) {
    var baseEl = input.settings.baseContainer;
    __WEBPACK_IMPORTED_MODULE_0__audio_controller__["a" /* audioController */].createPlayers(baseEl);
    return {
        'audioVolume': function (cmd) {
            var returnObj = {};
            if (cmd.time) {
                __WEBPACK_IMPORTED_MODULE_0__audio_controller__["a" /* audioController */].volume(cmd.target, cmd.volume, cmd.time);
            }
            else {
                __WEBPACK_IMPORTED_MODULE_0__audio_controller__["a" /* audioController */].volume(cmd.target, cmd.volume);
            }
            return Promise.resolve(returnObj);
        }
    };
};


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return audioController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils__ = __webpack_require__(0);


function createAudioPlayer(id) {
    var player = document.createElement('audio');
    player.id = id;
    return player;
}
var AudioController = /** @class */ (function () {
    function AudioController() {
        this._fadeInterval = 200;
        this.baseElement = document.body;
        this.players = {
            bg: createAudioPlayer('IV-audio-player-bg'),
            sfx: createAudioPlayer('IV-audio-player-sfx'),
        };
    }
    AudioController.prototype.play = function (playerName, url) {
        var player = this.getPlayerNamed(playerName);
        if (url && player.src !== url) {
            player.src = url;
        }
        player.play();
        return this.whenPlayerEnds(player);
    };
    AudioController.prototype.pause = function (playerName) {
        var player = this.getPlayerNamed(playerName);
        player.pause();
        return Promise.resolve('audio paused');
    };
    AudioController.prototype.load = function (playerName, url) {
        var player = this.getPlayerNamed(playerName);
        if (url && player.src !== url) {
            player.src = url;
        }
        return this.whenPlayerLoads(player);
    };
    AudioController.prototype.volume = function (playerName, volume, time) {
        var player = this.getPlayerNamed(playerName);
        if (time && time > this._fadeInterval) {
            this.fadeOverTime(player, volume, time);
        }
        else {
            player.volume = volume;
        }
        return Promise.resolve('audio volume adjusted');
    };
    AudioController.prototype.fadeOverTime = function (player, desiredVolume, time) {
        return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](this, void 0, void 0, function () {
            function percentComplete() {
                var traveled = Date.now() - startTime;
                currentPercent = Math.min(traveled / time, 1);
                return currentPercent;
            }
            var startTime, startVolume, totalAdjustment, currentPercent;
            return __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __generator */](this, function (_a) {
                switch (_a.label) {
                    case 0:
                        startTime = Date.now();
                        startVolume = player.volume;
                        totalAdjustment = desiredVolume - startVolume;
                        currentPercent = 0;
                        _a.label = 1;
                    case 1:
                        if (!(currentPercent < 1)) return [3 /*break*/, 3];
                        player.volume = startVolume + (totalAdjustment * percentComplete());
                        if (currentPercent === 1)
                            player.volume = desiredVolume;
                        return [4 /*yield*/, Object(__WEBPACK_IMPORTED_MODULE_1__utils__["e" /* wait */])(this._fadeInterval)];
                    case 2:
                        _a.sent();
                        return [3 /*break*/, 1];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AudioController.prototype.whenPlayerEnds = function (player) {
        return new Promise(function (resolve) {
            var onEnded = function () {
                resolve('audio ended');
                player.removeEventListener('ended', onEnded);
            };
            player.addEventListener('ended', onEnded);
        });
    };
    AudioController.prototype.whenPlayerLoads = function (player) {
        return new Promise(function (resolve) {
            var onEnded = function () {
                resolve('audio loaded');
                player.removeEventListener('loadeddata', onEnded);
            };
            player.addEventListener('loadeddata', onEnded);
        });
    };
    AudioController.prototype.createPlayers = function (baseElement) {
        this.baseElement = baseElement;
        this.attachPlayers(); // multiple calls are fine... does not duplicate
    };
    AudioController.prototype.attachPlayers = function () {
        this.baseElement.appendChild(this.players.bg);
        this.baseElement.appendChild(this.players.sfx);
    };
    AudioController.prototype.getBgPlayer = function () {
        return this.players.bg;
    };
    AudioController.prototype.getSfxPlayer = function () {
        return this.players.sfx;
    };
    AudioController.prototype.getPlayerNamed = function (name) {
        return this.players[name.toLowerCase()];
    };
    return AudioController;
}());
var audioController = new AudioController();


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return addButtonFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return removeButtonFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return removeAllButtonsFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buttons_controller__ = __webpack_require__(23);

var addButtonFactory = function (input) {
    var baseEl = input.settings.baseContainer;
    return { 'addButton': function (cmd) {
            var settings = {
                onClick: function () { return input.commandEngine.runCommands(cmd.onClick); },
                text: cmd.text,
                id: cmd.id,
            };
            __WEBPACK_IMPORTED_MODULE_0__buttons_controller__["a" /* buttonsController */].createButton(settings, baseEl);
            return Promise.resolve({});
        } };
};
var removeButtonFactory = function (input) {
    var baseEl = input.settings.baseContainer;
    return { 'removeButton': function (cmd) {
            __WEBPACK_IMPORTED_MODULE_0__buttons_controller__["a" /* buttonsController */].removeButton(cmd.id);
            return Promise.resolve({});
        } };
};
var removeAllButtonsFactory = function (input) {
    var baseEl = input.settings.baseContainer;
    return { 'removeAllButtons': function (cmd) {
            __WEBPACK_IMPORTED_MODULE_0__buttons_controller__["a" /* buttonsController */].removeAllButtons();
            return Promise.resolve({});
        } };
};


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return buttonsController; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_happy_helpers__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_happy_helpers___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__config__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils__ = __webpack_require__(0);



var ButtonsController = /** @class */ (function () {
    function ButtonsController() {
        this.allButtons = [];
    }
    ButtonsController.prototype.createButton = function (settings, element) {
        var button = this.newButton(settings);
        this.addToButtonStore(button);
        this.appendToDocument(button, element);
        return button;
    };
    ButtonsController.prototype.removeAllButtons = function () {
        this.allButtons = this.allButtons.reduce(function (a, b) {
            b.remove();
            return a;
        }, []);
    };
    ButtonsController.prototype.removeButton = function (id) {
        this.allButtons.filter(function (b) { return b.id === id; })
            .forEach(function (b) { return b.remove(); });
    };
    ButtonsController.prototype.newButton = function (settings) {
        var button = document.createElement('button');
        this.applySettingsToButton(button, settings);
        return button;
    };
    ButtonsController.prototype.applySettingsToButton = function (button, settings) {
        var attrs = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["c" /* nearClone */])(settings);
        attrs.onclick = attrs.onClick;
        delete attrs.onClick;
        button.innerHTML = attrs.text;
        delete attrs.text;
        Object(__WEBPACK_IMPORTED_MODULE_0_happy_helpers__["traverseObject"])(attrs, function (prop, value) {
            button[prop] = value;
        }, false, false);
    };
    ButtonsController.prototype.addToButtonStore = function (button) {
        this.allButtons.push(button);
    };
    ButtonsController.prototype.appendToDocument = function (button, parentEl) {
        var container = this.getContainer(parentEl);
        container.appendChild(button);
    };
    ButtonsController.prototype.getContainer = function (parentEl) {
        var parent = parentEl || this.baseElement();
        var foundContainer = Object(__WEBPACK_IMPORTED_MODULE_2__utils__["a" /* directDescendants */])(parent, "." + __WEBPACK_IMPORTED_MODULE_1__config__["a" /* defaults */].buttonContainerClass)[0];
        if (foundContainer)
            return foundContainer;
        var newContainer = document.createElement('div');
        newContainer.setAttribute('class', __WEBPACK_IMPORTED_MODULE_1__config__["a" /* defaults */].buttonContainerClass);
        parent.appendChild(newContainer);
        return newContainer;
    };
    ButtonsController.prototype.baseElement = function () {
        return document.getElementById(__WEBPACK_IMPORTED_MODULE_1__config__["a" /* defaults */].baseElementId);
    };
    return ButtonsController;
}());
var buttonsController = new ButtonsController();


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__assign_variable__ = __webpack_require__(25);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "b", function() { return __WEBPACK_IMPORTED_MODULE_0__assign_variable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__assign_from_variable__ = __webpack_require__(26);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_1__assign_from_variable__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__get_random_number__ = __webpack_require__(27);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "f", function() { return __WEBPACK_IMPORTED_MODULE_2__get_random_number__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__switch__ = __webpack_require__(28);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "j", function() { return __WEBPACK_IMPORTED_MODULE_3__switch__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__calculate__ = __webpack_require__(29);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "c", function() { return __WEBPACK_IMPORTED_MODULE_4__calculate__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__go_to_node__ = __webpack_require__(30);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "g", function() { return __WEBPACK_IMPORTED_MODULE_5__go_to_node__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__stop_execution__ = __webpack_require__(31);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "i", function() { return __WEBPACK_IMPORTED_MODULE_6__stop_execution__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__pause_execution__ = __webpack_require__(32);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "h", function() { return __WEBPACK_IMPORTED_MODULE_7__pause_execution__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__execute_sync__ = __webpack_require__(33);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "e", function() { return __WEBPACK_IMPORTED_MODULE_8__execute_sync__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__execute_async__ = __webpack_require__(34);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "d", function() { return __WEBPACK_IMPORTED_MODULE_9__execute_async__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__wait__ = __webpack_require__(35);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "k", function() { return __WEBPACK_IMPORTED_MODULE_10__wait__["a"]; });













/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return assignVariableFactory; });
var assignVariableFactory = function (input) {
    return {
        'assignVariable': function (cmd) {
            input.variables[cmd.assignTo] = cmd.value;
            return Promise.resolve({});
        }
    };
};


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return assignFromVariableFactory; });
var assignFromVariableFactory = function (input) {
    return {
        'assignFromVariable': function (cmd) {
            input.variables[cmd.assignTo] = input.variables[cmd.varName];
            return Promise.resolve({});
        }
    };
};


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return getRandomNumberFactory; });
/* unused harmony export getRandomNumber */
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils__ = __webpack_require__(0);

var getRandomNumberFactory = function (input) {
    return {
        'getRandomNumber': function (cmd) {
            return Promise.resolve(getRandomNumber(input, cmd));
        }
    };
};
function getRandomNumber(given, cmd) {
    given.variables[cmd.assignTo] = Object(__WEBPACK_IMPORTED_MODULE_0__utils__["b" /* getRandomInt */])(cmd.min, cmd.max);
    return {};
}


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return switchFactory; });
/* unused harmony export doSwitch */
var switchFactory = function (input) {
    return {
        'switch': function (cmd) {
            return Promise.resolve(doSwitch(input, cmd));
        }
    };
};
function doSwitch(given, cmd) {
    var variables = given.variables;
    var winningCommands;
    cmd.do.forEach(function (condition) {
        if (winningCommands)
            return;
        winningCommands = winningCommandsOrNull(condition, variables);
    });
    var commands = winningCommands || cmd.defaultCommands;
    return { commands: commands };
}
function winningCommandsOrNull(condition, variables) {
    var operator = determineOperator(condition);
    var variable = variables[condition.varName];
    var operand = condition[operator];
    if (checkCondition(operator, variable, operand)) {
        return condition.commands;
    }
    return null;
}
function lowest(arr) {
    return Math.min.apply(Math, arr);
}
function highest(arr) {
    return Math.max.apply(Math, arr);
}
var operatorFunctions = {
    is: function (variable, operand) { return variable === operand; },
    isGreaterThan: function (variable, operand) { return variable > operand; },
    isLessThan: function (variable, operand) { return variable < operand; },
    isGreaterThanOrEqualTo: function (variable, operand) { return variable >= operand; },
    isLessThanOrEqualTo: function (variable, operand) { return variable <= operand; },
    isBetween: function (variable, arr) { return (lowest(arr) <= variable) && (variable <= highest(arr)); }
};
function determineOperator(singleDo) {
    for (var prop in singleDo) {
        if (operatorFunctions.hasOwnProperty(prop)) {
            return prop;
        }
    }
    var unusedProps = [];
    for (var unusedProp in singleDo) {
        if (singleDo.hasOwnProperty(unusedProp)) {
            unusedProps.push(unusedProp);
        }
    }
    throw new Error("could not find a valid operator in switch.do. Given these possibilities: " + unusedProps.join(', '));
}
function checkCondition(operator, variable, operand) {
    var opFunc = operatorFunctions[operator];
    return opFunc(variable, operand);
}


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return calculateFactory; });
/* unused harmony export doCalculate */
var calculateFactory = function (input) {
    return {
        'calculate': function (cmd) {
            return Promise.resolve(doCalculate(input, cmd));
        }
    };
};
function doCalculate(given, cmd) {
    var variables = given.variables;
    var operation = cmd.operation, varName = cmd.varName, value = cmd.value, assignTo = cmd.assignTo;
    var startingValue = variables[varName];
    variables[assignTo] =
        getOperation(operation)(startingValue, value);
    return {};
}
var operations = {
    add: function (val1, val2) { return val1 + val2; },
    subtract: function (val1, val2) { return val1 - val2; },
    multiply: function (val1, val2) { return val1 * val2; },
    divide: function (val1, val2) { return val1 / val2; },
    divideThenRemainder: function (val1, val2) { return val1 % val2; },
    divideThenRoundDown: function (val1, val2) { return Math.floor(val1 / val2); },
    divideThenRoundUp: function (val1, val2) { return Math.ceil(val1 / val2); },
    divideThenRound: function (val1, val2) { return Math.round(val1 / val2); },
    round: function (val1) { return Math.round(val1); },
    roundUp: function (val1) { return Math.ceil(val1); },
    roundDown: function (val1) { return Math.floor(val1); },
};
function getOperation(operator) {
    var theOperation = operations[operator];
    if (!theOperation) {
        throw new Error("There is no \"" + operator + "\" operator in the calculate command");
    }
    return theOperation;
}


/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return goToNodeFactory; });
var goToNodeFactory = function (input) {
    return {
        'goToNode': function (cmd) {
            input.commandEngine.runNodeByName(cmd.nodeName);
            return Promise.resolve({});
        }
    };
};


/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return stopExecutionFactory; });
var stopExecutionFactory = function (input) {
    return {
        'stopExecution': function (cmd) {
            var returnObj = {
                requests: ['exit'],
            };
            return Promise.resolve(returnObj);
        }
    };
};


/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return pauseExecutionFactory; });
var pauseExecutionFactory = function (input) {
    return {
        'pauseExecution': function (cmd) {
            var returnObj = {
                requests: ['pause'],
            };
            return Promise.resolve(returnObj);
        }
    };
};


/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return executeSyncFactory; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_tslib__ = __webpack_require__(2);
var _this = this;

var executeSyncFactory = function (input) {
    return {
        'executeSync': function (cmd) {
            var returnObj = {};
            return new Promise(function (resolve) { return __WEBPACK_IMPORTED_MODULE_0_tslib__["a" /* __awaiter */](_this, void 0, void 0, function () {
                return __WEBPACK_IMPORTED_MODULE_0_tslib__["b" /* __generator */](this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, input.commandEngine.runNodeByName(cmd.nodeName)];
                        case 1:
                            (_a.sent()).once('done', function () { return resolve(returnObj); });
                            return [2 /*return*/];
                    }
                });
            }); });
        }
    };
};


/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return executeAsyncFactory; });
var executeAsyncFactory = function (input) {
    return {
        'executeAsync': function (cmd) {
            var returnObj = {};
            input.commandEngine.runNodeByName(cmd.nodeName);
            return Promise.resolve(returnObj);
        }
    };
};


/***/ }),
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return waitFactory; });
var waitFactory = function (input) {
    return {
        'wait': function (cmd) {
            var returnObj = {};
            return new Promise(function (resolve) {
                setTimeout(function () { return resolve(returnObj); }, cmd.time);
            });
        }
    };
};


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__log__ = __webpack_require__(37);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__log__["a"]; });



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return logFactory; });
var logFactory = function (input) {
    return {
        'log': function (cmd) {
            if (cmd.value == null) {
                console.log(input.variables);
            }
            else {
                console.log(cmd.value);
            }
            return Promise.resolve({});
        }
    };
};


/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__execute_js__ = __webpack_require__(39);
/* harmony namespace reexport (by used) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__execute_js__["a"]; });



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return executeJsFactory; });
var executeJsFactory = function (input) {
    return {
        'executeJs': function (cmd) {
            return Promise.resolve(cmd.func()).then(function () { return ({}); });
        }
    };
};


/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = (function (nav) {
    isMobile = function () {
        var check = false;
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(nav) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(nav.substr(0, 4))
        ) check = true;
        return check;
    };

    isMobileOrTablet = function () {
        var check = false;
        if (
            /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino|android|ipad|playbook|silk/i.test(nav) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(nav.substr(0, 4))
        ) check = true;
        return check;
    };

    return {
        isMobile: isMobile,
        isMobileOrTablet: isMobileOrTablet
    }

}(navigator.userAgent || navigator.vendor || window.opera));

/***/ })
/******/ ])));
//# sourceMappingURL=iv.js.map