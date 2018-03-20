import * as React from 'react'
import './LandingPage.less'
import { ProblemHome } from './components/problem/ProblemHome'
import { LiveHome } from './components/live/LiveHome'
import { ArticleHome } from './components/article/ArticleHome'
import { ActivityHome } from './components/activity/ActivityHome'
import { ColumnSpan } from '../../components/ColumnSpan'
import { changeTitle } from '../../utils/helpers'
import * as FontAwesome from 'react-fontawesome'
import Banner from '../../components/Banner'
import { loadLandingPageData } from './async'

export default class LandingPage extends React.Component {

  constructor () {
    super()
    this.state = {
      data: {},
      demo: 'init demo',
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  async componentWillMount () {
    changeTitle('圈外同学')
    let res = await loadLandingPageData()
    console.log(res)
    if (res.code === 200) {
      this.setState({
        data: res.msg,
      })
    }
  }

  render () {
    const {
      problemsFlows = [],
      livesFlows = [],
      articlesFlows = [],
      activitiesFlows = [],
    } = this.state.data

    return (
      <div className="landing-page-container">
        <div className="header">
          <div className="message" onClick={() => alert('you click the message center')}>首页消息中心</div>
          <div className="consult" onClick={() => alert('you click the consult button')}>首页入学咨询</div>
        </div>
        <div className="home-swiper">
          <Banner height='16rem'>
            <img width='100%'
                 height='16rem'
                 className="banner-item swiper-slide"
                 src="https://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ayic3SEaztBgIHFjfNZCFnvibW7bURBmYJIwUIpyice6aELS6zATiaepeeu1lMaggayc9Wpboj9nSZ5Nib/132"/>
            <img width='100%'
                 height='16rem'
                 className="banner-item swiper-slide"
                 src="https://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ayic3SEaztBgIHFjfNZCFnvibW7bURBmYJIwUIpyice6aELS6zATiaepeeu1lMaggayc9Wpboj9nSZ5Nib/132"/>
            <img width='100%'
                 height='16rem'
                 className="banner-item swiper-slide"
                 src="https://wx.qlogo.cn/mmopen/siaKjia9aBPcJHOCEV6z4Ayic3SEaztBgIHFjfNZCFnvibW7bURBmYJIwUIpyice6aELS6zATiaepeeu1lMaggayc9Wpboj9nSZ5Nib/132"/>
          </Banner>
        </div>
        <ColumnSpan height="10" style={{ margin: '0 -2rem' }}/>
        <div className="business-apply" onClick={() => this.context.router.push('/pay/rise')}></div>
        <div className="content-box">
          <div className="content-header">
            <div className="content-title">圈外课</div>
          </div>
          {problemsFlows.map((problem, index) => <ProblemHome data={problem} key={index}/>)}
        </div>
        <div className="content-box">
          <div className="content-header">
            <div className="content-title">拓眼界</div>
            <div className="more" onClick={() => this.context.router.push('/rise/static/home/lives')}>
              更多&nbsp;&nbsp;
              <FontAwesome name="angle-right"/>
            </div>
          </div>
          {livesFlows.map((live, index) => <LiveHome data={live} key={index}/>)}
        </div>
        <div className="content-box">
          <div className="content-header">
            <div className="content-title">加油站</div>
            <div className="more" onClick={() => alert('you click the refresh button')}>
              换一换&nbsp;&nbsp;
              <FontAwesome name="refresh"/>
            </div>
          </div>
          {articlesFlows.map((article, index) => <ArticleHome data={article} key={index}/>)}
        </div>
        <div className="content-box">
          <div className="content-header">
            <div className="content-title">圈柚会</div>
            <div className="more" onClick={() => this.context.router.push('/rise/static/home/activities')}>
              更多&nbsp;&nbsp;
              <FontAwesome name="angle-right"/>
            </div>
          </div>
          {activitiesFlows.map((activity, index) => <ActivityHome data={activity} key={index}/>)}
        </div>
        <div className="bottom-text">我也是有底线的...</div>
      </div>
    )
  }

}
