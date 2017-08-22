import * as React from 'react';
import { connect } from "react-redux";
import { submitEva, shareResult } from "./async"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import { Dialog } from 'react-weui'
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
      showResult: false,
      showQuit:false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { score } = this.props.location.query
    const { dispatch } = this.props
    this.fit()
    dispatch(startLoad())
    submitEva(score).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        const { learnFreeLimit, percent } = msg
        this.setState({ learnFreeLimit, percent })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })
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
    const { score } = this.props.location.query
    const { percent,learnFreeLimit } = this.state
    shareResult({score, percent, learnFreeLimit}).then(res => {
      console.log('生成海报')
      if(res.code === 200) {
        wx.closeWindow()
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => {
      dispatch(alertMsg(e))
    })

  }

  render() {
    const freeLimitProps = {
      buttons: [
        {
          label: '领海报', onClick: () => {
          this.share()
        }
        },
        {
          label: '取消', onClick: () => {
          this.setState({showResult:false})
        }
        }
      ]
    }
    const quitProps = {
      buttons: [
        {
          label: '确定', onClick: () => {
          this.share()
        }
        }
      ]
    }
    const { initialScale, backgroundPicHeight, backgroundPicWidth, learnFreeLimit } = this.state
    return (
      <div className="eva-start" style={{width:backgroundPicWidth, height:backgroundPicHeight, transform: `scale(${initialScale})`,
         WebkitTransform: `scale(${initialScale})`, transformOrigin: '50% 0 0', WebkitTransformOrigin: '50% 0 0',
         marginLeft: (window.innerWidth - backgroundPicWidth) / 2,
         background: `url('https://static.iqycamp.com/images/evalution_start6.png?imageslim')` }}>
        <div className="click-start" style={{height: 97, width: 402, position: 'absolute', top: '945', left: '174'}}
             onClick={()=>this.setState({showResult:true})}/>
        <Alert { ...freeLimitProps }
          show={this.state.showResult}>
          <div className="global-pre">
            {learnFreeLimit? '系统已为你生成测评结果海报，保存并分享到朋友圈，让你的朋友也挑战一下吧~'
              : '系统已为你生成测评结果海报，分享并邀请3人扫码并完成测试，即可免费领取。'}
          </div>
        </Alert>
        <Alert { ...quitProps }
          show={this.state.showQuit}>
          <div className="global-pre">
            {learnFreeLimit? '系统已为你生成测评结果海报，保存并分享到朋友圈，让你的朋友也挑战一下吧~'
              : '系统已为你生成测评结果海报，分享并邀请3人扫码并完成测试，即可免费领取。'}
          </div>
        </Alert>
      </div>
    )
  }
}
