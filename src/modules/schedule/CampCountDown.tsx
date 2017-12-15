import * as React from 'react'
import './CountDown.less'
import AssetImg from '../../components/AssetImg'
import { pget } from '../../utils/request'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'redux/actions'

@connect(state => state)
export default class CampCountDown extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  // async componentWillMount() {
  //   const { dispatch } = this.props
  //   dispatch(startLoad())
  //   try {
  //     let res = await pget(`/rise/schedule/camp/count/down`)
  //     dispatch(endLoad())
  //     const msg = res.msg
  //     if(res.code === 200) {
  //       this.setState({
  //         tens: msg.substr(0, 1),
  //         ones: msg.substr(1)
  //       })
  //     } else {
  //       dispatch(alertMsg(msg))
  //     }
  //   } catch(err) {
  //     dispatch(alertMsg(err))
  //   }
  // }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    pget(`/rise/schedule/camp/count/down`).then(res => {
      dispatch(endLoad())
      const msg = res.msg
      if(res.code === 200) {
        this.setState({
          tens: msg.substr(0, 1),
          ones: msg.substr(1)
        })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(err => {
      dispatch(alertMsg(err))
    })
  }

  render() {
    const { ones = 9, tens = 9 } = this.state
    return (
      <div className="count-down">
        <div className="header">
          <div className="msg">距离训练营开学还有</div>
        </div>
        <div className="remainder">
          <div className="day">
            <div className="tens-place place">
              {tens}
            </div>
            <div className="ones-place place">
              {ones}
            </div>
          </div>
        </div>
        <div className="footer">
          请置顶公众号<br/>
          以便及时收到开学典礼通知
          <div className="guide-tips">
            <div className="left" data-step='- 1 -'>
              <AssetImg url='https://static.iqycamp.com/images/count_down_left_tips.png?imageslim'/>
            </div>
            <div className="right" data-step='- 2 -'>
              <AssetImg url='https://static.iqycamp.com/images/count_down_right_tips.png?imageslim'/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
