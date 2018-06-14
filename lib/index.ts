import isDom from 'is-dom';

const errorSelector = 'Selector does not exists in the DOM';

const queryType = {
  single: true,
  multiple: false,
};

const isNanOrInfinite = (el: any, selector: any) => {
  const result = [
    Number.isNaN(el),
    Number.isNaN(selector),
    Number.isFinite(el),
    Number.isFinite(selector),
  ];

  return result.some(x => x);
};

const errorHanler = (isSingle: boolean, { el, selector }:
{ el: string, selector: string | undefined }): boolean => {
  const root = document.querySelector<HTMLElement>(el);
  const isNan = isNanOrInfinite(el, selector);

  if (!root) {
    return false;
  }

  if (isNan && isNan.toString().length !== 0) {
    throw new Error(errorSelector);
  } else if (isSingle) {
    return selector ?
      isDom(root.querySelector(selector)) :
      isDom(root);
  }

  return selector ?
    isDom(...root.querySelectorAll(selector)) :
    isDom(...Array.from(document.querySelectorAll(el)));
};


const core = (type: boolean, ...args: Array<string | undefined>) => {
  const isSingle = type === queryType.single;
  const [el, selector] = args;
  const root = document.querySelector<HTMLElement>(el || '');

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

const $ = (el: string, selector?: string) => core(queryType.single, el, selector);

const $$ = (el: string, selector?: string) => core(queryType.multiple, el, selector);

export {
  $,
  $$,
};
