import * as React from 'react'
import './PrizeCard.less'
import AssetImg from '../../../components/AssetImg'

export default class PrizeCard extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {

    const { exchanged = true } = this.state

    return (
      <section className="prize-card-container">
        {
          exchanged ?
            <div className="prize-success">

            </div> :
            <div className="prize-waiting">
              <span className="prize-title">小组案例PK赛优胜奖</span>
              <AssetImg className="prize-gift" url="https://static.iqycamp.com/images/prize_gift_2.png"/>
              <span className="prize-exchange">领取</span>
            </div>
        }
      </section>
    )
  }

}
