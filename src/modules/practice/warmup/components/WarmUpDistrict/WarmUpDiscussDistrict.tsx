import * as React from 'react'
import DiscussTopBar from '../../../components/DiscussTopBar/DiscussTopBar'
import DiscussDistrict from '../../../components/DiscussDistrict/DiscussDistrict'

import './WarmUpDiscussDistrict.less'
import PersonalDiscussDistrict from '../../../components/PersonalDiscussDisctrict/PersonalDiscussDistrict'

export default class WarmUpDiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  componentDidMount () {

  }

  shouldComponentUpdate () {
    return true
  }

  render () {
    const { data = {} } = this.props
    const {
      personal = [],
      priorities = [],
    } = data

    return (
      <div className="warmup-discuss-district-component">
        <DiscussTopBar leftLabel={'讨论区'} rightLabel={'我要发言'} rightOnClick={() => alert(1)}/>
        <div className="tips">我的观点</div>
        {
          personal.map((item, index) => {
            return <PersonalDiscussDistrict key={index} discuss={item.discuss} comments={item.comments}/>
          })
        }
        <div className="tips">同学观点</div>
        {
          priorities.map((priority, index) => {
            return <DiscussDistrict key={index}
                                    originDiscuss={priority.originDiscuss}
                                    priorityDiscuss={priority.priorityDiscuss}/>
          })
        }
      </div>
    )
  }

}
