import React, { Component } from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from "../../redux/actions"
import { checkSubscribe } from './async'
import "./InterlocutionQuanAnswer.less"
import { loadQuanAnswer } from "./async"
import Audio from "../../components/Audio"
import AssetImg from '../../components/AssetImg'
import RenderInBody from '../../components/RenderInBody'
import { mark } from 'utils/request'
import { configShare } from '../helpers/JsConfig'

@connect(state => state)
export default class InterlocutionQuanAnswer extends Component {
  constructor() {
    super();
    this.state = {
      showAll: false,
      showQrDialog: false,
      qrCode: "",
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { location, dispatch } = this.props;
    let date = location.query.date;

    dispatch(startLoad());
    loadQuanAnswer(date).then(res => {
      dispatch(endLoad());
      let url = `https://${window.location.hostname}/rise/static/guest/inter/quan/answer`
      if (location.query.date){
        url = url + `?date=${location.query.date}`
      }
      if(res.code === 200) {
        this.setState({ data: res.msg });
        configShare(res.msg.dateInfo.title,
          url,
          'https://static.iqycamp.com/images/quanquan_qa.png?imageslim',
          '圈外商学院|一期一会')
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
    })
    mark({ module: "打点", function: "圈圈问答", action: "打开回答页面", Memo: date })
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

  handleClickShowAll() {
    mark({ module: "临时", function: "圈圈问答", action: "查看语音文稿" })
    this.setState({ showAll: true })
  }

  beforeShowWords() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    return checkSubscribe(window.location.href, 'show_word').then(res => {
      dispatch(endLoad());
      return res;
    });
  }

  cantShowWords(data) {
    this.setState({ qrCode: data, showQrDialog: true })
  }

  handleClickGoRecently(interlocutionDate) {
    window.location.href = this.props.location.pathname + "?date=" + interlocutionDate;
  }

  render() {
    const { data = {}, showAll, showQrDialog, qrCode } = this.state;
    const { answer = {}, nextDate = {}, dateInfo = {}, topic, nextAnswer, otherDates } = data;
    console.log(otherDates);
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
            <div className="show-tips" onClick={() => this.handleClickShowAll()}>
              <span>查看语音文稿</span>
            </div>
          </div>
        )
      }
    }

    const renderButtons = () => {
      if(nextAnswer) {
        // 最近的圈圈问答不是下一期
        return (
          <div className="inter-question footer"
               onClick={() => this.handleClickGoRecently(nextAnswer.interlocutionDate)}>
            <div className="button" style={{ backgroundColor: '#363d43' }}>{nextDate.topic}</div>
          </div>
        )
      } else {
        return (
          <div className="inter-question footer" onClick={() => this.handleClickGoSubmit()}>
            <div className="button" style={{ backgroundColor: '#363d43' }}>去提问</div>
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
        <Audio url={answer.audio} words={answer.answer} beforeShowWords={() => this.beforeShowWords()}
               cantShowWords={(data) => this.cantShowWords(data)}/>
        {/*<div className="audio-words">*/}
        {/*{renderAudioWords()}*/}
        {/*</div>*/}
        <div className="next-question">
          <div className="title-name">
            <div className="title-text">下期预告</div>
          </div>
          <div className="text">
            下期主题是{nextDate.topic}，{nextAnswer ? '点击下方按钮查看内容。' : '点击下方的按钮，提出你相关的疑问吧。圈圈会解答投票最高的问题，下周二公布答案！'}
            <br/><br/>
            一期一会，不见不散。
          </div>
        </div>
        <div className="next-question other-dates">
          <div className="title-name">
            <div className="title-text other-date">问答集锦</div>
          </div>
          <div className="text">
            <ul>
              {otherDates ? otherDates.map((item, key) => {
                  return <li className="other-date" key={key}
                             onClick={() => this.handleClickGoRecently(item.startDate)}>
                    <span>{`第${item.batch}期：${item.title}`}</span></li>
                }) : null}
            </ul>
          </div>
        </div>
        <div className="gutter"/>
        <RenderInBody>
          {renderButtons()}
        </RenderInBody>
        {showQrDialog ?
          <RenderInBody>
            <div className="qr_dialog">
              <div className="qr_dialog_mask" onClick={() => {
                this.setState({ showQrDialog: false });
              }}>
              </div>
              <div className="qr_dialog_content">
                <span>扫码后可查看语音文字稿哦</span>
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
