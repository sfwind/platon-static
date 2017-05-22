import * as React from "react"
import {connect} from "react-redux"
import {merge} from 'lodash';
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import './MoreProblem.less';
import { loadCatalog } from "./async"
import ProblemItem from './components/ProblemItem'


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
    this.picWidth = window.innerWidth*0.4 - 25;
    this.picHeight = 80 / 130 * this.picWdith;
    this.bigFontSize = 13 / 375 * window.innerWidth;
    this.smallFontSize = 12 / 375 * window.innerWidth;
  }

  componentWillMount() {
    const {dispatch} = this.props;
    dispatch(startLoad());
    loadCatalog(this.props.location.query.catalogId)
      .then(res=>{
        dispatch(endLoad());
        if(res.code === 200){
          console.log(res.msg);
          this.setState({problemList:res.msg});
        }
      }).catch(ex=>{
        dispatch(endLoad());
        dispatch(alertMsg(ex));
    })

    this.picWidth = 130 / 375 * window.innerWidth;
    this.picHeight = 80 / 130 * this.picWidth;
  }
  openProblem(problem){
    let param = {
      id: problem.id
    }
    if(this.props.location.query.show){
      merge(param,{show:true});
    }
    this.context.router.push({pathname: '/rise/static/problem/view', query: param});
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
             return <ProblemItem
               rootClass={'bborder'}
               problem={item} clickHandler={(problem)=>this.openProblem(problem)}/>
           }):null}
        </div>
        <div className="show-more" style={{borderTop:'1px solid #efefef'}}>没有更多了</div>
      </div>
    )
  }
}
