/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：
 3. 作者：duanxianfeng@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import * as React from 'react';
import './liveOrder.less';
import ShareGuide from '../../../../components/shareGuide/ShareGuide';
import AssetImg from '../../../../components/AssetImg';
import { configShare } from '../../../helpers/JsConfig';
import { loadLiveOrderById, orderLive } from '../../async';
import requestProxy from '../../../../components/requestproxy/requestProxy';

export default class LiveOrder extends React.Component {

  constructor () {
    super();
    this.state = {
      showTransferTip: false, // 是否展示分享文案提示
      showSuccessTip: false,  // 是否展示预约成功提示
      showShareTip: false,  // 是否展示分享图片提示
      isOrdered: false, // 是否已经预约成功
      data: {
        banner: '',
        thumbnail: '',
        name: '',
        speakerDesc: '',
        startTimeStr: '',
        liveDesc: '',
        isOrdered: false,
        visibility: false,
        linkUrl: '',
      },
    };
  }

  async componentDidMount () {
    const { promotionId, liveId } = this.props.location.query;
    if (liveId) {
      let liveOrder = await loadLiveOrderById(liveId);
      this.setState({
        data: liveOrder.msg,
        isOrdered: liveOrder.msg.isOrdered,
      });
    }
  }

  /**
   * 点击预约直播按钮
   * @returns {Promise<void>}
   */
  async handleClickOrderLive () {
    const { liveId, promotionRiseId } = this.props.location.query;
    const { isOrdered, data } = this.state;
    const {
      visibility,
      linkUrl,
    } = data;

    if (visibility) {
      // 有观看权限
      if (linkUrl) {
        // 直播已经开始
        if (isOrdered) {
          window.location.href = linkUrl;
        } else {
          window.location.href = linkUrl;
        }
      } else {
        // 直播没有开始
        if (isOrdered) {
          this.setState({
            showSuccessTip: true,
          });
        } else {
          this.handleRiseMemberOrderLive();
        }
      }
    } else {
      // 无观看权限
      if (linkUrl) {
        // 直播已经开始
        if (isOrdered) {
          // 已预约过
          window.location.href = linkUrl;
        } else {
          // 尚未预约
          requestProxy.alertMessage('需要加入圈外商学院才能看哦');
        }
      } else {
        // 直播尚未开始
        if (isOrdered) {
          this.setState({
            showTransferTip: true,
          });
        } else {
          this.setState({
            showTransferTip: true,
          });
        }
      }
    }
  }

  /**
   * 会员身份点击预约直播
   * @returns {Promise<void>}
   */
  async handleRiseMemberOrderLive () {
    const { isOrdered } = this.state;
    const { liveId, promotionRiseId } = this.props.location.query;
    if (isOrdered) {
      this.setState({
        showSuccessTip: true,
        showShareTip: false,
        isOrdered: true,
      });
    } else {
      let orderRes = await orderLive(liveId, promotionRiseId);
      if (orderRes.code === 200) {
        this.setState({
          showSuccessTip: true,
          showShareTip: false,
          isOrdered: true,
        });
      }
    }
  }

  /**
   * 非会员点击预约直播
   * @returns {Promise<void>}
   */
  async handleNormalOrderLive () {
    const { isOrdered } = this.state;
    const { liveId, promotionRiseId } = this.props.location.query;
    if (isOrdered) {
      this.setState({
        showSuccessTip: true,
        showShareTip: false,
        isOrdered: true,
      });
    } else {
      let orderRes = await orderLive(liveId, promotionRiseId);
      if (orderRes.code === 200) {
        this.setState({
          showSuccessTip: true,
          showShareTip: false,
          isOrdered: true,
        });
      }
    }
  }

  /**
   * 点击邀请好友链接按钮
   */
  handleClickInvite () {
    const { liveId } = this.props.location.query;
    const {
      thumbnail,
      name,
    } = this.state.data;
    configShare(
      `大咖直播课`,
      `https://${window.location.hostname}/rise/static/home/live/order?liveId=${liveId}&promotionRiseId=${this.state.data.riseId}`,
      thumbnail,
      name,
      () => {
        this.handleNormalOrderLive();
      },
    );

    setTimeout(() => {
      this.setState({
        showTransferTip: false,
        showShareTip: true,
      });
    }, 200);
  }

  render () {
    const {
      showTransferTip,
      showSuccessTip,
      showShareTip,
      isOrdered,
      data,
    } = this.state;
    const {
      banner,
      name,
      speakerDesc,
      startTimeStr,
      liveDesc,
      visibility,
      linkUrl,
    } = data;

    // 提示去分享元素
    const renderTransferTip = () => {
      return (
        <div>
          <section className="order-transfer-box">
            <div className="icon-box">
              <AssetImg className="icon"
                        url="https://static.iqycamp.com/success-icon-rzfz8mly.png"></AssetImg>
              <span className="icon-tip">去分享</span>
            </div>
            <ul className="order-tips">
              <li>· 分享直播给朋友可以免费观看大咖直播</li>
              <li>· 好友通过您的分享可免费看大咖直播</li>
              <li>· 直播开始前一天，我们会通过公众号提醒您参加直播</li>
            </ul>
            <div className="order-button"
                 onClick={() => this.handleClickInvite()}>邀请朋友免费看直播
            </div>
          </section>
          <div className="mask"></div>
        </div>
      );
    };

    // 提示预约成功元素
    const renderSuccessTip = () => {
      return (
        <div>
          <section className="order-transfer-box"
                   style={{ width: '18rem' }}>
            <div className="icon-box">
              <AssetImg className="icon"
                        url="https://static.iqycamp.com/success-icon-rzfz8mly.png"></AssetImg>
              <span className="icon-tip">预约成功</span>
              <i className='iconfont icon-close icon-box-close'
                 onClick={() => this.setState({ showSuccessTip: false })}></i>
            </div>
          </section>
          <div className="mask"></div>
        </div>
      );
    };

    // 分享提示元素
    const renderShareTip = () => {
      return (
        <div onClick={() => this.setState({ showShareTip: false })}>
          <ShareGuide/>
        </div>
      );
    };

    // 多种情况计算出按钮展示文案
    const caclButtonStr = () => {
      let buttonStr;
      if (visibility) {
        if (isOrdered) {
          if (linkUrl) {
            buttonStr = '立即观看';
          } else {
            buttonStr = '已经预约';
          }
        } else {
          if (linkUrl) {
            buttonStr = '立即观看';
          } else {
            buttonStr = '立即预约';
          }
        }
      } else {
        if (isOrdered) {
          if (linkUrl) {
            buttonStr = '立即观看';
          } else {
            buttonStr = '已经预约';
          }
        } else {
          if (linkUrl) {
            buttonStr = '会员免费看';
          } else {
            buttonStr = '会员免费看';
          }
        }
      }
      return buttonStr;
    };

    return (
      <div className="live-order-container">
        <AssetImg url={banner || '//static.iqycamp.com/live_default-0vulijrp.png'}
                  className="live-thumbnail"/>
        <h1 className="name">{name}</h1>
        <div className="category-block">
          <h2 className="category-title">讲师介绍</h2>
          <pre className="category-content">{speakerDesc}</pre>
        </div>
        <div className="category-block">
          <h2 className="category-title">直播时间</h2>
          <pre className="category-content">{startTimeStr}</pre>
        </div>
        <div className="category-block">
          <h2 className="category-title">直播简介</h2>
          <pre className="category-content">{liveDesc}</pre>
        </div>
        <div className="live-order-button"
             onClick={() => this.handleClickOrderLive()}>{caclButtonStr()}</div>
        {showTransferTip && renderTransferTip()}
        {showSuccessTip && renderSuccessTip()}
        {showShareTip && renderShareTip()}
      </div>
    );
  }

}
