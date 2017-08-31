import * as React from 'react'
import { connect } from 'react-redux'
import './ProblemIntroduction.less'
import Audio from '../../components/Audio'
import AssetImg from '../../components/AssetImg'
import PayInfo from './components/PayInfo'
import Toast from '../../components/Toast'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import {
  openProblemIntroduction, createPlan, checkCreatePlan, loadHasGetOperationCoupon
} from './async'
import { Toast, Dialog } from 'react-weui'
import { isNumber, get } from 'lodash'
const { Alert } = Dialog
const numeral = require('numeral')
import { mark } from '../../utils/request'
import { GoodsType } from '../../utils/helpers'
//限免小课id
const FREE_PROBLEM_ID = 9

@connect(state => state)
export default class ProblemIntroduction extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()

    this.state = {
      data: {},
      showAlert: false,
      showConfirm: false,
      showTip: false,
      tipMsg: '',
      showToast: false,
      alert: {
        buttons: [
          {
            label: '再看看',
            onClick: this.handleClickClose.bind(this)
          },
          {
            label: '想好了',
            onClick: this.handleSubmitProblemChoose.bind(this)
          }
        ]
      },
      confirm: {
        buttons: [
          {
            label: '取消',
            onClick: this.handleClickCloseConfirm.bind(this)
          },
          {
            label: '确定',
            onClick: this.handleClickConfirm.bind(this)
          }
        ]
      },
      show: true,
      showPayInfo: false,
      showErr: false,
      showFloatCoupon: false,
      togetherClassMonth: null
    }
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    const { id, free } = location.query
    mark({
      module: '打点',
      function: '打开页面',
      action: '打开小课介绍页',
      memo: id
    })
    /** 获取小课数据，以及价格／按钮状态 */
    openProblemIntroduction(id, free).then(res => {
      const { msg, code } = res
      if(code === 200) {
        if(msg.buttonStatus === 1) {
          /** 如果：LandingPage的url不是空 && LandingPage的url不是当前的url && 是ios系统，则刷新页面  */
          if(window.ENV.configUrl != '' && window.ENV.configUrl !== window.location.href && window.ENV.osName === 'ios') {
            mark({
              module: 'RISE',
              function: '打点',
              action: '刷新支付页面',
              memo: window.ENV.configUrl + '++++++++++' + window.location.href
            })
            window.location.href = window.location.href
            return Promise.reject('refresh')
          }
        }
        return res.msg
      } else {
        return Promise.reject(msg)
      }
    }).then(problemMsg => {
      // TODO:限免活动，进入页面直接创建训练
      if(free === 'true' && id == FREE_PROBLEM_ID) {
        checkCreatePlan(this.props.location.query.id, problemMsg.buttonStatus).then(res => {
          dispatch(endLoad())
          if(res.code === 202) {
            this.setState({ showConfirm: true, confirmMsg: res.msg })
          } else if(res.code === 201 || res.code === 200) {
            return createPlan(location.query.id).then(res => {
              if(res.code === 200) {
                this.setState({ showToast: true })
              }
            })
          } else if(res.code === 204) {
            // 已选课，不提示
          } else {
            dispatch(alertMsg(res.msg))
          }
        }).catch(ex => {
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
      }
      this.setState({
        data: problemMsg.problem,
        buttonStatus: problemMsg.buttonStatus,
        currentPlanId: problemMsg.planId,
        bindMobile: problemMsg.bindMobile,
        isFull: problemMsg.isFull,
        togetherClassMonth: problemMsg.togetherClassMonth
      })
    }, reason => {
      dispatch(endLoad())
      if(reason !== 'refresh') {
        dispatch(alertMsg(reason))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
    // 特指活动得到的50推广优惠券
    loadHasGetOperationCoupon().then(res => {
      if(res.code === 200) {
        this.setState({ showFloatCoupon: res.msg })
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
    this.picHeight = (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350))
    this.headerContentTop = (window.innerWidth / (750 / 104)) > 52 ? 52 : (window.innerWidth / (750 / 104))
    this.headerContentLeft = (window.innerWidth / (750 / 50)) > 25 ? 25 : (window.innerWidth / (750 / 25))
    this.whoFontSize = (window.innerWidth / (750 / 30)) > 15 ? 15 : (window.innerWidth / (750 / 30))
    this.whoNumFontSize = (window.innerWidth / (750 / 48)) > 24 ? 24 : (window.innerWidth / (750 / 48))
  }

  /**
   * 关闭提示信息
   */
  handleClickClose() {
    this.setState({ showAlert: false })
  }

  /**
   * 确定生成小课
   */
  handleSubmitProblemChoose() {
    this.setState({ showAlert: false })
    const { dispatch, location } = this.props
    const { isFull, bindMobile } = this.state
    dispatch(startLoad())
    createPlan(location.query.id).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        // 限免小课跳过填写信息
        if(location.query.id == FREE_PROBLEM_ID) {
          this.context.router.push({ pathname: '/rise/static/learn', query: { runningPlanId: msg } })
          return
        }

        if(!isFull) {
          // 没有填写过
          this.context.router.push({
            pathname: '/rise/static/customer/profile', query: {
              goRise: true, runningPlanId: msg
            }
          })
          return
        }
        if(!bindMobile) {
          // 没有填过手机号
          this.context.router.push({
            pathname: '/rise/static/customer/mobile/check', query: {
              goRise: true, runningPlanId: msg
            }
          })
          return
        }
        // 都填写过
        this.context.router.push({ pathname: '/rise/static/learn', query: { runningPlanId: msg } })
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
    this.setState({ showConfirm: false })
  }

  /**
   * 确认去完成小课，跳过去
   */
  handleClickConfirm() {
    const { currentPlanId } = this.state
    this.context.router.push({ pathname: '/rise/static/learn', query: { runningPlanId: currentPlanId } })
  }

  /**
   * 点击选择小课按钮
   */
  handleClickFreeProblem() {
    this.context.router.push({ pathname: '/rise/static/learn' })
  }

  /**
   * 点击选择小课按钮
   */
  handleClickChooseProblem() {
    const { dispatch } = this.props
    const { buttonStatus } = this.state
    dispatch(startLoad())
    checkCreatePlan(this.props.location.query.id, buttonStatus).then(res => {
      dispatch(endLoad())
      if(res.code === 202) {
        this.setState({ showConfirm: true, confirmMsg: res.msg })
      } else if(res.code === 201) {
        // 选第二门了，需要提示
        // this.setState({showAlert: true, tipMsg: "为了更专注的学习，同时最多进行两门小课，确定选择吗？"});
        this.handleSubmitProblemChoose()
      } else if(res.code === 200) {
        this.handleSubmitProblemChoose()
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  /**
   * 支付完成
   */
  handlePayDone(planId) {
    const { isFull, bindMobile } = this.state
    if(!isFull) {
      // 没有填写过
      this.context.router.push({
        pathname: '/rise/static/customer/profile', query: {
          goRise: true, runningPlanId: planId
        }
      })
      return
    }
    if(!bindMobile) {
      // 没有填过手机号
      this.context.router.push({
        pathname: '/rise/static/customer/mobile/check', query: {
          goRise: true, runningPlanId: planId
        }
      })
      return
    }
    // 都填写过
    this.context.router.push({ pathname: '/rise/static/learn', query: { runningPlanId: planId } })
  }

  /**
   * 点击立即支付
   */
  handleClickPayImmediately(couponCnt) {
    // 如果用户没有优惠券，则直接弹出付费
    const { dispatch, location } = this.props
    const { id } = location.query
    dispatch(startLoad())
    const { buttonStatus } = this.state
    mark({
      module: 'RISE',
      function: '打点',
      action: '点击购买按钮'
    })
    checkCreatePlan(id, buttonStatus).then(res => {
      dispatch(endLoad())
      if(res.code === 202) {
        this.setState({ showConfirm: true, confirmMsg: res.msg })
      } else if(res.code === 201 || res.code === 200) {
        if(couponCnt === 0) {
          // 直接弹出付费
          this.refs.payInfo.handleClickPay()
          return
        } else {
          // 显示支付按钮
          this.refs.payInfo.handleClickOpen()
        }
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  /**
   * 获取商品信息
   */
  handleGotGoods(goods) {
    let price = get(goods, 'activity.price');
    if(price) {
      this.setState({ fee: goods.fee, coupons: goods.coupons, price: price });
    } else {
      this.setState({ fee: goods.fee, coupons: goods.coupons });
    }
  }

  handleClickPayMember() {
    mark({
      module: '支付',
      function: '小课单卖',
      action: '点击加入会员',
      memo: 'os:' + window.ENV.systemInfo
    })
    window.location.href = `https://${window.location.hostname}/pay/pay`
  }

  handleClickGoReview() {
    const { currentPlanId } = this.state
    this.context.router.push({ pathname: '/rise/static/learn', query: { completedPlanId: currentPlanId } })
  }

  handleClickGoStudy() {
    const { currentPlanId } = this.state
    this.context.router.push({ pathname: '/rise/static/learn', query: { runningPlanId: currentPlanId } })
  }

  render() {
    const { data = {}, buttonStatus, showPayInfo, final, fee, price, coupons = [], chose, showErr, free, showFloatCoupon, togetherClassMonth } = this.state
    const { show } = this.props.location.query
    const {
      difficultyScore, catalog, subCatalog, pic, why, how, what, who,
      descPic, audio, chapterList, problem, categoryPic, authorPic, audioWords
    } = data

    const renderCatalogName = (catalog, subCatalog) => {
      if(catalog && subCatalog) {
        return `#${catalog}-${subCatalog}`
      } else if(catalog) {
        return `#${catalog}`
      } else {
        return null
      }
    }

    const renderRoadMap = (chapter, idx) => {
      const { sections } = chapter
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
      if(who) {
        let whoArr = who.split(';')
        if(whoArr.length === 1) {
          return (
            <div className="who-item">
              <div style={{ fontSize: `${this.whoFontSize}px` }} className="wi-text just-one">{who}</div>
            </div>
          )
        } else {
          return whoArr.map((item, key) => {
            return (
              <div className="who-item" key={key}>
                <div style={{ fontSize: `${this.whoNumFontSize}px` }} className="wi-sequence">{key + 1}</div><span
                style={{ fontSize: `${this.whoFontSize}px` }} className="wi-text">{item}</span>
              </div>
            )
          })
        }
      } else {
        return null
      }
    }

    const renderPrice = (fee, price) => {
      if(price) {
        return [
          <span style={{marginLeft:'10px',textDecoration:'line-through'}}>¥{numeral(fee).format('0,0.00')}</span>,
          <span style={{marginLeft:'10px'}}>¥{numeral(price).format('0,0.00')}</span>,
          <span style={{marginLeft:'10px'}}>粉丝特惠</span>
        ];
      } else {
        return `¥ ${numeral(fee).format('0,0.00')}，立即学习`
      }
    }

    const renderFooter = () => {
      console.log('buttonStatus:', buttonStatus)
      if(!show) {
        let footerBar = <div className="padding-footer" style={{ height: '45px' }}/>
        let list = []
        list.push(footerBar)
        if(isNumber(buttonStatus)) {
          switch(buttonStatus) {
            case -1: {
              return null
            }
            case 1: {
              list.push(
                <div className="button-footer">
                  {
                    showFloatCoupon ?
                      <div className="operation-coupon">
                        <AssetImg url="https://static.iqycamp.com/images/fragment/float_coupon_reward_rec.png"/>
                      </div> :
                      null
                  }
                  <div className={`left pay`} onClick={() => this.handleClickPayImmediately(coupons.length)}>
                    {renderPrice(fee, price)}
                  </div>
                </div>
              )
              return list
            }
            case 2: {
              list.push(
                <div className="button-footer" onClick={() => this.handleClickChooseProblem()}>
                  {
                    togetherClassMonth && togetherClassMonth !== '0' ?
                      <div className="together-class-notice" style={{ width: 320, left: window.innerWidth / 2 - 160 }}>
                        本小课为 {togetherClassMonth} 月精英会员训练营小课，记得在当月选择哦
                      </div> :
                      null
                  }
                  选择该小课
                </div>
              )
              return list
            }
            case 3: {
              list.push(
                <div className="button-footer" onClick={() => this.handleClickGoStudy()}>
                  小课已开始，去上课
                </div>
              )
              return list
            }
            case 4: {
              list.push(
                <div className="button-footer" onClick={() => this.handleClickGoReview()}>
                  小课已完成，去复习
                </div>
              )
              return list
            }
            case 5:
            case 6: {
              list.push(
                <div className="button-footer" onClick={() => this.handleClickChooseProblem()}>
                  <div>
                    <AssetImg size="24px" style={{ verticalAlign: 'middle', marginRight: '10px', marginTop: '-2px' }}
                              type="rise_icon_trial_pay"/>
                    <span style={{ fontWeight: 'bolder' }}>限时免费，立即开始学习</span>
                  </div>
                </div>
              )
              return list
            }
            case 7: {
              list.push(
                <div className="button-footer trial_pay" onClick={() => this.handleClickFreeProblem()}>
                  <div>
                    <span style={{ fontWeight: 'bolder' }}>下一步</span>
                  </div>
                </div>
              )
              return list
            }
            case 8: {
              list.push(
                <div className="button-footer">
                  <div className="split-left" onClick={() => this.handleClickPayImmediately(coupons.length)}>
                    ¥ {fee}，立即学习
                  </div>
                  <div className="split-right" onClick={() => this.setState({showEvaluation: true})}>
                    免费获取
                  </div>
                </div>
              )
              return list
            }
            case 9: {
              // "¥ {fee}，立即学习|获取训练营小课"
              list.push(
                <div className="button-footer">
                  <div className="split-left" onClick={() => this.handleClickPayImmediately(coupons.length)}>
                    ￥{fee}，自主学习
                  </div>
                  <div className="split-right" onClick={() => window.location.href = `https://${window.location.hostname}/pay/pay?showId=5`}>
                    ¥ 299，小课训练营
                  </div>
                </div>
              )
              return list
            }
            default:
              return null
          }
        }
      }
    }

    const renderPayMessage = () => {
      if(data.id === FREE_PROBLEM_ID) {
        return (
          <div className="pre-pay-message">
            <div>本课程是线上学习产品，由文字+语音+练习题+互动讨论区组成。课程一共有5章6小节，40道练习题。</div>
            <br/>

            <div>报名后7天内可免费学习，完成后可永久复习。随开随学，进度自控。</div>
            <br/>

            <div>在手机端”圈外同学“公众号，或网站www.iquanwai.com都可以学习。</div>
            <br/>

          </div>
        )
      } else {
        return (
          <div className="pre-pay-message">
            <div>《{problem}》是线上学习产品，由文字+语音+练习题+互动讨论区组成。</div>
            <br/>

            <div>课程一共有{data && data.chapterList ? data.chapterList.length : 'N'}章{data ? data.length : 'N'}小节。完成后可永久随开随学，进度自控。</div>
            <br/>

            <div>在手机端”圈外同学“公众号，或网站www.iquanwai.com都可以学习。</div>
            <br/>

            <div>报名通过系统自动进行，支付成功后概不退款，请予以理解。</div>
            <br/>

          </div>
        )
      }
    }

    const renderPayInfo = () => {
      const { location } = this.props

      return (
        <PayInfo ref="payInfo"
                 gotGoods={(goods) => this.handleGotGoods(goods)}
                 dispatch={this.props.dispatch}
                 goodsId={location.query.id}
                 goodsType={GoodsType.FRAG_COURSE}
                 payedDone={(planId) => this.handlePayDone(planId)}
                 payedError={(ex) => this.setState({ showErr: true })}
                 payedCancel={ex => this.setState({ showErr: true })}
        />
      )
    }

    const renderEvaluateOperation = () => {
      let evaluationProps = {
        buttons: [
          { label: '取消', onClick: () => this.setState({ showEvaluation: false }) },
          { label: '去测评', onClick: () => this.context.router.push('/rise/static/eva/start') }
        ]
      }
      return (
        <Alert { ...evaluationProps }
          show={this.state.showEvaluation}>
          <div className="global-pre">
            点击下方去测评，完成测评，分享结果图片，邀请3人扫码并完成测试，即可免费领取。
          </div>
        </Alert>
      )
    }

    return (
      <div className="problem-introduction">
        <div className="pi-header" style={{ height: `${this.picHeight}px` }}>
          <AssetImg url={pic} height={'100%'} style={{ position: 'absolute' }}/>
          <div className="pi-h-body">
            <div className="pi-h-b-icon">
              <AssetImg url="https://static.iqycamp.com/images/rise_icon_problem_introduction.png?imageslim" size={37}/>
            </div>
            <div className="pi-h-b-title left">{problem}</div>
            <div className="pi-h-b-content left">{renderCatalogName(catalog, subCatalog)}</div>
            <div className="pi-h-b-content left bottom">{`难度系数：${numeral(difficultyScore).format('0.0')}/5.0`}</div>
          </div>
        </div>
        <div className="pi-content">
          <div className="pi-c-foreword white-content">
            <Header icon="rise_icon_lamp" title="课程介绍" width={24} height={29}/>
            <div className="pi-c-f-content">
              { audio ?
                <div className="context-audio">
                <Audio url={audio} words={audioWords}/>
              </div> : null }
              <div>
                <pre className="pi-c-f-c-text">{why}</pre>
              </div>
            </div>
          </div>
          <div className="pi-c-man white-content mg-25">
            <Header icon="rise_icon_man" title="适合人群" width={18}/>
            <div className="pi-c-m-content">
              {renderWho(who)}
            </div>
          </div>
          <div className="pi-c-author white-content mg-25">
            <Header icon="rise_icon_head" title="讲师介绍" width={26} height={16} lineHeight={'12px'}/>
            <AssetImg width={'100%'} url={authorPic}/>
          </div>
          <div className="pi-c-pay-info white-content mg-25">
            <Header icon="rise_icon_pay_info" title="报名须知" width={24}/>
            <div className="pi-c-pay-content">
              {renderPayMessage()}
            </div>
          </div>
          <div className="pi-c-system white-content mg-25">
            <Header icon="rise_icon_introduction_book" title="知识体系" lineHeight={'12px'} height={17}/>
            <div className="pi-c-s-content">
              <pre className="pi-c-s-text" dangerouslySetInnerHTML={{ __html: how }}/>
              <AssetImg width={'100%'} url={descPic} marginTop={'15px'}/>
            </div>
          </div>
          <div className="pi-c-learn white-content mg-25">
            <Header icon="rise_icon_book" title="学习大纲"/>
            <div className="pi-c-l-content">
              {what ? <pre className="pi-c-text" dangerouslySetInnerHTML={{ __html: what }}/> : null}
              <div
                className="roadmap">{chapterList ? chapterList.map((chapter, idx) => renderRoadMap(chapter, idx)) : null}</div>
            </div>
          </div>
          <div className="pi-c-ability white-content mg-25">
            <Header icon="rise_icon_ability" title="能力项" marginLeft={'-1em'}/>
            <div className="pi-c-a-content">
              <div className="text"
                   dangerouslySetInnerHTML={{ __html: '在【圈外同学】，我们的小课都根据“个人势能模型”进行设计，本小课在模型中的能力项为：' }}/>
              <div className="pi-c-a-c-module"
                   onClick={() => window.location.href = 'https://mp.weixin.qq.com/s?__biz=MzA5ODI5NTI5OQ==&mid=2651673801&idx=1&sn=c0bc7ad463474f5d8f044ae94d8e6af7&chksm=8b6a3fa5bc1db6b335c423b51e8e987c0ba58546c9a4bcdba1c6ea113e710440e099981fac22&mpshare=1&scene=1&srcid=0522JbB9FCiJ2MLTYIJ9gHp8&key=97c2683b72ba12a9fe14a4718d1e2fc1db167b4659eda45c59be3b3c39723728975cf9c120462d5d896228edb74171fb9bfefc54a6ff447b7b3389e626e18744f9dca6103f6a3fbeb523c571631621eb&ascene=0&uin=MjYxMjUxOTM4MA%3D%3D&devicetype=iMac+MacBookPro11%2C1+OSX+OSX+10.10.5+build(14F27)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=sl95nanknHuEvflHY9fNI6KUKRA3koznfByp5C1nOV70kROWRuZNqQwkqvViYXiw'}>
                <div className="pi-c-a-c-m-rise">【圈外】</div>
                <div className="pi-c-a-c-m-text">
                  个人势能模型
                </div>
              </div>
              <AssetImg width={'100%'} url={categoryPic} marginTop="10"/>
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
        <Toast show={this.state.showToast} timeout={4000} height={220} width={200} top={220}>
          <AssetImg type="success" width={60} style={{ marginTop: 60 }}/>
          <div className="toast-text">领取成功</div>
          <div className="toast-text">点击下一步学习吧</div>
        </Toast>
        {showErr ? <div className="error-mask" onClick={() => this.setState({ showErr: false })}>
          <div className="tips">
            出现问题的童鞋看这里<br/>
            1如果显示“URL未注册”/"跨号支付，请重新刷新页面即可<br/>
            2如果遇到“支付问题”，扫码联系小黑，并将出现问题的截图发给小黑<br/>
          </div>
          <img className="xiaoQ" src="https://static.iqycamp.com/images/asst_xiaohei.jpeg?imageslim"/>
        </div> : null}
        {renderPayInfo()}
        {renderEvaluateOperation()}
      </div>
    )
  }
};

interface HeaderProps {
  icon: string,
  title: string,
  size?: number,
  width?: number,
  height?: number,
  marginLeft?: number,
  lineHeight?: number,
}

class Header extends React.Component<HeaderProps, any> {
  constructor(props: HeaderProps) {
    super(props)
  }

  render() {
    const renderSize = () => {
      if(!this.props.size && !this.props.width && !this.props.height) {
        return 20
      } else {
        return this.props.size
      }
    }
    return (
      <div className="page-item-header">
        <div className="pih-icon-container">
          <div className="pih-icon"
               style={{
                 marginLeft: this.props.marginLeft, lineHeight: this.props.lineHeight ? this.props.lineHeight : 0
               }}>
            <AssetImg type={this.props.icon} size={renderSize()} width={this.props.width} height={this.props.height}/>
          </div>
          <div className="pih-title">
            {this.props.title}
          </div>
        </div>
      </div>
    )
  }
}
