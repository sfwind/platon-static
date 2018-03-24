import * as React from 'react'
import './LiveHome.less'
import AssetImg from '../../../../components/AssetImg'
import { splitContent } from '../../../../utils/helpers'
import { mark } from '../../../../utils/request'

interface LiveHomeProps {
  data: any
}

export class LiveHome extends React.Component<LiveHomeProps, any> {

  constructor () {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  render () {
    const {
      name = '',
      speaker = '',
      speakerDesc = '',
      startTimeStr = '',
      thumbnail = '',
      linkUrl = '',
    } = this.props.data

    return (
      <div className="live-home-component" onClick={() => {
        mark({ module: '打点', function: '着陆页', action: '点击直播' })
        window.location.href = linkUrl
      }}>
        <span className="title">{splitContent(name, 10)}</span>
        <span className="speaker">主讲人：{speaker}</span>
        <span className="speaker-desc">{splitContent(speakerDesc, 15)}</span>
        <span className="time">直播时间：{startTimeStr}</span>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
      </div>
    )
  }

}
