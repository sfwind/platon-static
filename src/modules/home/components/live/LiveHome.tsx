import * as React from 'react'
import './LiveHome.less'
import AssetImg from '../../../../components/AssetImg'

export class LiveHome extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
    }
  }

  render () {
    const {
      title = '直播名称',
      speaker = '主讲人',
      speakerDesc = '主讲人介绍...................',
      time = '直播时间：2018年10月31日 20：30',
      thumbnail = 'https://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ayic3SEaztBgIHFjfNZCFnvibW7bURBmYJIwUIpyice6aELS6zATiaepeeu1lMaggayc9Wpboj9nSZ5Nib/132',
    } = this.state.data

    return (
      <div className="live-home-component">
        <span className="title">{title}</span>
        <span className="speaker">举办人：{speaker}</span>
        <span className="speaker-desc">{speakerDesc}</span>
        <span className="time">{time}</span>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
