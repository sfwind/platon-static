import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ScheduleNotice.less'
import AssetImg from '../../components/AssetImg'
import { mark } from '../../utils/request'

@connect(state => state)
export default class ScheduleNotice extends Component {
  constructor() {
    super();
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: "打点", function: "课程计划", action: "打开开始页面" })
  }

  handleClickStart() {
    mark({ module: "打点", function: "课程计划", action: "点击开始制定计划按钮" })
    this.context.router.push("/rise/static/course/schedule/choice");
  }

  render() {
    return (
      <div className="schedule-notice">
        <div className="header-msg">制定你的<br/>商学院学习计划</div>
        <div className="img-wrapper">
          <AssetImg className="img" url="https://www.iqycamp.com/images/rise_event_wall_vote.jpg"/>
        </div>
        <div className="start-btn btn" onClick={() => this.handleClickStart()}>开始</div>
        <div className="tips">9道题，约5分钟</div>
      </div>
    )
  }
}
