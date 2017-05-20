import * as React from 'react';
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { connect } from 'react-redux';
import { ToolBar } from '../base/ToolBar';
import SwipeableViews from 'react-swipeable-views';
import Banner from '../../components/Banner';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
import { loadUnChooseList } from './async';
import { merge } from 'lodash'

import './Explore.less';

@connect(state=>state)
export class Explore extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {

    }

    this.bannerWidth = window.innerWidth;
    this.bannerHeight = 175/375 * this.bannerWidth;

    this.picWidth = (window.innerWidth - 15 - 10 -10) / 2.5;
    this.picHeight = (80 / 130) * this.picWidth;
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadUnChooseList().then(res => {
      dispatch(endLoad());
      if(res.code === 200){
        this.setState({catalogList:res.msg.catalogList});
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(res.msg));
    })

  }

  componentDidMount(){

  }

  clickProblem(problem){
    let param = {
      id: problem.id
    }
    if(this.props.location.query.show){
      merge(param,{show:true});
    }
    this.context.router.push({pathname: '/rise/static/problem/view', query: param});
  }


  openMore(catalog){
    let param = {catalogId:catalog.catalogId}
    if(this.props.location.query.show){
      merge(param,{show:true});
    }
    this.context.router.push({pathname:'/rise/static/problem/more',query:param});
  }
  goBanner(id){
    this.context.router.push({pathname:'/rise/static/problem/package',query:{showId:id}});
  }
  render(){
    const { catalogList } = this.state;
    return (
      <div>
        <div className="explore-container">
          <Banner height={this.bannerHeight}>
            <div className="banner-item" onClick={()=>this.goBanner(1)}
                 style={{backgroundImage:`url('https://www.iqycamp.com/images/problem_explore_banner_1.png'`}}>
            </div>
            <div className="banner-item" onClick={()=>this.goBanner(2)}
                 style={{backgroundImage:`url('https://www.iqycamp.com/images/problem_explore_banner_2.png'`}}>
            </div>
            <div className="banner-item" onClick={()=>this.goBanner(3)}
                 style={{backgroundImage:`url('https://www.iqycamp.com/images/problem_explore_banner_3.png'`}}>

            </div>
            <div className="banner-item" onClick={()=>this.goBanner(4)}
                 style={{backgroundImage:`url('https://www.iqycamp.com/images/problem_explore_banner_4.png'`}}>
            </div>
          </Banner>
          <div className="problem-catalog-list">
            {catalogList ? catalogList.map((catalog, key) => {
              return (
                <div className="problem-catalog">
                  <div className="header">
                    <span className="catalog-name">{catalog.name}</span>
                    <span className="catalog-more" onClick={()=>this.openMore(catalog)}>更多</span>
                  </div>
                  <div className="problem-box">
                    <div style={{height:'auto',width:`${this.picWidth*(catalog.problemList?catalog.problemList.length + 1:0)}px`}}>
                    {catalog.problemList ? catalog.problemList.map((problem, key) => {
                      return (
                        <div onClick={()=>this.clickProblem(problem)} style={{width:`${this.picWidth}px`}} className="problem-item-show">
                          <div className="img" style={{backgroundImage:`url(${problem.pic})`,width:`${this.picWidth}px`,height:`${this.picHeight}px`}}>
                          </div>
                          <span>{problem.problem}</span>
                        </div>
                      )
                    }) : null}
                    </div>
                  </div>
                </div>
              )
            }) : null}

          </div>
        </div>
        <div className="padding-footer"></div>
        <ToolBar/>
      </div>
    )
  }
}
