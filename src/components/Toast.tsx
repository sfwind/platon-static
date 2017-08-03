import * as React from "react"
import "./Toast.less"

export default class Toast extends React.Component<any, any> {

  constructor() {
    super();
    this.state = {
      show: false,
      timeout: 2000,
    }
  }

  componentWillMount() {
    const { show, timeout } = this.props;
    this.setState({ show, timeout });
    if(show) {
      this.showoff(timeout);
    }
  }

  componentWillReceiveProps(newProps) {
    const { show } = newProps;
    if(show && !this.state.show) {
      this.setState({ show: true });
      this.showoff(this.state.timeout);
    }
  }

  showoff(timeout) {
    setTimeout(() => {
      if(this.refs.toast) {
        this.refs.toast.style.opacity = 0;
      }
    }, timeout - 1000);
    setTimeout(() => {
      this.setState({ show: false });
    }, timeout);
  }

  render() {
    const { show, id, children, width = '60%', height, top = 210 } = this.props;

    const style = {
      marginLeft: width !== '60%' ? (window.innerWidth - width) / 2 : '20%',
      width: width,
      height: height,
      top: top,
    }

    return (
      show ?
        <div
          id={id}
          className="toast-container"
          style={style}
          ref="toast"
        >
          <div className="toast-bg">
            <div className="toast-icon"></div>
            <div className="toast-content">
              {children}
            </div>
          </div>
        </div>: null
    )
  }

}

