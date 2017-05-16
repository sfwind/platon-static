import * as React from 'react';
import './Swiper.less';
import Swipe from './Swipe.js';
import { isFunction,merge } from 'lodash';


export default class Swiper extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {
      slider:null,
    }

  }

  slide(index){
    const {slider} = this.state;
    slider.slide(index,this.props.speed?this.props.speed:400);
  }

  componentDidMount(){
    let mySwipe = new Swipe(document.getElementById('slider'), {
      startSlide: this.props.startIndex,
      speed: 400,
      auto: 0,
      continuous: false,
      disableScroll: false,
      stopPropagation: true,
      callback: (index, elem) => {
        if(isFunction(this.props.onChangeIndex)){
          this.props.onChangeIndex(index,elem);
        }
      },
      transitionEnd:(index,elem) => {
      }
    });

    this.setState({slider:mySwipe});
  }

  componentDidUpdate(preProps,preState){
    // if(preProps.index !== this.props.index){
    //   // 在外面修改了index，在里面修改
    //   if(isFunction(this.props.onChangeIndex)){
    //
    //     this.props.onChangeIndex();
    //   }
    // }

  }

  render(){
    let styles = merge({},this.props.style);

    return (
      <div id={`${this.props.sliderId ? this.props.sliderId: 'slider'}`} style={styles} className='swipe'>
        <div className='swipe-wrap'>
          {this.props.children}
        </div>
      </div>
    )
  }
}
