import * as React from "react";

export default class CanvasTest extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      imgUrl: ''
    }
  }

  componentDidMount() {
    let data = `<svg xmlns="http://www.w3.org/2000/svg" width="500" height="500">
                 <foreignObject width="500px" height="500px">
                   <div xmlns="http://www.w3.org/1999/xhtml">
                     <h3>Hello</h3>
                     <img src="https://www.iqycamp.com/images/problem1_4.jpg?slimimage"/>
                   </div>
                 </foreignObject>
               </svg>`
    let imageBase = 'data:image/svg+xml;base64,' + window.btoa(unescape(encodeURIComponent(data)))
    this.setState({ imgUrl: imageBase })
    console.log(imageBase)
  }

  handleClickSaveCanvas() {
    let image = new Image();
    image.src = this.state.imgUrl
    let canvas = document.createElement('canvas');  //准备空画布
    canvas.width = 1000;
    canvas.height = 1000;
    let context = canvas.getContext('2d');  //取得画布的2d绘图上下文
    image.onload = function() {
      context.drawImage(image, 0, 0);
      let a = document.createElement('a');
      a.href = canvas.toDataURL('image/jpeg');  //将画布内的信息导出为png图片数据
      a.download = "propagation-img";  //设定下载名称
      a.click(); //点击触发下载
    }

  }

  render() {

    return (
      <div>
        <div id="test">
          <h3>Hello</h3>
          <img src="https://www.iqycamp.com/images/problem1_4.jpg?slimimage"/>
        </div>
        <canvas id="canvas" style="border:2px solid black;"/>
        <button onClick={this.handleClickSaveCanvas.bind(this)}>点击我保存</button>
      </div>
    )
  }

}
