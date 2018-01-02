import * as React from 'react'
import './Step5_Auditorium.less'
import { getPromotionAuditorium, loadPrizeCard } from '../async'
import AssetImg from '../../../../components/AssetImg'
import { configShare } from '../../../helpers/JsConfig'
import { mark } from '../../../../utils/request'

interface Step5_AuditoriumProps {
  getGlobalState: any,
  receivePrizeCardFunc?: any
}

export class Step5_Auditorium extends React.Component<Step5_AuditoriumProps, any> {

  constructor() {
    super()
    this.state = {
      showAll: false
    }
  }

  async componentWillMount() {
    mark({ module: '打点', function: '年终回顾', action: '5', memo: this.props.location.query.riseId })
    const { riseId } = this.props.getGlobalState()
    configShare(
      `回顾在圈外商学院的2017，我郑重向你发出这个邀请`,
      `https://${window.location.hostname}/rise/static/guest/annual/summary?riseId=${riseId}`,
      'https://static.iqycamp.com/images/share_link_icon.jpg?imageslim',
      '一份最有价值的新年礼')

    let prizeCardRes = await loadPrizeCard(riseId)
    if(prizeCardRes.code === 200) {
      this.setState({
        prizeCardArr: prizeCardRes.msg
      })
    }

    let res = await getPromotionAuditorium(riseId)
    if(res.code === 200) {
      let msg = res.msg
      this.setState({
        point: msg.point,
        defeatPercentage: msg.defeatPercentage,
        cardCount: msg.cardCount
      })
    }
  }

  render() {
    const { point = 0, defeatPercentage = 0, showAll, prizeCardArr = [], cardCount = 3 } = this.state
    const { isSelf = false, nickName = '' } = this.props.getGlobalState()
    const { receivePrizeCardFunc } = this.props

    const renderSelfPrizeCard = () => {
      return (
        prizeCardArr.map((prizeCard, index) =>
          <AssetImg key={index} className="prize-card"
                    url="https://static.iqycamp.com/images/annual_prize_card.png"/>
        )
      )
    }

    const renderGuestPrizeCard = () => {
      return (
        prizeCardArr.map((prizeCard, index) =>
          <AssetImg key={index} className="prize-card"
                    url={`https://static.iqycamp.com/images/prize_card_${prizeCard.received ? 'received' : 'unreceive'}.png`}
                    onClick={() => {
                      if(!prizeCard.received) {
                        receivePrizeCardFunc(prizeCard.prizeCardNo).then(res => {
                          if(res.code === 200) {
                            loadPrizeCard(this.props.getGlobalState().riseId).then(newResult => {
                              if(newResult.code === 200) {
                                this.setState({ prizeCardArr: newResult.msg })
                              }
                            })
                          }
                        })
                      }
                    }}/>
        )
      )
    }

    const renderSelfView = () => {
      return (
        <div className="scroll-container self">
          <AssetImg className="annual-trophy" url="https://static.iqycamp.com/images/annual_trophy.png"/>
          <div className="text text1">截止目前，你在圈外商学院</div>
          <div className="text text1">累积收获
            <span className="highlight"><large>&nbsp;{point}&nbsp;</large>积分</span>
          </div>
          <div className="text text1">打败了
            <span className="highlight"><large>&nbsp;{defeatPercentage}%&nbsp;</large></span>同期入学的同学
          </div>
          <div>
            <div className="text text2">赢得了{cardCount}张圈外商学院邀请函</div>
            <div className="text text2" style={{ fontWeight: 'bold', marginTop: '2.5rem' }}>
              优秀如你，现在也有机会成就他人！快点击下方的”分享“按钮，邀请你最优秀的朋友，来体验7天的商学院之旅，共同学习1月主修课《认识自己》的第一周课程。
            </div>
            <div className="prize-card-box">
              {renderSelfPrizeCard()}
            </div>
          </div>
        </div>
      )
    }

    const renderGuestView = () => {
      return (
        <div className="scroll-container guest">
          <AssetImg className="annual-trophy" url="https://static.iqycamp.com/images/annual_trophy.png"/>
          <div className="text text1 bold">现在，{nickName}邀请同样优秀的你，</div>
          <div className="text text1 bold">来体验七天的商学院之旅！</div>
          <div className="text text1 bold">立即点击领取下方的邀请函吧！</div>
          <div className="business-school-desc text2">
            <div className={`content ${showAll && 'all'}`}>
              关于圈外商学院:<br/>
              圈外商学院是一所创新型在线商学院，为职场人士提供成体系、接地气的课程：<br/><br/>
              1）学习3个月后，97%的学员在职业上有明显进步，20%升职涨薪或转行成功；<br/><br/>
              2）48%为资深员工和管理层，入学需申请+电话面试，保证学员质量；<br/><br/>
              3）提供作业批改、学习游戏、助教等服务，让学习有趣、易坚持；<br/><br/>
              4）为学员免费对接工作机会、人脉资源和创业融资；<br/><br/>
              5）是首个受邀参加顶级商学院戈壁挑战赛的在线商学院，与长江、中欧等顶尖商学院同场竞技。<br/><br/>
            </div>
            <div className="click-tips"
                 onClick={() => {
                   this.setState({
                     showAll: !this.state.showAll
                   })
                 }}>
              {
                showAll ?
                  '点击收起' :
                  '点击查看更多'
              }
            </div>
          </div>
          <div className="prize-card-box">
            {renderGuestPrizeCard()}
          </div>
        </div>
      )
    }

    return (
      <section className="annual-auditorium">
        {
          isSelf ?
            renderSelfView() :
            renderGuestView()
        }
        <AssetImg className="triangle" url="https://static.iqycamp.com/images/triangle_left.png"/>
      </section>
    )
  }

}
