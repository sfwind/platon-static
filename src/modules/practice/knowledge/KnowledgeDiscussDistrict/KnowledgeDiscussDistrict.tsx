import * as React from 'react'

import './KnowledgeDiscussDistrict.less'
import PersonalDiscussDistrict from '../../components/PersonalDiscussDisctrict/PersonalDiscussDistrict'
import DiscussTopBar from '../../components/DiscussTopBar/DiscussTopBar'
import DiscussDistrict from '../../components/DiscussDistrict/DiscussDistrict'

export default class KnowledgeDiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  render () {
    const { data = {} } = this.props
    const {
      personal = [],
      priorities = [],
    } = data

    return (
      <div className="knowledge-discuss-district-component">
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
