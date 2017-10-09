import * as React from 'react';
import "./FullScreenDialog.less";

export default class FullScreenDialog extends React.Component<any,any> {
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
    document.querySelector('.full-screen-dialog').addEventListener('touchmove', (e) => {
      e.stopPropagation();
      console.log('dialog', e);
    });
    window.addEventListener('touchmove', (e) => {
      console.log('window move', e);
    })
  }

  render() {
    return (
      <div className="full-screen-dialog">
        {this.props.children}
      </div>
    )
  }
}
