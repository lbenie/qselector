# qselector

[![Build Status](https://travis-ci.org/lbenie/qselector.svg?branch=master)](https://travis-ci.org/lbenie/qselector)
[![Mutation testing badge](https://badge.stryker-mutator.io/github.com/lbenie/qselector/master)](https://stryker-mutator.github.io)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)


qselector (query selector) is just a small package to create aliases for `querySelector` and `querySelectorAll` to `$` and `$$` respectively.

## API
The api is pretty simple. Each functions receive a DOMElement and returns either the node or a list of node.

**Example**
```html
<div class="test">
  <span>s</span>
  <span>t</span>
  <div class="retest">
    <span>u</span>
  </div>
</div>
```

**$(el, selector)**

Returns the first match of `selector` on `el` and its children 
```js
  let node = $('div');
  /* node value
    <div class="test">
      <span class="test">s</span>
      <span>t</span>
      <div class="retest">
        <span>u</span>
      </div>
    </div>
  */

  node = $('span', '.test');
  /* node value
    <span>s</span>
  */
```

**$$(el, selector)**

Returns the list of all matches of `selector` on `el` and its children
```js
  let node = $$('div');
  /* node value
    [div.test, div.retest]
  */

  node = $$('.test', 'span');
  /* node value
    [span, span]
  */
```

## Installation
```bash
  $ yarn add qselector
```

or

```bash
  $ npm install qselector --save
```

## License
(MIT)

Copyright (c) 2018 Lucien Bénié

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
