import * as React from "react";
import { HeadArea, QuestionHead } from "../commons/ViewComponents";

import "./Question.less";
import AssetImg from "../../../components/AssetImg";

export default class Question extends React.Component<any, any> {

  constructor() {
    super()
  }

  componentWillMount() {

  }

  render() {

    const renderQuestionList = () => {
      return (
        <div className="ques-list">
          <div className="ques-desc">
            <QuestionHead
              leftImgUrl={``} quesUser={`三十文`} quesTime={`2012-01-01`}
              rightImgUrl={``} rightContent={`关注问题`} rightContentFunc={() => console.log(`right content`)}
            />
            <div className="ques-title">跨行业跳槽应该注意什么？</div>
            <div className="ques-content">
              问题描述问题描述问题描述问题描述问题描述问题描述问题描述...
            </div>
            <div className="ques-answer-persons" onClick={() => console.log(`question persons`)}>
              查看Virgo、孙圈圈等5人的回答
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="question-container">
        <div className="question-page">
          <div className="ques-nav">
            <div className="ques-nav-img"><AssetImg url="" height={30} width={40}/></div>
            <div className="ques-nav-desc">提问</div>
          </div>
          {renderQuestionList()}
        </div>
      </div>
    )

  }

}
