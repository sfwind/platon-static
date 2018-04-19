import * as React from 'react'
import DiscussTopBar from '../../components/DiscussTopBar/DiscussTopBar'
import PersonalDiscussDistrict from '../../components/PersonalDiscussDisctrict/PersonalDiscussDistrict'
import './ApplicationDiscussDistrict.less'
import { vote } from '../async'
import ApplicationSubmit from '../../common/ApplicationSubmit/ApplicationSubmit'

export default class ApplicationDiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {
      showSubmit: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  render () {
    const {
      data,
    } = this.props
    const {
      personal = [],
      priorities = [],
    } = data

    return (
      <div className="application-discuss-district-component">
        {
          personal.length > 0 && <div className="tips top">我的作业</div>
        }
        {
          personal.map((item, index) => {
            return <PersonalDiscussDistrict key={index}
                                            discuss={item.discuss}
                                            comments={item.comments}
                                            showVote={true}
                                            voteFunc={(id) => vote(id)}
                                            showRequestComment={true}/>
          })
        }
        {
          priorities.length > 0 && <div className="tips bottom">同学作业</div>
        }
        {
          priorities.map((item, index) => {
            return <PersonalDiscussDistrict key={personal.length + index}
                                            discuss={item.priorityDiscuss}
                                            comments={item.multiComments}
                                            showVote={true}
                                            voteFunc={(id) => vote(id)}/>
          })
        }
        {
          personal.length === 0 && priorities.length === 0 &&
          <div className="empty-tip">
            <div className="empty-icon"></div>
            <div className="empty-text">优质发言或作业会被精选发布哦</div>
          </div>
        }
      </div>
    )
  }

}
