import * as React from 'react'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'
import { ToolBar } from '../base/ToolBar'
import Banner from '../../components/Banner'
import { loadUnChooseList, mark } from './async'
import { changeTitle } from '../../utils/helpers'
import Swiper from 'swiper'
import { merge } from 'lodash'

import './Explore.less'
import AssetImg from '../../components/AssetImg'

@connect(state => state)
export class Explore extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {}

    this.bannerWidth = window.innerWidth
    this.bannerHeight = 175 / 375 * this.bannerWidth

    this.picWidth = (window.innerWidth - 15 - 10 - 10) / 2.5
    this.picHeight = (80 / 130) * this.picWidth
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    changeTitle('发现')
    const { dispatch } = this.props
    mark({ module: '打点', function: '发现', action: '打开发现页面' })
    dispatch(startLoad())
    loadUnChooseList().then(res => {
      console.log(res)
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ catalogList: res.msg.catalogList, hotList: res.msg.hotList, banners: res.msg.banners }, () => {
          for(let i = 0; i < res.msg.catalogList.length; i++) {
            let id = `#catalog${i}`
            let bar = `#catalogbar${i}`
            var swiper = new Swiper(id, {
              scrollbar: bar,
              scrollbarHide: true,
              slidesPerView: 'auto',
              centeredSlides: false,
              spaceBetween: 0,
              grabCursor: true
            })
          }
          var swiper = new Swiper('#hot', {
            scrollbar: '#hotbar',
            scrollbarHide: true,
            slidesPerView: 'auto',
            centeredSlides: false,
            spaceBetween: 0,
            grabCursor: true
          })
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  clickProblem(problem) {
    let param = {
      id: problem.id
    }
    if(this.props.location.query.show) {
      merge(param, { show: true })
    }
    this.context.router.push({ pathname: '/rise/static/plan/view', query: param })
  }

  openMore(catalog) {
    let param = { catalogId: catalog.catalogId }
    if(this.props.location.query.show) {
      merge(param, { show: true })
    }
    this.context.router.push({ pathname: '/rise/static/problem/more', query: param })
  }

  goBanner(id) {
    this.context.router.push({ pathname: '/rise/static/problem/package', query: { showId: id } })
  }

  render() {
    const { catalogList, hotList, banners = [] } = this.state
    if(banners.length === 0) return <div/>
    console.log(banners)

    const renderBanners = () => {
      if(banners.length === 0) return
      return (
        <Banner height={this.bannerHeight}>
          {
            banners.map((banner, index) => {
              return (
                <div className="banner-item swiper-slide" key={index}
                     onClick={() => this.context.router.push(banner.linkUrl) }>
                  <img style={{ width: 'auto', height: '100%' }}
                       src={banner.imageUrl}/>
                </div>
              )
            })
          }
        </Banner>
      )
    }

    return (
      <div>
        <div className="explore-container">
          {renderBanners()}
          <div className="problem-catalog-list">
            <div className="problem-catalog">
              <div className="header">
                <span className="catalog-name hot">热门小课</span>
              </div>
              <div className="problem-box swiper-container" id="hot">
                <div className="swiper-wrapper">
                  {hotList ? hotList.map((problem, index) => {
                    return (
                      <div onClick={() => this.clickProblem(problem)} className="problem-item-show swiper-slide"
                           key={index}>
                        <div className="img">
                          { problem.newProblem ?
                            <AssetImg url="https://static.iqycamp.com/images/fragment/problem_new_icon_03.png"
                                      style={{ zIndex: 1, left: 0, top: 0 }} size={25}/> : null}
                          { problem.trial ?
                            <AssetImg url="https://static.iqycamp.com/images/fragment/problem_trial_icon_01.png"
                                      style={{ zIndex: 1, left: 6, top: 6 }} width={20}/> : null}
                          { problem.status === 2 ?
                            <div className="complete-problem">
                              <AssetImg type="success" size={12}
                                        style={{ margin: '0 3px', verticalAlign: 'middle' }}/>
                              <span className="complete-text">已完成</span>
                            </div> : null}
                          {/*<div className="complete-person">*/}
                          {/*<div className="icon-person"/>*/}
                          {/*<span className="completed-person-count">&nbsp;{problem.chosenPersonCount}</span>*/}
                          {/*</div>*/}
                          <div className={`problem-item-backcolor catalog${problem.catalogId}`}/>
                          <div className={`problem-item-backimg catalog${problem.catalogId}`}/>
                          <div className="problem-item-subCatalog">{problem.abbreviation}</div>
                        </div>
                        <span>{problem.problem}</span>
                      </div>
                    )
                  }) : null}
                </div>
                <div className="swiper-scrollbar" id="hotbar"/>
              </div>
            </div>
            {catalogList ? catalogList.map((catalog, key) => {
              return (
                <div className="problem-catalog">
                  <div className="header">
                    <span className="catalog-name">{catalog.name}</span>
                    <span className="catalog-more" onClick={() => this.openMore(catalog)}>更多</span>
                  </div>
                  <div className="problem-box swiper-container" id={`catalog${key}`}>
                    <div className="swiper-wrapper">
                      {catalog.problemList ? catalog.problemList.map((problem, key) => {
                        return (
                          <div onClick={() => this.clickProblem(problem)} className="problem-item-show swiper-slide">
                            <div className="img">
                              { problem.newProblem ?
                                <AssetImg url="https://static.iqycamp.com/images/fragment/problem_new_icon_03.png"
                                          style={{ zIndex: 1, left: 0, top: 0 }} size={25}/> : null
                              }
                              { problem.trial ?
                                <AssetImg url="https://static.iqycamp.com/images/fragment/problem_trial_icon_01.png"
                                          style={{ zIndex: 1, left: 6, top: 6 }} width={20}/> : null
                              }
                              { problem.status === 2 ?
                                <div className="complete-problem">
                                  <AssetImg type="success" size={12}
                                            style={{ margin: '0 3px', verticalAlign: 'middle' }}/>
                                  <span className="complete-text">已完成</span>
                                </div> : null
                              }
                              {/*<div className="complete-person">*/}
                              {/*<div className="icon-person"/>*/}
                              {/*<span className="completed-person-count">&nbsp;{problem.chosenPersonCount}</span>*/}
                              {/*</div>*/}
                              <div className={`problem-item-backcolor catalog${problem.catalogId}`}/>
                              <div className={`problem-item-backimg catalog${problem.catalogId}`}/>
                              <div className="problem-item-subCatalog">{problem.abbreviation}</div>
                            </div>
                            <span>{problem.problem}</span>
                          </div>
                        )
                      }) : null}
                    </div>
                    <div className="swiper-scrollbar" id={`catalogbar${key}`}/>
                  </div>
                </div>
              )
            }) : null}
          </div>
        </div>
        <div className="padding-footer"/>
        <ToolBar/>
      </div>
    )
  }
}
