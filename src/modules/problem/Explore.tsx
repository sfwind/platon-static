import * as React from 'react';
import { connect } from 'react-redux';
import { ToolBar } from '../base/ToolBar'
import Swiper from '../../components/Swiper'


export class Explore extends React.Component<any,any>{
  constructor(props){
    super(props);
    this.state = {

    }
  }

  componentDidMount(){
    window.mySwipe = Swipe(document.getElementById('slider'));
  }

  render(){
    return (
      <div className="explore-container">
        <Swiper/>
        <ToolBar/>
      </div>
    )
  }
}
