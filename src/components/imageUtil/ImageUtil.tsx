import ExifJs from 'exif-js'

/**
 * 将 blob 对象转成 dataUrl，并在 callback 中作为参数调用
 * @param blob
 * @param callback
 */
function readBlobAsDataURL(blob, callback) {
  let reader = new FileReader()
  reader.readAsDataURL(blob)
  reader.onload = (e) => {
    callback(e.target.result)
  }
}

/**
 * 将 dataUrl 对象转为 blob
 * @param dataUrl
 * @returns {Blob}
 */
function dataUrlToBlob(dataUrl) {
  let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
  while(n--) {
    u8arr[n] = bstr.charCodeAt(n)
  }
  return new Blob([u8arr], { type: mime })
}

/**
 * 获取图片文件的旋转标志
 * @param file
 * @returns {Promise<T>}
 */
function getExifJsFile(file) {
  return new Promise((resolve) => {
    ExifJs.getData(file, () => {
      let orientation = ExifJs.getTag(file, 'Orientation')
      resolve(orientation)
    })
  })
}

/**
 * 根据图片中已有旋转值，进行修复性反旋转，并返回修复后的 blob 对象
 * @param file
 * @param orientation
 * @returns {Promise<T>}
 */
function rotateImage(file, orientation) {
  return new Promise((resolve) => {
    readBlobAsDataURL(file, (dataUrl) => {
      let image = new Image()
      image.src = dataUrl
      image.onload = () => {
        // 获取图片的初始宽高
        let imageWidth = image.width
        let imageHeight = image.height
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')
        // 按比例压缩
        let ratio
        if((ratio = imageWidth * imageHeight / 2000000) > 1) {
          // 解决因为某些图片过大，压成图片像素过小的情况
          if(ratio > 2) {
            ratio = 2
          }
        } else {
          ratio = 1
        }
        // 生成图片的宽高
        canvas.width = imageWidth / ratio
        canvas.height = imageHeight / ratio
        // 最后调整图片的旋转值
        let halfWidth = canvas.width / 2
        let halfHeight = canvas.height / 2
        ctx.translate(halfWidth, halfHeight)
        switch(orientation) {
          case 1:
            break
          case 3: // 被翻转了180度
            // 解决：图片再次翻转180度
            ctx.rotate(180 * Math.PI / 180)
            break
          case 6: // 顺时针旋转了90度，
            // 解决：需要将图片逆时针旋转90度
            ctx.rotate(90 * Math.PI / 180)
            break
          case 8: // 逆时针旋转了90度
            // 解决：需要将图片顺时针旋转90度
            ctx.rotate(90 * Math.PI / 180)
            break
          default:
            break
        }
        ctx.translate(-halfWidth, -halfHeight)
        ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

        let rotateDataUrl = canvas.toDataURL('image/jpeg')
        let rotateUrlBlob = dataUrlToBlob(rotateDataUrl)
        resolve(rotateUrlBlob)
      }
    })
  })
}

function adjustImage(file, callback) {
  getExifJsFile(file).then(orientation => {
    rotateImage(file, orientation).then(rotateBlob => {
      callback(rotateBlob)
    })
  })
}

export { adjustImage }

