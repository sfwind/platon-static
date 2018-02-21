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
      disable: true,
      oversea: false,
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
        this.setState(_.merge({ defaultIsFull: res.msg.isFull }, this.state, res.msg));
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

  handleChangeWeixin(e) {
    let value = e.currentTarget.value;
    if(value && this.state.weixinId) {
      this.setState({ weixinId: value, disable: false });
    } else {
      this.setState({ weixinId: value, disable: true });
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
    const { sending, seconds, bindMobile, isFull, showArea,code, defaultIsFull, oversea } = this.state;
    let { phone, weixinId } = this.state;

    if(phone == null){
      phone = ''
    }
    if(weixinId == null){
      weixinId = ''
    }

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

        {oversea ?
          <div>
            <div className="mobile-switch" onClick={() => {
              if(phone && code){
                this.setState({
                  oversea:false,
                  disable:false
                })
              }else {
                this.setState({ oversea: false ,disable:true})
              }
            }}>
              <div className="label">
                点击切换到国内用户模式
              </div>
            </div>
            <TextInput placeholder={"不确定？微信点击右下角“我”可查看"} value={weixinId} label="微信号"
                     onChange={(e) => this.handleChangeWeixin(e)}/>
          </div>
            :
          <div>
            <div className="mobile-switch" onClick={() => {
              if(weixinId){
                this.setState({
                  oversea:true,
                  disable:false
                })
              }else {
                this.setState({ oversea: true,disable:true })
              }
            }}>
              <div className="label">
                点击切换到国外用户模式
              </div>
            </div>
            <TextInput placeholder={"请填写手机号"} value={phone} label="手机号"
                       onChange={(e) => this.handleChangePhone(e)}/>
            <TextInput placeholder="请填写" value={this.state.code} label="验证码"
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
          </div>
        }


        <div className="submit-div">
          <div className={`submit-button ${this.state.disable ? 'disable' : ''}`} onClick={() => this.onSubmit()}>
            提交
          </div>
        </div>
        <Toast show={this.state.show} timeout={2000} height={220} width={200} top={160}>
          <AssetImg type="success" width={60} style={{ marginTop: 60 }}/>
          <div className="text">提交成功</div>
        </Toast>
      </div>
    )
  }
}
