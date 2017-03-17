import * as React from "react";
import { connect } from "react-redux";
import "./ProblemList.less";
import { remove } from "lodash";
import { welcome } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";

@connect(state => state)
export class ProblemList extends React.Component <any, any> {

  constructor(){
    super();
    this.state = {
      show:false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }


  componentDidMount(){
    welcome()
    setTimeout(() => {
      this.setState({show:true})
    }, 100)
  }


  onSubmit(){
    this.context.router.push({
      pathname: '/rise/static/problem/priority'
    })
  }

  render() {
    const {show} = this.state
    return (
      <div>
        <div className="problem-list">
          <div className="info">
            <img className={show?"show first":"hide first"} src="http://www.iqycamp.com/images/fragment/rise_welcome_1_1.png"></img>
            <img className={show?"show second":"hide second"} src="http://www.iqycamp.com/images/fragment/rise_welcome_2.png"></img>
            <img className={show?"show third":"hide third"} src="http://www.iqycamp.com/images/fragment/rise_welcome_3.png"></img>
          </div>
        </div>
        <div className="button-footer white-button" onClick={this.onSubmit.bind(this)}>下一步</div>
      </div>
    )
  }
}
