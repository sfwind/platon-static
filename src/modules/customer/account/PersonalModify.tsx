import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import './PersonalModify.less'
import AssetImg from '../../../components/AssetImg'

@connect(state => state)
export default class PersonalModify extends React.Component {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  handleClickGoNickNameModifyPage(nickName) {
    this.context.router.push({
      pathname: `/rise/static/customer/modify/nickname`,
      query: {
        nickName: nickName
      }
    })
  }

  handleClickGoHeadImgModifyPage(headImgUrl) {
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
            <AssetImg ref="headImg" src={window.ENV.headImage} alt=""/>
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
