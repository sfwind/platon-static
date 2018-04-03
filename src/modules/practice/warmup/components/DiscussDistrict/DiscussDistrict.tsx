import * as React from 'react'
import { loadPriorityWarmUpAnalysis } from '../../async'
import AssetImg from '../../../../../components/AssetImg'


import './DiscussDistrict.less'
export default class DiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  shouldComponentUpdate () {
    return true
  }

  async componentDidMount () {
    let res = await loadPriorityWarmUpAnalysis(3062)
    console.log(res)
    if (res.code === 200) {

    }
  }

  render () {
    const {
      primaryDiscuss = {
        headImgUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/YTm36OkshsHTjOsd6G0ZyQupibIgBUriawH0XN4FCEGM8W9ZFSicTcgOf4HqOKNCg8hF3ECqoUXaFibbyzhSnbSDNw/132',
        nickName: '三十文',
        comment: '百度公司是一家主要经营搜索引擎服务的互联网公司，于2000年1月1日由李彦宏、徐勇两人创立于中国。',
        publishTime: '2018-03-22 11:09',
        voteCount: 100,
      },
      secondaryDiscuss = {},
    } = this.state

    return (
      <div className="discuss-district-component">
        <div className="primary-block">
          <AssetImg url={primaryDiscuss.headImgUrl} className="headimg"/>
          <div className="nickname">{primaryDiscuss.nickName}</div>
          <div className="comment">{primaryDiscuss.comment}</div>
          <div className="publish">{primaryDiscuss.publishTime}</div>
          <div className="vote">{primaryDiscuss.voteCount}</div>
        </div>
        <div className="secondary-block">

        </div>
      </div>
    )
  }

}
