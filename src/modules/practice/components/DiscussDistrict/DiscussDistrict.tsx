import * as React from 'react'
import { loadPriorityWarmUpAnalysis } from '../../warmup/async'
import AssetImg from '../../../../components/AssetImg'

import './DiscussDistrict.less'
import { formatDate, getRealLength, removeHtmlTags, splitContent } from '../../../../utils/helpers'

export default class DiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  componentWillMount () {
    let {
      originDiscuss = {},
      priorityDiscuss = {},
    } = this.props
    if (!originDiscuss) {
      originDiscuss = JSON.parse(JSON.stringify(priorityDiscuss))
      priorityDiscuss = null
    }
    if (originDiscuss) {
      originDiscuss.showAll = false
    }
    if (priorityDiscuss) {
      priorityDiscuss.showAll = false
    }
    this.setState({
      originDiscuss: originDiscuss,
      priorityDiscuss: priorityDiscuss,
    })
  }

  handleClickToggleOriginDiscuss () {
    let targetOriginDiscuss = Object.assign({}, this.state.originDiscuss)
    targetOriginDiscuss.showAll = !this.state.originDiscuss.showAll
    this.setState({
      originDiscuss: targetOriginDiscuss,
    })
  }

  handleClickTogglePriorityDiscuss () {
    let targetPriorityDiscuss = Object.assign({}, this.state.priorityDiscuss)
    targetPriorityDiscuss.showAll = !this.state.priorityDiscuss.showAll
    this.setState({
      priorityDiscuss: targetPriorityDiscuss,
    })
  }

  render () {
    let {
      originDiscuss = {},
      priorityDiscuss = {},
    } = this.state

    return (
      <div className="discuss-district-component">
        <div className="origin-block">
          <AssetImg url={originDiscuss.avatar}
                    className="headimg"/>
          <div className="right-block">
            <div className="person-detail">
              <div className="nickname">{originDiscuss.nickname}</div>
              {
                originDiscuss.isAsst &&
                <AssetImg className="person-title"
                          url="https://static.iqycamp.com/asst-gh4skljm.png"></AssetImg>
              }
            </div>
            <div className={`comment ${originDiscuss.showAll ? '' : 'hidden'}`}>
              {originDiscuss.showAll ? originDiscuss.content : removeHtmlTags(originDiscuss.content)}
            </div>
            {
              getRealLength(removeHtmlTags(originDiscuss.content)) > 90 &&
              <div className="show-tips"
                   onClick={() => this.handleClickToggleOriginDiscuss()}>
                {originDiscuss.showAll ? '收起' : '展开'}
              </div>
            }
            <div className="publish">{formatDate(new Date(originDiscuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
          </div>
        </div>
        {
          priorityDiscuss &&
          <div className="origin-block priority-block">
            <AssetImg url={priorityDiscuss.avatar}
                      className="headimg"/>
            <div className="right-block">
              <div className="person-detail">
                <div className="nickname">{priorityDiscuss.nickname}</div>
                {
                  priorityDiscuss.isAsst &&
                  <AssetImg className="person-title"
                            url="https://static.iqycamp.com/asst-gh4skljm.png"></AssetImg>
                }
              </div>
              <div className={`comment ${priorityDiscuss.showAll ? '' : 'hidden'}`}>
                {priorityDiscuss.showAll ? priorityDiscuss.content : removeHtmlTags(priorityDiscuss.content)}
              </div>
              {
                getRealLength(removeHtmlTags(priorityDiscuss.content)) > 75 &&
                <div className="show-tips"
                     onClick={() => this.handleClickTogglePriorityDiscuss()}>
                  {priorityDiscuss.showAll ? '收起' : '展开'}
                </div>
              }
              <div className="publish">{formatDate(new Date(priorityDiscuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
            </div>
          </div>
        }
      </div>
    )
  }

}
