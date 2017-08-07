import * as React from "react";
import { connect } from "react-redux";
import "./End.less";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import { mark } from "../../../utils/request"

@connect(state => state)
export class End2 extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {

  }

  onSubmit() {
    const { dispatch,location } = this.props;
    mark({
      module: "打点",
      function: "测评demo",
      action: "测评分享"
    })
    dispatch(alertMsg('正在开发中'))
  }

  nextTask() {

  }

  render() {
    const { rightNumber, point, total } = this.props.location.query
    const { data } = this.state

    return (
      <div className="end">
        <div className="end-area">
          <div className="end-avatar"><AssetImg url={window.ENV.headImage} size={60} style={{borderRadius:60}}/></div>
          <div className="end-user">
            <div className="end-text-user">{window.ENV.userName+'的职场超能力是'}</div>
            <div className="end-text-result">影响力</div>
          </div>
        </div>
        <div className="end-pic">
          <AssetImg url="https://static.iqycamp.com/images/eva_answer_demo2.png" width={'100%'}/>
        </div>
        <pre className="end-text">
          除了以上5个职场优势能力，你的其他职场力测评结果为：<br/>
<br/>
          说服力：3分<br/>
          自控力：2分<br/>
          觉察力：1分<br/>
<br/>
          分享测试报告，邀请3位好友扫码测试，即可成为志愿者，领取你的职场超能力提升计划。<br/>

        </pre>
        <div className="share-button" onClick={()=>this.onSubmit()}>
          <AssetImg url="https://static.iqycamp.com/images/eva-share-demo.png" width={'40%'} marginLeft={'30%'}/>
        </div>
      </div>
    )
  }
}
