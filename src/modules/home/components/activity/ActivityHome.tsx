import * as React from 'react'
import './ActivityHome.less'
import AssetImg from '../../../../components/AssetImg'
import { calcScheduleData } from '../../../schedule/overview/util'

export class ActivityHome extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
    }
  }

  STATUS = {
    PREPARE: 1,
    CLOSED: 2,
    REVIEW: 3,
  }

  render () {
    const {
      name = '活动名称',
      holder = '上海校友会',
      holdingTime = '03月02日20：30-21：30',
      location = '上海市长宁区',
      status = 3,
      thumbnail = 'https://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ayic3SEaztBgIHFjfNZCFnvibW7bURBmYJIwUIpyice6aELS6zATiaepeeu1lMaggayc9Wpboj9nSZ5Nib/132',
    } = this.state.data

    const renderStatus = () => {
      switch (status) {
        case this.STATUS.PREPARE:
          return (
            <div className="status prepare">活动报名</div>
          )
          break
        case this.STATUS.CLOSED:
          return (
            <div className="status closed">活动结束</div>
          )
          break
        case this.STATUS.REVIEW:
          return (
            <div className="status review">活动回顾</div>
          )
          break
        default:
          return <div></div>
          break
      }
    }

    return (
      <div className="activity-home-component">
        <div className="name">{name}</div>
        <div className="holder">举办人：{holder}</div>
        <div className="holding-time">举办时间：{holdingTime}</div>
        <div className="location">举办地点：{location}</div>
        {renderStatus()}
        <AssetImg className="thumbnail" url={thumbnail}/>
      </div>
    )
  }

}
