import * as React from "react";
import { connect } from "react-redux";
import "./ProblemIntroduction.less"
import Audio from "../../components/Audio";
import AssetImg from "../../components/AssetImg";
import PayInfo from "./components/PayInfo";
import {startLoad, endLoad, alertMsg} from "redux/actions";
import {openProblemIntroduction, createPlan, checkCreatePlan,loadUserCoupons,loadPayParam,afterPayDone,logPay,mark} from "./async";
import { Toast, Dialog } from "react-weui";
import { merge,isNumber,isObjectLike,toLower,get } from "lodash";
const { Alert } = Dialog
const numeral = require('numeral');
import { config,pay } from "../helpers/JsConfig"


@connect(state => state)
export default class ProblemIntroduction extends React.Component<any,any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();

    this.state = {
      data: {},
      showAlert: false,
      showConfirm: false,
      showTip: false,
      tipMsg: "",
      alert: {
        buttons: [
          {
            label: '再看看',
            onClick: this.handleClickClose.bind(this)
          },
          {
            label: '想好了',
            onClick: this.handleSubmitProblemChoose.bind(this),
          }
        ]
      },
      confirm: {
        buttons: [
          {
            label: "取消",
            onClick: this.handleClickCloseConfirm.bind(this)
          },
          {
            label: "确定",
            onClick: this.handleClickConfirm.bind(this)
          }
        ]
      },
      show: true,
      showPayInfo: false,
    };


  }

  componentWillMount() {

    const {dispatch, location} = this.props
    const {id} = location.query
    dispatch(startLoad())
    openProblemIntroduction(id).then(res => {
      const {msg, code} = res
      if (code === 200) {
        if(msg.buttonStatus === 1) {
          // 当前url未注册bug修复，主要是ios，因为ios在config时用的是第一个url,window.ENV.configUrl
          // 但是安卓也有可能出问题，所以干脆全部刷新页面（如果configUrl!==）
          if(window.ENV.configUrl !== window.location.href){
            mark({
              module: "RISE",
              function: "打点",
              action: "刷新支付页面",
              memo: window.ENV.configUrl + "++++++++++" + window.location.href
            });
            window.location.href = window.location.href;
            return Promise.reject("refresh");
          }
        }
        console.log(res.msg);
        return res.msg;
      } else {
        return Promise.reject(msg);
      }
    }).then(problemMsg => {
      return loadUserCoupons().then(res => {
        dispatch(endLoad())
        const {msg} = res;
        if (res.code === 200) {
          this.setState({
            data: problemMsg.problem,
            buttonStatus: problemMsg.buttonStatus,
            coupons: msg,
            fee: problemMsg.fee,
            currentPlanId:problemMsg.planId,
            bindMobile: problemMsg.bindMobile,
            isFull:problemMsg.isFull
          });
        } else {
          this.setState({
            data: problemMsg.problem,
            buttonStatus: problemMsg.buttonStatus,
            coupons: [],
            fee: problemMsg.fee,
            currentPlanId:problemMsg.planId,
            bindMobile: problemMsg.bindMobile,
            isFull:problemMsg.isFull
          });
          dispatch(alertMsg(msg));
        }
      })
    }, reason => {
      dispatch(endLoad())
      if(reason!=='refresh'){
        dispatch(alertMsg(reason));
      }

    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex));
    })

    this.picHeight = (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350));
    this.headerContentTop = (window.innerWidth / (750 / 104)) > 52 ? 52 : (window.innerWidth / (750 / 104));
    this.headerContentLeft = (window.innerWidth / (750 / 50)) > 25 ? 25 : (window.innerWidth / (750 / 25));
    this.whoFontSize = (window.innerWidth / (750 / 30)) > 15 ? 15 : (window.innerWidth / (750 / 30));
    this.whoNumFontSize = (window.innerWidth / (750 / 48)) > 24 ? 24 : (window.innerWidth / (750 / 48));
  }

  /**
   * 关闭提示信息
   */
  handleClickClose() {
    this.setState({showAlert: false})
  }

  /**
   * 确定生成小课
   */
  handleSubmitProblemChoose() {
    this.setState({showAlert: false});
    const {dispatch, location} = this.props
    const { isFull,bindMobile } = this.state;
    dispatch(startLoad())
    createPlan(location.query.id).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        if(!isFull){
          // 没有填写过
          this.context.router.push({pathname:'/rise/static/customer/profile',query:{
            goRise:true,runningPlanId:msg
          }});
          return;
        }
        if(!bindMobile){
          // 没有填过手机号
          this.context.router.push({pathname:'/rise/static/customer/mobile/check',query:{
            goRise:true,runningPlanId:msg
          }});
          return;
        }
        // 都填写过
        this.context.router.push({pathname: '/rise/static/learn',query:{runningPlanId:msg}});
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  /**
   * 关闭确认弹窗
   */
  handleClickCloseConfirm() {
    this.setState({showConfirm: false});
  }

  /**
   * 确认去完成小课，跳过去
   */
  handleClickConfirm() {
    const { currentPlanId } = this.state;
    this.context.router.push({pathname: '/rise/static/learn',query:{runningPlanId:currentPlanId}});
  }

  /**
   * 点击选择小课按钮
   */
  handleClickChooseProblem() {
    const {dispatch} = this.props
    const {buttonStatus} = this.state;
    dispatch(startLoad());
    checkCreatePlan(this.props.location.query.id, buttonStatus).then(res => {
      dispatch(endLoad());
      if (res.code === 202) {
        this.setState({showConfirm: true, confirmMsg: res.msg});
      } else if (res.code === 201) {
        // 选第二门了，需要提示
        this.setState({showAlert: true, tipMsg: "为了更专注的学习，同时最多进行两门小课，确定选择吗？"});
      } else if (res.code === 200) {
        this.handleSubmitProblemChoose();
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  /**
   * 选择优惠券
   * @param coupon 优惠券
   * @param close 关闭回调函数，用来关闭选择优惠券的列表
   */
  handleClickChooseCoupon(coupon, close) {
    const {dispatch, location} = this.props;
    const {id} = location.query;
    // const {selectMember} = this.state;
    dispatch(startLoad());
    calculateCoupon(coupon.id, id).then((res) => {
      dispatch(endLoad());
      if (res.code === 200) {
        this.setState({free: res.msg === 0, chose: coupon, final: res.msg});
      } else {
        dispatch(alertMsg(res.msg));
      }
      close();
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
      close();
    });
  }

  /**
   * 支付完成
   */
  handlePayDone() {
    const {dispatch} = this.props
    const { productId,isFull,bindMobile } = this.state;
    if (this.state.err) {
      mark({
        module: "打点",
        function: "支付",
        action: "支付异常",
        memo: window.location.href
      });
      dispatch(alertMsg("支付失败：" + this.state.err));
      return;
    }
    dispatch(startLoad())
    afterPayDone(productId).then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        if(!isFull){
          // 没有填写过
          this.context.router.push({pathname:'/rise/static/customer/profile',query:{
            goRise:true,runningPlanId:res.msg
          }});
          return;
        }
        if(!bindMobile){
          // 没有填过手机号
          this.context.router.push({pathname:'/rise/static/customer/mobile/check',query:{
            goRise:true,runningPlanId:res.msg
          }});
          return;
        }
        // 都填写过
        this.context.router.push({pathname: '/rise/static/learn',query:{runningPlanId:res.msg}});
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
      dispatch(endLoad())
      dispatch(alertMsg(err))
    })
  }

  /**
   * 点击立即支付
   */
  handleClickPayImmediately() {
    // this.reConfig();
    const {dispatch, location} = this.props;
    const {id} = location.query;
    dispatch(startLoad());
    const {buttonStatus} = this.state;
    checkCreatePlan(id, buttonStatus).then(res => {
      dispatch(endLoad());
      if (res.code === 202) {
        this.setState({showConfirm: true, confirmMsg: res.msg});
      } else if (res.code === 201) {
        // 选第二门了，需要提示
        this.setState({
          showAlert: true, tipMsg: "为了更专注的学习，同时最多进行两门小课，确定选择吗？", alert: {
            buttons: [
              {
                label: '再看看',
                onClick: this.handleClickClose.bind(this)
              },
              {
                label: '想好了',
                onClick: () => this.setState({showPayInfo: true, showAlert: false}),
              }
            ]
          }
        });
      } else if (res.code === 200) {
        this.setState({showPayInfo: true});
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(ex);
    });
  }

  /**
   * 点击立即支付
   */
  handleClickRiseCoursePay() {
    const {dispatch, location} = this.props;
    const {id} = location.query;
    const {chose, final, free} = this.state;
    if (!id) {
      dispatch(alertMsg('支付信息错误，请联系管理员'));
    }
    let param;
    if (chose) {
      param = {couponId: chose.id, problemId: id};
    } else {
      param = {problemId: id};
    }
    dispatch(startLoad());

    loadPayParam(param).then(res => {
      dispatch(endLoad());
      if (res.code === 200) {
        const {fee, free, signParams, productId} = res.msg;
        this.setState({productId: productId});
        if (!isNumber(fee)) {
          dispatch(alertMsg('支付金额异常，请联系工作人员'));
          return;
        }
        if (free && numeral(fee).format('0.00') === '0.00') {
          // 免费
          this.handlePayDone();
        } else {
          // 收费，调微信支付
          this.handleH5Pay(signParams);
        }

      } else {
        dispatch(alertMsg(res.msg));
      }

    }).catch(err => {
      dispatch(endLoad());
      dispatch(alertMsg(err));
    })
  }

  /**
   * 调起H5支付
   * @param signParams
   */
  handleH5Pay(signParams) {
    const {location} = this.props;
    const { id } = location.query;
    mark({
      module: "支付",
      function: "小课单卖",
      action: "开始支付",
      memo: "url:" + window.location.href + ",os:" + window.ENV.systemInfo
    });

    const {dispatch} = this.props;
    if (!signParams) {
      mark({
        module: "支付",
        function: "小课单卖",
        action: "没有支付参数",
        memo: "url:"+window.location.href+",os:"+window.ENV.systemInfo
      });
      dispatch(alertMsg("支付信息错误，请刷新"));
      return;
    }

    if (this.state.err) {
      mark({
        module: "支付",
        function: "小课单卖",
        action: "支付异常,禁止支付",
        memo: "error:"+this.state.err+","+ "url:"+window.location.href+",os:"+window.ENV.systemInfo
      });
      dispatch(alertMsg(this.state.err));
      return;
    }

    this.setState({showPayInfo: false});
    config(['chooseWXPay'],()=> {
      if(window.ENV.osName === 'windows'){
        // windows客户端
        mark({
          module: "支付",
          function: "小课单卖",
          action: "windows-pay",
          memo: "url:" + window.location.href + ",os:" + window.ENV.systemInfo
        });
        dispatch(alertMsg("Windows的微信客户端不能支付哦，请在手机端购买小课～"));
      }
      pay({
          "appId": signParams.appId,     //公众号名称，由商户传入
          "timeStamp": signParams.timeStamp,         //时间戳，自1970年以来的秒数
          "nonceStr": signParams.nonceStr, //随机串
          "package": signParams.package,
          "signType": signParams.signType,         //微信签名方式：
          "paySign": signParams.paySign //微信签名
        },
        () => {
          mark({
            module: "支付",
            function: "小课单卖",
            action: "success",
            memo: "url:" + window.location.href + ",os:" + window.ENV.systemInfo
          });
          this.handlePayDone();
        },
        (res) => {
          mark({
            module: "支付",
            function: "小课单卖",
            action: "cancel",
            memo: "url:" + window.location.href + ",os:" + window.ENV.systemInfo
          });
          this.setState({showErr: true});
        },
        (res) => {
          logPay('小课单卖','error', "url:" + window.location.href + ",os:" + window.ENV.systemInfo + ",error:" + (isObjectLike(res) ? JSON.stringify(res) : res));
          alert("error config:"+JSON.stringify(res));
        }
      )
    })
  }

  handleClickPayMember(){
    mark({
      module: "支付",
      function: "小课单卖",
      action: "点击加入会员",
      memo:"os:" + window.ENV.systemInfo
    });
    window.location.href=`https://${window.location.hostname}/pay/pay`
  }
  handleClickGoReview(){
    const { currentPlanId } = this.state;
    this.context.router.push({pathname: '/rise/static/learn',query:{completedPlanId:currentPlanId}});
  }
  handleClickGoStudy(){
    const { currentPlanId } = this.state;
    this.context.router.push({pathname: '/rise/static/learn',query:{runningPlanId:currentPlanId}});
  }


  render() {
    const {data = {}, buttonStatus, showPayInfo, final, fee, coupons} = this.state;
    const {show} = this.props.location.query

    const {difficultyScore, catalog, subCatalog, pic, authorDesc, length, why, how, what, who, descPic, audio, chapterList, problem, categoryPic, authorPic} = data;

    const renderCatalogName = (catalog, subCatalog) => {
      if (catalog && subCatalog) {
        return `#${catalog}-${subCatalog}`;
      } else if (catalog) {
        return `#${catalog}`
      } else {
        return null;
      }
    }


    const renderRoadMap = (chapter, idx) => {
      const {sections} = chapter
      return (
        <div key={idx} className="chapter-item">
          <div className={'chapter'}>{'第' + chapter.chapter + '章 '}{chapter.name}</div>
          {sections ? sections.map((section, idx) => renderSection(section, idx, chapter.chapter)) : null}
        </div>
      )
    }

    const renderSection = (section, idx, chapter) => {
      return (
        <div key={idx}>
          <div className={'section'}>{chapter}{'.'}{section.section + '节 '}{section.name}</div>
        </div>
      )
    }

    const renderWho = (who) => {
      if (who) {
        let whoArr = who.split(";");
        if (whoArr.length === 1) {
          return (
            <div className="who-item">
              <span style={{fontSize:`${this.whoFontSize}px`}} className="wi-text just-one">{who}</span>
            </div>
          );
        } else {
          return whoArr.map((item, key) => {
            return (
              <div className="who-item" key={key}>
                <span style={{fontSize:`${this.whoNumFontSize}px`}} className="wi-sequence">{key + 1}</span><span
                style={{fontSize:`${this.whoFontSize}px`}} className="wi-text">{item}</span>
              </div>
            )
          });
        }
      } else {
        return null;
      }
    };

    const renderFooter = () => {
      if (show) {
        return null;
      } else {
        let footerBar = <div className="padding-footer" style={{height:'45px'}}/>;
        let list = [];
        list.push(footerBar);
        if (isNumber(buttonStatus)) {
          switch (buttonStatus) {
            case -1: {
              return null;
            }
            case 1: {
              list.push(
                <div className="button-footer">
                  <div className={`left origin`} onClick={()=>this.handleClickPayImmediately()}>立即购买</div>
                  <div className={`right`} onClick={()=>this.handleClickPayMember()}>加入会员</div>
                </div>
              );
              return list;
            }
            case 2: {
              list.push(
                <div className="button-footer" onClick={()=>this.handleClickChooseProblem()}>
                  选择该小课
                </div>
              );
              return list;
            }
            case 3: {
              list.push(
                <div className="button-footer" onClick={()=>this.handleClickGoStudy()}>
                  小课已开始，去上课
                </div>
              );
              return list;
            }
            case 4: {
              list.push(
                <div className="button-footer" onClick={()=>this.handleClickGoReview()}>
                  小课已完成，去复习
                </div>
              );
              return list;
            }
            case 5:case 6: {
              list.push(
                <div className="button-footer" onClick={()=>this.handleClickChooseProblem()}>
                  <div>
                    <AssetImg size="24px" style={{verticalAlign: 'middle',marginRight:'10px',marginTop:'-2px'}} type="rise_icon_trial_pay" /><span>限时免费，立即开始学习</span>
                  </div>
                </div>
              );
              return list;
            }
            default:
              return null;
          }
        }
      }
    }
    return (
      <div className="problem-introduction">
        <div className="pi-header" style={{height:`${this.picHeight}px`}}>
          <img className="pi-h-bg" src={`${pic}`}/>
          <div className="pi-h-body">
            <div className="pi-h-b-icon"><AssetImg
              url="https://static.iqycamp.com/images/rise_icon_problem_introduction.png?imageslim" size={37}/></div>
            <div className="pi-h-b-title left">{problem}</div>
            <div className="pi-h-b-content left">{renderCatalogName(catalog, subCatalog)}</div>
            <div className="pi-h-b-content left bottom">{`难度系数：${numeral(difficultyScore).format('0.0')}/5.0`}</div>
          </div>
        </div>
        <div className="pi-content">
          <div className="pi-c-foreword white-content">
            <div className="pi-c-f-header">
              <div className="pi-c-f-icon">
                <AssetImg type="rise_icon_lamp" width={24} height={29}/>
              </div>
              <div className="pi-c-f-h-title">
                引言
              </div>
            </div>
            <div className="pi-c-f-content">
              { audio ? <div className="context-audio">
                <Audio url={audio}/>
              </div> : null }
              <div>
                <pre className="pi-c-f-c-text">{why}</pre>
              </div>
            </div>

          </div>
          <div className="pi-c-system white-content mg-25">
            <Header icon="rise_icon_introduction_book" title="知识体系" lineHeight={"12px"} height={17}/>
            <div className="pi-c-s-content">
              <pre className="pi-c-s-text" dangerouslySetInnerHTML={{__html:how}}/>
              <AssetImg width={'100%'} url={descPic} marginTop={"15px"}/>
            </div>
          </div>
          <div className="pi-c-learn white-content mg-25">
            <Header icon="rise_icon_book" title="学习大纲"/>
            <div className="pi-c-l-content">
              {what ?<pre className="pi-c-text" dangerouslySetInnerHTML={{__html:what}}/> : null}
              <div
                className="roadmap">{chapterList ? chapterList.map((chapter, idx) => renderRoadMap(chapter, idx)) : null}</div>
            </div>
          </div>
          <div className="pi-c-man white-content mg-25">
            <Header icon="rise_icon_man" title="适合人群" width={18}/>
            <div className="pi-c-m-content">
              {renderWho(who)}
            </div>
          </div>
          <div className="pi-c-ability white-content mg-25">
            <Header icon="rise_icon_ability" title="能力项" marginLeft={"-1em"}/>
            <div className="pi-c-a-content">
              <div className="text" dangerouslySetInnerHTML={{__html:"在【圈外同学】，我们的小课都根据“个人势能模型”进行设计，本小课在模型中的能力项为："}}></div>
              <div className="pi-c-a-c-module"
                   onClick={()=>window.location.href='https://mp.weixin.qq.com/s?__biz=MzA5ODI5NTI5OQ==&mid=2651673801&idx=1&sn=c0bc7ad463474f5d8f044ae94d8e6af7&chksm=8b6a3fa5bc1db6b335c423b51e8e987c0ba58546c9a4bcdba1c6ea113e710440e099981fac22&mpshare=1&scene=1&srcid=0522JbB9FCiJ2MLTYIJ9gHp8&key=97c2683b72ba12a9fe14a4718d1e2fc1db167b4659eda45c59be3b3c39723728975cf9c120462d5d896228edb74171fb9bfefc54a6ff447b7b3389e626e18744f9dca6103f6a3fbeb523c571631621eb&ascene=0&uin=MjYxMjUxOTM4MA%3D%3D&devicetype=iMac+MacBookPro11%2C1+OSX+OSX+10.10.5+build(14F27)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=sl95nanknHuEvflHY9fNI6KUKRA3koznfByp5C1nOV70kROWRuZNqQwkqvViYXiw'}>
                <div className="pi-c-a-c-m-rise">【圈外】</div>
                <div className="pi-c-a-c-m-text">
                  个人势能模型
                </div>
              </div>
              <AssetImg width={'100%'} url={categoryPic} marginTop="10"/>
            </div>
          </div>
          <div className="pi-c-author white-content mg-25">
            <Header icon="rise_icon_head" title="讲师介绍" width={26} height={16} lineHeight={"12px"}/>
            <AssetImg width={'100%'} url={authorPic}/>
          </div>
          <div className="pi-c-learn-term white-content mg-25">
            <Header icon="rise_icon_learn_term" title="学习期限"/>
            <div className="pi-c-l-t-text special">
              随开随学，进度自控
            </div>
            <div className="pi-c-l-t-text">
              教研团队的推荐进度：2天学习1节，第1天：知识点学习、巩固练习，第2天：2个应用练习
            </div>
            <div className="pi-c-l-t-text">
              开放时间：30天
            </div>
          </div>
          <div className="pi-c-tool white-content mg-25">
            <Header icon="rise_icon_tool" title="学习工具"/>
            <div className="pi-c-t-text">
              随时随地，多客户端
            </div>
            <div className="pi-c-t-content">
              <div className="pi-c-t-item">
                <AssetImg url="https://static.iqycamp.com/images/rise_phone.png" width="120px"/>
                <div className="platform">
                  手机端
                </div>
                <div className="sub-title">
                  "圈外同学"公众号
                </div>
              </div>
              <div className="pi-c-t-item">
                <AssetImg url="https://static.iqycamp.com/images/rise_pcv2.png" width="120px"/>
                <div className="platform">
                  网站
                </div>
                <div className="sub-title">
                  www.iquanwai.com
                </div>
              </div>
            </div>
          </div>
        </div>
        {renderFooter()}

        <Alert { ...this.state.alert }
          show={this.state.showAlert}>
          <div className="global-pre">{this.state.tipMsg}</div>
        </Alert>
        <Alert { ...this.state.confirm } show={this.state.showConfirm}>
          <div className="global-pre">{this.state.confirmMsg}</div>
        </Alert>

        <PayInfo pay={()=>this.handleClickRiseCoursePay()}
                 close={(callback)=>{this.setState({showPayInfo:false});callback()}}
                 choose={(coupon,close)=>this.handleClickChooseCoupon(coupon,close)} show={showPayInfo} final={final}
                 fee={fee}
                 coupons={coupons} header="小课购买"/>
        {showPayInfo ?<div className="mask"></div>: null}
      </div>
    );
  }
};

interface HeaderProps{
  icon:string,
  title:string,
  size?:number,
  width?:number,
  height?:number,
  marginLeft?:number,
  lineHeight?:number,
}

class Header extends React.Component<HeaderProps,any>{
  constructor(props:HeaderProps){
    super(props);
  }

  render(){
    const renderSize = () => {
      if(!this.props.size && !this.props.width && !this.props.height){
        return 20;
      } else {
        return this.props.size;
      }
    };
    return (
      <div className="page-item-header">
        <div className="pih-icon-container">
          <div className="pih-icon" style={{marginLeft:this.props.marginLeft,lineHeight:this.props.lineHeight?this.props.lineHeight:0}} >
            <AssetImg type={this.props.icon} size={renderSize()} width={this.props.width} height={this.props.height}/>
          </div>
          <div className="pih-title">
            {this.props.title}
          </div>
        </div>
      </div>
    );
  }
}
