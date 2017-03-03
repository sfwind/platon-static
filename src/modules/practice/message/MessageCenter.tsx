import * as React from "react";
import {connect} from "react-redux";
import "./MessageCenter.less";
import {loadMessage, readMessage} from "./async";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import {set, findIndex, remove} from "lodash"
import PullElement from "pull-element";

@connect(state => state)
export class MessageCenter extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      index:1,
      list:[],
      pull:{},
      opacity: 0,
    }
    this.pullElement=null
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidUpdate(preProps,preState){
    const {list} = this.state
    if(list.length>0 && !this.pullElement){
      // 有内容并且米有pullElement
      const {dispatch} = this.props;
      this.pullElement = new PullElement({
        target:'.container',
        scroller:'.container',
        damping:2,
        onPullUp: (data) => {
          if (data.translateY <= -40){
            this.pullElement.preventDefault()
          } else {
            this.setState({opacity:(-data.translateY)/40});
          }
        },
        detectScroll:true,
        detectScrollOnStart:true,
        onPullUpEnd:(data)=>{
          console.log("开始加载更多");
          this.setState({opacity:0});
          dispatch(startLoad());
          loadMessage(this.state.index + 1).then(res=> {
            dispatch(endLoad());
            if (res.code === 200) {
              if (res.msg && res.msg.length !== 0) {
                remove(res.msg,(item)=>{
                  return findIndex(this.state.list,item)!==-1;
                })
                this.setState({list: this.state.list.concat(res.msg), index: this.state.index + 1});
              } else {
                dispatch(alertMsg('没有更多消息了'));
              }
            } else {
              dispatch(alertMsg(res.msg));
            }
          }).catch(ex => {
            dispatch(endLoad());
            dispatch(alertMsg(ex));
          });
        }
      })
      this.pullElement.init();
    }
  }

  componentWillUnmount(){
    this.pullElement?this.pullElement.destroy():null;
  }

  componentWillMount(props) {
    const {dispatch} = props || this.props
    dispatch(startLoad())
    loadMessage(1).then(res => {
      dispatch(endLoad())
      const {code, msg} = res

      if (code === 200) {
        this.setState({index:2, list: msg})
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })

  }

  open(url, id, isRead){
    if(!isRead) {
      readMessage(id).then(res => {
        const {code} = res
        if (code === 200) {
        } else {
          //静默加载 啥都不干
        }
      }).catch(ex => {
        //静默加载 啥都不干
      })
    }

    if(url.indexOf('?')===-1){
      this.context.router.push({ pathname: url, state: {goBackUrl: '/rise/static/message/center'} })
    }else{
      //解析url
      let index = url.indexOf('?')
      let path = url.substring(0, index)
      let query = url.substring(index+1)

      let param = {}
      let params = query.split("&")
      for(let i=0;i<params.length;i++){
        let pos = params[i].indexOf("=");
        if(pos == -1) continue;
        let argName  = params[i].substring(0,pos);
        let argValue = params[i].substring(pos+1);

        set(param, argName, argValue)
      }
      this.context.router.push({pathname: path, query: param, state: {goBackUrl: '/rise/static/message/center'}})
    }

  }

  back(){
    this.context.router.push({pathname: '/rise/static/plan/main'})
  }

  render() {
    const {list} = this.state

    const messageRender = (msg) => {
      const {id, message, fromUserName, fromUserAvatar, url, isRead, sendTime} = msg
      return (
        <div className="message-cell">
          <div className="message-avatar"><img className="message-avatar-img" src={fromUserAvatar} /></div>
          <div className="message-area" onClick={() => this.open(url, id, isRead)}>
            <div className={isRead?"message-ceil read":"message-ceil unread"}>
              <div className="message-name">
                {fromUserName}
              </div>
              <div className="message-time">{sendTime}</div>
            </div>
            <div className={isRead?"message-comment read":"message-comment unread"}>{message}</div>
          </div>
          <div className="message-hr"/>
        </div>
      )
    }

    return (
      <div>
        <div className="container has-footer">
          {list.map((msg, idx) => messageRender(msg))}
        </div>
        <div className="show-more" style={{opacity:`${this.state.opacity}`}} >上拉加载更多消息</div>
        <div className="button-footer fix" onClick={this.back.bind(this)}>返回</div>

      </div>
    )
  }

}
