/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：
 3. 作者：duanxianfeng@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import * as React from 'react';
import './LiveOrder.less';
import ShareGuide from '../../../../components/shareGuide/ShareGuide';
import AssetImg from '../../../../components/AssetImg';
import { configShare } from '../../../helpers/JsConfig';
import { loadLiveOrderById, orderLive } from '../../async';
import { lockWindow, unlockWindow } from '../../../../utils/helpers';

export default class LiveOrder extends React.Component {

  constructor () {
    super();
    this.state = {
      showSuccessTip: false,
      showShareTip: false,
      isOrdered: false,
      data: {
        banner: '//static.iqycamp.com/gexu-hxf8xq4g.jpg',
        name: '如何优雅的践踏商业教条',
        speakerDesc: '葛旭，教书匠，商人，北京大学历史系',
        startTimeStr: '2018年4月19日',
        liveDesc: '商业赛道领跑者和跟跑者的不同逻辑\n' +
        '          光鲜的商业术语是皇帝的新衣\n' +
        '          被低估的哲学思辨力',
        isOrdered: false,
      },
    };
  }

  componentWillMount () {

  }

  async componentDidMount () {
    const { promotionId, liveId } = this.props.location.query;
    if (liveId) {
      let liveOrder = await loadLiveOrderById(liveId);
      console.log(liveOrder);
      this.setState({
        data: liveOrder.msg,
        isOrdered: liveOrder.msg.isOrdered,
      });
    }
  }

  async handleClickOrderLive () {
    const { liveId, promotionRiseId } = this.props.location.query;
    let orderRes = await orderLive(liveId, promotionRiseId);
    if (orderRes.code === 200) {
      lockWindow()
      this.setState({
        showSuccessTip: true,
        isOrdered: true,
      });
    }
  }

  handleClickInvite () {
    const { liveId } = this.props.location.query;
    configShare(
      `我刚刚完成了一个专业的职业测评，快来帮我做评价吧`,
      `https://${window.location.hostname}/rise/static/home/live/order?liveId=${liveId}&promotionRiseId=${this.state.data.riseId}`,
      'https://static.iqycamp.com/images/fragment/value_share.png?imageslim',
      '测评由华师大教育教练组和圈外同学共同开发，完成对我的评价还可以获得一个免费体验名额',
    );

    setTimeout(() => {
      unlockWindow()
      this.setState({
        showSuccessTip: false,
        showShareTip: true,
      });
    }, 200)
  }

  render () {
    const {
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
    } = data;

    const renderOrderSuccessTip = () => {
      return (
        <div>
          <section className="order-success-box">
            <div className="icon-box">
              <div className="icon"></div>
              <span className="icon-tip">预约成功</span>
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

    const renderShareTip = () => {
      return (
        <div onClick={() => this.setState({ showShareTip: false })}>
          <ShareGuide/>
        </div>
      );
    };

    return (
      <div className="live-order-container">
        <AssetImg url={banner}
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
             onClick={() => this.handleClickOrderLive()}>{isOrdered ? '已经预约，点击分享给好友' : '立即预约直播'}</div>
        {showSuccessTip && renderOrderSuccessTip()}
        {showShareTip && renderShareTip()}
      </div>
    );
  }

}
