import * as React from 'react'
import { connect } from 'react-redux'
import md5 from 'crypto-js/md5'
import { updateWXImg } from './async'
import _ from 'lodash'

interface inputProps {
  src: string,
  riseId: string
}

@connect(state => state)
export default class WXHeadImg extends React.Component<inputProps, any> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    setTimeout( ()=>{
      let expired_hash_value = this.props.expired_hash_value
      let img = this.refs.img

      img.setAttribute('crossOrigin', 'Anonymous')
      img.onload = () => {
        let canvas = document.createElement('canvas')
        canvas.width = 100
        canvas.height = 100

        let ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)

        let dataUrl = canvas.toDataURL('image/png')
        let hash_value = md5(dataUrl)
        //判断两个对象的内容是否相等
        if(_.isEqual(expired_hash_value, hash_value)) {
          updateWXImg(this.props.riseId)
        }
      }
      img.src = this.props.src.replace('https', 'http')
    },300);
  }

  render() {
    return (
        <img ref="img" className={`${this.props.className ? this.props.className : ''}`}/>
    )
  }

}
