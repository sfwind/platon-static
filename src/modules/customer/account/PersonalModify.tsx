import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import './PersonalModify.less'
import AssetImg from '../../../components/AssetImg'
import { mark } from '../../../utils/request'

/**
 * 个人中心头像昵称修改页
 */
@connect(state => state)
export default class PersonalModify extends React.Component {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({
      module: '打点',
      function: '个人中心',
      action: '加载昵称头像修改页'
    })
  }

  handleClickGoNickNameModifyPage(nickName) {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击修改昵称'
    })
    this.context.router.push({
      pathname: `/rise/static/customer/modify/nickname`
    })
  }

  handleClickGoHeadImgModifyPage(headImgUrl) {
    mark({
      module: '打点',
      function: '个人中心',
      action: '点击修改头像'
    })
    this.context.router.push({
      pathname: `/rise/static/customer/modify/headImg`,
      query: {
        headImgUrl: headImgUrl
      }
    })
  }

  render() {
    return (
      <div className="personal-modify-container">
        <div className="item">
          <div className="label">头像</div>
          <div className="content header-img" onClick={() => this.handleClickGoHeadImgModifyPage(window.ENV.headImage)}>
            <AssetImg ref="headImg" url={window.ENV.headImage} alt=""/>
          </div>
        </div>
        <div className="item" onClick={() => this.handleClickGoNickNameModifyPage(window.ENV.userName)}>
          <div className="label">昵称</div>
          <div className="content">{window.ENV.userName}</div>
        </div>
      </div>
    )
  }

}
