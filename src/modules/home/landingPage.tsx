/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：landingPage  主页
 3. 作者： liyang@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/

import * as React from 'react'
import './landingPage.less'
import { changeTitle, formatDate, lockWindow, unlockWindow } from '../../utils/helpers'
import { ToolBar } from '../base/ToolBar'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from 'reduxutil/actions'
import * as _ from 'lodash';
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
公共组建的引入
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { Dialog } from 'react-weui'
import Swiper from '../../components/swiper/swiper'  // Swiper组件
import ArticleItem from '../../components/articleItem/articleItem' //文章精选组件
import ActivityItem from '../../components/activityItem/activityItem' //校友活动组件
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
公共方法的引入
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import  commonFun from '../../utils/commonFun'
import  apiDataFilter from  '../../utils/apiDataFilter';
const { Alert } = Dialog;
@connect(state => state)
export default class LandingPage extends React.Component {

  constructor() {
    super();
    this.state = {
      data: {},   //接口参数
      dialogButtons: [
        {
          label: '知道了',
          onClick: (e) => {
            const { applySuccess = {} } = this.state;
            let newApplySuccess = _.merge(_.cloneDeep(applySuccess), { isShowPassNotify: false });
            this.setState({ applySuccess: newApplySuccess })
          },
        },
        {
          label: '立即入学',
          onClick: (e) => {
            const { applySuccess = {} } = this.state;
            let newApplySuccess = _.merge(_.cloneDeep(applySuccess), { isShowPassNotify: false });
            this.setState({ applySuccess: newApplySuccess }, () => {
              window.location.href = `/pay/apply?goodsId=${applySuccess.goPayMemberTypeId}`
            })
          },
        },
      ], // 弹窗需要的参数
      applySuccess: {},    // 申请是否成功
    }
  }

  countDownTimer;

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount() {
    changeTitle('圈外同学'); // 变更标题
    commonFun.sendBigData({ module: '打点', function: '着陆页', action: '打开着陆页' }); // 页面埋点
    let self =this;
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     接口请求  获取着陆页所有信息
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    apiDataFilter.request({
      apiPath:"home.load",
      successCallback(data){
        self.setState({
          data: data.msg,
          applySuccess: data.msg.applySuccess
        }, () => {
          if(data.msg.applySuccess.isShowPassNotify) {
            self.countDownTimer = setInterval(() => {
              const { applySuccess = {} } = self.state;
              let newApplySuccess = _.cloneDeep(applySuccess);
              newApplySuccess = _.merge(newApplySuccess, { remainTime: applySuccess.remainTime - 1000 > 0 ? applySuccess.remainTime - 1000 : 0 });
              self.setState({ applySuccess: newApplySuccess })
            }, 1000)
          }
        });

      },
      otherCallback(data){
        dispatch(alertMsg(data.msg))
      }
    });
  }

  componentWillUnmount() {
    clearInterval(this.countDownTimer)
  }

  handleClickImageBanner(banner) {
    if(banner.linkUrl.indexOf('http') >= 0) {
      window.location.href = banner.linkUrl
    } else {
      this.context.router.push(banner.linkUrl)
    }
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  接口 点击换文章信息列表内容
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  shuffleArticles() {
    let self = this;
    apiDataFilter.request({
      apiPath:"home.articles",
      successCallback(data){
        let dataArticles = self.state.data;
        dataArticles.articlesFlows = data.msg;
        self.setState({
          data: dataArticles,
        })
      },
      otherCallback(data){
        dispatch(alertMsg(data.msg))
      }
    });
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   根据秒 计算时分秒
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  formatSeconds(value: number): { remainHour, remainMinute, remainSecond } {
    let remainSecond = parseInt(value);// 秒
    let remainMinute = 0;// 分
    let remainHour = 0;// 小时
    if(remainSecond > 60) {
      remainMinute = parseInt(remainSecond / 60);
      remainSecond = parseInt(remainSecond % 60);
      if(remainMinute > 60) {
        remainHour = parseInt(remainMinute / 60);
        remainMinute = parseInt(remainMinute % 60);
      }
    }
    if(remainSecond <= 0) {
      remainSecond = 0;
    }

    return { remainHour, remainMinute, remainSecond };
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   改变时间显示格式
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  formatDateString(date) {
    // { remainHour, remainMinute, remainSecond }
    let dateInfo = this.formatSeconds(date / 1000);
    return `${dateInfo.remainHour}时${dateInfo.remainMinute}分${dateInfo.remainSecond}秒`
  }

  render() {

    const {
      notify = false,
      isBusinessMember = true,
      pageBanners = [],
      problemsFlows = [],
      livesFlows = [],
      articlesFlows = [],
      activitiesFlows = [],
    } = this.state.data;

    return (
      <div className="landing-page-container">
        {/*-----header模块----*/}
        <div className="header">
          <div className="left-header-box" onClick={() => this.context.router.push('/rise/static/message/center')}>
            <i className="iconfont icon-message"></i>
            {notify && <span className="notify"></span>}
          </div>
          <div className="right-header-box" onClick={() =>{ _MEIQIA('showPanel'); commonFun.sendBigData({module:"打点" ,func:"着陆页",action:"点击入学咨询"})}}>
            <span>入学咨询&nbsp;</span>
            <i className="iconfont icon-chat"></i>
          </div>
        </div>
        {/*-----swiper模块----*/}
        <div className="home-swiper">
          {
            pageBanners.length > 0 &&
            <Swiper height='16rem'>
              {pageBanners.map((banner, index) =>
                <img key={index} src={banner.imageUrl} onClick={() => { BigData.sendBigData({ module: '打点', function: '着陆页', action: '点击Banner' }); this.handleClickImageBanner(banner)
                }} className="banner-item swiper-slide swiper-image"/>,
              )}
            </Swiper>
          }
        </div>
        {/*-----  nav导航部分 -----*/}
        <div className="nav">
          <ul>
            <li><i className="iconfont icon-play"></i><p>大咖直播</p></li>
            <li><i className="iconfont icon-light"></i><p>职场干货</p></li>
            <li><i className="iconfont icon-group"></i><p>校友活动</p></li>
          </ul>
        </div>
        {/*-----  加入圈外模块  -----*/}
        <div className="join-qw panel-qw">
          <div className="panel-header">加入圈外</div>
          <div className="panel-body">

          </div>
        </div>
        {/*-----  大咖直播模块   -----*/}
        <div className="super-playing panel-qw">
          <div className="panel-header">大咖直播<span className="more">更多</span></div>
          <div className="panel-body">

          </div>
        </div>
        {/*-----  文章精选模块  -----*/}
        <div className="article panel-qw">
          <div className="panel-header">文章精选<span className="more">更多</span></div>
          <div className="panel-body">
            <ArticleItem></ArticleItem>
            <ArticleItem></ArticleItem>
          </div>
        </div>
        {/*-----   校友活动模块  -----*/}
        <div className="activity panel-qw">
          <div className="panel-header">校友活动<span className="more">更多</span></div>
          <div className="panel-body">
            <ActivityItem></ActivityItem>
            <ActivityItem></ActivityItem>
          </div>
        </div>
        <div className="bottom-text">我也是有底线的...</div>
        {/*-----   弹框模块  -----*/}
        https://static.iqycamp.com/661521099827_-7ld21bf1.pic@2x.jpg
        <Alert show={this.state.applySuccess.isShowPassNotify} buttons={this.state.dialogButtons}>
          恭喜你通过{this.state.applySuccess.name}申请！
          <br/>
          离入学截止时间还剩{this.state.applySuccess.remainTime ? this.formatDateString(this.state.applySuccess.remainTime) : ''}
          <br/>
          点击立即入学，开启圈外商学院之旅
        </Alert>
        <ToolBar/>
      </div>
    )
  }

}
