require('es6-promise').polyfill();
import "./style.less";
import "whatwg-fetch";
import * as React from "react";
import { render } from "react-dom";
import { Router, browserHistory } from "react-router";
import { Provider } from "react-redux";
import configureStore from "./redux/configureStore";
import routes from "./routes";
// import "weui/src/style/widget/weui_tips/weui_dialog.less";
// import "weui/src/style/widget/weui_tips/weui_mask.less";
// import "weui/src/style/widget/weui_tips/weui_toast.less";
// import "weui/src/style/base/reset.less";
// import "weui/src/style/widget/weui_tab/weui_tab.less";
// import "weui/src/style/widget/weui_tab/tabbar.less";
// import "weui/src/style/widget/weui_tab/navbar.less";
// import "weui/src/style/widget/weui_cell/weui_check.less";
// import "weui/src/style/widget/weui_cell/weui_form.less";
// import "weui/src/style/widget/weui_cell/weui_cell_global.less"
import "weui/dist/style/weui.min.css";
import "components/CustomerWeuiSwitch.less"
import 'swiper/dist/css/swiper.css';

const store = configureStore()

declare var window:{
	ENV
}

// FastClick.attach(document.body);

render(
	<Provider store={store}>
		<Router history={browserHistory} routes={routes}/>
	</Provider>
	, document.getElementById(window.ENV.reactMountPoint))
