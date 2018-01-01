import * as React from 'react'
import './PrizeCard.less'
import AssetImg from '../../../components/AssetImg'
import { SubmitButton } from '../../../components/submitbutton/SubmitButton'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { exchangePrize, loadPrize } from './async'
import { connect } from 'react-redux'

@connect(state => state)
export default class PrizeCard extends React.Component {

  constructor() {
    super()
    this.state = {
      prizeCardId: -1
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadPrize().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({
          showPage: true,
          prizeCardId: res.msg.id,
          exchanged: res.msg.used
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
  }

  handleClickExchangePrize() {
    const { prizeCardId } = this.state
    const { dispatch } = this.props
    dispatch(startLoad())
    exchangePrize(prizeCardId).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ exchanged: true })
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
  }

  handleClickGoRise() {
    window.location.href = `/pay/rise`
  }

  render() {

    const { showPage = false, exchanged = false } = this.state

    if(!showPage) {
      return <div/>
    }

    return (
      <section className="prize-card-container">
        {
          exchanged ?
            <div className="prize-success">
              <SubmitButton clickFunc={() => this.handleClickGoRise()} buttonText="去报名"/>
            </div> :
            <div className="prize-waiting">
              <span className="prize-title">小组案例PK赛优胜奖</span>
              <AssetImg className="prize-gift" url="https://static.iqycamp.com/images/prize_gift_2.png"/>
              <span className="prize-exchange" onClick={() => this.handleClickExchangePrize()}>领取</span>
            </div>
        }
      </section>
    )
  }

}
