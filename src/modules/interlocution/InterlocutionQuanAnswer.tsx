import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLoad, endLoad, alertMsg, set } from "../../redux/actions"
import { submitInterlocutionQuestion } from './async';
import * as _ from 'lodash';
import "./InterlocutionQuanAnswer.less"
import { loadQuanAnswer } from "./async";
import Audio from "../../components/Audio"
import AssetImg from '../../components/AssetImg'

@connect(state => state)
export default class InterlocutionQuanAnswer extends Component {
  constructor() {
    super();
    this.state = {
      showAll: false
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { location, dispatch } = this.props;
    const { date } = location.query;
    dispatch(startLoad());
    loadQuanAnswer(date).then(res => {
      dispatch(endLoad());
      console.log(res.msg);
      if(res.code === 200) {
        this.setState({ data: res.msg });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
    })
  }

  handleClickGoSubmit() {
    const { data = {}, showAll } = this.state;
    const { answer = {}, nextDate = {}, dateInfo = {}, topic, batch } = data;
    this.context.router.push({
      pathname: '/rise/static/inter/question/submit',
      query: {
        date: nextDate.interlocutionDate
      }
    });
  }

  render() {
    const { data = {}, showAll } = this.state;
    const { answer = {}, nextDate = {}, dateInfo = {}, topic, batch } = data;
    const renderAudioWords = () => {
      if(showAll) {
        // 实现全部
        return (
          <div className="qa-answer-all">
            <pre className={"text"}>
              {answer.answer}
            </pre>
          </div>
        )
      } else {
        return (
          <div className="qa-answer-part">
            <pre className={"text"}>
              {answer.answer}
            </pre>
            <div className="show-tips" onClick={() => this.setState({ showAll: true })}>
              展开阅读全文
            </div>
          </div>
        )
      }
    }

    return (
      <div className="quan-answer">
        <AssetImg url={"https://static.iqycamp.com/images/interlocution_banner.png?imageslim"} width={'100%'}/>
        <div className="header-msg">
          <div className="quan-avatar">
            <AssetImg url={"https://static.iqycamp.com/images/quanquan_avatar.png?imageslim"} size={"100%"}/>
          </div>
          <div className={"msg"}>
            你打开的是第{batch}期【圈外商学院|一期一会】每周二早上8点，圈外创始人孙圈圈会为你解答一个职场问题
          </div>
        </div>
        <div className="question-answer">
          <span className="title-name">本期问答</span>
        </div>
        <div className="qa-question">
          <div className="qa-bg">
          <span>
            {topic}
          </span>
          </div>
        </div>
        <div className="qa-verse">
          <div className="qa-bg">
            <div className="quan-avatar">
              <AssetImg url={"https://static.iqycamp.com/images/quanquan_avatar.png?imageslim"} size={"100%"}/>
            </div>
            <pre className="verse">
              {answer.verse}
            </pre>
          </div>
        </div>
        <Audio url={'balabalba'}/>
        <div className="audio-words">
          <span className="tips">语音文字版</span>
          {renderAudioWords()}
        </div>
        <div className="next-question">
          <span className="title-name">下期预告</span>
          <div className="text" dangerouslySetInnerHTML={{ __html: nextDate.description }}>
          </div>
        </div>
        <div className="footer" onClick={() => this.handleClickGoSubmit()}>
          <div className="button">去提问</div>
        </div>
      </div>
    )
  }
}
