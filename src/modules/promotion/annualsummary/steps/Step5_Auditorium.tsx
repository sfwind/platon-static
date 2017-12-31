import * as React from 'react'
import './Step5_Auditorium.less'
import { getPromotionAuditorium, loadPrizeCard } from '../async'
import AssetImg from '../../../../components/AssetImg'

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
    const { riseId } = this.props.getGlobalState()
    let res = await getPromotionAuditorium(riseId)
    if(res.code === 200) {
      let msg = res.msg
      this.setState({
        point: msg.point,
        defeatPercentage: msg.defeatPercentage
      })
    }
    let prizeCardRes = await loadPrizeCard(riseId)
    if(prizeCardRes.code === 200) {
      this.setState({
        prizeCardArr: prizeCardRes.msg
      })
    }
  }

  render() {
    const { point = 0, defeatPercentage = 0, showAll, prizeCardArr = [] } = this.state
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
                              console.log(newResult)
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
          <div className="text text2">累积收获
            <span className="highlight"><large>&nbsp;{point}&nbsp;</large>积分</span>
          </div>
          <div className="text text3">打败了
            <span className="highlight"><large>&nbsp;{defeatPercentage}%&nbsp;</large>的圈外学员</span>
          </div>
          <div>
            <div className="text text4">赢得了3张圈外商学院邀请函</div>
            <div className="text text5">现在你也有个机会成就他人，快点击下方“分享”按钮，邀请你最优秀的朋友来体验七天的商学院之旅！</div>
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
          <div className="text text1">现在，{nickName}邀请同样优秀的你，</div>
          <div className="text text2">来体验七天的商学院之旅！</div>
          <div className="text text3">立即点击领取下方的邀请函吧！</div>
          <div className="business-school-desc">
            <div className={`content ${showAll && 'all'}`}>
              圈外商学院是一所创新型在线商学院，为职场人士提供最实用的课程、最适合的发展机会，让每一个有潜力的人，在这个时代拥有自己的职场话语权！<br/>
              学员中97%在职业和工作上实现了进步，其中48%的学员为资深员工与管理层，平均得到27%的涨薪幅度。<br/>
              作为首个戈壁挑战赛的受邀在线商学院，为学员对接到中欧、长江等MBA人脉，也为有志于创业的学员提供顶级创投资源。
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
