import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { loadDailyTalk } from './async'
import './DailyTalk.less'

@connect(state => state)
export default class DailyTalk extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      img: ''
    }
  }

  async componentWillMount() {
    const { dispatch } = this.props
    let res = await loadDailyTalk()
    if(res.code === 200) {
      this.setState({
        img: res.msg
      })
    } else {
      dispatch(alertMsg('生成每日圈语出错'))
    }
  }

  render() {
    const { img } = this.state
    return (
      <div className="daily_talk_container">
        <img src={img}/>
      </div>
    )
  }

}
