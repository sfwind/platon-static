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
    const { dispatch } = this.props
    dispatch(startLoad())
    let res = await loadDailyTalk()
    if(res.code === 200) {
      dispatch(endLoad())
      this.setState({
        img: res.msg
      })
    } else {
      this.context.router.push({pathname:'/rise/static/course/schedule/plan'})
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
