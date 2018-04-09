import * as React from 'react'
import Swiper from 'swiper'
import './Banner.less'

export default class Banner extends React.Component<any, any> {
  constructor (props) {
    super(props)
    this.state = {
      index: 0,
    }
  }

  componentDidMount () {
    var swiper = new Swiper('#swiepr-banner', {
      pagination: '.swiper-pagination',
      paginationClickable: true,
      spaceBetween: 0,
      centeredSlides: true,
      autoplay: 2500,
      loop: this.props.children.length && this.props.children.length > 1,
      autoplayDisableOnInteraction: false,
      paginationBulletRender: function (swiper, index, className) {
        return '<span class="banner-bullet ' + className + '"></span>'
      },
    })
  }

  render () {
    const { index } = this.state
    return (<div>
      <div id="swiepr-banner"
           className="swiper-container"
           style={{ height: `${this.props.height}` }}>
        <div className="swiper-wrapper">
          {this.props.children}
        </div>
        <div className="swiper-pagination"/>
      </div>
    </div>)
  }
}
