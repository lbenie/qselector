import isString from 'lodash/isString';
import isDom from 'is-dom';

const errorSelector = 'Selector must be a string';

const isSelectorString = (selector) => {
  if (isString(selector)) {
    return true;
  }

  throw new Error(errorSelector);
};

const $ = (selector, context = undefined) => {
  if (context) {
    const root = document.querySelector(context);

    if (isDom(root)) {
      return isSelectorString(selector) ? root.querySelector(selector) : undefined;
    }
  } else if (isSelectorString(selector)) {
    return document.querySelector(selector);
  }

  return undefined;
};

const $$ = (selector, context = undefined) => {
  if (context) {
    const root = document.querySelectorAll(context);

    if (isDom(root)) {
      return isSelectorString(selector) ? [...root.querySelectorAll(selector)] : undefined;
    }
  } else if (isSelectorString(selector)) {
    return [...document.querySelectorAll(selector)];
  }

  return undefined;
};

export {
  $,
  $$,
};
