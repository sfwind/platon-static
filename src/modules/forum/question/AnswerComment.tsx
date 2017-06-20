import * as React from "react";

import "./AnswerComment.less"
import { ForumDialogBottom, ForumDialogHead, ForumHeadArea } from "../commons/ForumComponent";

export default class AnswerComment extends React.Component<any ,any> {

  constructor() {
    super()
  }

  render() {


    return (
      <div className="ans-comment-container">
        <ForumHeadArea content={`跨行业跳槽应该注意什么`}/>
        <div className="ans-comment-page">
          <div className="ans-desc">
            <ForumDialogHead leftImgUrl={``} user={`某某某`} time={`2017-05-27`}/>
            <div className="ans-content">
              回答回答回答回答回答回答回答回答回答回答回答回答
              回答回答回答回答回答回答回答回答回答回答回答回答
              回答回答回答回答回答回答回答回答回答回答回答回答
            </div>
            <ForumDialogBottom
              leftContent={`收起`} leftContentFunc={() => console.log("收起")}
              btn1ImgUrl={``} btn1Content={`回复`} btn1ContentFunc={() => console.log('回复')}
              btn2ImgUrl={``} btn2Content={`赞同`} btn2ContentFunc={() => console.log('赞同')}
            />
          </div>
          <div className="ans-comment-list">
            <div className="ans-comment-desc">
              <ForumDialogHead leftImgUrl={``} user="某某某" time= "2017-05-27"/>
              <div className="ans-comment-content">
                回应回应回应回应回应回应回应回应回应回应回应
                回应回应回应回应回应回应回应回应回应回应回应
                回应回应回应回应回应回应回应回应回应回应回应
              </div>
              <ForumDialogBottom btn2ImgUrl={``} btn2Content={`回复`} btn2ContentFunc={() => console.log('回复')}/>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
