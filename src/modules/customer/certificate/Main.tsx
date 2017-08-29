import * as React from "react"
import "./Main.less"
import { connect } from "react-redux"
import { getCertificate } from './async'
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import { ButtonArea, Button } from "react-weui"
import AssetImg from "../../../components/AssetImg"

@connect(state => state)
export default class Main extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {}
  }

  componentWillMount() {
    changeTitle("圈外证书");
    const { dispatch, location } = this.props
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

  render() {
    const { certificateNo, name, certificateBg, comment } = this.state
    return (
      <div className="certificate">
        <div className="certificate-container">
          <div className="upper">
            <img src={certificateBg} alt=""/>
            <div className="name">{name}</div>
            <div className="cong">{comment}</div>
            <div className="signature">
              <AssetImg url={'https://static.iqycamp.com/images/sign1_2.png'} alt=""/>
            </div>
            <div className="code">
              证书编号: {certificateNo}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
