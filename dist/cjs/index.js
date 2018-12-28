"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var is_dom_1 = require("is-dom");
var errorSelector = 'Selector does not exists in the DOM';
var queryType = {
    single: true,
    multiple: false,
};
var isNanOrInfinite = function (el, selector) {
    var result = [
        Number.isNaN(el),
        Number.isNaN(selector),
        Number.isFinite(el),
        Number.isFinite(selector),
    ];
    return result.some(function (x) { return x; });
};
var errorHanler = function (isSingle, _a) {
    var el = _a.el, selector = _a.selector;
    var root = document.querySelector(el);
    var isNan = isNanOrInfinite(el, selector);
    if (!root) {
        return false;
    }
    if (isNan && isNan.toString().length !== 0) {
        throw new Error(errorSelector);
    }
    else if (isSingle) {
        return selector ?
            is_dom_1.default(root.querySelector(selector)) :
            is_dom_1.default(root);
    }
    return selector ? is_dom_1.default.apply(void 0, root.querySelectorAll(selector)) : is_dom_1.default.apply(void 0, Array.from(document.querySelectorAll(el)));
};
var core = function (type) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var isSingle = type === queryType.single;
    var el = args[0], selector = args[1];
    var root = document.querySelector(el || '');
    if (!root || !el) {
        throw new Error(errorSelector);
    }
    if (errorHanler(isSingle, { el: el, selector: selector })) {
        if (selector) {
            return isSingle ? root.querySelector(selector) : root.querySelectorAll(selector).slice();
        }
        return isSingle ? root : Array.from(document.querySelectorAll(el));
    }
    throw new Error(errorSelector);
};
var $ = function (el, selector) { return core(queryType.single, el, selector); };
exports.$ = $;
var $$ = function (el, selector) { return core(queryType.multiple, el, selector); };
exports.$$ = $$;
//# sourceMappingURL=index.js.map