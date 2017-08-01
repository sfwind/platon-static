import * as React from "react";
import "./PlanList.less";
import {connect} from "react-redux";
import {loadPlanList, updateOpenNavigator} from "./async";
import {startLoad, endLoad, alertMsg} from "redux/actions";
import {loadProblem, createPlan, checkCreatePlan,mark} from "./async";
import AssetImg from "../../components/AssetImg";
import { changeTitle } from "../../utils/helpers"
import {ToolBar} from "../base/ToolBar"

import Tutorial from "../../components/Tutorial"
import {isBoolean,merge} from "lodash"

/**
 * rise_icon_hr 左侧较宽 TODO
 */
@connect(state=>state)
export default class PlanList extends React.Component<any,any> {
  constructor() {
    super();
    this.state = {
      openNavigator:true,
    };
    this.runPicWidth = (window.innerWidth / (750 / 270)) > 135 ? 135 : (window.innerWidth / (750 / 270));
    this.runTextWidth = (window.innerWidth - 30 - this.runPicWidth - 5);
    this.completedRightTextWidth = 45;
    let gup = 0;
    if(window.innerWidth > 350){
      gup = 30;
    }
    this.completedLeftTextWidth = window.innerWidth - 56 - 84 - 8 - gup - 15 - 45 ;
    changeTitle("圈外同学");
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({
      module: "打点",
      function: "学习",
      action: "打开学习页面",
      memo: window.ENV.osName
    });

    const { dispatch,location } = this.props;
    dispatch(startLoad());
    const {runningPlanId,completedPlanId} = location.query;
    loadPlanList().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        const { runningPlans = [],completedPlans = [], trialClosedPlans= [], openNavigator } = res.msg;
        let showEmptyPage = false;
        if(!runningPlans || runningPlans.length === 0){
           showEmptyPage = true;
        }
        if((!runningPlans || runningPlans.length === 0) && (!completedPlans || completedPlans.length === 0) && (!trialClosedPlans || trialClosedPlans.length === 0)) {
          if(location.pathname !== '/rise/static/learn') {
            // 没有小课练习，并且不是从导航栏点进来的
            this.context.router.push({
              pathname: '/rise/static/welcome'
            })
            return;
          }
        }
        this.setState({planList:res.msg,showEmptyPage:showEmptyPage},()=>{
          // // 第一次选课动画效果,ios有问题
          // if(runningPlanId){
          //   let planDom = document.querySelector(`#problem-${runningPlanId}`);
          //   if(planDom){
          //     planDom.style.cssText = `transform:translateY(-${planDom.offsetTop + planDom.offsetHeight}px)`;
          //     setTimeout(()=>{
          //       planDom.style.cssText = "transform:translateY(0)";
          //     },1);
          //   }
          // }
          // if(completedPlanId){
          //   let planDom = document.querySelector(`#problem-${completedPlanId}`);
          //   if(planDom) {
          //     let box = document.querySelector('.plan-list-page');
          //     box.scrollTop = planDom.offsetTop;
          //   }
          // }
        });
        this.setState({planList:res.msg,showEmptyPage:showEmptyPage, openNavigator});
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
      query:{planId:plan.planId}
    })
  }

  handleClickProblemChoose() {
    this.context.router.push({
      pathname: '/rise/static/problem/explore'
    })
  }

  tutorialEnd() {
    const {dispatch} = this.props
    updateOpenNavigator().then(res => {
      const {code, msg} = res
      if (code === 200) {
        this.setState({openNavigator: true})
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  render() {
    const { location } = this.props;
    const { runningPlanId,completedPlanId,trialClosedId } = location.query;
    const { planList={},showEmptyPage, openNavigator } = this.state;
    const { completedPlans = [],runningPlans = [],trialClosedPlans = []} = planList;

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

    const renderDeadline = (deadline) => {
      if(deadline <0 ){
        return null;
      } else {
        return (
          <div className="p-r-b-i-text-close">
            距关闭：{deadline}&nbsp;天
          </div>
        );
      }

    };

    return (
      <div>
        <div className="plan-list-page">
          <ToolBar />
          <Tutorial show={isBoolean(openNavigator) && !openNavigator} onShowEnd={() => this.tutorialEnd()}
                    bgList={['https://static.iqycamp.com/images/fragment/rise_pl_0727_1_2.png',
                  'https://static.iqycamp.com/images/fragment/rise_pl_0727_2.png']}
                    topList={[0, 169]} bottomList={[55, 0]}
          />
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
                let style = {};
                if(runningPlanId==item.planId && false){
                  style = {
                    transform:`translateY(${-window.innerHeight}px)`
                  }
                } else {
                  style = {
                    transform:'0'
                  }
                }
                return (
                  <div id={`problem-${item.planId}`} style={style} className={`p-r-block ${key === 0 ?'first':''} ${key === runningPlans.length - 1 ?'last':''}`} key={key} onClick={()=>this.handleClickPlan(item)}>
                    <div className="p-r-b-item">
                      <div className="p-r-b-i-pic" style={{width:`${this.runPicWidth}px`}}>
                        <img className="p-r-b-i-pic-img" src={`${item.pic}`}/>
                      </div>
                      <div className="p-r-b-i-text" style={{width:`${this.runTextWidth}px`}}>
                        <div className="p-r-b-i-text-title">
                          {item.name}
                        </div>
                        <div className="p-r-b-i-text-done">
                          已完成：{`${item.completeSeries}/${item.totalSeries}节`}
                        </div>
                        <div className="p-r-b-i-text-done">
                        距关闭：{`${item.deadline} 天`}
                        </div>
                      </div>
                    </div>
                  </div>
                  );
              })}
          </div>



          { trialClosedPlans && trialClosedPlans.length !== 0?
            <div className="plp-completed plp-block">
              <div className="p-c-header">
                <span className="p-c-h-title">试用到期</span>
              </div>
              <div className="p-c-container none">
                <div className="p-c-c-left">
                  <div className="color-generator">
                  </div>
                </div>
                <div className="p-c-c-right" style={{width:`${window.innerWidth - 56}px`}}>
                  { trialClosedPlans.map((plan,key)=>{
                    return (
                      <div id={`problem-${plan.planId}`} className={`p-c-c-r-block ${key === 0 ? 'first':''}`} onClick={()=>this.handleClickPlan(plan)} >
                        <div className={`p-c-c-r-b-icon`}>
                          {/*<div className={`gap ${key === 0 ? 'first':''}`} />*/}
                          {/*<div className={`tick  ${key === 0 ? 'first':''}`}/>*/}
                          {/*<div className={`hr ${key === completedPlans.length-1 ? 'last':''}`}/>*/}
                          {/*<div className={`bottom gap ${key === completedPlans.length -1?'last':'' }`}/>*/}
                        </div>
                        <div className="p-c-b-pic">
                          <img className="p-c-b-p-img" src={`${plan.pic}`}>
                          </img>
                        </div>
                        <div className="p-c-b-text">
                          <div className="p-c-b-t-left" style={{width:`${this.completedLeftTextWidth}px`}}>
                            <div className="p-c-b-t-l-title">
                              {plan.name}
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

            <div className="plp-completed plp-block">
              <div className="p-c-header">
                <span className="p-c-h-title">已完成</span>
              </div>
              { completedPlans && completedPlans.length !== 0?
              <div className="p-c-container">
                <div className="p-c-c-left">
                  <div className="color-generator">
                  </div>
                </div>
                <div className="p-c-c-right" style={{width:`${window.innerWidth - 56}px`}}>
                  { completedPlans.map((plan,key)=>{
                    return (
                      <div id={`problem-${plan.planId}`} className={`p-c-c-r-block ${key === 0 ? 'first':''}`} onClick={()=>this.handleClickPlan(plan)} >
                        <div className={`p-c-c-r-b-icon`}>
                          <div className={`gap ${key === 0 ? 'first':''}`} />
                          <div className={`tick  ${key === 0 ? 'first':''}`}/>
                          <div className={`hr ${key === completedPlans.length-1 ? 'last':''}`}/>
                          <div className={`bottom gap ${key === completedPlans.length -1?'last':'' }`}/>
                        </div>
                        <div className="p-c-b-pic">
                          <img className="p-c-b-p-img" src={`${plan.pic}`}>
                          </img>
                        </div>
                        <div className="p-c-b-text">
                          <div className="p-c-b-t-left" style={{width:`${this.completedLeftTextWidth}px`}}>
                            <div className="p-c-b-t-l-title">
                              {plan.name}
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
                  })}
                </div>
              </div>
              :   <div className="complete-plan-empty">
                    <AssetImg url='https://static.iqycamp.com/images/complete_plan_empty.png?imageslim' />
                  </div>}
            </div>
          <div className="padding-footer"/>
        </div>
      </div>
    );
  }
}

interface CardListProps {
  pic:String,
  title:String,
  completeSeries?:String,
  dayToClose?:String,
  closeTime?:String,
}
class CardList extends React.Component<CardListProps,any>{

}
