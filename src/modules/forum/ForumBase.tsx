import * as React from 'react'
import "./ForumBase.less"

export default class ForumBase extends React.Component {

  constructor() {
    super()
  }

  componentDidMount() {
    document.querySelector('#react-app').className = 'scrollable';
  }

  componentWillUnmount() {
    document.querySelector('#react-app').className = '';
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
