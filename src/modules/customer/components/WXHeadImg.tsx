import * as React from 'react'
import { updateWXImg } from './async'
import domtoimage from 'dom-to-image'

const crypto = require('crypto')

interface inputProps {
  src: string,
  memberId: string
}

export default class WXHeadImg extends React.Component<inputProps, any> {

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    let img = this.refs.img
    img.src = this.props.src

     img.setAttribute('crossOrigin', 'Anonymous');
     img.onload = () => {
       console.log("onLoad");
       let canvas = document.createElement('canvas');
       canvas.width = 100;
       canvas.height = 100;

      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      let dataUrl = canvas.toDataURL('image/png')
      const hash = crypto.createHash('mds')
      hash.update(dataUrl)
      let hash_value = hash.digest('hex')
      if(hash_value === '7c59fb4de5d93b8976bdf318ec3ee196') {
        updateWXImg(this.props.memberId)
      }
    }
  }

  render() {
    return (
      <div>
        <img ref="img"/>
      </div>
    )
  }

}
