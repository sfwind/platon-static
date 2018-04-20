import * as React from 'react'
import './LandingPage.less'
import { changeTitle, formatDate, lockWindow, unlockWindow } from '../../utils/helpers'
import * as FontAwesome from 'react-fontawesome'
import { loadLandingPageData, loadShuffleArticles } from './async'
import { ToolBar } from '../base/ToolBar'
import { mark } from '../../utils/request'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from 'reduxutil/actions'
import * as _ from 'lodash';
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
公共组建的引入
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import { Dialog } from 'react-weui'
import { MarkBlock } from '../../components/markblock/MarkBlock'
import AssetImg from '../../components/AssetImg'
import { ProblemHome } from './components/problem/ProblemHome'
import { LiveHome } from './components/live/LiveHome'
import { ArticleHome } from './components/article/ArticleHome'
import { ActivityHome } from './components/activity/ActivityHome'
import { ColumnSpan } from '../../components/ColumnSpan'
import Banner from '../../components/Banner'
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
公共方法的引入
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
import  BigData from  '../../utils/bigData'
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
    BigData.sendBigData({ module: '打点', function: '着陆页', action: '打开着陆页' }); // 页面埋点
    let self =this;
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
     接口请求  获取着陆页所有信息
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    apiDataFilter.request({
      apiPath:"home.load",
      data:{
        flag:1,
        flag:343
      },
      path:true,
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
        })
      },
      errorCallback(err){
        dispatch(alertMsg(err))
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

  async shuffleArticles() {
    let res = await loadShuffleArticles();
    if(res.code === 200) {
      let data = this.state.data;
      data.articlesFlows = res.msg;
      this.setState({
        data: data,
      })
    } else {
      dispatch(alertMsg(res.msg))
    }
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
   根据秒 计算时分秒
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  formatSeconds(value: number): { remainHour, remainMinute, remainSecond } {
    var remainSecond = parseInt(value);// 秒
    var remainMinute = 0;// 分
    var remainHour = 0;// 小时
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
            <AssetImg className="message" url="https://static.iqycamp.com/icon_message@2x-8rkrc4h9.png"/>
            {notify && <div className="notify"></div>}
          </div>
          <MarkBlock module="打点"
                     func="着陆页"
                     action="点击入学咨询"
                     className="right-header-box"
                     onClick={() => _MEIQIA('showPanel')}>
            <span>入学咨询&nbsp;</span>
            <AssetImg className="consult-icon" url="https://static.iqycamp.com/icon_goutong @2x-8ww0p3at.png"/>
          </MarkBlock>
        </div>
        {/*-----swiper模块----*/}
        <div className="home-swiper">
          {
            pageBanners.length > 0 &&
            <Banner height='16rem'>
              {pageBanners.map((banner, index) =>
                <img key={index} src={banner.imageUrl} onClick={() => {
                  mark({ module: '打点', function: '着陆页', action: '点击Banner' });
                  this.handleClickImageBanner(banner)
                }} className="banner-item swiper-slide swiper-image"/>,
              )}
            </Banner>
          }
        </div>
        <ColumnSpan height="10" style={{ margin: '0 -2rem' }}/>
        {
          !isBusinessMember &&
          <MarkBlock module="打点"
                     func="着陆页"
                     action="申请加入商学院"
                     className="business-apply"
                     onClick={() => window.location.href = `/pay/rise`}></MarkBlock>
        }
        <div className="content-box-container">
          {/*-----   圈外课模块  -----*/}
          {
            !isBusinessMember &&
            <div className="content-box" id="QWClass">
              <div className="content-header">
                <div className="content-title">圈外课</div>
              </div>
              {problemsFlows.map((problem, index) => {
                return <ProblemHome data={problem} key={index} subscribeFunc={() => this.subscribeProblem()}/>
              })}
            </div>
          }
          {/*-----   拓眼界模块  -----*/}
          <div className="content-box" id="QWEyes">
            <div className="content-header">
              <div className="content-title">拓眼界</div>
              {
                livesFlows.length > 5 &&
                <MarkBlock module="打点"
                           func="着陆页"
                           action="拓眼界更多"
                           className="more"
                           onClick={() => this.context.router.push('/rise/static/home/lives')}>
                  更多&nbsp;&nbsp;
                  <FontAwesome name="angle-right"/>
                </MarkBlock>
              }
            </div>
            {livesFlows.slice(0, 5).map((live, index) => <LiveHome data={live} key={index}/>)}
          </div>
          {/*-----   加油站模块  -----*/}
          <div className="content-box" id="QWStation">
            <div className="content-header">
              <div className="content-title">加油站</div>
              <MarkBlock module="打点" func="着陆页" action="加油站换一换" className="more" onClick={() => this.shuffleArticles()}>
                换一换&nbsp;&nbsp;
                <FontAwesome name="refresh"/>
              </MarkBlock>
            </div>
            {articlesFlows.slice(0, 3).map((article, index) => <ArticleHome data={article} key={index}/>)}
          </div>
          {/*-----   圈柚会模块  -----*/}
          <div className="content-box" id="QWClassmate">
            <div className="content-header">
              <div className="content-title">圈柚会</div>
              {
                activitiesFlows.length > 3 &&
                <MarkBlock module="打点"
                           func="着陆页"
                           action="圈柚会更多"
                           className="more"
                           onClick={() => this.context.router.push('/rise/static/home/activities')}>
                  更多&nbsp;&nbsp;
                  <FontAwesome name="angle-right"/>
                </MarkBlock>
              }
            </div>
            {activitiesFlows.slice(0, 3).map((activity, index) => <ActivityHome data={activity} key={index}/>)}
          </div>
        </div>
        <div className="bottom-text">我也是有底线的...</div>
        {/*-----   弹框模块  -----*/}
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
