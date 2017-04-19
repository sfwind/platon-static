import * as React from "react";
import {connect} from "react-redux";
import "./RiseMemberExplain.less";
import {markRiseMemberTips} from "./async";
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
    markRiseMemberTips();
  }


  render() {
    const {memberTypes = []} = this.state

    return (
      <div>
        <div className="container member-container">
          <h4>选择正式版，你可以学习RISE所有的小课，并收获：</h4>
          <ul>
            <li>系统学习所有知识</li>
            <li>将知识内化为能力</li>
            <li>解决实际工作问题</li>
            <li>参与案例分析直播</li>
            <li>得到圈外教练的反馈</li>
            <li>参加线下工作坊</li>
          </ul><br/>
          <h4>选择试用版，可以试学其中一个小课前3组的内容</h4>
          {/*<h4>一年线上+线下会员</h4>*/}
          {/*自购买日期起，一年内你可以：<br/>*/}
          {/*<ul>*/}
          {/*<li>系统学习所有知识</li>*/}
          {/*<li>将知识内化为能力</li>*/}
          {/*<li> 解决实际工作问题</li>*/}
          {/*<li>参与案例分析直播</li>*/}
          {/*<li>得到圈外教练的反馈</li>*/}
          {/*<li>免费并优先参加所有线下工作坊</li>*/}
          {/*<li> 上海、北京、深圳，每处一年至少有6次线下工作坊，其他城市陆续推出中</li>*/}
          {/*</ul>*/}
          {/*<br/>*/}
          {/*<h4>一年线上会员</h4>*/}
          {/*自购买日期起，一年内你可以：<br/>*/}
          {/*<ul>*/}
          {/*<li>系统学习所有知识</li>*/}
          {/*<li>将知识内化为能力</li>*/}
          {/*<li>解决实际工作问题</li>*/}
          {/*<li>参与案例分析直播</li>*/}
          {/*<li>优先参加所有线下工作坊</li>*/}
          {/*</ul>*/}
          {/*<br/>*/}
          {/*<h4>半年线上会员</h4>*/}
          {/*自购买日期起，半年内你可以：<br/>*/}
          {/*<ul>*/}
          {/*<li>系统学习所有知识</li>*/}
          {/*<li>将知识内化为能力</li>*/}
          {/*<li> 解决实际工作问题</li>*/}
          {/*<li> 参与案例分析直播</li>*/}
          {/*</ul><br/>*/}
        </div>
      </div>
    )
  }
}
