const overwriteFiles = require('./index')
const regx = /(\d+)px/
const replaceCb = word => {
  let w = word.slice(0, word.length - 2)
  console.log(w)
  return `${w / 2}px`
}
const includesFiles = ['.vue']
overwriteFiles({ src: './src', regx, replaceCb, includesFiles })
