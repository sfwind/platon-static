import * as React from 'react'
import {connect} from 'react-redux'
import md5 from 'crypto-js/md5'
import { updateWXImg } from './async'


interface inputProps {
  src: string,
  memberId: string
}

@connect(state=>state)
export default class WXHeadImg extends React.Component<inputProps, any> {

  constructor(props) {
    super(props)
  }


  componentDidMount() {
     let expired_hash_value = this.props.expired_hash_value;
    let img = this.refs.img;

    img.setAttribute('crossOrigin', 'Anonymous');
    img.onload = () => {
      let canvas = document.createElement('canvas');
      canvas.width = 100;
      canvas.height = 100;

      let ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0);

      let dataUrl = canvas.toDataURL('image/png');
      let hash_value = md5(dataUrl);
      if(hash_value ==  expired_hash_value){
        updateWXImg(this.props.memberId);
      }
    };
    img.src = this.props.src.replace("https","http");
  }

  render() {
    return (
      <div>
        <img ref="img"/>
      </div>
    )
  }

}
