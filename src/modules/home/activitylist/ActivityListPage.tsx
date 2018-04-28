import * as React from 'react'
import './ActivityListPage.less'
import { ActivityHome } from '../components/activity/ActivityHome'
import { changeTitle } from '../../../utils/helpers'
import { loadAllActivities } from '../async'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from 'reduxutil/actions'
import { mark } from '../../../utils/request'

@connect(state => state)
export default class ActivityListPage extends React.Component {

  constructor () {
    super()
    this.state = {
      data: [],
    }
  }

  async componentWillMount () {
    mark({ view: true, module: '打点', function: '着陆二级页', action: '打开活动列表页' })
    changeTitle('圈柚会')
    let res = await loadAllActivities()
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
      <div className="activity-list-page-container">
        {
          this.state.data.map((item, index) => {
            return (
              <ActivityHome data={item} key={index}/>
            )
          })
        }
      </div>
    )
  }

}
