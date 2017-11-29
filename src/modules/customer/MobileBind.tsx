import * as React from "react";
import { connect } from "react-redux";
import { set, startLoad, endLoad, alertMsg } from "redux/actions";
import { pget, ppost, mark } from "utils/request"
import "./MobileBind.less";
import { loadUserProfileInfo } from "./async"
import _ from 'lodash';
import Toast from "../../components/Toast";
import AssetImg from "../../components/AssetImg";
import WorkStep from "../../components/WorkStep";
import TextInput from "./components/TextInput";

@connect(state => state)
export default class MobileBind extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      sending: false,
      seconds: 60,
      show: false,
      showArea: false,
      disable: true,
    }
    this.intervalTrigger = null;
  }

  componentWillMount() {

    mark({ module: "打点", function: "个人中心", action: "打开绑定电话页面" });
    const { dispatch, region } = this.props;
    dispatch(startLoad());
    loadUserProfileInfo().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState(_.merge({ defaultIsFull: res.msg.isFull}, this.state, res.msg));
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(err => {
      dispatch(endLoad());
      dispatch(alertMsg(err + ""));
    });
  }

  componentDidMount() {
    const { location, hiddenTab } = this.props;
    const { goRise } = location.query;
    if(goRise) {
      hiddenTab();
    }
  }

  onClick() {
    let { phone, areaCode, bindMobile, isFull } = this.state;
    const { dispatch } = this.props;

    let NUMBER_REG = /^[0-9]+$/;
    if(!phone) {
      dispatch(alertMsg('请输入手机号码'));
      return;
    }
    if(!NUMBER_REG.test(phone)) {
      dispatch(alertMsg('请输入格式正确的手机'));
      return;
    }
    let param = {};
    // 中国的区号不下发
    if(areaCode && areaCode !== '86' && areaCode !== '+86') {
      if(areaCode.indexOf('+') === 0) {
        areaCode = areaCode.substring(1);
      }
      if(!NUMBER_REG.test(areaCode)) {
        dispatch(alertMsg('请输入格式正确的国家/地区号'));
        return;
      }
      param = _.merge({}, { areaCode, phone: _.trim(phone) });
    } else {
      param = _.merge({}, { phone: _.trim(phone) });
    }
    if(this.intervalTrigger) {
      clearInterval(this.intervalTrigger);
    }
    this.setState({ seconds: 60, sending: true });
    this.intervalTrigger = setInterval(() => {
      this.setState({ seconds: this.state.seconds - 1 });
      if(this.state.seconds <= 0) {
        this.setState({ sending: false });
        clearInterval(this.intervalTrigger);
      }
    }, 1000);
    ppost('/rise/customer/send/valid/code', param).then(res => {
      if(res.code !== 200) {
        dispatch(alertMsg(res.msg));
      }
    })
  }

  onSubmit() {
    const { code } = this.state;
    const { dispatch, location } = this.props;
    if(!code) {
      dispatch(alertMsg('请输入验证码'));
      return;
    }
    ppost('/rise/customer/valid/sms', { code: _.trim(code) }).then(res => {
      if(res.code !== 200) {
        dispatch(alertMsg('验证输入错误<br/>请重新输入'));
      } else {
        this.setState({ show: true });
        setTimeout(() => {
          if(location.query.goRise) {
            window.location.href = `https://${window.location.hostname}/rise/static/rise`;
          } else {
            this.context.router.push('/rise/static/customer/account');
          }
        }, 2100);
      }
    })
  }

  cleanCode() {
    this.setState({ code: '' });
    this.refs.code.value = '';
  }

  cleanAreaCode() {
    this.setState({ areaCode: '' });
    this.refs.areaCode.value = '';
    this.refs.areaCode.placeholder = '';
  }

  handleChangePhone(e) {
    let value = e.currentTarget.value;
    if(value && this.state.code) {
      this.setState({ phone: value, disable: false });
    } else {
      this.setState({ phone: value, disable: true });
    }
  }

  handleChangeCode(e) {
    let value = e.currentTarget.value;
    if(value && this.state.phone) {
      this.setState({ code: e.currentTarget.value, disable: false });
    } else {
      this.setState({ code: e.currentTarget.value, disable: true });
    }
  }

  render() {
    const { sending, seconds, bindMobile, isFull, showArea, defaultIsFull } = this.state;
    const { location } = this.props;

    return (
      <div className="mobile-bind">
        {location.query.goRise ?
          <div className="go-rise">
            <WorkStep
              works={[ { text: '填写信息', done: !!defaultIsFull },
                { text: '绑定手机', done: !!bindMobile, cur: true }, { text: '去上课', done: false } ]}/>
            <div className="guide">
              <div className="first-guide">绑定手机号，让自己的学习数据永不丢失！</div>
              <div className="second-guide">数据仅用于提升学习服务，圈外会严格保密。</div>
            </div>
          </div>
          : null}

        {/*${!showArea?'show-area':''}*/}
        <div className={`item `} onClick={() => {
          this.setState({ showArea: true })
        }}>
          <div className="label">
            海外用户点此添加区号
          </div>
        </div>
        {
          showArea ? <TextInput placeholder={'请填写'} value={this.state.areaCode} label="区号"
                                onChange={(e) => this.setState({ areaCode: e.currentTarget.value })}/> : null
        }

        <TextInput placeholder={"请填写手机号"} value={this.state.phone} label="手机号"
                   onChange={(e) => this.handleChangePhone(e)}/>

        <TextInput placeholder="请填写" value={this.state.code} inline={true} label="验证码"
                   onChange={(e) => this.handleChangeCode(e)}>
          {
            sending ?
              <div className={`send-code sending`}>
                {seconds}秒后重新发送
              </div> :
              <div className={`send-code free`} onClick={() => this.onClick()}>
                发送验证码
              </div>
          }
        </TextInput>


        <div className="submit-div">
          <div className={`submit-button ${this.state.disable ? 'disable' : ''}`} onClick={() => this.onSubmit()}>
            提交
          </div>
        </div>
        <Toast show={this.state.show} timeout={2000} height={220} width={200} top={160}>
          <AssetImg type="success" width={60} style={{ marginTop: 60 }}/>
          <div className="text">绑定成功</div>
        </Toast>
      </div>
    )
  }
}
