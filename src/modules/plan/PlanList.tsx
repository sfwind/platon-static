import * as React from "react";
import "./PlanList.less";
import {connect} from "react-redux";
import {loadPlanList} from "./async";
import {startLoad, endLoad, alertMsg} from "redux/actions";
import {loadProblem, createPlan, checkCreatePlan} from "./async";

@connect(state=>state)
export default class PlanList extends React.Component<any,any> {
  constructor() {
    super();
    this.state = {};
    this.runPicWidth = (window.innerWidth / (750 / 270)) > 135 ? 135 : (window.innerWidth / (750 / 270));
    this.runTextWidth = (window.innerWidth - 30 - this.runPicWidth - 5);
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadPlanList().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        console.log(res);
        this.setState({planList:res.msg});
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });

  }

  render() {
    const { planList={} } = this.state;
    const { completedPlans,runningPlans} = planList;

    const renderRunningPlans = ()=>{
      if(runningPlans){
        return runningPlans.map((item,key) => {
          const { problem } = item;
          return (
            <div className="p-r-block" key={key}>
              <div className="p-r-b-item">
                <div className="p-r-b-i-pic" style={{width:`${this.runPicWidth}px`}}>
                  <img className="p-r-b-i-pic-img" src={`${problem.pic}`}/>
                </div>
                <div className="p-r-b-i-text" style={{width:`${this.runTextWidth}px`}}>
                  <div className="p-r-b-i-text-title">
                    {problem.problem}
                  </div>
                  <div className="p-r-b-i-text-done">
                    已完成：{`${item.completeSeries}/${item.totalSeries}节`}
                  </div>
                  <div className="p-r-b-i-text-close">
                    距关闭：{item.deadline}
                  </div>
                </div>
              </div>
            </div>
          );
        })
      } else {
        return null;
      }
    }

    return (
      <div className="plan-list-page">
        <div className="plp-running plp-block">
          <div className="p-r-header">
            <span className="p-r-h-title">进行中</span>
          </div>
          { renderRunningPlans() }
        </div>
      </div>
    );
  }
}
