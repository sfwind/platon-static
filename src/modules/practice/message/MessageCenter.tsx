import * as React from "react";
import {connect} from "react-redux";
import "./MessageCenter.less";
import {loadMessage, readMessage} from "./async";
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import {set} from "lodash"
import PullElement from "pull-element";

@connect(state => state)
export class MessageCenter extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      index:1,
      list:[],
      pull:{},
    }

  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
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
      this.context.router.push({ pathname: url })
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
      this.context.router.push({pathname: path, query: param})
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
        <ScrollTip/>
        <div className="button-footer fix" onClick={this.back.bind(this)}>返回</div>

      </div>
    )
  }

}

export class ScrollTip extends React.Component<any, any> {
  state = {
    damping: 1.6,
    pullUp: true,
    pullDown: false,
    pullLeft: false,
    pullRight: false,
    detectScroll: false,
    detectScrollOnStart: false,
    detectScrollOnMove: false,
    drag: false,
    transitionDuration: '0.3s',
    transitionTimingFunction: 'ease-out',
  }

  addPullElement() {
    if (this.pullElement) {
      this.pullElement.destroy()
    }
    let { target } = this.refs
    console.log(target)
    let options = {
      ...this.state,
      damping: 3.0,
    }
    let pullElement = new PullElement({
      target: target,
      ...options,
    })
    pullElement.init()
    this.pullElement = pullElement
  }

  componentDidMount() {
    this.addPullElement()
  }

  componentWillUnmount() {
    this.pullElement.destroy()
  }

  render() {
    return (
      <div ref="target" style={{height:40, width: "100%", position:"fixed", bottom:49}}></div>
    )
  }
}
