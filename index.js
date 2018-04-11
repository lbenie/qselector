import isString from 'lodash/isString';
import isDom from 'is-dom';

const isSelectorString = (selector) => {
  if (isString(selector)) {
    return true;
  }

  throw new Error('Selector must be a string');
};

const $ = (selector, rootNode = undefined) => {
  if (rootNode) {
    const root = document.querySelector(rootNode);

    if (isDom(root) && isSelectorString(selector)) {
      return root.querySelector(selector);
    }
  } else if (isSelectorString(selector)) {
    return document.querySelector(selector);
  }

  return undefined;
};

const $$ = (selector, rootNode = undefined) => {
  if (rootNode) {
    const root = document.querySelector(selector);

    if (isDom(root) && isSelectorString(rootNode)) {
      return [...root.querySelectorAll(rootNode)];
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
