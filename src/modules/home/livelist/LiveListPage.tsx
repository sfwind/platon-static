import * as React from 'react'
import './LiveListPage.less'
import { LiveHome } from '../components/live/LiveHome'
import { changeTitle } from '../../../utils/helpers'

export default class LiveListPage extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
    }
  }

  componentWillMount () {
    changeTitle('拓眼界')
  }

  render () {
    const {} = this.state.data

    return (
      <div className="live-list-page-container">
        <LiveHome/>
        <LiveHome/>
        <LiveHome/>
      </div>
    )
  }

}
