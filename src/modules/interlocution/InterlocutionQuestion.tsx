import React, { Component } from 'react';
import { connect } from 'react-redux';
import "./InterlocutionQuestion.less";
import { unScrollToBorder } from '../../utils/helpers'
import { getInterlocutionQuestions, loadInterlocutionDateInfo, follow, unfollow, goSubmitPage } from './async';
import { startLoad, endLoad, alertMsg, set } from "../../redux/actions"
import * as _ from 'lodash';
import PullElement from 'pull-element';
import PullSlideTip from '../../components/PullSlideTip'
import RenderInBody from '../../components/RenderInBody'
import AssetImg from '../../components/AssetImg'

@connect(state => state)
export default class InterlocutionQuestion extends Component {
  constructor() {
    super();
    this.state = {
      page: 1,
      showQrDialog: false,
      qrCode: "",
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props;
    const { date } = location.query;
    dispatch(startLoad());
    getInterlocutionQuestions(1, date).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({
          data: res.msg.list,
          end: res.msg.end
        })
      } else {
        dispatch(alertMsg(res.msg));
      }

    }).catch(ex => {
      dispatch(endLoad());
    })

    loadInterlocutionDateInfo(date).then(res => {
      if(res.code === 200) {
        this.setState({ dateInfo: res.msg });
      } else {
        dispatch(alertMsg(res.msg));
      }
    })
    mark({ module: "打点", function: "圈圈问答", action: "打开提问墙" })
  }

  componentDidMount() {
    // unScrollToBorder('.question-list');
  }

  componentDidUpdate() {
    const { dispatch, location } = this.props;
    if(!this.pullElement) {
      this.pullElement = new PullElement({
        target: '.inter-question',
        scroller: '.inter-question',
        trigger: '.question-list',
        damping: 4,
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUp: (data) => {
          if(this.props.iNoBounce) {
            if(this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.disable();
            }
          }
        },
        onPullUpEnd: () => {
          if(this.props.iNoBounce) {
            if(!this.props.iNoBounce.isEnabled()) {
              this.props.iNoBounce.enable();
            }
          }
          const { page, data } = this.state;
          const { date } = location.query;
          dispatch(startLoad());
          getInterlocutionQuestions(page + 1, date).then(res => {
            dispatch(endLoad());
            if(res.code === 200) {
              let newData = data.concat(res.msg.list);
              this.setState({
                data: newData,
                end: res.msg.end,
                page: page + 1
              })
            } else {
              dispatch(alertMsg(res.msg));
            }
          }).catch(ex => {
            dispatch(endLoad());
            dispatch(alertMsg(ex));
          })
        }
      })
      this.pullElement.init();
    }
    if(this.pullElement && this.state.end) {
      this.pullElement.destroy();
    }
  }

  handleClickGoSubmit() {
    const { dispatch, location } = this.props;
    const { date } = location.query;
    dispatch(startLoad());
    goSubmitPage(date).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        if(res.msg === 'ok') {
          this.context.router.push({
            pathname: '/rise/static/inter/question/submit',
            query: { date: date }
          })
        } else {
          this.setState({ showQrDialog: true, qrCode: res.msg });
        }
      }
    }).catch(ex => {
      dispatch(endLoad());
    })
  }

  handleClickVote(question) {
    const { dispatch } = this.props;
    const { data } = this.state;
    if(question.follow) {
      unfollow(question.id);
      let newDate = data.map(item => {
        if(item.id === question.id) {
          item.followCount -= 1;
          item.follow = false;
        }
        return item;
      });
      this.setState({ data: newDate });
    } else {
      follow(question.id);
      let newDate = data.map(item => {
        if(item.id === question.id) {
          item.followCount += 1;
          item.follow = true;
        }
        return item;
      });
      this.setState({ data: newDate });

    }
  }

  render() {
    const { dateInfo = {}, data = [], end, qrCode, showQrDialog } = this.state;

    const renderQuestion = () => {
      if(data) {
        return data.map((item, key) => {
          return (
            <div className="question" key={key}>
              <div className="topic">
                {item.topic}
              </div>
              <div className={`vote-group  ${item.follow ? 'voted' : ''}`} onClick={() => {
                this.handleClickVote(item);
              }}>
                <span className={"vote-count"}>{item.followCount}</span>
                <span className={`vote-tips`}>{item.follow ? '已投票' : '投票'}</span>
              </div>
            </div>
          )
        })
      }
    }
    return (
      <div className="inter-question">
        <div className="header">
          <div className="big">
            <span dangerouslySetInnerHTML={{ __html: dateInfo.topic }}/>
          </div>
          <div className="small" dangerouslySetInnerHTML={{ __html: dateInfo.description }}/>
        </div>
        <div className="question-list">
          {renderQuestion()}
          <PullSlideTip isEnd={end}/>
          <div className="gutter px65"/>
        </div>
        <RenderInBody>
          <div className="inter-question footer" onClick={() => this.handleClickGoSubmit()}>
            <div className="button" style={{ backgroundColor: '#363d43' }}>新增问题</div>
          </div>
        </RenderInBody>
        {showQrDialog ?
          <RenderInBody>
            <div className="qr_dialog">
              <div className="qr_dialog_mask" onClick={() => {
                this.setState({ showQrDialog: false });
              }}>
              </div>
              <div className="qr_dialog_content">
                <span>扫码去“圈外商学院”提问吧！</span>
                <div className="qr_code">
                  <AssetImg url={qrCode}/>
                </div>
              </div>
            </div>
          </RenderInBody> : null
        }

      </div>
    )
  }
}
