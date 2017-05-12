import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import "./Rise.less"


@connect(state=>state)
export default class Rise extends React.Component<any,any>{
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props){
    super(props);
    this.state={
      point:null,
    }
  }

  componentWillMount(){
    changeTitle("RISE");
    const {dispatch} = this.props;
    dispatch(startLoad());
    pget("/rise/customer/riseid")
      .then(res=>{
        dispatch(endLoad());
        if(res.code===200){
          this.setState({riseId:res.msg});
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err=>{
      dispatch(endLoad());
      dispatch(alertMsg(err+""));
    })
  }
  render(){
    return (
     <div className="rise">
       <div className="item">
         <div className="label">
           RISE ID
         </div>
         <div className="content-no-cut">
           {this.state.riseId}
         </div>
       </div>

       <div className="item" onClick={()=>{this.context.router.push("/rise/static/customer/problem")}}>
         <div className="label">
           我的小课
         </div>
         <div className="content">
         </div>
       </div>
     </div>
    )
  }
}
