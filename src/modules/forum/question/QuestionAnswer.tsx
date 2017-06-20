import * as React from "react";

import "./QuestionAnswer.less"
import { ForumHeadArea, ForumDialogHead, ForumDialogBottom } from "../commons/ForumComponent";


export default class QuestionAnswer extends React.Component<any, any> {

  constructor() {
    super()
  }

  render() {

    const renderAnswerTips = () => {
      return (
        <div className="answer-tips">
          <span>该问题还没有讨论，你可以：</span>
          <span>1.回答作者</span>
          <span>2.关注问题，有新的讨论会通知你</span>
        </div>
      )
    }

    return (
      <div className="answer-container">
        <ForumHeadArea content={`跨行业跳槽应该注意什么`}/>
        <div className="answer-page">
          {/* questtion-desc */}
          <div className="ques-desc">
            <ForumDialogHead leftImgUrl={``} user="三十文" time={`2017-01-01`}/>
            <div className="ques-content">
              问题描述问题描述问题描述问题描述问题描述问题描述问题描述
              问题描述问题描述问题描述问题描述问题描述问题描述问题描述
              问题描述问题描述问题描述问题描述问题描述问题描述问题描述
            </div>
            <ForumDialogBottom
              leftContent={`3讨论 20关注`}
              btn1ImgUrl={``} btn1Content={`回答`} btn1ContentFunc={() => console.log(`回答`)}
              btn2ImgUrl={``} btn2Content={`已关注`} btn2ContentFunc={() => console.log(`已关注`)}
            />
          </div>
          {/* answer list */}
          {/* 如果不存在任何评论，则展示 tips */}
          {/*{renderAnswerTips()}*/}
          <div className="answer-list">
            <div className="answer-desc">
              <ForumDialogHead leftImgUrl={``} user="小核桃" time="2017-02-02"/>
              <div className="answer-content">
                回答回答回答回答回答回答回答回答回答回答回答回答
                回答回答回答回答回答回答回答回答回答回答回答回答
                回答回答回答回答回答回答回答回答回答回答回答回答
              </div>
              <ForumDialogBottom
                leftContent={`展开`} leftContentFunc={() => {console.log('展开')}}
                btn1ImgUrl={``} btn1Content={`评论`} btn1ContentFunc={() => console.log(`评论`)}
                btn2ImgUrl={``} btn2Content={`赞同`} btn2ContentFunc={() => console.log(`赞同`)}
              />
            </div>
          </div>
        </div>
      </div>
    )
  }

}
