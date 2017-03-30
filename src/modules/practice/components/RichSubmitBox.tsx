import * as React from "react";
import "./SubmitBox.less";
import { merge,findIndex,set } from "lodash";
import Editor from "../../../components/editor/Editor"
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import {connect} from "react-redux";


@connect(state=>state)
export default class Discuss extends React.Component <any, any> {
  constructor(props) {
    super()
    let labels = labels = merge([],props.labels);
    labels.forEach(item=>{
      item.selected = findIndex(props.defaultLabels,(o)=>o.labelId===item.id)>-1;
    });

    this.state = {
      comment: props.defaultContent?props.defaultContent:"",
      title:props.defaultTitle?props.defaultTitle:"",
      labels:labels,
    }
    this.labelMargin = (window.innerWidth-2) * 0.1 / 6;
  }

  onSubmit() {
    let choseList = [];
    this.state.labels.forEach(item=>{
      console.log(item);
      if(item.selected){
        choseList.push({labelId:item.id});
      }
    });
    console.log(choseList);
    const comment = this.refs.editor.getValue();
    this.props.onSubmit(comment,this.state.title,choseList);
  }

  clickLabel(selected,seq){
    this.setState({labels:set(merge([],this.state.labels),`[${seq}].selected`,!selected)})
  }

  render() {
    const renderLabels = ()=>{
      return (
        <div className="label-container">
          <span className="tips">选择标签:</span>
          {
            this.state.labels.map((item,seq)=>{
              return (
                <div className={`label-item ${item.selected?"selected":''}`} style={{marginLeft:`${this.labelMargin}px`,marginRight:`${this.labelMargin}px`}} onClick={()=>this.clickLabel(item.selected,seq)}>{item.name}</div>
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="discuss-page">
        <div className="submit" style={{minHeight:`${this.props.height}px`}}>
          {this.props.desc?<div className="description" dangerouslySetInnerHTML={{__html: this.props.desc}}>
          </div>:null}
          {this.props.titleEnable?<input className="title-area" value={this.state.title}
                                         placeholder="请输入标题"
                                         onChange={(e)=>this.setState({title:e.currentTarget.value})}>
          </input>:null}
          {this.props.labels?renderLabels():null}
          <Editor ref="editor" uploadStart={()=>{this.props.dispatch(startLoad())}} uploadEnd={()=>{this.props.dispatch(endLoad())}} defaultValue={this.state.comment} placeholder="离开页面前请提交，以免内容丢失。"/>
          {/*<textarea className="submit-area" cols="30" rows="10" height="500px" width="100%"*/}
                    {/*value={this.state.comment}*/}
                    {/*placeholder={this.props.placeholder}*/}
                    {/*onChange={(e) => this.setState({comment: e.currentTarget.value})}/>*/}
          { this.props.editDisable ?
            <div className="submit-button disabled">提交中</div>
            :
            <div className="submit-button" onClick={this.onSubmit.bind(this)}>提交</div>
          }
        </div>

      </div>
    )
  }
}
