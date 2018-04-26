import isDom from 'is-dom';

const errorSelector = 'Selector does not exists in the DOM';
const queryType = {
  single: '$',
  multiple: '$$',
};

const isNan = (el, selector) => {
  const result = [
    Number.isNaN(el),
    Number.isNaN(selector),
  ];

  return result.find(x => x === true);
};

const isInfinity = (el, selector) => {
  const result = [
    Number.isFinite(el),
    Number.isFinite(selector),
  ];

  return result.find(x => x === false);
};

const errorHanler = (isSingle, { el, selector }) => {
  const root = document.querySelector(el);

  if (isNan(el, selector) || isInfinity(el, selector)) {
    throw new Error(errorSelector);
  } else if (isSingle) {
    return selector ?
      isDom(root.querySelector(selector)) :
      isDom(root);
  }

  return selector ?
    isDom(...root.querySelectorAll(selector)) :
    isDom(...document.querySelectorAll(el));
};


const core = (type, ...args) => {
  const isSingle = type === queryType.single;
  const [el, selector] = args;
  const root = document.querySelector(el);

  if (errorHanler(isSingle, { el, selector })) {
    if (selector) {
      return isSingle ? root.querySelector(selector) : [...root.querySelectorAll(selector)];
    }
    return isSingle ? root : [...document.querySelectorAll(el)];
  }

  throw new Error(errorSelector);
};

const $ = (el, selector = undefined) => core(queryType.single, el, selector);

const $$ = (el, selector = undefined) => core(queryType.multiple, el, selector);

export {
  $,
  $$,
};
