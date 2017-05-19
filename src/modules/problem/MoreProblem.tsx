import * as React from "react"
import {connect} from "react-redux"
import {merge} from 'lodash';
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {changeTitle} from "utils/helpers"
import './MoreProblem.less';
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
             return (
               <div className="problem-item" onClick={()=>this.openProblem(item)}>
                 <div className="pic"
                      style={{width:`${this.picWidth}px`,height:`${this.picHeight}px`,backgroundImage:`url(${item.pic})`}}>
                 </div>
                 <div className="desc" style={{width:`${window.innerWidth - this.picWidth - 35}px`,height:`${this.picHeight}px`}}>
                   <p className="title" style={{width:`${window.innerWidth - this.picWidth - 35}px`}}>{item.name}</p>
                   <p className="catalog sub-font">分类：{item.catalog}</p>
                   <p className="author sub-font">讲师：{item.author}</p>
                   <p className="score sub-font">难度系数：{item.difficulty}/5.0</p>
                 </div>
               </div>
             )
           }):null}
        </div>
      </div>
    )
  }
}
