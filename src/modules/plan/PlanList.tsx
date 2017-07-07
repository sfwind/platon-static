import * as React from "react";
import { connect } from "react-redux";

export default class PlanList extends React.Component<any,any> {
  constructor(){
    super();
    this.state = {};
  }

  render(){
    return (
      <div className="plan-list-page">
        <div className="plp-running">
          <div className="p-r-header">
            <span className="p-r-h-title">进行中</span>
          </div>
        </div>
      </div>
    );
  }
}
