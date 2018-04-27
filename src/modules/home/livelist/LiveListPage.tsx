import * as React from 'react'
import './LiveListPage.less'
import { LiveHome } from '../components/live/LiveHome'
import { changeTitle } from '../../../utils/helpers'
import { loadAllLives } from '../async'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from 'reduxutil/actions'
import { mark } from '../../../utils/request'
import { connect } from 'react-redux'

@connect(state => state)
export default class LiveListPage extends React.Component {

  constructor () {
    super()
    this.state = {
      data: [],
    }
  }

  async componentWillMount () {
    mark({ view: true, module: '打点', function: '着陆二级页', action: '打开直播列表页' })
    changeTitle('拓眼界')
    let res = await loadAllLives()
    if (res.code === 200) {
      this.setState({
        data: res.msg,
      })
    } else {
      dispatch(alertMsg(res.msg))
    }
  }

  render () {
    return (
      <div className="live-list-page-container">
        {
          this.state.data.map((item, index) => {
            return (
              <LiveHome data={item} key={index}/>
            )
          })
        }
      </div>
    )
  }

}
