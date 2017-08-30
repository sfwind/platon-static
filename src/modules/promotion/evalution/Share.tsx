import * as React from 'react';
import { connect } from "react-redux";
import { shareResult } from "./async"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import { Dialog } from 'react-weui'
import './Share.less'
import AssetImg from '../../../components/AssetImg'

const { Alert } = Dialog

@connect(state => state)
export class Share extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.state = {
      initialScale: 0,
      backgroundPicWidth: 750,
      backgroundPicHeight: 1334,
      percent: 0,
      learnFreeLimit: false,
      picSrc: '',
      showQuit: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const {dispatch} = this.props
    window.addEventListener('popstate', (e) => {
      this.setState({ showQuit: true })
    })
    const { score, percent, learnFreeLimit } = this.props.location.query
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

  componentDidMount() {
    history.pushState({ page: 'next' }, 'state', '#ending')
  }


  render() {
    const {
      picSrc
    } = this.state
    const { learnFreeLimit } = this.props.location.query
    const quitProps = {
      buttons: [
        {
          label: '确定', onClick: () => {
          wx.closeWindow()
        }
        }
      ]
    }
    return (
      <div className="eva-share">
        {learnFreeLimit == 'true' ?
          <AssetImg url={'https://static.iqycamp.com/images/eva_share_title2.png'} width={'90%'} marginTop={10}/> :
          <AssetImg url={'https://static.iqycamp.com/images/eva_share_title1.png'} width={'90%'} marginTop={10}/>
        }

        {picSrc ? <img className="share-pic" src={picSrc}/> : null}

        <Alert { ...quitProps }
          show={this.state.showQuit}>
          <div className="global-pre">
            {learnFreeLimit == 'true' ? '系统已为你生成测评结果海报，敢不敢分享出来，让你的朋友也挑战一下？'
              : '系统已为你生成测评结果海报，分享还可以免费领取【洞察力强化课程】，去看看吧~'}
          </div>
        </Alert>
      </div>
    )
  }
}
