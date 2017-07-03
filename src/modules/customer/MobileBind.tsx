import * as React from "react";
import {connect} from "react-redux";
import {set, startLoad, endLoad, alertMsg} from "redux/actions";
import {ppost} from "utils/request";
import "./MobileBind.less";
import _ from 'lodash';
import Toast from "../../components/Toast";
import AssetImg from "../../components/AssetImg";



@connect(state=>state)
export default class MobileBind extends React.Component<any,any>{
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
        this.state={
            sending:false,
            seconds:60,
            show:false,
        }
        this.intervalTrigger = null;
    }

    componentWillMount(){

    }

    onClick(){
        let {phone, areaCode} = this.state;
        const {dispatch} = this.props;

        let NUMBER_REG = /^[0-9]+$/;
        if(!phone){
            dispatch(alertMsg('请输入手机号码'));
            return;
        }
        if (!NUMBER_REG.test(phone)) {
            dispatch(alertMsg('请输入格式正确的手机'));
            return;
        }
        let param = {};
        // 中国的区号不下发
        if(areaCode && areaCode !== '86' && areaCode !== '+86'){
            if(areaCode.indexOf('+') === 0){
                areaCode = areaCode.substring(1);
            }
            if (!NUMBER_REG.test(areaCode)) {
                dispatch(alertMsg('请输入格式正确的国家/地区号'));
                return;
            }
            param = _.merge({}, {areaCode, phone});
        } else {
            param = _.merge({}, {phone});
        }
        if(this.intervalTrigger){
            clearInterval(this.intervalTrigger);
        }
        this.setState({seconds:60, sending:true});
        this.intervalTrigger = setInterval(()=>{
            this.setState({seconds:this.state.seconds-1});
            if(this.state.seconds<=0){
                this.setState({sending:false});
                clearInterval(this.intervalTrigger);
            }
        }, 1000);
        ppost('/rise/customer/send/valid/code', param).then(res=>{
            if(res.code !== 200){
                dispatch(alertMsg(res.msg));
            }
        })
    }

    onSubmit(){
        const {code} = this.state;
        const {dispatch} = this.props;
        if(!code){
            dispatch(alertMsg('请输入验证码'));
            return;
        }
        ppost('/rise/customer/valid/sms', {code}).then(res=>{
            if(res.code !== 200){
                dispatch(alertMsg('验证输入错误<br/>请重新输入'));
            }else{
                this.setState({show:true});
                setTimeout(()=>{
                    this.context.router.push('/rise/static/customer/account');
                }, 2100);
            }
        })
    }

    cleanCode(){
        this.setState({code:''});
        this.refs.code.value = '';
    }

    cleanAreaCode(){
        this.setState({areaCode:''});
        this.refs.areaCode.value = '';
        this.refs.areaCode.placeholder = '';
    }

    render(){
        const {sending, seconds} = this.state;
        return (
            <div className="mobile-bind">
                <div className="item">
                    <div className="label">
                        国家/地区号
                    </div>
                    <div className='input'>
                        <input placeholder="中国 +86" type="text" style={{width:75}} ref="areaCode"
                               onChange={(e)=>this.setState({areaCode:e.currentTarget.value})}/>
                        <div className="clean" onClick={()=>this.cleanAreaCode()}>
                            <AssetImg type="clean" width={18}/>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="label">
                        手机号
                    </div>
                    <div className="input">
                        <input placeholder="请填写手机号" type="text" style={{width:window.innerWidth - 130}}
                               onChange={(e)=>this.setState({phone:e.currentTarget.value})}/>
                    </div>
                </div>

                <div className="item">
                    <div className="label">
                        验证码
                    </div>
                    <div className="input">
                        <input type="text" style={{width:75}} ref="code"
                               onChange={(e)=>this.setState({code:e.currentTarget.value})}/>
                        <div className="clean" onClick={()=>this.cleanCode()}>
                            <AssetImg type="clean" width={18}/>
                        </div>
                        {
                            sending?
                                <div className={`send-code sending`}>
                                    {seconds}秒后重新发送
                                </div>:
                                <div className={`send-code free`} onClick={()=>this.onClick()}>
                                    发送验证码
                                </div>
                        }
                    </div>

                </div>
                <div className="submit-div">
                    <div className={`submit-button`} onClick={()=>this.onSubmit()}>
                        确定
                    </div>
                </div>
                <Toast show={this.state.show} timeout={2000} height={220} width={200} top={160}>
                    <AssetImg type="success" width={60} style={{marginTop:60}}/>
                    <div className="text">绑定成功</div>
                </Toast>
            </div>
        )
    }
}
