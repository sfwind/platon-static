import * as React from "react";
import { merge } from "lodash";

export default class AssetImg extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  render() {
    const { size, type, url, width, height, marginTop, style, marginRight } = this.props

    const _style = {
      width: size || width,
      height: size || height,
      marginTop: marginTop,
      marginRight: marginRight,
    }

    return (
      <img src={type ? require(`../../assets/img/${type}.png`) : url} style={merge(_style, style)}/>
    )
  }
}
