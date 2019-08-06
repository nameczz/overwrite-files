## overwrite-files

### Params

Only has one param which is Object.
Keys:

1. src - default: null , type: string (will use path.resolve(src) in function)
2. fullPath - default: null , type: string
3. regx - default: null , type: Regx , required: true
4. replaceCb - default: null, type: Function, required: true. (str.replace callback)
5. includesFiles - default: ['*'] , type: Array

### Demo

```js
const overwriteFiles = require('./index')
const regx = /(\d+)px/
const replaceCb = word => {
  let w = word.slice(0, word.length - 2)
  console.log(w)
  return `${w / 2}px`
}

const includesFiles = ['.vue']

overwriteFiles({ src: './src', regx, replaceCb, includesFiles })
```
