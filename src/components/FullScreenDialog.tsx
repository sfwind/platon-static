import * as React from 'react';
import "./FullScreenDialog.less";
import { unScrollToBorder } from '../utils/helpers'

export default class FullScreenDialog extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      hash: '',
      level: 0,
    }
  }

  componentWillMount() {
    window.addEventListener('popstate', (e) => {
      let level = e.state.level
      if(!level) {
        level = 0
      }
      if(level < this.state.level) {
        if(this.props.close) {
          this.props.close()
        }
      }
    })

    let hash = '#next'
    if(this.props.hash) {
      hash = this.props.hash
    }

    history.pushState({ level: this.props.level }, '', hash)
    this.setState({ hash, level: this.props.level })
  }

  componentDidMount() {
    this.setState({ removeScrollLimit: unScrollToBorder('.full-screen-dialog') });
  }

  componentWillUnmount() {
    const { removeScrollLimit } = this.state;
    if(removeScrollLimit) {
      removeScrollLimit();
    }
  }

  render() {
    return (
      <div className="full-screen-dialog">
        {this.props.children}
      </div>
    )
  }
}
