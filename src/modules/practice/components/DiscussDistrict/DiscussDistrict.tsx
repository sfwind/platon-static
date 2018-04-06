import * as React from 'react'
import { loadPriorityWarmUpAnalysis } from '../../warmup/async'
import AssetImg from '../../../../components/AssetImg'

import './DiscussDistrict.less'
import { formatDate } from '../../../../utils/helpers'

export default class DiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    let {
      originDiscuss = {
        // avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/YTm36OkshsHTjOsd6G0ZyQupibIgBUriawH0XN4FCEGM8W9ZFSicTcgOf4HqOKNCg8hF3ECqoUXaFibbyzhSnbSDNw/132',
        // nickname: '三十文',
        // content: '百度公司是一家主要经营搜索引擎服务的互联网公司，于2000年1月1日由李彦宏、徐勇两人创立于中国。',
        // publishTime: '2018-03-22 11:09',
      },
      priorityDiscuss = {
        // avatar: 'https://thirdwx.qlogo.cn/mmopen/vi_32/YTm36OkshsHTjOsd6G0ZyQupibIgBUriawH0XN4FCEGM8W9ZFSicTcgOf4HqOKNCg8hF3ECqoUXaFibbyzhSnbSDNw/132',
        // nickname: '三十文',
        // content: '百度公司是一家主要经营搜索引擎服务的互联网公司，于2000年1月1日由李彦宏、徐勇两人创立于中国。',
        // publishTime: '2018-03-22 11:09',
      },
    } = this.props

    if (!originDiscuss) {
      originDiscuss = JSON.parse(JSON.stringify(priorityDiscuss))
      priorityDiscuss = null
    }

    return (
      <div className="discuss-district-component">
        <div className="origin-block">
          <AssetImg url={originDiscuss.avatar} className="headimg"/>
          <div className="right-block">
            <div className="nickname">{originDiscuss.nickname}</div>
            <div className="comment">{originDiscuss.content}</div>
            <div className="publish">{formatDate(new Date(originDiscuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
          </div>
        </div>
        {
          priorityDiscuss &&
          <div className="origin-block priority-block">
            <AssetImg url={priorityDiscuss.avatar} className="headimg"/>
            <div className="right-block">
              <div className="nickname">{priorityDiscuss.nickname}</div>
              <div className="comment">{priorityDiscuss.content}</div>
              <div className="publish">{formatDate(new Date(priorityDiscuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
            </div>
          </div>
        }
      </div>
    )
  }

}
