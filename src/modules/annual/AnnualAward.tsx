import * as React from 'React'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { loadAnnualCounts } from './async'
import './AnnualAward.less'

@connect(state => state)
export default class AnnualAward extends React.Component<any, any> {

  constructor(props) {
    super(props)

    this.state = {
      count: 0
    }
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadAnnualCounts().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({
          count: res.msg
        })
      }
    })

  }

  render() {
    const{count} = this.state
    return (
      <div className="congratulations-container">
        <div>
          恭喜你成为圈外商学院
        </div>
        <div>
          小白
        </div>
        <div>
          获得{count}张168元礼品卡奖励
        </div>
      </div>
    )
  }
}
