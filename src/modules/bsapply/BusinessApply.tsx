import React,{ Component } from 'react';
import connect from 'react-redux';
import './BusinessApply.less';
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import * as _ from 'lodash';
import { mark } from "../../utils/request"
import { SubmitButton } from '../../components/submitbutton/SubmitButton'
import AssetImg from '../../components/AssetImg'

export default class BusinessApply extends Component<any,any> {
  constructor(){
    super();
    this.state = {}
  }

  componentWillMount(){
    // 如果用户在审核中，则点击后提示已经在审核中
    mark({module: "打点", function: "商学院审核", action: "进入申请开始页面"})
  }

  render(){
    return (
      <div className="business-apply">
        <div className="ba-header">
          <div className="ba-header-msg">圈外商学院入学申请表</div>
          <div className="ba-header-pic">
            <AssetImg type="white_book_yellow_bg" width='10rem'/>
          </div>
        </div>
        <div className="ba-main-body">
          欢迎申请圈外商学院。<br/><br/>
          每个月我们会收到数以万计的申请，招生委员会将根据申请人的学历背景，工作经验和申请理由，挑选出最具有潜力的申请人，为他们的职业发展助力！
          <br/><br/>
          接下来，我们邀请你填写入学申请。期待你的加入！
        </div>
        <div className="ba-sub-tips">填写须知</div>
        <div className="ba-sub-body">
          申请填写需花5分钟时间，提交后无法修改，请认真填写，录取和奖学金申请结果将在提交申请两个工作日内，通过手机短信和【圈外同学】微信公众号发放。
        </div>
        <SubmitButton clickFunc={()=>{}} buttonText="开始"/>
      </div>
    )
  }
}
