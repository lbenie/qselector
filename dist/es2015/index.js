import isDom from 'is-dom';
const errorSelector = 'Selector does not exists in the DOM';
const queryType = {
    single: true,
    multiple: false,
};
const isNanOrInfinite = (el, selector) => {
    const result = [
        Number.isNaN(el),
        Number.isNaN(selector),
        Number.isFinite(el),
        Number.isFinite(selector),
    ];
    return result.some(x => x);
};
const errorHanler = (isSingle, { el, selector }) => {
    const root = document.querySelector(el);
    const isNan = isNanOrInfinite(el, selector);
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
    return selector ?
        isDom(...root.querySelectorAll(selector)) :
        isDom(...Array.from(document.querySelectorAll(el)));
};
const core = (type, ...args) => {
    const isSingle = type === queryType.single;
    const [el, selector] = args;
    const root = document.querySelector(el || '');
    if (!root || !el) {
        throw new Error(errorSelector);
    }
    if (errorHanler(isSingle, { el, selector })) {
        if (selector) {
            return isSingle ? root.querySelector(selector) : [...root.querySelectorAll(selector)];
        }
        return isSingle ? root : Array.from(document.querySelectorAll(el));
    }
    throw new Error(errorSelector);
};
const $ = (el, selector) => core(queryType.single, el, selector);
const $$ = (el, selector) => core(queryType.multiple, el, selector);
export { $, $$, };
//# sourceMappingURL=index.js.map