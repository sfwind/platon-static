import * as React from 'react'
import './ActivityHome.less'
import AssetImg from '../../../../components/AssetImg'
import { calcScheduleData } from '../../../schedule/overview/util'
import { splitContent } from '../../../../utils/helpers'
import { mark } from '../../../../utils/request'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from 'reduxutil/actions'

interface ActivityHomeProps {
  data: any
}

@connect(state => state)
export class ActivityHome extends React.Component<ActivityHomeProps, any> {

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

  componentWillMount () {
    this.setState({
      data: this.props.data,
    })
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  handleClick (targetUrl) {
    const { dispatch } = this.props
    mark({ module: '打点', function: '着陆页', action: '点击活动' })
    if (targetUrl) {
      window.location.href = targetUrl
    } else {
      dispatch(alertMsg('报名已经结束咯，敬请期待下次活动'))
    }
  }

  render () {
    const {
      name = '',
      holder = '',
      startTimeStr = '',
      location = '',
      status = 1,
      thumbnail = '',
      targetUrl = '',
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
      <div className="activity-home-component" onClick={() => this.handleClick(targetUrl)}>
        <div className="name">{name}</div>
        <div className="holder">举办人：{holder}</div>
        <div className="holding-time">举办时间：{startTimeStr}</div>
        <div className="location">举办地点：{splitContent(location, 10)}</div>
        {renderStatus()}
        <AssetImg className="thumbnail" url={thumbnail}/>
      </div>
    )
  }

}
