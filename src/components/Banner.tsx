import * as React from 'react';
import Swiper from 'swiper';


export default class Banner extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      index:0
    }
  }

  componentDidMount(){
    var swiper = new Swiper('#swiepr-banner', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: 2500,
      autoplayDisableOnInteraction: false
    });
  }

  render(){
    const { index } = this.state;
    return (<div>
      <div className="swiper-container" id="swiepr-banner" style={{height:`${this.props.height}px`}}>
        <div className="swiper-wrapper">
          {this.props.children}
        </div>
        <div className="swiper-pagination"></div>
      </div>
    </div>)
  }
}
