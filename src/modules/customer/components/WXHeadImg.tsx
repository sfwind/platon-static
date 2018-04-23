import * as React from 'react'
const crypto = require('crypto');


export default class WXHeadImg extends React.Component<any,any>{

  constructor(props){
    super(props)
  }

  componentDidMount(){
      let img = this.refs.img;
      img.src = this.props.src;

     img.setAttribute('scrossOrigin', 'Anonymous');
     img.onload = () => {
       let canvas = document.createElement('canvas');
       canvas.width = 100;
       canvas.height = 100;

       let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

       let dataURL = canvas.toDataURL('image/png');

       const hash = crypto.createHash('md5');

       // 可任意多次调用update():
       hash.update(dataURL);

       let hash_value =  hash.digest('hex');
       if(hash_value ==='7c59fb4de5d93b8976bdf318ec3ee196'){
         //TODO:发送更新
         console.log('暂时不能查看');
       }

     };
  }


  render(){
    return(
      <div>
        <img ref="img"/>
      </div>
    )
  }

}
