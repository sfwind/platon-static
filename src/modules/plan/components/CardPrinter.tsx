import * as React from 'react'
import './CardPrinter.less'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import AssetImg from '../../../components/AssetImg'
import { mark } from '../../../utils/request'
import { loadChapterCard, loadChapterCardAccess } from '../async'
import { connect } from 'react-redux'
import { Block } from '../../../components/Block'
import { Dialog } from 'react-weui'

const { Alert } = Dialog

let printerWaitingTimer = null
let startTime
let endTime

interface CardPrinterProps {
  problemId: number,
  completePracticePlanId: number,
  afterClose: any
}

@connect(state => state)
export class CardPrinter extends React.Component <CardPrinterProps, any> {
  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    const { problemId, completePracticePlanId } = this.props
    this.loadData(problemId, completePracticePlanId)
  }

  //
  // componentWillReceiveProps(nextProps) {
  //   if(nextProps.problemId !== this.props.problemId || nextProps.completePracticePlanId !== this.props.pra) {
  //     const { problemId, completePracticePlanId } = this.props
  //     this.loadData(problemId, completePracticePlanId)
  //   }
  // }

  loadData(problemId, completePracticePlanId) {
    const { dispatch } = this.props
    if(problemId && completePracticePlanId) {
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
        } else {
          dispatch(alertMsg(res.msg))
        }
      })
    }
  }

  renderAlert() {
    const AlertProps = {
      buttons: [
        {
          label: '关闭',
          onClick: () => {
            this.props.afterClose()
          }
        }
      ]
    }
    return (
      <Alert {...AlertProps} show={showCompletedBox}>
        <div className="global-pre">
          恭喜你完成必修课，已解锁下一节内容！<br/>
          再接再厉，完成本节的选做应用题吧！
        </div>
      </Alert>
    )
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
      <Block>
        {
          displayCard ?
            <div className="chapter-card-container">
              <div className="printer-machine" style={{ width: window.innerWidth }}>
                <div className="printer-close"
                     onClick={() => {
                       this.props.afterClose()
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
        }
        {this.renderAlert()}
      </Block>
    )
  }
}
