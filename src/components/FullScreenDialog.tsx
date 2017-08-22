import * as React from 'react';
import "./FullScreenDialog.less";

export default class FullScreenDialog extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      show: false
    }
  }

  componentWillMount(){
    window.addEventListener('popstate', (e) => {
      this.setState({ show: false })
      if(this.props.close){
        this.props.close()
      }
    })
  }


  componentWillReceiveProps(props){
    if(props.show !== this.state.show){
      if(props.show === true){
        history.pushState({ page: 'next' }, 'state', '#next')
      }
      this.setState({show:props.show})
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
