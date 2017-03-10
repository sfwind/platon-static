import * as React from "react";
import "./Work.less"
import {isString,truncate,isFunction} from "lodash";
import AssetImg from "../../../components/AssetImg";


export default class Work extends React.Component<any,any> {


  constructor(props) {
    super(props);
    const {hide} = this.props
    this.state = {
      showAll: false,
      hide: hide,
    }
  }

  componentDidUpdate(){

  }

  render() {
    const {headImage, userName, content, submitUpdateTime,onEdit,voteCount,commentCount,voteStatus,onVoted,goComment,wordsCount=60} = this.props;
    const {showAll, hide} = this.state;

    const renderWorkContent = ()=>{
      if(isString(content)){
          if(content.length>wordsCount && !showAll){
          return (
            <pre>{truncate(content,{length:wordsCount,omission:''})}<span style={{letterSpacing:'-3px'}}>......</span></pre>
          )
        } else {
          return (
            <pre>{content}</pre>
          )
        }
      }
      return null;
    }

    const showOperation = ()=>{
      if(hide){
        return false
      }
      if(content && content.length<wordsCount){
        return true;
      } else
        return showAll;
    }

    return (
      <div className={`work ${onEdit?"":'work-other'}`} >
        <div className="submit-cell">
          <div className="submit-avatar"><img className="submit-avatar-img" src={headImage}/>
          </div>
          <div className="submit-area">
            <div className="submit-head">
              <div className="submit-name">
                {userName}
              </div>
              <div className="submit-time">{submitUpdateTime}</div>
              {onEdit?<div className="right" onClick={()=>onEdit()}>
                <div className="submit-icon">
                  <AssetImg type="edit" height={12}/>
                </div>
                <div className="submit-button">
                  编辑
                </div>
              </div>:null}
            </div>
            <div className="submit-content">{renderWorkContent()}</div>
            {content && content.length>wordsCount?<div onClick={()=>this.setState({showAll:!this.state.showAll})} className="show-all" style={{marginTop:`${showAll?'5px':'-20px'}`}}>{showAll?'收起':'展开'}</div>:null}
            {showOperation()?<div className="operation-area">
              <div onClick={()=>{isFunction(onVoted)?onVoted():null;}} className="vote">
                <span className={`${voteStatus?'voted':'disVote'}`}>{voteCount}</span>
              </div>
              <div onClick={()=>{isFunction(goComment)?goComment():null}} className="comment">
                <span>{commentCount}</span>
              </div>
            </div>:null}
          </div>
        </div>
      </div>
    )
  }
}
