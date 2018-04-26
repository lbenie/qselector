import isDom from 'is-dom';
import { $, $$ } from '../';

const invalidSelector = 'The string "", is not a valid CSS selector';
const errorSelector = 'Selector does not exists in the DOM';

describe('qselect', () => {
  beforeAll(() => {
    document.body.innerHTML = `
      <div class="test">
        <span>s</span>
        <div class="lol">
          <span>t</span>
          <span>r</span>
        </div>
      </div>
    `;
  });

  describe('$', () => {
    it('should be a function', () => {
      expect(typeof $).toEqual('function');
    });

    describe('$(el)', () => {
      it('should get a node if el exists in the DOM', () => {
        const node = $('span');

        expect(node.innerHTML).toBe('s');
      });

      it('should be a node if el exists in the DOM', () => {
        const node = $('div');

        expect(isDom(node)).toBeTruthy();
      });

      it('should throw if el does not exist in the DOM', () => {
        expect(() => {
          $('input');
        }).toThrowError(errorSelector);
      });

      it('should throw if el is undefined', () => {
        expect(() => {
          $(undefined);
        }).toThrowError(errorSelector);
      });

      it('should be null if el is null', () => {
        expect(() => {
          $(null);
        }).toThrowError(errorSelector);
      });

      it('should throw if el is Nan', () => {
        expect(() => {
          $(NaN);
        }).toThrowError(errorSelector);
      });

      it('should throw if el is Infinity', () => {
        expect(() => {
          $(Infinity);
        }).toThrowError(errorSelector);
      });

      it('should throw if el is a Boolean', () => {
        expect(() => {
          $(Boolean);
        }).toThrowError();
      });

      it('should throw if el is an empty Object', () => {
        expect(() => {
          $({});
        }).toThrowError();
      });

      it('should throw if el is a RegExp', () => {
        expect(() => {
          $(new RegExp());
        }).toThrowError();
      });

      it('should throw if el is a Date', () => {
        expect(() => {
          $(new Date());
        }).toThrowError();
      });

      it('should throw if el is an Array', () => {
        expect(() => {
          $([]);
        }).toThrowError();
      });

      it('should throw if el is an Integer', () => {
        expect(() => {
          $(1);
        }).toThrowError();
      });

      it('should throw if el is an empty string', () => {
        expect(() => {
          $('');
        }).toThrowError(invalidSelector);
      });
    });

    describe('$(el, selector)', () => {
      it('should get a node if el exists and the selector exists in the DOM', () => {
        const node = $('.lol', 'span');

        expect(node.innerHTML).toBe('t');
      });

      it('should be a node if el exists and the selector exists in the DOM', () => {
        const node = $('div', 'span');

        expect(isDom(node)).toBeTruthy();
      });

      it('should be a node if el exists and selector is undefined', () => {
        const node = $('div', undefined);

        expect(isDom(node)).toBeTruthy();
      });

      it('should be a node if el exists and selector is null', () => {
        const node = $('div', null);

        expect(isDom(node)).toBeTruthy();
      });

      it('should throw if el exists and the selector does not exist in the DOM', () => {
        expect(() => {
          $('span', 'input');
        }).toThrowError(errorSelector);
      });

      it('should throw if el exists in the DOM and selector is NaN', () => {
        expect(() => {
          $('div', NaN);
        }).toThrowError(errorSelector);
      });

      it('should throw if el exists in the DOM and selector is Infinity', () => {
        expect(() => {
          $('.lol', Infinity);
        }).toThrowError(errorSelector);
      });

      it('should throw if el exists in the DOM and selector is a Boolean', () => {
        expect(() => {
          $('.lol', Boolean);
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is an empty Object', () => {
        expect(() => {
          $('.lol', {});
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is a RegExp', () => {
        expect(() => {
          $('.lol', new RegExp());
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is a Date', () => {
        expect(() => {
          $('.lol', new Date());
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is a Array', () => {
        expect(() => {
          $('.lol', []);
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is an Integer', () => {
        expect(() => {
          $('.lol', 1);
        }).toThrow();
      });
    });
  });

  describe('$$', () => {
    it('should be a function', () => {
      expect(typeof $$).toBe('function');
    });

    describe('$$(el)', () => {
      it('should be a node list if el exists in the DOM', () => {
        const node = $$('span');
        expect(node.length).toBeGreaterThanOrEqual(1);
      });

      it('should be an array if el exists in the DOM', () => {
        const node = $$('div');
        expect(Array.isArray(node)).toBeTruthy();
      });

      it('should throw if el does not exist in the DOM', () => {
        expect(() => {
          $$('input');
        }).toThrowError(errorSelector);
      });

      it('should throw if el is undefined', () => {
        expect(() => {
          $$(undefined);
        }).toThrowError(errorSelector);
      });

      it('should throw if el is null', () => {
        expect(() => {
          $$(null);
        }).toThrowError(errorSelector);
      });

      it('should throw if el is Nan', () => {
        expect(() => {
          $$(NaN);
        }).toThrowError(errorSelector);
      });

      it('should throw if el is Infinity', () => {
        expect(() => {
          $$(Infinity);
        }).toThrowError(errorSelector);
      });

      it('should throw if el is a Boolean', () => {
        expect(() => {
          $$(Boolean);
        }).toThrow();
      });

      it('should throw if el is an empty Object', () => {
        expect(() => {
          $$({});
        }).toThrow();
      });

      it('should throw if el is a RegExp', () => {
        expect(() => {
          $$(new RegExp());
        }).toThrow();
      });

      it('should throw if el is a Date', () => {
        expect(() => {
          $$(new Date());
        }).toThrow();
      });

      it('should throw if el is an Array', () => {
        expect(() => {
          $$([]);
        }).toThrow();
      });

      it('should throw if el is an Integer', () => {
        expect(() => {
          $$(1);
        }).toThrow();
      });

      it('should throw if el is an empty string', () => {
        expect(() => {
          $$('');
        }).toThrowError(invalidSelector);
      });
    });

    describe('$$(el, selector)', () => {
      it('should be a node list if el exists and selector exists in the DOM', () => {
        const node = $$('div', 'span');
        expect(node.length).toBeGreaterThanOrEqual(1);
      });

      it('should throw if el exists and selector does not exist in the DOM', () => {
        expect(() => {
          $$('div', 'input');
        }).toThrowError(errorSelector);
      });

      it('should be an array if el exists and selector exists in the DOM', () => {
        const node = $$('div', 'span');
        expect(Array.isArray(node)).toBeTruthy();
      });

      it('should throw if el is undefined and selector is undefined', () => {
        expect(() => {
          $$(undefined, undefined);
        }).toThrowError(errorSelector);
      });

      it('should throw if el is null and selector is null', () => {
        expect(() => {
          $$(null, null);
        }).toThrowError(errorSelector);
      });

      it('should be a node list if el exists and selector is undefined', () => {
        const node = $$('div', undefined);

        expect(node.length).toBeGreaterThanOrEqual(1);
      });

      it('should be a node list if el exists and selector is null', () => {
        const node = $$('div', null);

        expect(node.length).toBeGreaterThanOrEqual(1);
      });

      it('should throw if el exists and the selector does not exist in the DOM', () => {
        expect(() => {
          $$('span', 'input');
        }).toThrowError(errorSelector);
      });

      it('should throw if el exists in the DOM and selector is NaN', () => {
        expect(() => {
          $$('div', NaN);
        }).toThrowError(errorSelector);
      });

      it('should throw if el exists in the DOM and selector is Infinity', () => {
        expect(() => {
          $$('.lol', Infinity);
        }).toThrowError(errorSelector);
      });

      it('should throw if el exists in the DOM and selector is a Boolean', () => {
        expect(() => {
          $$('.lol', Boolean);
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is an empty Object', () => {
        expect(() => {
          $$('.lol', {});
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is a RegExp', () => {
        expect(() => {
          $$('.lol', new RegExp());
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is a Date', () => {
        expect(() => {
          $$('.lol', new Date());
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is a Array', () => {
        expect(() => {
          $$('.lol', []);
        }).toThrow();
      });

      it('should throw if el exists in the DOM and selector is an Integer', () => {
        expect(() => {
          $$('.lol', 1);
        }).toThrow();
      });
    });
  });
});
