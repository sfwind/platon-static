import * as React from "react";
import { connect } from "react-redux";
import { configTest } from "../helpers/JsConfig"

@connect(state=>state)
export default class A extends React.Component<any,any>{
  constructor(){
    super();

  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }
  render(){
    return (
      <div>
        A页面<br/>
        <div>configUrl:{window.ENV.configUrl}</div>
        <div>url:{window.location.href}</div>
        <br/><br/><br/>
        <div onClick={()=>{
          configTest([],false,'ios')
        }}>试用configUrl注册</div>
        <div onClick={()=>{
          configTest([],false,'android')
        }}>试用Url注册</div>
        <br/><br/><br/>
        <div onClick={()=>{
          this.context.router.push("/rise/static/b")
        }}>前往B页面</div>
      </div>
    );
  }
}
