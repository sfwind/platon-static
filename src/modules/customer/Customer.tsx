import * as React from "react";
import { connect } from "react-redux";
import {ToolBar} from "../base/ToolBar"


@connect(state => state)
export class Customer extends React.Component<any,any>{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }


  constructor(){
    super();
    this.state = {
      tabIndex:4,
      hiddenTab:false,
    };
  }

  triggerTab(){
    this.setState({hiddenTab:!this.state.hiddenTab});
  }


  render(){
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children,{
          triggerTab:()=>this.triggerTab()
        })}
        {this.state.hiddenTab?null:<ToolBar/>}
        <div style={{width:'100%',height:'1px'}}></div>
      </div>
    )
  }
}
