import * as React from 'react';
import { startLoad, endLoad, alertMsg } from "redux/actions";
import { connect } from 'react-redux';
import { ToolBar } from '../base/ToolBar';
import SwipeableViews from 'react-swipeable-views';
import Banner from '../../components/Banner';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css'
import { loadUnChooseList } from './async';

import './Explore.less';

@connect(state=>state)
export class Explore extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {

    }

    this.problemWidth = window.innerWidth / 2.4;
    this.problemHeight = 90/150 * this.problemWidth;
  }

  componentWillMount(){
    const { dispatch } = this.props;
    dispatch(startLoad());
    loadUnChooseList().then(res => {
      dispatch(endLoad());
      if(res.code === 200){
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

  render(){
    const { catalogList } = this.state;

    return (
      <div className="explore-container">
        <Banner height="200px">
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </Banner>
        <div className="problem-catalog-list">
          {catalogList?catalogList.map((catalog,key)=>{
            return (
              <div className="problem-catalog">
                <div className="header">
                  <span className="catalog-name">{catalog.name}</span>
                  <span className="catalog-more">更多</span>
                </div>
                <div id={`slide${key}`}  className="swiper-container">
                  <div className="swiper-wrapper">
                  {catalog.problemList?catalog.problemList.map((problem,key)=>{
                    return (
                      <div className="problem-item swiper-slide" >
                        <div className="img">
                          <img src={problem.pic}/>
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
