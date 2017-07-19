import * as React from "react"
import {connect} from "react-redux"
import "./ProblemGallery.less"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import { mark } from "utils/request"
import {changeTitle} from "utils/helpers"


@connect(state=>state)
export default class ProblemGallery extends React.Component<any,any>{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state = {
    };
  }

  componentWillMount(){
    mark({module: "打点", function: "个人中心", action: "打开我的小课页面"});
    changeTitle("我的小课");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/rise/customer/plans")
        .then(res=>{
          dispatch(endLoad());
          if(res.code===200){
            this.setState(res.msg);
          } else{
            dispatch(alertMsg(res.msg));
          }
        }).catch(err=>{
      dispatch(endLoad());
      dispatch(alertMsg(err+""));
    });
  }

  goPlanView(item){
    let query = {planId:item.planId}
    this.context.router.push({pathname:"/rise/static/plan/study",query})
  }

  render(){
    const {runningPlans=[],donePlans=[],point} = this.state;

    const renderGalleyList = (plans, isHistory)=>{
      return (
        <div className="galley-module-content">
          {plans && plans.length > 0 ?plans.map((item,index)=>{
            return (
              <div key={index} className="item" onClick={()=>this.goPlanView(item)}>
                <div className="item-label">
                  {item.name}
                </div>
                <div className="item-content">
                  {item.point+" 积分"}
                </div>
              </div>
            )
          }):<div className="item">
            <div className="item-label" style={{color:"#999999"}}>
              无
            </div>
          </div>}
        </div>
      )
    }

    return(
        <div className="problem-gallery">
          <div className="problem-galley-header" onClick={()=>this.context.router.push({
            pathname:'/rise/static/customer/point/tip',
          })} style={{    marginBottom:"10px",borderBottom:"none"}}>
            <div className="header-label" style={{float:"left"}}>
              总积分
            </div>
            <div className="header-content arrow" style={{float:"right",marginRight:"20px"}}>
              {point}{'积分'}
            </div>
          </div>

          <div className="problem-galley-container">
            <div className="galley-module">
              <div className="galley-module-header">
                <div className="label">
                  进行中
                </div>
              </div>
              {renderGalleyList(runningPlans, false)}
            </div>

            <div className="galley-module">
              <div className="galley-module-header">
                <div className="label">
                  已完成
                </div>
              </div>
              {renderGalleyList(donePlans, true)}
            </div>
          </div>
          <div className="problem-galley-header arrow" style={{marginTop:"10px"}} onClick={()=>{window.location.href = "http://mp.weixin.qq.com/s/8VIQPI_MYgJA6BrseIsr0Q"}}>
            【圈外小课】介绍
          </div>
          <div className="padding-footer"></div>
        </div>
    )
  }
}
