import React, { Component } from 'react';
import {merge} from 'lodash';
import Scrollbar from 'smooth-scrollbar';
import 'smooth-scrollbar/dist/smooth-scrollbar.css'
import './ScrollBar.less'

export default class ScrollBar extends Component {
  constructor(props){
    super(props);
  }

  componentDidUpdate( prevProps,  prevState){
    if(!prevProps.children && this.props.children){
      Scrollbar.init(this.refs.scroller);
    }
  }




  render(){
    return (
      <div ref="scroller" {...this.props}>
        {this.props.children}
      </div>
    )
  }
}
