import * as React from "react";
import * as FastClick from "fastclick";

interface MetaButtonProps {

}
interface MetaButtonStates {

}
export default class MetaButton extends React.Component<MetaButtonProps, MetaButtonStates> {

  constructor() {
    super()
    this.state = {}
  }

  render() {

    return (
      <div {...this.props} className="needsclick">{this.props.children}</div>
    )
  }

}
