import * as React from "react";
import { connect } from "react-redux";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import DropChoice from "../../components/DropChoice"

@connect(state => state)
export class Demo extends React.Component <any, any> {

  constructor(){
    super();
    this.state = {
      show:false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    const {show} = this.state
    return (
      <div className="demo" onClick={()=>this.setState({show:!this.state.show})}>
        {true?<DropChoice/>:null}
      </div>
    )
  }
}
