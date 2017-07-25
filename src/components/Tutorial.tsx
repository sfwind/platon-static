import * as React from "react";
import "./Tutorial.less"
import SwipeableViews from 'react-swipeable-views';

export default class Tutorial extends React.Component<any,any> {
  constructor(props) {
    super(props);
    this.state = {
      bgList: props.bgList,//图片列表
      topList:props.topList, //图片离顶部的距离
      bottomList:props.bottomList, //图片离底部的距离
      index: 0,
      onShowEnd: props.onShowEnd || function () {
      },
      close:false,
    }
  }


  componentWillMount() {

  }

  next() {
    const {index, bgList} = this.state;
    if (index >= bgList.length - 1) {
      this.state.onShowEnd();
    } else {
      this.setState({index: index + 1});
    }

  }


  onSwitching(index,type){
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
    const {index, bgList, topList, bottomList} = this.state;

    const renderTutorialImage = (item, seq) =>{
      if(topList && topList[seq]){
        let top = topList[seq];
        return (
            <div className="item" style={{top, height:window.innerHeight, position:'relative'}}>
              <img key={seq} src={item}/>
            </div>
        )

      }else if(bottomList && bottomList[seq]){
        let bottom = bottomList[seq];
        return (
            <div className="item" style={{top:0, height:window.innerHeight-bottom, position:'relative'}}>
              <img key={seq} src={item} style={{position:'absolute', bottom:0}}/>
            </div>
        )
      }else{
        return (<div className="item" style={{height:window.innerHeight}}>
          <img key={seq} src={item}/>
        </div>)
      }

    }

    return (
      this.props.show?<div className="tutorial-mask" style={{position:'fixed',top:0,left:0}}>

      <div className="tutorial" onClick={()=>this.next()}>
        <SwipeableViews style={{width:'100%'}} slideStyle={{width:"100%"}} containerStyle={{width:'100%'}}
                        index={index} onSwitching={(index,type)=>this.onSwitching(index,type)} resistance={true}>
          {bgList.map((item, seq) => {
            return renderTutorialImage(item, seq);
          })}
        </SwipeableViews>
      </div>
      </div>:null
    )
  }
}
