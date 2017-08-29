import * as React from 'react';
import { connect } from "react-redux";
import { submitEva, shareResult } from "./async"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import { Dialog } from 'react-weui'
import AssetImg from '../../../components/AssetImg'
import './Result.less'
import { mark } from 'utils/request'

const { Alert } = Dialog

@connect(state => state)
export class Result extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.state = {
      initialScale: 0,
      backgroundPicWidth: 750,
      backgroundPicHeight: 1334,
      percent: 0,
      learnFreeLimit: false,
      picSrc: '',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    // window.addEventListener('popstate', (e) => {
    //   this.setState({ showQuit: true })
    // })
    const { score } = this.props.location.query
    const { dispatch } = this.props
    this.fit()
    dispatch(startLoad())
    submitEva(score).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        const { learnFreeLimit, result, suggestion, percent } = msg
        this.setState({ learnFreeLimit, result, suggestion, percent })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
  }

  componentDidMount() {
    // history.pushState({ page: 'next' }, 'state', '#ending')
  }

  fit() {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let pageHeight = this.state.backgroundPicHeight
    let pageWidth = this.state.backgroundPicWidth

    let initialScale = 0
    if(pageWidth / pageHeight > windowWidth / windowHeight) {
      initialScale = windowHeight / pageHeight
    } else {
      initialScale = windowWidth / pageWidth
    }

    this.setState({ initialScale })
  }

  share() {
    const { dispatch, location } = this.props
    const { score } = location.query
    const { learnFreeLimit, percent, picSrc } = this.state
    this.setState({ share: true })

    if(picSrc === '') {
      dispatch(startLoad())
      shareResult(score, percent).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          this.setState({ picSrc: res.msg })
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => {
        dispatch(endLoad())
        dispatch(alertMsg(e))
      })
    }

  }

  handleClickShareBtn() {
    mark({ module: '打点', function: '测评', action: '点击页面领取海报按钮' });
    this.setState({ showResult: true });
  }

  render() {
    const {
      initialScale, backgroundPicHeight, backgroundPicWidth, learnFreeLimit,
      result, suggestion, percent, picSrc, share
    } = this.state
    return (
      <div className="eva-result">
        <div className="head">
          <AssetImg url="https://static.iqycamp.com/images/eva_report_head2.png" height={80} width={236}/>
        </div>
        <div className="result">
          <AssetImg url="https://static.iqycamp.com/images/eva_result_hr_2.png" height={22} width={323}/>
          <div className="text-result">
            你的洞察力天赋打败了{percent}%的人。
          </div>
          <pre className="text">{result}</pre>
        </div>
        <div className="suggestion">
          <AssetImg url="https://static.iqycamp.com/images/action_suggest_hr_2.png" height={25} width={323}/>
          <pre className="text">{suggestion}</pre>
        </div>
        { learnFreeLimit ? null :
          <div className="schedule">
            <AssetImg url="https://static.iqycamp.com/images/eva_schedule_3.png" width={'100%'}/>
          </div>}
        { learnFreeLimit ?
          <div className="free-get" onClick={()=>this.share()}>
            <AssetImg url="https://static.iqycamp.com/images/free_get_5.png" height={57} width={226}/>
          </div> :
          <div className="free-get" onClick={()=>this.share()}>
            <AssetImg url="https://static.iqycamp.com/images/free_get_6.png" height={57} width={226}/>
          </div>
        }

        {share ?
          <div className="dialog">
            <div style={{ display: 'inline-block', float: 'right'}}
                 onClick={()=>this.setState({share:false})}>
              <AssetImg type="white_close_btn" size={24}/>
            </div>
            <div className="share-pic-container">
              <div className="share-word-title">
                【免费领取课程】
              </div>
              <pre className="share-word">
                {learnFreeLimit ? '长按下方图片，发送给好友/群\n邀请他们也来挑战一下吧！'
                  : `长按下方图片，发送给好友/群，邀请他们来挑战\n3人扫码完成测试，你就免费得到课程了！`}
              </pre>
              {picSrc ? <img className="share-pic" src={picSrc} width={'100%'}/> : null}
            </div>
          </div>: null}
      </div>
    )
  }
}
