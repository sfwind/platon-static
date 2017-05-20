import * as React from "react"
import {connect} from "react-redux"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"


@connect(state => state)
export default class RiseMember extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {}
  }

  componentWillMount() {
    changeTitle("圈外");
  }


  render() {
    const {memberType} = this.state;
    return (
      <div className="container" style={{textAlign:'center'}}>
        <span style={{marginTop:'50px',display:'inline-block'}}>请先关注"圈外学习号"</span>
        <img src="https://www.iqycamp.com/images/serverQrCode.jpg" style={{width:'90%',height:'auto'}}/>
      </div>
    )
  }
}
