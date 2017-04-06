import * as React from "react";
import { connect } from "react-redux";
import "./RiseMemberExplain.less";
import {  } from "./async";
import { startLoad, endLoad, alertMsg } from "../../redux/actions";

@connect(state => state)
export class RiseMemberExplain extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      length: '',
      endDate: '',
      pic: ''
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props

  }

  onSubmit() {
    this.context.router.push({ pathname: '/rise/static/plan/main' })
  }

  render() {
    const { length, endDate, totalSeries } = this.state

    return (
      <div>
        <div className="container has-footer">
          会员说明
        </div>
        <div className="button-footer" onClick={this.onSubmit.bind(this)}>开始</div>
      </div>
    )
  }
}
