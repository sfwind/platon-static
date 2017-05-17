import * as React from "react"
import { connect } from "react-redux"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import {mark} from "../problem/async"
import { getOldMsg } from '../message/async'
import "./Personal.less"


@connect(state=>state)
export default class Personal extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
    }
    this.picHeight = window.innerWidth / 2.5;
    this.marginTop = (this.picHeight-65)/2>0?(this.picHeight-65)/2:0;
  }

  componentWillMount(){
      changeTitle("个人中心");
      mark({module: "个人中心", function: "个人中心", action: "打开个人中心"})
  }

  goMessage() {
    const {dispatch} = this.props;
    dispatch(startLoad());
    getOldMsg().then(res => {
      dispatch(endLoad());
      if (res.code === 200) {
        dispatch(set('noticeMsgCount', 0))
        this.context.router.push('/rise/static/message/center')
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }


  render(){
    const { noticeMsgCount } = this.props;

    const renderHeader = ()=>{
      return (
        <div className="personal-head" style={{marginTop:this.marginTop+"px"}}>
          <div className="personal-head-pic" style={{background:'url(' + window.ENV.headImage + ')  no-repeat  center center/100% auto'}}/>
          <div className="personal-name">
            {window.ENV.userName}
          </div>
        </div>
      )
    }

    const renderContainer= ()=>{
      return (
        <div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/rise/static/customer/profile')}}><span>个人信息</span></div>
          <div className="personal-item" onClick={()=>this.goMessage()}>
            <span>消息通知</span>
            {noticeMsgCount ?<span className="notice_message">{noticeMsgCount > 99 ? 99 : noticeMsgCount}</span>: null}
          </div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/rise/static/customer/problem')}} ><span>我的小课</span></div>
          <div className="personal-item" onClick={()=>{this.context.router.push('/rise/static/customer/account')}} ><span>我的账户</span></div>
          {/*<div className="personal-item" onClick={()=>{this.context.router.push('/rise/customer/courses')}} ><span>训练营</span></div>*/}
          <div className="personal-item" onClick={()=>{this.context.router.push('/rise/static/customer/feedback')}} ><span>帮助</span></div>

        </div>
      )
    }
    return (
      <div className="personal">
        <div className="personal-header"  style={{height:this.picHeight}}>
          {renderHeader()}
          <div className="personal-mask" style={{background:'url(' + window.ENV.headImage + ')  no-repeat  center center/100% auto'}}/>
        </div>
        <div className="personal-container">
          {renderContainer()}
        </div>
        {/*<div onClick={()=>this.props.triggerTab()}>off/on</div>*/}
      </div>
    )
  }
}
