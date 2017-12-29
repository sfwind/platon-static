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
          <div className="text text1">截止目前，你在圈外商学院</div>
          <div className="text text2">累积收获
            <span className="highlight"><large>&nbsp;{point}&nbsp;</large>积分</span>
          </div>
          <div className="text text3">打败了
            <span className="highlight"><large>&nbsp;{defeatPercentage}%&nbsp;</large>的圈外学员</span>
          </div>
          <div>
            <div className="text text4">赢得了三张邀请函</div>
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
              都说这个时代需要终身学习才能跟上迅猛发展的变革大潮，可是在职场外有限的时间里到底学点什么才是“性价比”最高的？圈外商学院给了我们最好的答案，它为职场人打造出一套完整的知识体系，从根本上帮助职场人掌握提高个人能力的方法，让人受益良多。
              都说这个时代需要终身学习才能跟上迅猛发展的变革大潮，可是在职场外有限的时间里到底学点什么才是“性价比”最高的？圈外商学院给了我们最好的答案，它为职场人打造出一套完整的知识体系，从根本上帮助职场人掌握提高个人能力的方法，让人受益良多。
              都说这个时代需要终身学习才能跟上迅猛发展的变革大潮，可是在职场外有限的时间里到底学点什么才是“性价比”最高的？圈外商学院给了我们最好的答案，它为职场人打造出一套完整的知识体系，从根本上帮助职场人掌握提高个人能力的方法，让人受益良多。
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
      </section>
    )
  }

}
