import * as React from "react";
import {connect} from "react-redux";
import "./MessageCenter.less";
import {loadMessage, readMessage} from "./async";
import {startLoad, endLoad, alertMsg} from "../../redux/actions";
import {set, findIndex, remove} from "lodash"
import PullElement from "pull-element";
import AssetImg from "../../components/AssetImg";

@connect(state => state)
export class MessageCenter extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      index:1,
      list:[],
      pull:{},
      opacity: 0,
      no_message: false,
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
        damping:4,
        onPullUp: (data) => {
          if (data.translateY <= -40){
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
        let no_message = false
        if(msg.length === 0){
          no_message = true
        }
        this.setState({index:2, list: msg, no_message})
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
    const {list, no_message} = this.state

    const messageRender = (msg) => {
      const {id, message, fromUserName, fromUserAvatar, url, isRead, sendTime} = msg
      return (
        <div className="comment-cell">
          <div className="comment-avatar"><img className="comment-avatar-img" src={fromUserAvatar} /></div>
          <div className="comment-area" onClick={() => this.open(url, id, isRead)}>
            <div className={isRead?"comment-head read":"comment-head unread"}>
              <div className="comment-name">
                {fromUserName}
              </div>
              <div className="comment-time right">{sendTime}</div>
            </div>
            <div className={isRead?"comment-content read":"comment-content unread"}>{message}</div>
          </div>
          <div className="comment-hr"/>
        </div>
      )
    }

    return (
      <div className="message_box">
        { no_message ? <div className="on_message">
                        <div className="no_comment">
                          <AssetImg url="http://www.iquanwai.com/images/no_comment.png" height={120} width={120}/>
                        </div>
                        还没有消息提醒
          </div>: <div className="container has-footer">
          {list.map((msg, idx) => messageRender(msg))}
        </div>}

        <div className="show-more" style={{opacity:`${this.state.opacity}`}} >上拉加载更多消息</div>
        <div className="button-footer fix" onClick={this.back.bind(this)}>返回</div>

      </div>
    )
  }

}
