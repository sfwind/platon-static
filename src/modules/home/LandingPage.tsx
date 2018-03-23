import * as React from 'react'
import './LandingPage.less'
import { ProblemHome } from './components/problem/ProblemHome'
import { LiveHome } from './components/live/LiveHome'
import { ArticleHome } from './components/article/ArticleHome'
import { ActivityHome } from './components/activity/ActivityHome'
import { ColumnSpan } from '../../components/ColumnSpan'
import { changeTitle, lockWindow, unlockWindow } from '../../utils/helpers'
import * as FontAwesome from 'react-fontawesome'
import Banner from '../../components/Banner'
import { loadLandingPageData, loadShuffleArticles } from './async'
import { SubscribeAlert } from './components/subscribe/SubscribeAlert'
import AssetImg from '../../components/AssetImg'
import { ToolBar } from '../base/ToolBar'
import { ToolBarNoConnect } from '../base/ToolBarNoConnect'
import { mark } from '../../utils/request'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from 'reduxutil/actions'

@connect(state => state)
export default class LandingPage extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  async componentWillMount () {
    changeTitle('圈外同学')
    mark({ module: '打点', function: '着陆页', action: '打开着陆页' })
    const { dispatch } = this.props
    dispatch(startLoad())
    let res = await loadLandingPageData()
    dispatch(endLoad())
    if (res.code === 200) {
      this.setState({
        data: res.msg,
      })
    } else {
      dispatch(alertMsg(res.msg))
    }
  }

  handleClickImageBanner (banner) {
    if (banner.linkUrl.indexOf('http') >= 0) {
      window.location.href = banner.linkUrl
    } else {
      this.context.router.push(banner.linkUrl)
    }
  }

  shuffleArticles () {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadShuffleArticles().then(res => {
      dispatch(endLoad())
      if (res.code === 200) {
        let data = this.state.data
        data.articlesFlows = res.msg
        this.setState({
          data: data,
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(er => {
      dispatch(endLoad())
      dispatch(alertMsg(er))
    })
  }

  render () {
    const {
      notify = false,
      isBusinessMember = true,
      pageBanners = [],
      problemsFlows = [],
      livesFlows = [],
      articlesFlows = [],
      activitiesFlows = [],
    } = this.state.data

    return (
      <div className="landing-page-container">
        <div className="header">
          <div className="left-header-box" onClick={() => this.context.router.push('/rise/static/message/center')}>
            <AssetImg className="message" url="https://static.iqycamp.com/icon_message@2x-8rkrc4h9.png"/>
            {notify && <div className="notify"></div>}
          </div>
          <div className="right-header-box" onClick={() => {
            _MEIQIA('showPanel')
          }}>
            <span>入学咨询&nbsp;</span>
            <AssetImg className="consult-icon" url="https://static.iqycamp.com/icon_goutong @2x-8ww0p3at.png"/>
          </div>
        </div>
        <div className="home-swiper">
          {
            pageBanners.length > 0 &&
            <Banner height='16rem'>
              {pageBanners.map((banner, index) =>
                <img key={index}
                     src={banner.imageUrl}
                     onClick={() => this.handleClickImageBanner(banner)}
                     className="banner-item swiper-slide swiper-image"/>,
              )}
            </Banner>
          }
        </div>
        <ColumnSpan height="10" style={{ margin: '0 -2rem' }}/>
        {
          !isBusinessMember &&
          <div className="business-apply" onClick={() => window.location.href = `/pay/rise`}></div>
        }
        <div className="content-box" style={{ marginTop: '2rem' }}>
          <div className="content-header">
            <div className="content-title">圈外课</div>
          </div>
          {problemsFlows.map((problem, index) => {
            return <ProblemHome data={problem} key={index} subscribeFunc={() => this.subscribeProblem()}/>
          })}
        </div>
        <div className="content-box">
          <div className="content-header">
            <div className="content-title">拓眼界</div>
            {
              livesFlows.length > 3 &&
              <div className="more" onClick={() => this.context.router.push('/rise/static/home/lives')}>
                更多&nbsp;&nbsp;
                <FontAwesome name="angle-right"/>
              </div>
            }
          </div>
          {livesFlows.map((live, index) => <LiveHome data={live} key={index}/>)}
        </div>
        <div className="content-box">
          <div className="content-header">
            <div className="content-title">加油站</div>
            <div className="more" onClick={() => this.shuffleArticles()}>
              换一换&nbsp;&nbsp;
              <FontAwesome name="refresh"/>
            </div>
          </div>
          {articlesFlows.map((article, index) => <ArticleHome data={article} key={index}/>)}
        </div>
        <div className="content-box">
          <div className="content-header">
            <div className="content-title">圈柚会</div>
            {
              activitiesFlows.length > 3 &&
              <div className="more" onClick={() => this.context.router.push('/rise/static/home/activities')}>
                更多&nbsp;&nbsp;
                <FontAwesome name="angle-right"/>
              </div>
            }
          </div>
          {activitiesFlows.map((activity, index) => <ActivityHome data={activity} key={index}/>)}
        </div>
        <div className="bottom-text">我也是有底线的...</div>
        <ToolBar/>
      </div>
    )
  }

}
