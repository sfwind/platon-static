import * as React from 'react'
import './HeadImage.less'
import { ppost } from '../../../../utils/request'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'

@connect(state => state)
export class HeadImage extends React.Component {

  timer // 自动提交定时器
  dispatch // redux dispatch 对象

  constructor() {
    super()
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

  autoUploadHeadImg() {
    let node = this.refs.changeImg
    this.timer = setInterval(() => {
      console.log('pao')
      if(node && node.files && node.files[0]) {
        let formData = new FormData()
        formData.append('file', node.files[0])
        node = undefined
        this.refs.changeImg.value = null
        this.dispatch(startLoad())
        ppost(`/rise/customer/profile/headImg/upload`, formData).then(res => {
          clearInterval(this.timer)
          if(res.code === 200) {
            this.setState({
              headImgUrl: res.msg
            }, () => {
              setTimeout(() => {
                this.dispatch(endLoad())
              }, 1000)
            })
          } else {
            this.dispatch(endLoad())
            this.dispatch(alertMsg(res.msg))
          }
        }).catch(e => {
          this.dispatch(endLoad())
          this.dispatch(alertMsg(e))
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
    ppost(`/rise/customer/profile/headImg/update?headImgUrl=${this.state.headImgUrl}`).then(res => {
      if(res.code === 200) {
        this.context.router.goBack()
      }
    })
  }

  render() {
    const { headImgUrl = '' } = this.state

    return (
      <div className="headimg-modify-component">
        <div className="headimg-edit">
          <img ref="headImg" className="headimg-img" src={headImgUrl} onClick={() => this.handleClickSelectHeadImg()}/>
          <input ref="changeImg" type="file" accept="image/gif,image/jpeg,image/jpg,image/png,image/svg"
                 style={{ display: 'none' }}/>
        </div>

        <div className="headimg-submit">
          <span onClick={() => this.handleClickUpdateHeadImg()}>提交</span>
        </div>

        <div className="mask"/>
      </div>
    )
  }

}
