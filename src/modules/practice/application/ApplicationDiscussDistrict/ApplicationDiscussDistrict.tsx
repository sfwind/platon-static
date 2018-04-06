import * as React from 'react'
import DiscussTopBar from '../../components/DiscussTopBar/DiscussTopBar'
import PersonalDiscussDistrict from '../../components/PersonalDiscussDisctrict/PersonalDiscussDistrict'
import DiscussDistrict from '../../components/DiscussDistrict/DiscussDistrict'
import './ApplicationDiscussDistrict.less'
import { loadPriorityApplicationCommenst } from '../async'

export default class ApplicationDiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {
    }
  }


  render () {
    console.log(this.props.data)

    const { data } = this.props
    const {
      personal = [],
      priorities = [],
    } = data

    return (
      <div className="application-discuss-district-component">
        <DiscussTopBar leftLabel={'作业区'} rightLabel={'提交作业'} rightOnClick={() => alert('click')}/>
        <div className="tips">我的作业</div>
        {
          personal.map((item, index) => {
            return <PersonalDiscussDistrict key={index} discuss={item.discuss} comments={item.comments}/>
          })
        }
        <div className="tips">同学作业</div>
        {
          priorities.map((item, index) => {
            return <PersonalDiscussDistrict key={personal.length + index}
                                            discuss={item.priorityDiscuss}
                                            comments={item.multiComments}/>
          })
        }
      </div>
    )
  }

}
