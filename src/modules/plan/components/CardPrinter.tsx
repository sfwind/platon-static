import * as React from 'react'
import './CardPrinter.less'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import { mark } from '../../../utils/request'
import { loadChapterCard, loadChapterCardAccess } from '../async'
import { connect } from 'react-redux'

let printerWaitingTimer = null
let startTime
let endTime

interface CardPrinterProps {
  problemId: number,
  completePracticePlanId: number,
}

// @connect(state => state)
export class CardPrinter extends React.Component <CardPrinterProps, any> {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    const { problemId, completePracticePlanId } = this.props
    loadChapterCardAccess(problemId, completePracticePlanId).then(res => {
      if(res.code === 200) {
        if(res.msg) {
          this.setState({ displayCard: true })
          let waitingNode = document.getElementById('printer-waiting')
          if(waitingNode) {
            printerWaitingTimer = setInterval(() => {
              waitingNode.style.opacity = 1
              setTimeout(() => {
                waitingNode.style.opacity = 0
              }, 500)
            }, 1000)
          }
        }
      }
    }).catch(e => {
      // dispatch(alertMsg(e))
    })
    let loadCardBeginTime = new Date()
    loadChapterCard(problemId, completePracticePlanId).then(res => {
      let loadCardEndTime = new Date()
      if(res.code === 200) {
        mark({
          module: '打点', function: '首页', action: '等待打印机加载',
          memo: loadCardEndTime.getTime() - loadCardBeginTime.getTime()
        })
        setTimeout(() => {
          setTimeout(() => {
            this.setState({ showCard: true })
          }, 300)
          clearInterval(printerWaitingTimer)
        }, 1000)
        this.setState({ cardUrl: res.msg })
      }
    }).catch(e => {
      // dispatch(alertMsg(e))
    })
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) !== this.props) {
      this.componentWillMount()
    }
  }

  render() {
    const { cardUrl, displayCard } = this.state

    const renderCardBody = () => {
      return (
        <div>
          <div className="printer-top">
            <div className="printer-header">
              <div className="header-normal">棒！你已完成本章知识学习，获得一张知识卡
              </div>
            </div>
          </div>
          <div className="printer-body" style={{ height: 95 }}>
            <div className="share-tip-normal">
              <div className="tip-normal-top">如果觉得有启发</div>
              <div className="tip-normal-bottom">长按下方卡片，分享给好友哦！</div>
            </div>
          </div>
        </div>
      )
    }

    return (
      displayCard ?
        <div className="chapter-card-container">
          <div className="printer-machine" style={{ width: window.innerWidth }}>
            <div className="printer-close"
                 onClick={() => {
                   this.setState({ displayCard: false })
                 }}>
              <div style={{ display: 'inline-block', float: 'right' }}>
                <AssetImg type="white_close_btn" size="24px" style={{ float: 'right', marginRight: '10px' }}/>
              </div>
            </div>
            {renderCardBody()}
            <div className="printer-gap"/>
            <div className="printer-port">
              <div className="clear-mg"/>
              <div className="printer-push-port">
                <div className="mask-port"/>
                {
                  cardUrl &&
                  <div className="chapter-card-wrapper"
                       style={{ height: window.innerHeight - 197 }}
                       onTouchStart={() => {
                         startTime = new Date()
                       }}
                       onTouchEnd={() => {
                         endTime = new Date()
                         if(endTime.getTime() - startTime.getTime() >= 500) {
                           mark({ module: '打点', function: '弹窗卡片', action: '长按保存' })
                         }
                       }}>
                    <img className={`${this.state.showCard ? 'show' : ''} card-pic`} src={cardUrl}/>
                  </div>
                }
              </div>
              <div id="printer-waiting" className="printer-waiting"/>
            </div>
            <div className="printer-bottom"/>
          </div>
          <div className="card-mask"/>
        </div> :
        <div/>
    )
  }
}
