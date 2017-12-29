import * as React from 'react'
import './Step5_Auditorium.less'
import { getPromotionAuditorium } from '../async'
import AssetImg from '../../../../components/AssetImg'

interface Step5_AuditoriumProps {
  getGlobalState: any
}

export class Step5_Auditorium extends React.Component<Step5_AuditoriumProps, any> {

  constructor() {
    super()
    this.state = {
      showQrCode: false
    }
  }

  async componentWillMount() {
    let res = await getPromotionAuditorium(this.props.getGlobalState().riseId)
    if(res.code === 200) {
      let msg = res.msg
      this.setState({
        point: msg.point,
        defeatPercentage: msg.defeatPercentage
      })
    }
  }

  render() {
    const { point = 0, defeatPercentage = 0, showQrCode } = this.state
    const { isSelf = false, nickName = '' } = this.props.getGlobalState()

    const renderPrizeCard = () => {
      let prizeCardArr = []
      for(let i = 0; i < 3; i++) {
        prizeCardArr.push(
          <AssetImg key={i} className="prize-card" url="https://static.iqycamp.com/images/annual_prize_card.png"/>
        )
      }
      return prizeCardArr
    }

    return (
      <section className="annual-auditorium">
        <div className="scroll-container">
          <div className="text text1">截止目前，{isSelf ? '你' : nickName}在圈外商学院</div>
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
              {renderPrizeCard()}
            </div>
          </div>
          {
            showQrCode &&
            <div>

            </div>
          }
        </div>
      </section>
    )
  }

}
