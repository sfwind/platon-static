import * as React from "react"
import {connect} from "react-redux"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import { loadCatalog } from "./async"


@connect(state => state)
export class MoreProblem extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      point: null,
    }
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(startLoad());
    loadCatalog(this.props.location.query.catalogId)
      .then(res=>{
        dispatch(endLoad());
        if(res.code === 200){
          this.setState({problemList:res.msg});
        }
      }).catch(ex=>{
        dispatch(endLoad());
        dispatch(alertMsg(ex));
    })

    this.picWidth = 130 / 375 * window.innerWidth;
    this.picHeight = 80 / 130 * this.picWidth;
  }

  render() {
    const {problemList} = this.state;
    return (
      <div className="more-problem">
        <div className="simple-page-header">
          定位自己
        </div>
        <div className="more-problem-container">
           {problemList?problemList.map((item,key)=>{
             return (
               <div className="problem-item">
                 <div className="">

                 </div>
               </div>
             )
           }):null}
        </div>
      </div>
    )
  }
}
