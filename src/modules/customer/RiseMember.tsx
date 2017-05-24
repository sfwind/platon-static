import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import "./PointTip.less"
import { Button, ButtonArea, Dialog, Form, FormCell, CellHeader, CellBody, Checkbox } from "react-weui"
import AssetImg from "../../components/AssetImg";


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
    changeTitle("RISE");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/rise/customer/member").then(res => {
      dispatch(endLoad());
      const {code, msg} = res;
      if (code === 200) {
        if (msg) {
          console.log(msg);
          this.setState({riseMember: true, memberType: msg});
        } else {
          this.setState({riseMember: false})
        }
      } else {
        dispatch(alertMsg(msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
    // this.setState({riseMember: this.props.location.query.riseMember});
  }

  goUp(){
    pget('/personal/mark/rise/up').then(()=>{
      window.location.href=`https://${window.location.hostname}/pay/pay`
    }).catch(()=>{
      window.location.href=`https://${window.location.hostname}/pay/pay`
    })
  }

  render() {
    const {memberType} = this.state;
    return (
      <div className="point-tip">
        <div className="point-tip-title">
          RISE正式版
        </div>
        { this.state.riseMember ?
          <div className="point-tip-container">
            <b style={{fontSize:"14px"}}>当前会员：{memberType.name}</b><br/>
            有效期至：{memberType.endTime}<br/><br/>
            会员专享：<br/>
            {memberType===3?
            <ul>
              <li>课程知识体系</li>
              <li>课程具体内容</li>
              <li>课程配套练习</li>
              <li>学习讨论区</li>
              <li>大咖直播分享</li>
              <li>作业案例直播</li>
              <li>教练文字点评</li>
              <li>免费线下学习活动</li>
            </ul>:
              <ul>
                <li>课程知识体系</li>
                <li>课程具体内容</li>
                <li>课程配套练习</li>
                <li>学习讨论区</li>
                <li>大咖直播分享</li>
                <li>作业案例直播</li>
              </ul>
            }
            <br/><br/>

            <b style={{fontSize: '14px'}}> 作业案例直播是什么？</b><br/>
            -定期针对各个课程，以学员作业为案例，进行语音直播讲解和答疑，帮助理解<br/><br/>
            <b style={{fontSize: '14px'}}> 线下学习活动怎么玩？</b><br/>
            -针对部分课程，有线下工作坊，每期20-30人，由圈外教练带领学习，并促进学员间进行职场资源对接，4月在上海施行，6月内推广到北京、深圳、广州，其它城市陆续推出<br/><br/>
            <b style={{fontSize: '14px'}}> 大咖直播分享是什么？</b><br/>
            -定期针对学员需求，邀请相关大咖进行直播分享<br/>

          </div>  :

          <div className="point-tip-container">
            <b style={{fontSize:"14px"}}>还未升级成正式版哦！</b><br/>
            <div className="rocket-container">
            </div>
            <div className="button" onClick={()=>{this.goUp()}}>
              升级正式版
            </div>
          </div>
        }
        <div className="padding-footer"></div>
      </div>
    )
  }
}
