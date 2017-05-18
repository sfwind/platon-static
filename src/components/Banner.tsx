import * as React from 'react';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


export default class Banner extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      index:0
    }
  }

  render(){
    const { index } = this.state;
    return (
      <div style={{position:'relative',width:`${this.props.width?this.props.width:'100%'}`,height:`${this.props.height?this.props.height:'100%'}`}}>
        <AutoPlaySwipeableViews
          style={{height:'100%'}}
          containerStyle={{height:'100%'}}
          onChangeIndex={(index, indexLatest)=>this.setState({index:index})}
          onSwitching={(index, type)=>{console.log('onSwitching',index,type)}}
          onTransitionEnd={()=>console.log('onTransitionEnd')}
        >
          {this.props.children}
        </AutoPlaySwipeableViews>
        {<div className="sequence-dot" style={{marginLeft:`-${this.props.children.length * 18 / 2}px`}}>
          {this.props.children.length > 1 && this.props.children.map((item, seq) => {
            return (<button className="dot-box">
              <div className="dot"
                   style={{backgroundColor:`${index==seq?'rgb(49, 159, 214)':'rgb(228, 230, 231)'}`}}></div>
            </button>)
          })}
        </div>}
      </div>

    )
  }
}
