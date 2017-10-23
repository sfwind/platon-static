import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLoad, endLoad, alertMsg, set } from "../../redux/actions"
import { submitInterlocutionQuestion } from './async';
import * as _ from 'lodash';
import "./InterlocutionQuanAnswer.less"
import { loadQuanAnswer } from "./async";
import Audio from "../../components/Audio"
import AssetImg from '../../components/AssetImg'
import RenderInBody from '../../components/RenderInBody'

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
      pathname: '/rise/static/guest/inter/questions',
      query: {
        date: nextDate.startDate
      }
    });
  }

  render() {
    const { data = {}, showAll } = this.state;
    const { answer = {}, nextDate = {}, dateInfo = {}, topic } = data;
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
              查看语音文稿
            </div>
          </div>
        )
      }
    }

    return (
      <div className="quan-answer">
        <AssetImg url={"https://static.iqycamp.com/images/quanquan-qa-banner-2.png?imageslim"} width={'100%'}/>
        <div className="header-msg">
          <div className={"msg"}>
            你打开的是第{dateInfo.batch}期【圈外商学院|一期一会】。每周二早上8点，圈外创始人孙圈圈为你解答一个职场问题。
          </div>
        </div>
        <div className="question-answer">
          <span className="title-name">
            <div className="title-text">本期问答</div>
          </span>
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
        <div className="qa-audio-msg">听完整语音解答</div>
        <Audio url={answer.audio}/>
        <div className="audio-words">
          {renderAudioWords()}
        </div>
        <div className="next-question">
          <div className="title-name">
            <div className="title-text">下期预告</div>
          </div>
          <div className="text">
            下期主题是{nextDate.topic}，点击下方按钮，提出你相关的疑问吧。圈圈会解答投票最高的问题，下周二公布答案！
            <br/><br/>
            一期一会，不见不散。
          </div>
        </div>
        <div className="gutter"/>
        <RenderInBody>
          <div className="inter-question footer" onClick={() => this.handleClickGoSubmit()}>
            <div className="button" style={{ backgroundColor: '#363d43' }}>去提问</div>
          </div>
        </RenderInBody>
      </div>
    )
  }
}
