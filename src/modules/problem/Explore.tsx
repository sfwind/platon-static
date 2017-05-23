import * as React from 'react';
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { connect } from 'react-redux';
import { ToolBar } from '../base/ToolBar';
import SwipeableViews from 'react-swipeable-views';
import Banner from '../../components/Banner';
import { loadUnChooseList } from './async';
import {changeTitle} from '../../utils/helpers'
import { merge } from 'lodash'

import './Explore.less';
import AssetImg from "../../components/AssetImg";

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
    changeTitle('发现')
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadUnChooseList().then(res => {
      dispatch(endLoad());
      if(res.code === 200){
        console.log(res.msg)
        this.setState({catalogList:res.msg.catalogList},()=>{
          for(let i=0;i<res.msg.catalogList.length; i++){
            let id = `#catalog${i}`;
            let bar = `#catalogbar${i}`;
            var swiper = new Swiper(id, {
              scrollbar: bar,
              scrollbarHide: true,
              slidesPerView: 'auto',
              centeredSlides: false,
              spaceBetween: 0,
              grabCursor: true
            });
          }

        });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex=>{
      dispatch(endLoad());
      dispatch(alertMsg(ex));
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
            <div className="banner-item swiper-slide" onClick={()=>this.goBanner(1)}>
              <AssetImg url={'https://www.iqycamp.com/images/problem_explore_banner_1.png'} style={{width:'auto',height:'100%'}}/>
            </div>
            <div className="banner-item swiper-slide" onClick={()=>this.goBanner(2)}>
              <AssetImg url={'https://www.iqycamp.com/images/problem_explore_banner_2.png'} style={{width:'auto',height:'100%'}}/>
            </div>
            <div className="banner-item swiper-slide" onClick={()=>this.goBanner(3)}>
              <AssetImg url={'https://www.iqycamp.com/images/problem_explore_banner_3.png'} style={{width:'auto',height:'100%'}}/>
            </div>
            <div className="banner-item swiper-slide" onClick={()=>this.goBanner(4)}>
              <AssetImg url={'https://www.iqycamp.com/images/problem_explore_banner_4.png'} style={{width:'auto',height:'100%'}}/>
            </div>
          </Banner>
          <div className="problem-catalog-list">
            {console.log(catalogList)}
            {catalogList ? catalogList.map((catalog, key) => {
              return (
                <div className="problem-catalog">
                  <div className="header">
                    <span className="catalog-name">{catalog.name}</span>
                    <span className="catalog-more" onClick={()=>this.openMore(catalog)}>更多</span>
                  </div>
                  <div className="problem-box swiper-container" id={`catalog${key}`}>
                    <div className="swiper-wrapper">
                      {catalog.problemList ? catalog.problemList.map((problem, key) => {
                        return (
                          <div onClick={()=>this.clickProblem(problem)} style={{width:`${this.picWidth}px`}}
                               className="problem-item-show swiper-slide">
                            <div className="img" style={{width:`${this.picWidth}px`,height:`${this.picHeight}px`}}>
                              <AssetImg url="https://www.iqycamp.com/images/fragment/problem_new_icon_02.png"
                                        style={{zIndex: 1, left: 0, top: 0}}/>
                              <AssetImg url={`${problem.pic}`} style={{width:'auto',height:'100%'}}/>
                            </div>
                            <span>{problem.problem}</span>
                          </div>
                        )
                      }) : null}
                    </div>
                    <div className="swiper-scrollbar" id={`catalogbar${key}`}></div>
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
