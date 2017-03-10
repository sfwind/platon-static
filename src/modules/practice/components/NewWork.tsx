import * as React from "react";
import "./NewWork.less"
import {isString,truncate,isFunction} from "lodash";
import AssetImg from "../../../components/AssetImg";


export default class Work extends React.Component<any,any> {


  constructor(props) {
    super(props);
    this.state = {
      showAll: false,
    }
  }

  componentDidUpdate(){

  }

  render() {
    const {headImage, userName, content,
      submitUpdateTime,onEdit,voteCount,commentCount,
      voteStatus,onVoted,goComment,wordsCount=60,
      title,avatarStyle = 'left',
      operation=true} = this.props;
    const {showAll} = this.state;

    const renderWorkContent = ()=>{
      if(isString(content)){
        if(content.length>wordsCount && !showAll){
          return (
            <pre className={`${avatarStyle}`}>{truncate(content,{length:wordsCount,omission:''})}<span style={{letterSpacing:'-3px'}}>......</span></pre>
          )
        } else {
          return (
            <pre className={`${avatarStyle}`}>{content}</pre>
          )
        }
      }
      return null;
    }

    const showOperation = ()=>{
      if(operation){
        if(content && content.length<wordsCount){
          return true;
        } else
          return showAll;
      } else {
        return false;
      }
    }

    const renderHeader = ()=>{
      return (
        <div className={`submit-head ${avatarStyle}`}>
          <img className={`submit-avatar ${avatarStyle}`} src={headImage}/>
          <div className="submit-name">
            {userName}
          </div>
          <div className="submit-time">{submitUpdateTime}</div>
          {onEdit?<div className="right" style={{marginTop:`${avatarStyle==='left'?'0':'5px'}`}} onClick={()=>onEdit()}>
            <div className="submit-icon">
              <AssetImg type="edit" height={12}/>
            </div>
            <div className="submit-button">
              编辑
            </div>
          </div>:null}
        </div>
      )
    }

    return (
      <div className={`new-work`} >
        <div className="submit-cell">
          <div className="submit-area">
            {renderHeader()}
            {title?<div className="submit-title">{title}</div>:null}
            <div className="submit-content">{renderWorkContent()}</div>
            {content && content.length>wordsCount?<div onClick={()=>this.setState({showAll:!this.state.showAll})} className="show-all" style={{marginTop:`${showAll?'5px':'-20px'}`}}>{showAll?'收起':'展开'}</div>:null}
            {showOperation()?<div className={`operation-area ${avatarStyle}`}>
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
