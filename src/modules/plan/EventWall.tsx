import * as React from "react"
import "./EventWall.less"
import {connect} from "react-redux"
import {pget, ppost} from "utils/request"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import {queryEventList,mark} from "./async";
import {ToolBar} from "../base/ToolBar"
import { changeTitle } from '../../utils/helpers'


@connect(state=>state)
export class EventWall extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {};
    changeTitle('活动');
  }

  componentWillMount(){
    const {dispatch} = this.props;
    dispatch(startLoad());
    queryEventList()
      .then(res=>{
        dispatch(endLoad());
        if(res.code === 200){
          this.setState({list:res.msg})
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    })
  }

  goEvent(item){
    mark({module:"打点",function:"活动墙",action:"打开活动墙",memo:item.id});
    window.location.href=item.destUrl;
  }



  render(){
    const {list} = this.state;
    return (<div className="layout">
      <div className="catalog-style-1">
        活动墙
      </div>
      <div className="mg-bg-grey"/>
      <ul className="event-list">
        {list ? list.map((item,idx)=> {
          return <li onClick={()=>this.goEvent(item)} key={idx} className="event-item">
            <img className="head-pic"
                 src={item.pic}/>
            <div className="event-info">
              <div className="title">
                {item.title}
              </div>
              <div className="describe">
                {item.publisher}
              </div>
              <div className="time">
                {item.showTime?`${item.startStr} ~ ${item.endStr}`:null}
              </div>
            </div>
          </li>
        }) : null}
      </ul>
      <div className="show-more" style={{borderTop:'1px solid #efefef'}}>没有更多了</div>
      <div className="padding"></div>
      <ToolBar/>
    </div>)
  }
}
