import * as React from "react";
import { connect } from "react-redux";
import "./RiseMemberExplain.less";
import { loadRiseMembers,createOrder } from "./async";
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
    dispatch(startLoad());
    loadRiseMembers().then((res)=>{
      dispatch(endLoad());
      if(res.code === 200 || res.code === 201){
        this.setState({memberTypes:res.msg,riseMember:res.code === 201})
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
    })

  }

  onSubmit() {
    this.context.router.push({ pathname: '/rise/static/plan/main' })
  }

  goBack(){
    const { location } = this.props;
    if(location.query.callback){
      // 如果有callback参数
      console.log(callback);
    } else {
      this.context.router.push({
        pathname:'/rise/static/plan/main',
        query:location.query
      })
    }
  }

  goPayPage(memberTypeId){
    console.log('去付款:' + memberTypeId);
    const {dispatch} = this.props;
    dispatch(startLoad());
    createOrder(memberTypeId).then(res=>{
      dispatch(endLoad());
      if(res.code === 200){
        window.location.href = `http://${window.location.hostname}:4000/pay/pay?productId=${res.msg.orderId}`;
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  render() {
    const { memberTypes = [] } = this.state

    return (
      <div>
        <div className="container has-footer">
          <div className="header">
            会员说明
          </div>
          <div className="member-container">
            {memberTypes.map(item=>{
              return <div className="member-name" onClick={()=>this.goPayPage(item.id)}>{item.name}</div>
            })}
          </div>
        </div>
        <div className="button-footer" onClick={()=>this.goBack()}>返回</div>
      </div>
    )
  }
}
