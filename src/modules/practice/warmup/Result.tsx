import * as React from "react";
import { connect } from "react-redux";
import "./Result.less";
import { loadKnowledgeIntro, loadWarmUpNext } from "./async";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";

@connect(state => state)
export class Result extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {}
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadKnowledgeIntro(location.query.kid).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if (code === 200)  this.setState({ data: msg })
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onSubmit() {
    this.context.router.push({ pathname: '/rise/static/practice/warmup/analysis', query: this.props.location.query })
  }

  nextTask() {
    const { dispatch } = this.props
    const { series, practicePlanId } = this.props.location.query
    this.context.router.push({
      pathname: '/rise/static/plan/main',
      query: {series}
    })
  }

  render() {
    const { rightNumber, point } = this.props.location.query
    const { data } = this.state
    const { knowledge } = data

    return (
      <div>
        <div className="container has-footer">
          <div className="warm-up-result">
            <div className="page-header">{knowledge}</div>
            <div className="intro-container">
              {/*<div className="context-img">*/}
                {/*<img src="http://www.iqycamp.com/images/fragment/practice_start.png" alt=""/>*/}
              {/*</div>*/}
              <div className="section">
                <div className="section-title">答对题数</div>
                <div className="count-circle">
                  <div className="context-img">
                    <div className="answer-pic">
                    {rightNumber==='3' ? <AssetImg width={375} height={210} url="http://www.iqycamp.com/images/answer3_3.png" />: null}
                    {rightNumber==='2' ? <AssetImg width={375} height={210} url="http://www.iqycamp.com/images/answer2_3.png" />: null}
                    {rightNumber==='1' ? <AssetImg width={375} height={210} url="http://www.iqycamp.com/images/answer1_3.png" />: null}
                    {rightNumber==='0' ? <AssetImg width={375} height={210} url="http://www.iqycamp.com/images/answer0_3.png" />: null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="section">
                <div className="section-title">任务得分</div>
                <div className="count">
                  <span className="count-main">{point}</span><span className="count-sub">分</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-footer">
          <div className="left" onClick={this.onSubmit.bind(this)}>答题解析</div>
          <div className="right" onClick={this.nextTask.bind(this)}>返回</div>
        </div>
      </div>
    )
  }
}
