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

    this.problemWidth = window.innerWidth / 2.4;
    this.problemHeight = 115/130 * this.problemWidth;
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
        console.log(res.msg.catalogList);
        this.setState({catalogList:res.msg.catalogList},()=>{
          let sliders = [];
          for(let i=0; i<res.msg.catalogList.length; i++){
            var mySwiper = new Swiper (`#slide${i}`, {
              // Optional parameters
              slidesPerView: 'auto',
              spaceBetween: 10,
              freeMode: true,
            })
          }

        });
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
  render(){
    const { catalogList } = this.state;
    return (
      <div className="explore-container">
        <Banner height="200px">
          <div className="banner-item" style={{backgroundColor:`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)}`}}>1</div>
          <div className="banner-item" style={{backgroundColor:`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)}`}}>2</div>
          <div className="banner-item" style={{backgroundColor:`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)}`}}>3</div>
          <div className="banner-item" style={{backgroundColor:`rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)}`}}>4</div>
        </Banner>
        <div className="problem-catalog-list">
          {catalogList?catalogList.map((catalog,key)=>{
            return (
              <div className="problem-catalog">
                <div className="header">
                  <span className="catalog-name">{catalog.name}</span>
                  <span className="catalog-more" onClick={()=>this.openMore(catalog)}>更多</span>
                </div>
                <div id={`slide${key}`}  className="swiper-container">
                  <div className="swiper-wrapper">
                  {catalog.problemList?catalog.problemList.map((problem,key)=>{
                    return (
                      <div onClick={()=>this.clickProblem(problem)} className="problem-item swiper-slide" style={{width:`${this.problemWidth}px`,height:`${this.problemHeight}px`}}>
                        <div className="img"  style={{backgroundImage:`url(${problem.pic})`}}>
                        </div>
                        <span>{problem.problem}</span>
                      </div>
                    )
                  }):null}
                  </div>
                </div>
              </div>
            )
          }):null}

        </div>

        <ToolBar/>
      </div>
    )
  }
}
