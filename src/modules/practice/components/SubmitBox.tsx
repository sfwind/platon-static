import * as React from "react";
import "./SubmitBox.less";

export default class Discuss extends React.Component <any, any> {
  constructor(props) {
    super()
    this.state = {
      comment: props.defaultContent?props.defaultContent:"",
      title:props.defaultTitle?props.defaultTitle:"",
    }
  }

  onSubmit() {
    this.props.onSubmit(this.state.comment,this.state.title);
  }

  render() {
    return (
      <div className="discuss-page">
        <div className="submit" style={{minHeight:`${this.props.height}px`}}>
          {this.props.desc?<div className="description" dangerouslySetInnerHTML={{__html: this.props.desc}}>
          </div>:null}
          {this.props.titleEnable?<input className="title-area" value={this.state.title}
                                         placeholder="请输入标题"
                                         onChange={(e)=>this.setState({title:e.currentTarget.value})}>
          </input>:null}
          <textarea className="submit-area" cols="30" rows="10" height="500px" width="100%"
                    value={this.state.comment}
                    placeholder={this.props.placeholder}
                    onChange={(e) => this.setState({comment: e.currentTarget.value})}/>
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
