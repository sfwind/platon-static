import * as React from "react";
import { merge } from "lodash";

export default class AssetImg extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      loading:true
    }

  }

  render() {
    const { size, type, url, width, height, marginTop, style, marginRight } = this.props
    const { loading } = this.state;
    const _style = {
      width: size || width,
      height: size || height,
      marginTop: marginTop,
      marginRight: marginRight,
    }

    return (
      <img className={`${loading?'loading':''}`} src={type ? require(`../../assets/img/${type}.png`) : url} onLoad={()=>this.setState({loading:false})} style={merge(_style, style)}/>
    )
  }
}
