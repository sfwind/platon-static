import * as React from "react";
import "./Tutorial.less"
import SwipeableViews from 'react-swipeable-views';

export default class Tutorial extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      bgList: ["http://www.iqycamp.com/images/fragment/rise_tutorial_1.png", "http://www.iqycamp.com/images/fragment/rise_tutorial_2.png",
        "http://www.iqycamp.com/images/fragment/rise_tutorial_3.png", "http://www.iqycamp.com/images/fragment/rise_tutorial_4.png",
        "http://www.iqycamp.com/images/fragment/rise_tutorial_5.png", "http://www.iqycamp.com/images/fragment/rise_tutorial_6.png",
        "http://www.iqycamp.com/images/fragment/rise_tutorial_7.png"],
      index: 0,
      onShowEnd: props.onShowEnd || function () {
        console.log('显示完成')
      },
      close:false
    }
  }


  componentWillMount() {

  }

  next() {
    const {index, bgList} = this.state;
    if (index >= bgList.length - 1) {
      console.log('over');
      this.state.onShowEnd();
    } else {
      console.log(index + 1)
      this.setState({index: index + 1});
    }

  }


  onSwitching(index,type){
    console.log("switching",index,type);
    const {bgList,onShowEnd,close} = this.state;
    switch(type){
      case 'end':{
        if(index===bgList.length-1 && close){
          onShowEnd();
        } else {
          this.setState({index:index,close:false});
        }
        break;
      }
      case 'move':{
        if(index>bgList.length-1){
          this.setState({close:true});
        }
        break;
      }
      default: console.log(index,type);
    }

  }

  render() {
    const {index, bgList} = this.state;

    return (
      this.props.show?<div className="mask" style={{backgroundColor: 'rgba(0, 0, 0, 0.8)',position:'fixed'}}>

      <div className="tutorial" onClick={()=>this.next()}>
        <SwipeableViews style={{height:'100%',width:'100%'}} containerStyle={{height:'100%',width:'100%'}}
                        index={index} onSwitching={(index,type)=>this.onSwitching(index,type)} resistance={true}>
          {this.state.bgList.map((item, seq) => {
            return (<div className="item">
              <img key={seq} src={item}/>
            </div>)
          })}
        </SwipeableViews>
        {<div className="sequence-dot">
          {this.state.bgList.map((item, seq) => {
            return (<button className="dot-box">
              <div className="dot"
                   style={{backgroundColor:`${index==seq?'rgb(49, 159, 214)':'rgb(228, 230, 231)'}`}}></div>
            </button>)
          })}
        </div>}
      </div>
      </div>:null
    )
  }
}
