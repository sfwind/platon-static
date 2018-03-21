import * as React from 'react'
import './LiveHome.less'
import AssetImg from '../../../../components/AssetImg'
import { splitContent } from '../../../../utils/helpers'

interface LiveHomeProps {
  data: any
}

export class LiveHome extends React.Component<LiveHomeProps, any> {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    const {
      name = '',
      speaker = '',
      speakerDesc = '',
      startTimeStr = '',
      thumbnail = '',
    } = this.props.data

    return (
      <div className="live-home-component">
        <span className="title">{name}</span>
        <span className="speaker">主讲人：{speaker}</span>
        <span className="speaker-desc">{splitContent(speakerDesc, 15)}</span>
        <span className="time">直播时间：{startTimeStr}</span>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
