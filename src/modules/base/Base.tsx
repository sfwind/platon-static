import * as React from "react"
import { connect } from "react-redux"
import { isPending } from "utils/helpers"
import { Toast, Dialog } from "react-weui"
import { set, alertMsg } from "redux/actions"
import { config } from "../helpers/JsConfig"
import AssetImg from "../../components/AssetImg";
const P = "base"
const LOAD_KEY = `${P}.loading`
const SHOW_MODAL_KEY = `${P}.showModal`
let iNoBounce = require('../../components/iNoBounce.js')
const { Alert } = Dialog
import {pget} from "utils/request";
import Activity from "../../components/Activity";

@connect(state => state)
export default class Main extends React.Component<any, any> {
	static contextTypes = {
		router: React.PropTypes.object.isRequired
	}
	constructor() {
		super()
		this.state = {
			alert: {
				buttons: [
					{
						label: '关闭',
						onClick: this.closeAnswer.bind(this)
					}
				]
			},
			windowsClient:false,
			activityMsg:false,
		}

		config([])
	}

	componentWillMount(){
	  return;
		pget('/rise/index/msg').then(res=>{
			if(res.msg){
				const {url, message} = res.msg;
				this.setState({activityMsg:true, url, message});
			}
		})
	}

	componentWillUpdate(){
		//windows客户端显示返回按钮
		if(navigator.userAgent.indexOf('WindowsWechat') !== -1){
			//排除不显示返回按钮的页面
			if(window.location.pathname !== '/rise/static/plan/main'
				&& window.location.pathname !== '/rise/static/practice/warmup/analysis'
				&& window.location.pathname !== '/rise/static/practice/warmup'){
				if(!this.state.windowsClient){
					this.setState({windowsClient:true})
				}
			}else{
				if(this.state.windowsClient){
					this.setState({windowsClient:false})
				}
			}
		}

	}

	componentDidMount(){
	  iNoBounce(window);
	  // window.iNoBounce = this.iNoBounce;
	  // window.iNoBounce.disable();
	  const { dispatch } = this.props;
	  dispatch(set('iNoBounce',window.iNoBounce));
  }

	closeAnswer() {
		const { dispatch } = this.props;
		dispatch(set(SHOW_MODAL_KEY, false));
	}

	render() {
		return (
			<div className={`${isPending(this.props, LOAD_KEY)?'over-hidden':''}`}>
				{this.props.children}
				<Toast show={isPending(this.props, LOAD_KEY)} icon="loading">
					<div style={{fontSize:13, paddingTop:10}}>加载中...</div>
				</Toast>
				<Alert { ...this.state.alert }
					show={this.props.base.showModal}>
          			<div className="global-pre" dangerouslySetInnerHTML={{__html:this.props.base.alertMsg}}/>
				</Alert>
				{this.state.windowsClient?
					<div style={{position:'absolute', left:5, top:5, height: 30, width:30, zIndex:999, cursor:'pointer', transparency:'10%'}} onClick={()=> this.context.router.goBack()}>
						<AssetImg type="back_button" width={30} height={30} style={{opacity:0.3}}/>
					</div>
					:null}
				{
					this.state.activityMsg&& this.state.message?
						<Activity url={this.state.url} pic={this.state.message}/>
						:null
				}
      </div>
		)
	}
}
