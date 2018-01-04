import * as React from "react"
import {connect} from "react-redux"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import "./PointTip.less"
import { mark } from 'utils/request'


@connect(state => state)
export default class PointTip extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      point: null,
    }
  }

  componentWillMount() {
    changeTitle("积分规则");
    mark({module: "打点", function: "帮助", action: "打开积分规则"})
  }

  render() {
    return (
      <div className="point-tip">
        <div className="point-tip-title">
          积分规则
        </div>
        <div className="point-tip-container">
          <b style={{fontSize:"14px"}}>如何获得积分？ </b><br/>
          -完善个人信息，获得30积分<br/>
          -完成选择题，根据答对题目的难度不同，获得20/30/50积分<br/>
          -完成选做的应用题，根据难度获得对应的40/60/100积分<br/>
          -应用题每获得一个点赞加2积分，优秀的作业更易收到点赞<br/><br/>
          <b style={{fontSize:"14px"}}>积分有什么用？</b> <br/>
          -积分换购、延长开放期等功能开发中，敬请关注
        </div>
        <div className="padding-footer"></div>
      </div>
    )
  }
}
