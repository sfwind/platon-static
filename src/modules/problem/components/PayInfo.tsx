import * as React from "react";
import "./PayInfo.less"
import Icon from "../../../components/AssetImg";
import * as _ from "lodash";
import { connect } from "react-redux";
const numeral = require('numeral');
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import {
  loadUserCoupons, loadPayParam, afterPayDone, logPay, mark,calculateCoupon,
} from './async'


interface CouponProps {
  description?: string,
  expired: string,
  id: number
}

interface PayInfoProps {
  /* 优惠券 */
  coupons: Array<CouponProps>,
  /* 是否免费 */
  free?: Boolean,
  /* 优惠券 */
  chose:Object,
  /* 关闭支付页面回调 */
  close(callback: Function): void,
  /* 选择优惠券的回调 */
  choose(coupon: CouponProps, callback: Function): void,
  /* 显示支付弹窗 */
  show: Boolean,
  /* 最终支付价格 */
  final?: Number,
  /* 支付价格 */
  fee: Number,
  /* 支付头部 */
  header: String,
  /* 支付检查 */
  payedCheck(): Promise,
}

@connect(state => state)
export default class PayInfo extends React.Component<PayInfoProps,any> {
  constructor(props) {
    super(props);
    this.state = {
      coupons:[],
      fee:this.props.fee
    };
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad());
    return loadUserCoupons().then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({coupons:res.smg});
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      const { dispatch, location } = this.props
      dispatch(endLoad());
      dispatch(alertMsg(ex))
    });
  }


  handleClickPay() {
    this.props.pay()
  }

  /**
   * 选择优惠券
   * @param coupon 优惠券
   */
  choose(coupon) {
    const { dispatch, location } = this.props;
    dispatch(startLoad());
    calculateCoupon(coupon.id, id).then((res) => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ free: res.msg === 0, chose: coupon, final: res.msg,openCoupon:false })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render() {
    const { openCoupon,coupons=[],final,fee,chose,free } = this.state;
    const hasCoupons = !_.isEmpty(coupons);
    /* 高度，用于遮盖优惠券 */
    const height = (hasCoupons ? 276 : 226) + 'px';

    /**
     * 计算弹窗偏移量，使用transform增加动画流畅度，浏览器前缀不可省略
     * @param show 是否显示弹窗
     * @param height
     * @returns {{height:string,transform:string}}
     */
    const renderTrans = (show, height) => {
      let style = {};
      height = show ? '100%' : height;
      let transY = show ? 0 : height;

      _.merge(style, {
        height: `${height}`,
        WebkitTransform: `translateY(${transY})`,
        MozTransform: `translateY(${transY})`,
        msTransform: `translateY(${transY})`,
        OTransform: `translateY(${transY})`,
        transform: `translateY(${transY})`,
      })
      return style;
    }

    /**
     * 渲染价格
     * @param fee 价格
     * @param final 最终价格（打折后）
     * @param free 是否免费
     * @returns {Array} 展示dom结构
     */
    const renderPrice = (fee, final, free) => {
      let priceArr = [];
      if(final || free) {
        priceArr.push(<span className="discard" key={0}>{`¥${numeral(fee).format('0.00')}元`}</span>);
        priceArr.push(<span className="final" key={1}
                            style={{marginLeft:'5px'}}>{`¥${numeral(final).format('0.00')}元`}</span>)
      } else {
        priceArr.push(<span className="final" key={0}>{`¥${numeral(fee).format('0.00')}元`}</span>)
      }
      return priceArr;
    }

    /**
     * 计算支付弹窗Header的位移量
     * @param open
     * @returns {{transform: string}}
     */
    const renderHeaderTrans = (open) => {
      let transY = open ? '-142px' : 0;
      return {
        WebkitTransform: `translateY(${transY})`,
        MozTransform: `translateY(${transY})`,
        msTransform: `translateY(${transY})`,
        OTransform: `translateY(${transY})`,
        transform: `translateY(${transY})`,
      }
    }

    /**
     * 计算底部按钮的位移量，目的是遮盖优惠券列表，使用transform可以优化动画性能
     * @param open
     * @returns {{transform: string}}
     */
    const renderBtnTrans = (open) => {
      let transY = open ? '72px' : 0;
      return {
        WebkitTransform: `translateY(${transY})`,
        MozTransform: `translateY(${transY})`,
        msTransform: `translateY(${transY})`,
        OTransform: `translateY(${transY})`,
        transform: `translateY(${transY})`,
      }
    }

    <!-- render内容如下：如果是安卓4.3以下版本的话，则渲染简化页面，否则渲染正常页面 -->
    if(window.ENV.osName === 'android' && parseFloat(window.ENV.osVersion) <= 4.3) {

      <!-- 安卓4.3 以下 -->
      return (
        <div className="simple-pay-info">
          <div className="close" onClick={() => this.setState({ showPayInfo: false })}>
            关闭
          </div>
          <div className="main-container">
            <div className="header">
              小课购买
            </div>
            <div className="content">
              <div className="price item">
                {renderPrice(fee, final, free)}
              </div>
              <div className={`coupon item`}>
                {chose ? `'优惠券'：¥${numeral(chose.amount).format('0.00')}元` : '选择优惠券'}
              </div>
            </div>
            <ul className={`coupon-list`}>
              {coupons ? coupons.map((item, seq) => {
                return (
                  <li className="coupon" key={seq}>
                    ¥{numeral(item.amount).format('0.00')}元
                    <span className="describe">{item.description ? item.description : ''}</span>
                    <span className="expired">{item.expired}过期</span>
                    <div className="btn" onClick={() => this.handleClickChooseCoupon(item, () => {})}>
                      选择
                    </div>
                  </li>
                )
              }) : null}
            </ul>
          </div>
          <div className="bn-container">
            <div className="btn" onClick={() => this.handleClickRiseCoursePay()}/>
          </div>
        </div>
      )
    } else {
      <!--  非安卓4.3 -->
      return (<div className="pay-info" style={ renderTrans(this.props.show,height)}>
        {this.props.show ?<div className="close" onClick={()=>this.props.close(()=>this.setState({openCoupon:false}))}
                               style={{bottom:`${hasCoupons?276:226}px`}}>
          <Icon type="white_close_btn" size="40px"/>
        </div>: null}

        <div className="main-container" style={{height: _.isEmpty(coupons) ? 160 : 210}}>
          <div className="header" style={renderHeaderTrans(openCoupon)}>
            {this.props.header}
          </div>
          <div className="content" style={renderHeaderTrans(openCoupon)}>
            <div className="price item">
              {renderPrice(fee, final, free)}
            </div>
            <div className={`coupon item ${openCoupon?'open':''}`}
                 onClick={()=>this.setState({openCoupon:!this.state.openCoupon})}>
              {chose ? `${this.props.id === 3 ? '精英RISE券' : '优惠券'}：¥${numeral(chose.amount).format('0.00')}元` : `${this.props.id === 3 ? '选择精英RISE券/优惠券' : '选择优惠券'}`}
            </div>
          </div>
          <ul className={`coupon-list ${openCoupon?'open':''}`} style={renderHeaderTrans(openCoupon)}>
            {coupons ? coupons.map((item, seq) => {
              return (
                <li className="coupon" key={seq}>
                  ¥{numeral(item.amount).format('0.00')}元
                  <span className="describe">{item.description ? item.description : ''}</span>
                  <span className="expired">{item.expired}过期</span>
                  <div className="btn" onClick={()=>this.choose(item)}>
                    选择
                  </div>
                </li>
              )
            }) : null}
          </ul>
        </div>
        <div className="btn-container" style={renderBtnTrans(openCoupon)}>
          <div className="btn" onClick={()=>this.handleClickPay()}>
          </div>
        </div>
      </div>)
    }
  }
}
