import * as React from 'react'
import { merge, isFunction } from 'lodash'

export default class AssetImg extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      loading: true
    }
  }

  render() {
    const { size, type, width, height, marginTop, marginBottom, marginLeft, style, marginRight } = this.props
    let { url } = this.props
    //来自七牛云的图片，自动添加瘦身参数
    if(url) {
      if(url.indexOf('static.iqycamp.com') != -1 && url.indexOf('imageslim') != -1) {
        url = url + '?imageslim'
      }
    }
    const { loading } = this.state
    const _style = {
      width: size || width,
      height: size || height,
      marginTop: marginTop,
      marginRight: marginRight,
      marginBottom: marginBottom,
      marginLeft: marginLeft
    }

    return (
      <img className={`${loading ? 'loading' : 'assetImg'}`}
           src={type ? require(`../../assets/img/${type}.png`) : url}
           onLoad={() => this.setState({ loading: false })}
           style={merge(_style, style)}
           {...this.props}
      />
    )
  }
}
