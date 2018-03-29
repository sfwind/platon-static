import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { loadDailyInfo, loadDailyTalk } from './async'
import './DailyTalk.less'

@connect(state => state)
export default class DailyTalk extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      data:[],
      showImg:false,
      img:''
    }
  }

  async componentWillMount() {
    let res = await loadDailyTalk()
    if(res.code === 200) {
      this.setState({
        img: res.msg
      })
    }
  }

  render() {
    const { img} = this.state



    return (
      <div className="daily_talk_container">
        <img src={img}/>
      </div>
    )
  }

}
