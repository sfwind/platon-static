import * as React from "react";
import {connect} from "react-redux";
import "./NewProblemPriority.less";
import {remove} from "lodash";
import {loadProblemList, submitProblemList} from "./async";
import {startLoad, endLoad, alertMsg} from "redux/actions";
import {merge, fill} from "lodash";
import AssetImg from "../../components/AssetImg";
import ProblemViewer from "./components/ProblemViewer"

@connect(state => state)
export class NewProblemPriority extends React.Component <any,any> {
  constructor() {
    super();
    this.state = {
      catalogOpen: [],
      scrollTimer: null,
      showProblem:false,
      selectProblem:{},
    }
    this.catalogHeight = 316 / 750 * window.innerWidth;
    this.problemHeight = 180 / 750 * window.innerWidth;
    this.iconSize = 1 / 6 * window.innerWidth;
  }

  componentWillMount() {
    const {dispatch} = this.props
    dispatch(startLoad())
    loadProblemList().then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        if (!msg.catalogList.length && msg.catalogList.length === 0) {
          // this.context.router.push({ pathname: '/rise/problem/priority' })
          dispatch(alertMsg('问题列表为空, 请联系管理员'))
        } else {
          let catalogOpen = [];
          msg.catalogList.forEach(item => catalogOpen.push(false));
          this.setState(merge({}, msg, {catalogOpen: catalogOpen}));
        }
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }


  openProblemIntro(problem) {
    this.setState({showProblem:true,selectProblem:problem});
  }

  openCatalog(seq, e) {
    const {catalogOpen, scrollTimer} = this.state;
    this.setState({catalogOpen: fill(catalogOpen, !catalogOpen[seq], seq, seq + 1)});
  }

  submitProblem(problemId){
    console.log("学这个",problemId);
  }


  render() {
    const {name, catalogList, problemListSelected, catalogOpen,showProblem,selectProblem} = this.state
    console.log(name, catalogList, problemListSelected);
    console.log(showProblem);
    return (
      <div className="swipe-container"  style={{height:`${showProblem?window.innerHeight+'px':'100%'}`,overflow:`${showProblem?'hidden':'auto'}`}}>
        <div className="header">
          你好，{window.ENV.userName},我是你的圈外每日提升教练。<br/>
          训练开始前，我想更了解你的情况。
        </div>
        {catalogList ? catalogList.map((catalog, seq) => {
          const {problemList} = catalog;
          return (
            <div
              style={{backgroundImage:`url(${catalog.pic})`,zIndex:`${seq*1000}`
              }}
              className="swipe-box">
              <div className="swipe-box-mask" style={{opacity:`${catalogOpen[seq]?'0.18':'0.25'}`}}>

              </div>
              <div className="box-content">
                <div className="catalog-name">{catalog.name}</div>
                <div onClick={(e)=>this.openCatalog(seq,e)} className="catalog-arrow">
                  <AssetImg size={this.iconSize}
                            type={`${catalogOpen[seq]?'arrowUp':'arrowDown'}`}/>
                </div>
              </div>
              <div className={`problem-box ${catalogOpen[seq]?'up30':'fade'}`}
                   style={{height:`${catalogOpen[seq]?(this.problemHeight+8)*problemList.length+'px':'0px'}`,
                   overflow:`${catalogOpen[seq]?'auto':'hidden'}`,
                   padding:`${catalogOpen[seq]?'15px 0 0':'0'}`}}>
                {problemList ? problemList.map((problem, seq) => {
                  return (
                    <div style={{height:`${this.problemHeight}+'px`}} onClick={()=>this.openProblemIntro(problem)}
                         className="problem">
                      <span className="title">{problem.problem}</span>
                      <span className="tips">专题介绍</span>
                    </div>
                  )
                }) : null}
              </div>
            </div>
          )
        }) : null}
        <div className="more-box">
          <span>更多专题&nbsp;&nbsp;敬请期待</span>
        </div>
        {showProblem?<ProblemViewer problem={selectProblem} closeModel={()=>this.setState({showProblem:false})} submitProblem={(problemId)=>this.submitProblem(problemId)}/>:null}
      </div>
    )
  }
}
