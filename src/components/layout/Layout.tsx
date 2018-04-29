/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能： layout 弹出层
 3. 作者： liyang@iquanwai.com
 4. 备注：description : string   接收一个弹窗的描述
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import * as React from 'react'
import './Layout.less'
export default class Layout extends React.Component {
  constructor() {
    super();
    this.state={
      description:''
    }
  }

  componentWillReceiveProps(nextProps){
     this.setState({
       description: nextProps.description
     })
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  隐藏弹层
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  hideLay(description){
    this.setState({
      description: description
    });
  }
  render(){
    const {description} = this.state;
    return (
      <div ref='layout' className="layout">
        <div className={description ? 'layout-back layout-back-show':'layout-back'} ></div>
        <div  className={description ? 'layout-tips layout-tips-show':'layout-tips'}>
           <div className="layout-top">
              <p>{description}</p>
           </div>
          <p onClick={()=>{this.hideLay('')}}>确定</p>
        </div>
      </div>
    )}
}
