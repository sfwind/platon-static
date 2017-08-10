import * as React from "react";
import { connect } from "react-redux";
import "./MessageCenter.less";
import { loadMessage, readMessage } from "./async";
import { startLoad, endLoad, alertMsg } from "../../redux/actions";
import { set, findIndex, remove } from "lodash"
import PullElement from "pull-element";
import AssetImg from "../../components/AssetImg";
import { mark } from "../../utils/request"
import { changeTitle, goOtherWeb } from '../../utils/helpers'

@connect(state => state)
export class MessageCenter extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      index: 1,
      list: [],
      pull: {},
      no_message: false,
      end: true,
    }
    this.pullElement = null
    changeTitle('消息中心');
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(props) {
    const { dispatch } = props || this.props
    dispatch(startLoad())
    loadMessage(1).then((res) => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        let no_message = false
        if(msg.notifyMessageList.length === 0) {
          no_message = true
        }
        this.setState({ list: msg.notifyMessageList, no_message, end: msg.end })
        if(msg.end === true && this.pullElement) {
          this.pullElement.disable()
        }
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  componentDidMount() {
    mark({ module: "打点", function: "消息中心", action: "打开消息中心页面" });
  }

  componentDidUpdate(preProps, preState) {
    const { list } = this.state
    if(list.length > 0 && !this.pullElement) {
      // 有内容并且米有pullElement
      const { dispatch } = this.props;
      this.pullElement = new PullElement({
        target: '.container',
        scroller: '.container',
        damping: 4,
        onPullUp: (data) => {
          if(this.props.iNoBounce) {
            if(this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.disable();
            }
          }
          this.setState({ loading: true })
        },
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: (data) => {
          loadMessage(this.state.index + 1).then(res => {
            const { code, msg } = res;
            if(code === 200) {
              this.setState({ loading: false })
              if(msg && msg.length !== 0) {
                remove(msg.notifyMessageList, (item) => {
                  return findIndex(this.state.list, item) !== -1
                })
                this.setState({
                  list: this.state.list.concat(msg.notifyMessageList),
                  index: this.state.index + 1, end: msg.end
                })
                if(msg.end === true) {
                  this.pullElement.disable()
                }
              } else {
                dispatch(alertMsg(msg));
              }
            } else {
              dispatch(alertMsg(msg));
            }
          }).catch(ex => {
            dispatch(alertMsg(ex));
          });
          if(this.props.iNoBounce) {
            if(!this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.enable();
            }
          }
        }
      })
      this.pullElement.init();
    }
  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null;
  }

  open(url, id, isRead) {
    let reg = new RegExp("^(http|https):");
    const { list } = this.state;
    if(!isRead) {
      readMessage(id).then(res => {
        const { code } = res;
        if(url) {
          if(reg.test(url)) {
            goOtherWeb(url);
          } else {
            this.context.router.push(url);
          }
        }
        if(code === 200) {
          list.map((item) => {
            if(item.id === id) {
              item.isRead = true;
            }
          });
          this.setState({ list });
        } else {
          //静默加载 啥都不干
        }
      }).catch(ex => {
        //静默加载 啥都不干
      })
    } else {
      if(url) {
        if(reg.test(url)) {
          window.location.href = url;
        } else {
          this.context.router.push(url);
        }
      }
    }
  }

  back() {
    this.context.router.push({ pathname: '/rise/static/learn' })
  }

  render() {
    const { list, no_message, end, loading } = this.state;

    const messageRender = (msg) => {
      const { id, message, fromUserName, fromUserAvatar, url, isRead, sendTime } = msg;
      return (
        <div className="message-cell">
          <div className="message-avatar"><img className="message-avatar-img" src={fromUserAvatar}/></div>
          <div className="message-area" onClick={() => this.open(url, id, isRead)}>
            <div className={isRead?"message-head read":"message-head unread"}>
              <div className={isRead?"message-name read":"message-name unread"}>
                {fromUserName}
              </div>
              <div className={isRead?"message-time right read":"message-time right unread"}>{sendTime}</div>
            </div>
            <div className={isRead?"message-content read":"message-content unread"}>{message}</div>
          </div>
        </div>
      )
    }

    const renderShowMore = () => {
      if(loading) {
        return (
          <div style={{textAlign:'center', margin: '5px 0'}}>
            <AssetImg url="https://static.iqycamp.com/images/loading1.gif"/>
          </div>
        )
      }
      if(end && !no_message) {
        return (
          <div className="show-more">已经到最底部了</div>
        )
      } else {
        return (
          <div className="show-more">上拉加载更多消息</div>
        )
      }
    }

    return (
      <div className="message_box">
        { no_message ? <div className="no_message">
          <div className="no_comment">
            <AssetImg url="https://static.iqycamp.com/images/no_comment.png" height={120} width={120}/>
          </div>
          还没有消息提醒
        </div>: <div className="container has-footer">
          {list.map((msg, idx) => messageRender(msg))}
          { renderShowMore() }
        </div>}

      </div>
    )
  }

}
