require('es6-promise').polyfill()
import './style.less'
import 'whatwg-fetch'
import * as React from 'react'
import { render } from 'react-dom'
import { Router, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import routes from './routes'
import 'weui/dist/style/weui.min.css'
import 'components/CustomerWeuiSwitch.less'
import 'swiper/dist/css/swiper.css'
import 'animate.css/animate.min.css'
// import 'minirefresh/dist/debug/minirefresh.css'
const store = configureStore()

declare var window: {
  ENV
}

render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routes}/>
  </Provider>,
  document.getElementById(window.ENV.reactMountPoint))

var fontSize = 0
if(document.body.clientWidth > 414) {
  fontSize = 414 / 37.5
} else {
  fontSize = document.body.clientWidth / 37.5
}
document.getElementsByTagName('html')[0].style.fontSize = fontSize + 'px'
