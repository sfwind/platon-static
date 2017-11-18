import * as React from 'react'
import AssetImg from '../../../components/AssetImg'
import './ProblemNoPublish.less'

export default class ProblemNoPublish extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="problem-no-publish-container">
        <AssetImg className="no-publish-image" url=""/>
        <span className="no-publish-text">课程即将推出</span>
      </div>
    )
  }

}
