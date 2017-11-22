import React,{ Component } from 'react';
import connect from 'react-redux';
import './BusinessApplyChoice.less';
import { set, startLoad, endLoad, alertMsg } from "redux/actions"
import * as _ from 'lodash';
import { mark } from "../../utils/request"
import { SubmitButton } from '../../components/submitbutton/SubmitButton'
import AssetImg from '../../components/AssetImg'

export default class BusinessApplyChoice extends Component<any,any> {
  constructor(){
    super();
    this.state = {}
  }

  componentWillMount(){
    // 如果用户在审核中，则点击后提示已经在审核中
    mark({module: "打点", function: "商学院审核", action: "进入填写报名信息页面"});
  }


  render(){

    const { practice, currentIndex, practiceCount, } = this.state

    const isSelected = (scheduleChoices, choice) => {
      return !_.isEmpty(_.find(scheduleChoices, {
        id: choice.id, choice: true
      }));
    }

    const questionRender = (practice) => {
      const { question, scheduleChoices = [], } = practice
      return (
        <div className="intro-container">
          <div className="intro-index">
            {practiceCount !== 0 && currentIndex <= practiceCount - 1 && currentIndex != 0 ?
              <span className="prev" onClick={() => this.prevChoice()}>上一题</span> : null}
          </div>
          <div ref="questionGroup" className='question-group'>
            <div className="question">
              <div dangerouslySetInnerHTML={{ __html: (currentIndex + 1) + '.' + question }}/>
            </div>
            <div className="choice-list">
              {scheduleChoices.map((choice, idx) => {
                return (
                  <div key={choice.id}
                       className={`choice${isSelected(scheduleChoices, choice) ? ' selected' : ''}`}
                       onClick={e => this.handleClickChoice(choice)}>
                    <span className={`index`}>{sequenceMap[ idx ]}</span>
                    <span className={`text`}>{choice.subject}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="schedule-choice" style={{ minHeight: window.innerHeight }}>
        <div className="eva-container">
          <div className="eva-page-header">制定学习计划</div>
          <div className="rate">{(currentIndex / (practiceCount - 1)).toFixed(2) * 100}%</div>
          <div className="eva-progress">
            <div className="eva-progress-bar"
                 style={{ width: (window.innerWidth - 90) * (currentIndex / (practiceCount - 1)) }}/>
          </div>
          {questionRender(practice[ currentIndex ] || {})}
        </div>
        {currentIndex === practiceCount - 1 ? <div className="btn-wrapper button-footer">
          <div className="submit-btn btn" onClick={() => this.handleClickSubmit()}>提交</div>
        </div> : null}
      </div>
    )
  }
}
