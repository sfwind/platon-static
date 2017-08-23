import * as React from 'react';
import "./FullScreenDialog.less";

export default class FullScreenDialog extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      hash: ''
    }
  }

  componentWillMount() {
    window.addEventListener('popstate', (e) => {
      console.log(this.state.hash)
      console.log(e.state.hash)
      if(e.state.hash === this.state.hash){
        this.setState({ show: false })
        if(this.props.close) {
          this.props.close()
        }
      }
    })
    let hash = this.props.hash
    if(!hash) {
      hash = '#next'
    }
    history.pushState({ hash }, '', '')
    this.setState({ hash })
  }

  componentWillReceiveProps(props) {
    if(props.show !== this.state.show) {
      this.setState({ show: props.show })
    }
  }

  render() {
    const { show } = this.state;
    return (
      show ?
        <div className="full-screen-dialog">
          {this.props.children}
        </div> : null
    )
  }
}
