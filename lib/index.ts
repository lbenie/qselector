import isDom from 'is-dom';

const errorSelector = 'Selector does not exists in the DOM';

interface IQueryType {
  single: boolean;
  multiple: boolean;
}

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

const errorHanler = (isSingle: boolean, { el, selector }: { el: any, selector: any }): boolean => {
  const root = document.querySelector(el);
  const isNan = isNanOrInfinite(el, selector);

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


const core = (type: boolean, ...args: Array<any>): HTMLElement | Array<HTMLElement> | Error => {
  const isSingle = type === queryType.single;
  const [el, selector] = args;
  const root = document.querySelector(el);

  if (errorHanler(isSingle, { el, selector })) {
    if (selector) {
      return isSingle ? root.querySelector(selector) : [...root.querySelectorAll(selector)];
    }
    return isSingle ? root : Array.from(document.querySelectorAll(el));
  }

  throw new Error(errorSelector);
};


const $ = (el: any, selector?: any) => core(queryType.single, el, selector);

const $$ = (el: any, selector?: any) => core(queryType.multiple, el, selector);

export {
  $,
  $$,
};