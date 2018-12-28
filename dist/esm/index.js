var __read = (this && this.__read) || function (o, n) {
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
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
import isDom from 'is-dom';
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
            isDom(root.querySelector(selector)) :
            isDom(root);
    }
    return selector ? isDom.apply(void 0, __spread(root.querySelectorAll(selector))) : isDom.apply(void 0, __spread(Array.from(document.querySelectorAll(el))));
};
var core = function (type) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var isSingle = type === queryType.single;
    var _a = __read(args, 2), el = _a[0], selector = _a[1];
    var root = document.querySelector(el || '');
    if (!root || !el) {
        throw new Error(errorSelector);
    }
    if (errorHanler(isSingle, { el: el, selector: selector })) {
        if (selector) {
            return isSingle ? root.querySelector(selector) : __spread(root.querySelectorAll(selector));
        }
        return isSingle ? root : Array.from(document.querySelectorAll(el));
    }
    throw new Error(errorSelector);
};
var $ = function (el, selector) { return core(queryType.single, el, selector); };
var $$ = function (el, selector) { return core(queryType.multiple, el, selector); };
export { $, $$, };
//# sourceMappingURL=index.js.map