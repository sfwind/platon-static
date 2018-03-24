import * as React from 'react'
import { connect } from 'react-redux'
import './Feedback.less'
import { changeTitle } from 'utils/helpers'
import { mark } from 'utils/request'
import { MarkBlock } from '../../../components/markblock/MarkBlock'
import AssetImg from '../../../components/AssetImg'
import { SubmitButton } from '../../../components/submitbutton/SubmitButton'
import { ColumnSpan } from '../../../components/ColumnSpan'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { submitFeedback } from './async'
import { Dialog } from 'react-weui'
const { Alert } = Dialog

@connect(state => state)
export default class Feedback extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      contact: '',
      picContainerHeight: 9,
      showAddPic: true,
      uploadPics: [],
      words: '',
      count: 0,
      picId: 0,
      dialogShow: false,
      dialogButtons: [
        {
          label: '返回',
          onClick: () => {
            this.context.router.push('/rise/static/faq')
          }
        }
      ]
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    changeTitle('意见反馈')
    mark({ module: '打点', function: '意见反馈', action: '打开意见反馈' })
  }

  countWord(value) {
    this.setState({ words: value, count: value.length })
  }

  uploadPic() {
    document.querySelector('#img-file-input').value = null
    document.querySelector('#img-file-input').click()
  }

  handleFileSelect(evt) {
    const { uploadPics } = this.state
    let files = evt.target.files
    this.uploadImg(evt)
  }

  // 删除图片
  removeImg(id) {
    const { uploadPics } = this.state
    let index = 0;
    for(; index < uploadPics.length; index++) {
      if(uploadPics[ index ].id === id) {
        break;
      }
    }
    uploadPics.splice(index, 1)
    this.picAddStatus(uploadPics.length)
  }

  picAddStatus(number) {
    if(number <= 3) {
      this.setState({ picContainerHeight: 9 })
    } else if(number > 3 && number <= 8) {
      this.setState({ picContainerHeight: 18 })
    }
    if(number == 8) {
      this.setState({ showAddPic: false })
    } else {
      this.setState({ showAddPic: true })
    }
  }

  // 上传图片
  uploadImg(evt) {
    const { uploadPics } = this.state
    const { dispatch } = this.props
    let that = this
    let files = evt.target.files
    let xhr = new XMLHttpRequest()
    let formData = new FormData()

    for(let i = 0, f; f = files[ i ]; i++) {
      formData.append('file', f)
    }

    dispatch(startLoad())

    xhr.onreadystatechange = function(e) {
      if(xhr.readyState == 4) {
        if(xhr.status == 200) {
          const text = xhr.responseText
          const res = JSON.parse(text)
          that.setState({ picId: res.msg.picId })

          for(let i = 0, f; f = files[ i ]; i++) {
            // 图片文件绑定到容器元素上
            let reader = new FileReader()
            reader.onload = (e) => {
              const { picId } = that.state
              let pic = { src: e.target.result, id: picId }
              uploadPics.push(pic)
              that.setState({ uploadPics })
            }

            that.picAddStatus(uploadPics.length)
            reader.readAsDataURL(f)
          }
        } else {
          console.error(xhr.responseText)
        }
        dispatch(endLoad())
      }
    }

    xhr.open('POST', '/file/image/upload/7', true)
    xhr.send(formData)
  }

  submit() {
    const { contact, words, uploadPics } = this.state
    const { dispatch } = this.props

    if(!words) {
      dispatch(alertMsg('请填写给我们的建议'))
      return
    }
    if(!contact) {
      dispatch(alertMsg('请填写联系方式'))
      return
    }

    let picIds = ''

    for(let index = 0; index < uploadPics.length; index++) {
      if(index != 0) {
        picIds = picIds + ","
      }

      picIds = picIds + uploadPics[ index ].id
    }

    submitFeedback({ contact, words, picIds }).then(res => {
      if(res.code === 200) {
        this.setState({ dialogShow: true })
      }
    })
  }

  render() {
    const { picContainerHeight, showAddPic, uploadPics, count, dialogShow, dialogButtons } = this.state

    const renderPic = () => {
      return uploadPics.map((item, index) => {
        return (
          <div className="img-thumb img-item" key={index}>
            <img src={item.src} className="thumb-icon"/>
            <div className="img-remove" onClick={()=>this.removeImg(item.id)}>x</div>
          </div>
        )
      })
    }

    return (
      <div className="feedback-container">
        <div className="text-area-div">
          <textarea placeholder="请输入问题，并留下联系方式，我们会尽快回复" maxLength="200"
                    onChange={(e)=>this.countWord(e.target.value)}>
          </textarea>
          <div className="feedback-word-count">{count}/200</div>
        </div>

        <ColumnSpan height={10}/>
        <input type="text" placeholder="您的手机/微信/邮箱" onChange={(e)=>this.setState({contact:e.target.value})}/>
        <ColumnSpan height={10}/>
        <div className="feedback-bottom">
          <div className="pic-container" style={{height:picContainerHeight+'rem'}}>
            {renderPic()}
            {showAddPic &&
            <div className="feedback-pic-add" id="add-pic">
              <AssetImg type="add_pic_icon" size={'7.0rem'} onClick={()=>this.uploadPic()}
                        display={'block'}/>
            </div>
            }
          </div>
          <div id="img-container" style={{display:'none'}}>
            <input type="file" name="files" id="img-file-input" onChange={(e)=>this.handleFileSelect(e)}/>
          </div>
        </div>
        <div className="feedback-img-tip">最多上传8张</div>
        <MarkBlock module={'打点'} func={'意见反馈'} action={'提交意见反馈'}>
          <SubmitButton buttonText="发送" clickFunc={()=>this.submit()}/>
        </MarkBlock>

        <Alert
          show={dialogShow}
          buttons={dialogButtons}>感谢你的建议</Alert>
      </div>
    )
  }
}
