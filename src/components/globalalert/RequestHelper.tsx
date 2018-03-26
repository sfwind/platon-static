import { GlobalRequest, mountDom } from './GlobalRequest'

class RequestHelper extends GlobalRequest {

  constructor () {
    super()
    this.state = {
      show: false,
    }
    this.showLoading = this.showLoading.bind(this)
    this.endLoading = this.endLoading.bind(this)
  }

  showLoading () {
    this.setState({
      show: true,
    })
  }

  endLoading () {
    this.setState({
      show: false,
    })
  }

  render () {
    return (`
      <h2 style="display: ${this.state.show ? 'block' : 'none'}">hello world</h2>
    `)
  }

}

export function demoRequest () {
  let demo = new RequestHelper()
  mountDom(demo, document.querySelector('#react-app'))
  demo.showText()
}
