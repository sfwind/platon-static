import * as React from 'react'
import './ActivityListPage.less'
import { ActivityHome } from '../components/activity/ActivityHome'
import { changeTitle } from '../../../utils/helpers'

export default class ActivityListPage extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
    }
  }

  componentWillMount() {
    changeTitle("圈柚会")
  }

  render () {
    return (
      <div className="activity-list-page-container">
        <ActivityHome/>
        <ActivityHome/>
        <ActivityHome/>
      </div>
    )
  }

}
