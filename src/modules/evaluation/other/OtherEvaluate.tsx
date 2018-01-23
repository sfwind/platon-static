import * as React from 'react'
import { connect } from 'react-redux'
import { startLoad, endLoad, alertMsg, set } from 'redux/actions'
import { OtherInit } from './OtherInit'
import { OtherComplete } from './OtherComplete'
import { QuestionGroup } from '../components/QuestionGroup'
import { OtherShare } from './OtherShare'
import { loadSurveySubmitUpname, loadSurveySubmit } from '../async';
import { mark } from '../../../utils/request'

@connect(state => state)
export default class OtherEvaluate extends React.Component {

  constructor() {
    super()
    this.state = {
      currentStep: this.other_evaluate_steps.init
    }
  }

  other_evaluate_steps = {
    init: 'init',
    content: 'questionare',
    complete: 'complete',
    share: 'share'
  }

  async componentWillMount() {
    const { dispatch, location } = this.props;
    const { referId, share } = location.query;
    if(!!share) {
      mark({
        module: '打点',
        function: '价值观测评',
        action: '进入分享页',
        memo: referId
      })
      this.setState({ currentStep: this.other_evaluate_steps.share });
    } else {
      mark({
        module: '打点',
        function: '价值观测评',
        action: '打开其他人页',
        memo: referId
      })
      dispatch(startLoad());
      let res = await loadSurveySubmitUpname(referId);
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ upName: res.msg });
      }
    }
  }

  async handleClickStart() {
    const { dispatch } = this.props;
    dispatch(startLoad());
    let res = await loadSurveySubmit('evaluation-self');
    dispatch(endLoad());
    if(res.code === 200) {
      this.setState({ currentStep: this.other_evaluate_steps.content })
    } else {
      dispatch(alertMsg("您已经填写过问卷"));
    }
  }

  renderComponentByStep() {
    const { currentStep, upName } = this.state
    const { location } = this.props;
    const { referId } = location.query;
    switch(currentStep) {
      case this.other_evaluate_steps.init :
        return <OtherInit handleStart={() => this.handleClickStart()}
                          upName={upName}
        />
        break
      case this.other_evaluate_steps.content:
        return <QuestionGroup category='evaluation-other' header='职业发展核心能力和心理品质量表'
                              upName={upName}
                              onSubmit={() => this.setState({ currentStep: this.other_evaluate_steps.complete })}
                              referId={referId}
                              firstTips={{ 10: '请仔细阅读以下题目，根据您对 TA 的了解，从中选出一个最能准确描述其实际情况的选项。' }}/>
        break
      case this.other_evaluate_steps.complete:
        return <OtherComplete upName={upName}/>
        break
      case this.other_evaluate_steps.share:
        return <OtherShare/>
        break;
      default:
        break
    }
  }

  render() {
    return this.renderComponentByStep()
  }

}
