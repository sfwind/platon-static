import * as React from "react";
import { connect } from "react-redux";
import { ToolBar } from "../base/ToolBar"
import RenderInBody from '../../components/RenderInBody'

@connect(state => state)
export class Customer extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      tabIndex: 4,
      hiddenTab: false,
    };
  }

  triggerTab() {
    this.setState({ hiddenTab: !this.state.hiddenTab });
  }

  render() {
    return (
      <div>
        {this.props.children && React.cloneElement(this.props.children, {
          triggerTab: () => this.triggerTab(), showTab: () => this.setState({ hiddenTab: false }),
          hiddenTab: () => this.setState({ hiddenTab: true })
        })}
        {this.state.hiddenTab ? null :<RenderInBody><ToolBar noticeMsgCount={this.props.noticeMsgCount} tabIndex={this.props.tabIndex} dispatch={this.props.dispatch} router={this.context.router}/></RenderInBody>}
        <div style={{width:'100%',height:'1px'}}></div>
      </div>
    )
  }
}
