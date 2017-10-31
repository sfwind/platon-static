import * as React from 'react';
import { connect } from "react-redux";
import { submitEva } from "./async"
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import { Dialog } from 'react-weui'
import AssetImg from '../../../components/AssetImg'
import './Result.less'

const { Alert } = Dialog

@connect(state => state)
export class Result extends React.Component<any,any> {
  constructor(props) {
    super(props)
    this.state = {
      initialScale: 0,
      backgroundPicWidth: 750,
      backgroundPicHeight: 1334,
      percent: 0,
      learnFreeLimit: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { score } = this.props.location.query
    const { dispatch } = this.props
    this.fit()
    dispatch(startLoad())
    submitEva(score).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        const { learnFreeLimit, result, suggestion, percent } = msg
        this.setState({ learnFreeLimit, result, suggestion, percent })
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(e => {
      dispatch(endLoad())
      dispatch(alertMsg(e))
    })
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
    const {
      initialScale, backgroundPicHeight, backgroundPicWidth, result, suggestion, percent
    } = this.state

    return (
      <div className="eva-result">
        <div className="head">
          <AssetImg url="https://static.iqycamp.com/images/eva_report_head4.png" height={119} width={302}/>
        </div>
        <div className="result">
          <AssetImg url="https://static.iqycamp.com/images/eva_result_hr_3.png" height={57} width={174} marginTop={-30}/>
          <div className="text-result">
            你的洞察力天赋打败了{percent}%的人！
          </div>
          <pre className="text">{result}</pre>
        </div>
        <div className="suggestion">
          <AssetImg url="https://static.iqycamp.com/images/action_suggest_hr_5.png" height={58} width={174} marginTop={-20}/>
          <pre className="text">{suggestion}</pre>
        </div>
      </div>
    )
  }
}
