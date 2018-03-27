import * as React from 'react'
import './LiveHome.less'
import AssetImg from '../../../../components/AssetImg'
import { splitContent } from '../../../../utils/helpers'
import { mark } from '../../../../utils/request'
import { Dialog } from 'react-weui'

const { Alert } = Dialog

interface LiveHomeProps {
  data: any
}

export class LiveHome extends React.Component<LiveHomeProps, any> {

  constructor () {
    super()
    this.state = {
      showAlert: false,
      dialogButtons: [
        {
          label: '知道了',
          onClick: (e) => {
            e.stopPropagation()
            this.setState({ showAlert: false })
          },
        },
        {
          label: '立即入学',
          onClick: (e) => {
            e.stopPropagation()
            this.setState({ showAlert: false })
            window.location.href = '/pay/rise'
          },
        },
      ],
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount () {
    this.setState({
      data: this.props.data,
    })
  }

  handleClick (visibility, linkUrl) {
    mark({ module: '打点', function: '着陆页', action: '点击直播' })
    if (visibility) {
      window.location.href = linkUrl
    } else {
      this.setState({ showAlert: true })
    }
  }

  render () {
    const {
      name = '',
      speaker = '',
      speakerDesc = '',
      startTimeStr = '',
      thumbnail = '',
      linkUrl = '',
      visibility = false,
    } = this.state.data

    return (
      <div className="live-home-component" onClick={() => this.handleClick(visibility, linkUrl)}>
        <span className="title">{splitContent(name, 10)}</span>
        <span className="speaker">主讲人：{speaker}</span>
        <span className="speaker-desc">{splitContent(speakerDesc, 15)}</span>
        <span className="time">直播时间：{startTimeStr}</span>
        <AssetImg className="thumbnail" url={thumbnail}></AssetImg>
        <Alert show={this.state.showAlert} buttons={this.state.dialogButtons}>需要加入圈外商学院才能看哦</Alert>
      </div>
    )
  }

}
