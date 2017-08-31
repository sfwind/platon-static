import * as React from "react"
import "./Main.less"
import { connect } from "react-redux"
import { getCertificate } from './async'
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { ButtonArea, Button } from "react-weui"
import { changeTitle } from "utils/helpers"

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {
      initialScale: 0,
      backgroundPicWidth: 750,
      backgroundPicHeight: 1334,
    }
  }

  componentWillMount() {
    changeTitle("圈外证书");
    const { dispatch, location } = this.props
    this.fit()
    const { certificateNo } = location.query
    dispatch(startLoad())
    getCertificate(certificateNo).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState(res.msg)
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
      dispatch(alertMsg(err))
    })
  }

  fit() {
    // let windowHeight = window.innerHeight
    let windowWidth = window.innerWidth
    // let pageHeight = this.state.backgroundPicHeight
    let pageWidth = this.state.backgroundPicWidth

    let initialScale = windowWidth / pageWidth

    this.setState({ initialScale })
  }

  componentDidMount() {
    const { hiddenTab } = this.props;
    hiddenTab();
  }

  render() {
    const { initialScale, backgroundPicHeight, backgroundPicWidth,
      month, name, typeName, congratulation, problemName, certificateNo } = this.state
    return (
      <div className="certificate-container">
        <div className="certificate" style={{width:backgroundPicWidth, height:backgroundPicHeight, transform: `scale(${initialScale})`,
           WebkitTransform: `scale(${initialScale})` }}>
          <div className="certificate-description">
            <div className="description-text1">圈外同学 • {month}月小课训练营</div>
            <div className="description-text2">《{problemName}》</div>
          </div>
          <div className="certificate-name">
            {typeName}
          </div>
          <div className="name">
            {name}
          </div>
          <pre className="cong">
            {congratulation}
          </pre>
          <div className="certificate-number">
            证书编号：{certificateNo}
          </div>
        </div>
      </div>
    )
  }
}
