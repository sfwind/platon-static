import * as React from "react";
import { connect } from "react-redux";
import { configTest } from "../helpers/JsConfig"
import "./test.less";

@connect(state=>state)
export default class B extends React.Component<any,any>{
  constructor(){
    super();
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  componentWillMount(){
    // this.context.router.push("/rise/static/a")
  }
  render(){
    return (
      <div>
        B页面<br/>
        <div>configUrl:{window.ENV.configUrl}</div>
        <div>url:{window.location.href}</div>
        <br/><br/><br/>
        <div className="btn" onClick={()=>{
          configTest([],false,true)
        }}>试用configUrl注册</div>
        <br/><br/><br/>
        <div className="btn" onClick={()=>{
          configTest([],false,false)
        }}>试用Url注册</div>
        <br/><br/><br/>
        <div className="btn" onClick={()=>{
          this.context.router.push("/rise/static/a")
        }}>前往A页面</div>
      </div>
    )
  }
}
