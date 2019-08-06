const fs = require('fs')
const path = require('path')

function overwriteFiles({
  src = null,
  fullPath = null,
  includesFiles = ['*'],
  regx = null,
  replaceCb = null
}) {
  if (!src && !fullPath) {
    console.error('fullPath or src is required')
    return
  }
  if (!regx) {
    console.error('regx is required')
    return
  }

  if (!regx) {
    console.error('regx is required')
    return
  }
  if (!replaceCb) {
    console.error('replaceCb is required')
    return
  }

  let _filePath = fullPath || path.resolve(src)
  fs.readdir(_filePath, function(readDirErr, files) {
    if (readDirErr) {
      console.warn(readDirErr)
    } else {
      // 遍历读取到的文件列表
      files.forEach(function(filename) {
        // 获取当前文件的绝对路径
        let filedir = path.join(_filePath, filename)
        // 根据文件路径获取文件信息，返回一个fs.Stats对象
        fs.stat(filedir, function(statErr, stats) {
          if (statErr) {
            console.warn(`获取文件stats失败:${statErr}`)
          } else {
            let isFile = stats.isFile() // 是文件
            let isDir = stats.isDirectory() // 是文件夹
            if (isFile) {
              const isPass = includesFiles.some(v => {
                if (v === '*') {
                  return true
                }
                return filedir.includes(v)
              })

              if (isPass) {
                fs.readFile(filedir, (readErr, doc) => {
                  if (readErr) {
                    console.error(readErr)
                    return
                  }
                  let content = doc.toString()
                  let newContent = content.replace(regx, replaceCb)

                  fs.writeFile(filedir, newContent, 'utf8', writeErr => {
                    if (writeErr) {
                      console.error(writeErr)
                      return
                    }
                    console.log(`${filedir} 替换成功`)
                  })
                })
              }
            }
            if (isDir) {
              overwriteFiles(filedir) // 递归，如果是文件夹，就继续遍历该文件夹下面的文件
            }
          }
        })
      })
    }
  })
}

module.exports = overwriteFiles
