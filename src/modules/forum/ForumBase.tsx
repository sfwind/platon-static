import * as React from 'react'
import "./ForumBase.less"

export default class ForumBase extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="forumbase-container">
        <div className="forumbase-page">
          {this.props.children}
        </div>
      </div>
    )
  }

}
