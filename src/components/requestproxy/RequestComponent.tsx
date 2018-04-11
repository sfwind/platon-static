import * as React from 'react'
import requestProxy from './requestProxy'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { Toast, Dialog } from 'react-weui'

const { Alert } = Dialog

@connect(state => state)
export default class RequestComponent extends React.Component {

  constructor () {
    super()
    this.state = {
      showToast: false,
      showAlert: false,
      alertParams: {},
      alertContent: '',
    }
  }

  componentWillMount () {
    requestProxy.addObserver(this)
  }

  startLoad () {
    this.setState({
      showToast: true,
    })
  }

  endLoad () {
    this.setState({
      showToast: false,
    })
  }

  alertMessage (message) {
    if (message && typeof message === 'string') {
      this.setState({
        showAlert: true,
        alertParams: {
          buttons: [
            {
              label: '取消',
              onClick: () => this.setState({
                showAlert: false,
              }),
            },
          ],
        },
        alertContent: message,
      })
    }
  }

  render () {
    const {
      showToast,
      showAlert,
      alertParams,
      alertContent,
    } = this.state

    const renderToast = () => {
      return (
        <Toast show={showToast}
               icon="loading">
          <div style={{ fontSize: 13, paddingTop: 10 }}>加载中...</div>
        </Toast>
      )
    }

    const renderAlert = () => {
      return (
        <Alert {...alertParams} show={showAlert}>
          <p>{alertContent}</p>
        </Alert>
      )
    }

    return (
      <div>
        {renderToast()}
        {renderAlert()}
      </div>
    )
  }

}
