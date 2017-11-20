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

  render(){
    return (
      <div className="business-apply">
        <div className="ba-header">
          <div className="ba-header-msg">圈外商学院入学申请表</div>
          <div className="ba-header-pic">
            <div className="icon-pic"></div>
          </div>
        </div>
        <div className="ba-main-body">
          欢迎申请圈外商学院。每个月我们会收到数以付费。欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收到数以付费。欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收到数以付费
          <br/><br/>
          接下来，我们邀请你填写入学申请。<br/>
          期待你的加入
        </div>
        <div className="ba-sub-tips">填写须知</div>
        <div className="ba-sub-body">
          欢迎申请圈外商学院。每个月我们会收到数以付费。欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收欢迎申请圈外商学院。每个月我们会收到数以付费。欢迎申请圈外商学院。每个月我们会收到数以付费欢迎申请圈外商学院。每个月我们会收
        </div>
        <SubmitButton clickFunc={()=>{}} buttonText="test"/>
      </div>
    )
  }
}
