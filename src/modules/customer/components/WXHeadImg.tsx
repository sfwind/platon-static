import * as React from 'react'


export default class WXHeadImg extends React.Component<any,any>{

  constructor(props){
    super(props)
  }

  componentDidMount(){
      let img = this.refs.img;
      img.src = this.props.src;

     img.setAttribute('scrossOrigin', 'Anonymous');
     img.onload = () => {
       console.log("onLoad");
       let canvas = document.createElement('canvas');
       canvas.width = 100;
       canvas.height = 100;

       let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

       let dataURL = canvas.toDataURL('image/png');
       console.log(dataURL)
     };


    const hash = crypto.createHash('md5');

    // 可任意多次调用update():
    hash.update('Hello, world!');
    hash.update('Hello, nodejs!');

    console.log(hash.digest('hex'));


  }


  render(){
    return(
      <div>
        <img ref="img"/>
      </div>
    )
  }

}
