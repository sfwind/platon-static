import React, { Component } from 'react';
import { connect } from 'react-redux';
import { loadEvaluationQuestions } from './async'
import { startLoad, endLoad, alertMsg } from "../../redux/actions";
import { QuestionGroup } from './components/QuestionGroup'
import * as _ from 'lodash';

@connect(state => state)
export class ValueEvaluation extends Component<any, any> {
  constructor() {
    super();
    this.state = {};
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  async componentWillMount() {

  }

  render() {

    const { location } = this.props;
    let category = _.get(location, 'query.category');

    return (
      <div className="value-evaluation">
        {category == 1 ?
          <QuestionGroup category='evaluation-self' header='职业发展核心能力和心理品质量表'
                         firstTips={{ 10: '请仔细阅读以下题目，根据您的实际情况，选出一个最能准确描述您的选项。' }}/> :
          <QuestionGroup category='evaluation-other' header='职业发展核心能力和心理品质量表'
                         firstTips={{ 10: '请仔细阅读以下题目，根据您对 TA 的了解，从中选出一个最能准确描述其实际情况的选项。' }}/>
        }

      </div>
    )
  }
}
