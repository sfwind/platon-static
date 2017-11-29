import * as React from "react";
import {connect} from "react-redux";
import "./RiseMemberExplain.less";
import {mark} from "./async";
import {startLoad, endLoad, alertMsg} from "../../redux/actions";

@connect(state => state)
export class RiseMemberExplain extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {}
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({module:"打点",function:"RISE",action:"打开rise会员说明页"});
  }


  render() {
    const {memberTypes = []} = this.state

    return (
      <div>
        <div className="container member-container">
          <h4>选择正式版，你可以学习【圈外同学】所有的课程，并收获：</h4>
          <ul>
            <li>系统学习所有知识</li>
            <li>将知识内化为能力</li>
            <li>解决实际工作问题</li>
            <li>参与案例分析直播</li>
            <li>得到圈外教练的反馈</li>
            <li>参加线下工作坊</li>
          </ul><br/>
          <h4>选择试用版，可以试学其中一个课程前3组的内容</h4>
        </div>
      </div>
    )
  }
}
