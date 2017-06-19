import * as React from "react";
import { HeadArea } from "../commons/ViewComponents";

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
            <div >

            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="question-container">
        <HeadArea content="你好" btnContent="下一步" btnFunc={() => console.log('question')}/>
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
