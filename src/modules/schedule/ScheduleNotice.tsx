import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ScheduleNotice.less'
import AssetImg from '../../components/AssetImg'
import { mark } from '../../utils/request'
import { MarkBlock } from '../../components/markblock/MarkBlock'

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
    mark({ view: true, module: "打点", function: "课程计划", action: "打开开始页面" })
  }

  handleClickStart() {
    this.context.router.push("/rise/static/course/schedule/choice");
  }

  render() {
    return (
      <div className="schedule-notice">
        <div className="header-msg">
          <span>制定你的商学院</span>
          <br/>
          <span>学习计划</span>
        </div>
        <div className="img-wrapper">
          <AssetImg className="img" url="https://static.iqycamp.com/images/icon_maps.png?imageslim"/>
        </div>
        <MarkBlock module={'打点'} func={'课程计划'} action={'点击开始制定计划按钮'} className="start-btn btn" onClick={() => this.handleClickStart()}>开始</MarkBlock>
      </div>
    )
  }
}
