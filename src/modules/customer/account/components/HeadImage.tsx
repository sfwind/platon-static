import * as React from 'react'
import './HeadImage.less'
import { ppost } from '../../../../utils/request'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import * as ExifJs from 'exif-js'

@connect(state => state)
export class HeadImage extends React.Component {

  timer // 自动提交定时器
  dispatch // redux dispatch 对象

  constructor() {
    super()
    this.state = {
      headImgUrl: '',
      modify: true
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { hiddenTab = () => {} } = this.props
    hiddenTab()
    this.dispatch = this.props.dispatch
    this.setState({ headImgUrl: this.props.location.query.headImgUrl })
  }

  componentWillUnmount() {
    clearInterval(this.timer)
    const { showTab = () => {} } = this.props
    showTab()
  }

  readBlobAsDataURL(blob, callback) {
    let reader = new FileReader()
    reader.onload = function(e) {callback(e.target.result)}
    reader.readAsDataURL(blob)
  }

  dataURLtoBlob(dataurl) {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n)
    while(n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new Blob([u8arr], { type: mime })
  }

  getExifJsFile(file) {
    return new Promise((resolve) => {
      ExifJs.getData(file, () => {
        let orientation = ExifJs.getTag(file, 'Orientation')
        resolve(orientation)
      })
    })
  }

  rotateImage(file, orientation) {
    return new Promise((resolve) => {
      this.readBlobAsDataURL(file, (dataUrl) => {
        let image = new Image()
        image.src = dataUrl
        image.onload = () => {
          let canvas = document.createElement('canvas')
          canvas.width = image.width
          canvas.height = image.height
          let halfWidth = image.width / 2
          let halfHeight = image.height / 2
          let ctx = canvas.getContext('2d')
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
          ctx.drawImage(image, 0, 0)

          let rotateDataUrl = canvas.toDataURL('image/jpeg')
          let rotateUrlBlob = this.dataURLtoBlob(rotateDataUrl)
          resolve(rotateUrlBlob)
        }
      })
    })
  }

  autoUploadHeadImg() {
    let node = this.refs.changeImg
    this.timer = setInterval(() => {
      if(node && node.files && node.files[0]) {
        let formData = new FormData()
        let file = node.files[0]
        this.getExifJsFile(file).then(orientation => {
          this.rotateImage(file, orientation).then(rotateBlob => {
            formData.append('file', rotateBlob)
            node = undefined
            this.refs.changeImg.value = null
            this.dispatch(startLoad())
            ppost(`/rise/customer/profile/headImg/upload`, formData).then(res => {
              clearInterval(this.timer)
              if(res.code === 200) {
                this.setState({
                  headImgUrl: res.msg,
                  modify: false
                }, () => {
                  this.refs.headImg.onload = () => {
                    this.dispatch(endLoad())
                  }
                })
              } else {
                this.dispatch(endLoad())
                this.dispatch(alertMsg(res.msg))
              }
            }).catch(e => {
              this.dispatch(endLoad())
              this.dispatch(alertMsg(e))
            })
          })
        })
      }
    }, 2000)
  }

  handleClickSelectHeadImg() {
    let node = this.refs.changeImg
    node.click()
    this.autoUploadHeadImg()
  }

  handleClickUpdateHeadImg() {
    const { modify } = this.state
    if(modify) {
      this.handleClickSelectHeadImg()
    } else {
      ppost(`/rise/customer/profile/headImg/update?headImgUrl=${this.state.headImgUrl}`).then(res => {
        if(res.code === 200) {
          window.ENV.headImage = this.state.headImgUrl
          this.context.router.goBack()
        }
      })
    }
  }

  render() {
    const { headImgUrl, modify } = this.state
    return (
      <div className="headimg-modify-component">
        <div className="headimg-edit">
          <img ref="headImg" className="headimg-img" src={headImgUrl} onClick={() => this.handleClickSelectHeadImg()}/>
          <input ref="changeImg" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                 style={{ display: 'none' }}/>
        </div>

        <div className="headimg-submit">
          <span onClick={() => this.handleClickUpdateHeadImg()}>
            {modify ? '修改' : '提交'}
          </span>
        </div>
        <div className="mask" style={{ background: `url(${headImgUrl})` }}/>
      </div>
    )
  }

}
