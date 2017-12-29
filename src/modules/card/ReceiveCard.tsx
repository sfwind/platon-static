import * as React from 'react'
import './ReceiveCard.less'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'
import { SubmitButton } from '../../components/submitbutton/SubmitButton'
import { checkIsReceived, setCardShared, setReceived } from './async'

@connect(state => state)
export default class ReceiveCard extends React.Component {

  constructor() {
    super()
    this.state = {
      received: false
    }
  }

  componentWillMount() {
    let id = this.props.location.query.id
    const { dispatch } = this.props
    //设置分享
    dispatch(startLoad())
    setCardShared(this.props.location.query.id).then(() => {
      //设置为领取状态(1表示成功，0表示失败)
      setReceived(id).then(res => {
        dispatch(endLoad())
        if (res.code === 200) {
          let isReceived = false
          if (res.msg === 1) {
            isReceived = true
          }
          else{
            alert('礼品卡已经被别人抢走了')
          }
          this.setState({
            received: isReceived
          })
        }
      })
    })
  }

  handleClickGoRise() {
    let id = this.props.location.query.id
    window.location.href = `https://${window.location.hostname}/pay/rise?id=${id}`
  }

  render() {

    const { received } = this.state

    return (
      <section className="prize-card-container">
        {
          received ?
            <div className="prize-success">
              <SubmitButton clickFunc={() => this.handleClickGoRise()} buttonText="去报名"/>
            </div> : null
        }
      </section>
    )
  }
}
