import * as React from 'react'
import "./ForumBase.less"

export default class ForumBase extends React.Component {

  constructor() {
    super()
  }

  render() {
    return (
      <div className="forumbase-container">
        <div className="forumbase-page" style={{ minHeight: window.innerHeight, height: window.innerHeight }}>
          {this.props.children}
        </div>
      </div>
    )
  }

}
