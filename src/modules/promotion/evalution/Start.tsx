import * as React from 'react';
import { connect } from "react-redux";
import { initEva } from "./async"

@connect(state => state)
export class Start extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.state = {
      initialScale: 0,
      backgroundPicWidth: 750,
      backgroundPicHeight: 1334,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    this.fit()
    initEva()
  }

  fit() {
    let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    let pageHeight = this.state.backgroundPicHeight
    let pageWidth = this.state.backgroundPicWidth

    let initialScale = 0
    if(pageWidth / pageHeight > windowWidth / windowHeight) {
      initialScale = windowHeight / pageHeight
    } else {
      initialScale = windowWidth / pageWidth
    }

    this.setState({ initialScale })
  }

  render() {
    const { initialScale, backgroundPicHeight, backgroundPicWidth } = this.state
    return (
      <div className="eva-start" style={{width:backgroundPicWidth, height:backgroundPicHeight, transform: `scale(${initialScale})`,
         WebkitTransform: `scale(${initialScale})`, transformOrigin: '50% 0 0', WebkitTransformOrigin: '50% 0 0',
         marginLeft: (window.innerWidth - backgroundPicWidth) / 2,
         background: `url('https://static.iqycamp.com/images/evalution_start6.png?imageslim')` }}>
        <div className="click-start" style={{height: 97, width: 402, position: 'absolute', top: '945', left: '174'}}
             onClick={()=>this.context.router.push('/rise/static/eva')}/>
      </div>
    )
  }
}
