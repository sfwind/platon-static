import * as React from 'react'

import './PersonalDiscussDistrict.less'
import AssetImg from '../../../../components/AssetImg'
import { formatDate } from '../../../../utils/helpers'

export default class PersonalDiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    const {
      discuss = {
        avatar: '',
        addTime: '',
        content: '',
        nickname: '',
        publishTime: '',
      },
      comments = [],
    } = this.props

    const {
      personalDiscuss = {
        headImgUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/YTm36OkshsHTjOsd6G0ZyQupibIgBUriawH0XN4FCEGM8W9ZFSicTcgOf4HqOKNCg8hF3ECqoUXaFibbyzhSnbSDNw/132',
        nickName: '三十文',
        comment: '百度公司是一家主要经营搜索引擎服务的互联网公司，于2000年1月1日由李彦宏、徐勇两人创立于中国。',
        publishTime: '2018-03-22 11:09',
        voteCount: 100,
      },
      otherComments = [
        {
          headImgUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/YTm36OkshsHTjOsd6G0ZyQupibIgBUriawH0XN4FCEGM8W9ZFSicTcgOf4HqOKNCg8hF3ECqoUXaFibbyzhSnbSDNw/132',
          nickName: '三十文',
          comment: '百度公司是一家主要经营搜索引擎服务的互联网公司，于2000年1月1日由李彦宏、徐勇两人创立于中国。',
          publishTime: '2018-03-22 11:09',
          voteCount: 100,
        },
        {
          headImgUrl: 'https://thirdwx.qlogo.cn/mmopen/vi_32/YTm36OkshsHTjOsd6G0ZyQupibIgBUriawH0XN4FCEGM8W9ZFSicTcgOf4HqOKNCg8hF3ECqoUXaFibbyzhSnbSDNw/132',
          nickName: '三十文',
          comment: '百度公司是一家主要经营搜索引擎服务的互联网公司，于2000年1月1日由李彦宏、徐勇两人创立于中国。',
          publishTime: '2018-03-22 11:09',
          voteCount: 100,
        },
      ],
    } = this.state

    return (
      <div className="personal-discuss-district-component">
        <div className="personal-block">
          <AssetImg url={discuss.avatar} className="headimg"/>
          <div className="right-block">
            <div className="nickname">{discuss.nickname}</div>
            <div className="comment" dangerouslySetInnerHTML={{ __html: discuss.content }}></div>
            <div className="publish">{formatDate(new Date(discuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
          </div>
        </div>
        {
          comments.map((item, index) => {
            return (
              <div key={index} className="personal-block comment-block">
                <AssetImg url={item.avatar} className="headimg"/>
                <div className="right-block">
                  <div className="nickname">{item.nickname}</div>
                  <div className="comment">{item.content}</div>
                  <div className="publish">{formatDate(new Date(item.publishTime), 'yyyy-MM-dd hh:mm')}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

}
