import * as React from "react";
import "./PlanList.less";
import {connect} from "react-redux";
import {loadPlanList} from "./async";
import {startLoad, endLoad, alertMsg} from "redux/actions";
import {loadProblem, createPlan, checkCreatePlan} from "./async";
import AssetImg from "../../components/AssetImg";
import {ToolBar} from "../base/ToolBar"


/**
 * rise_icon_hr 左侧较宽 TODO
 */
@connect(state=>state)
export default class PlanList extends React.Component<any,any> {
  constructor() {
    super();
    this.state = {};
    this.runPicWidth = (window.innerWidth / (750 / 270)) > 135 ? 135 : (window.innerWidth / (750 / 270));
    this.runTextWidth = (window.innerWidth - 30 - this.runPicWidth - 5);
    this.completedRightTextWidth = 45;
    let gup = 0;
    if(window.innerWidth > 350){
      gup = 30;
    }
    this.completedLeftTextWidth = window.innerWidth - 56 - 84 - 8 - gup - 15 - 45 ;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadPlanList().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        const { runningPlans = [],completedPlans = [] } = res.msg;
        let showEmptyPage = false;
        if(!runningPlans || runningPlans.length === 0){
           showEmptyPage = true;
        }
        if((!runningPlans || runningPlans.length === 0) && (!completedPlans || completedPlans.length === 0)) {
          if(location.pathname !== '/rise/static/learn') {
            // 没有小课练习，并且不是从导航栏点进来的
            this.context.router.push({
              pathname: '/rise/static/welcome'
            })
            return;
          }
        }
        this.setState({planList:res.msg,showEmptyPage:showEmptyPage});
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });

  }

  handleClickPlan(plan){
    this.context.router.push({
      pathname:'/rise/static/plan/study',
      query:{planId:plan.id}
    })
  }

  handleClickProblemChoose() {
    this.context.router.push({
      pathname: '/rise/static/problem/explore'
    })
  }

  render() {
    const { planList={},showEmptyPage } = this.state;
    const { completedPlans = [],runningPlans =[]} = planList;


    const renderCompletedPlans = () => {
      if(completedPlans){
        return completedPlans.map((plan, key) => {

          return (
            <div className={`p-c-block ${key === 0 ?'first':''}`} key={key}>
            </div>
          );
        });
      } else {
        return null;
      }
    };

    return (
      <div className="plan-list-page">
        <ToolBar />
        <div className="plp-running plp-block">
          <div className="p-r-header">
            <span className="p-r-h-title">进行中</span>
          </div>
          { showEmptyPage?
            <div className="plp-empty-container">
              <div className="plp-empty-img">
                <AssetImg url="https://static.iqycamp.com/images/plan_empty.png" width={55} height={56}/>
              </div>
              <div className="plp-empty-text">
                <span>还没有学习中的课程哦</span>
              </div>
              <div className="plp-empty-button"><span onClick={this.handleClickProblemChoose.bind(this)}>去选课</span></div>
              </div>
            :
            runningPlans.map((item,key) => {
            const { problem } = item;
            return (
              <div className={`p-r-block ${key === 0 ?'first':''} ${key === runningPlans.length - 1 ?'last':''}`} key={key} onClick={()=>this.handleClickPlan(item)}>
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
          })}
        </div>

        { completedPlans && completedPlans.length !== 0?
        <div className="plp-completed plp-block">
          <div className="p-c-header">
            <span className="p-c-h-title">已完成</span>
          </div>
          <div className="p-c-container">
            <div className="p-c-c-left">
              <div className="color-generator">

              </div>
            </div>
            <div className="p-c-c-right" style={{width:`${window.innerWidth - 56}px`}}>
              { completedPlans.map((plan,key)=>{
                const { problem } = plan;
                return (
                  <div className={`p-c-c-r-block ${key === 0 ? 'first':''}`} onClick={()=>this.handleClickPlan(plan)} >
                      <div className={`p-c-c-r-b-icon`}>
                        <div className={`gap ${key === 0 ? 'first':''}`} />
                        <div className={`tick  ${key === 0 ? 'first':''}`}/>
                        <div className={`hr ${key === completedPlans.length-1 ? 'last':''}`}/>
                        <div className={`bottom gap ${key === completedPlans.length -1?'last':'' }`}/>
                      </div>
                      <div className="p-c-b-pic">
                        <img className="p-c-b-p-img" src={`${problem.pic}`}>
                        </img>
                      </div>
                      <div className="p-c-b-text">
                        <div className="p-c-b-t-left" style={{width:`${this.completedLeftTextWidth}px`}}>
                          <div className="p-c-b-t-l-title">
                            {problem.problem}
                          </div>
                          <div className="p-c-b-t-l-close">
                            {plan.closeTime}
                          </div>
                        </div>
                        <div className="p-c-b-t-right" style={{width:`${this.completedRightTextWidth}px`}}>
                          <div className="p-c-b-t-tip">
                            得分：
                          </div>
                          <div className="p-c-b-t-point">
                            {plan.point}
                          </div>
                        </div>
                      </div>
                  </div>
                );
              }) }
            </div>
          </div>
        </div>:null}
        <div className="padding-footer"/>
      </div>
    );
  }
}
