import * as React from "react";
import "./SubmitBox.less";

export default class Discuss extends React.Component <any, any> {
  constructor(props) {
    super()
    this.state = {
      comment: "",
    }
  }

  onSubmit() {
    this.props.onSubmit(this.state.comment);
  }

  render() {
    return (
      <div className="discuss-page" style={{height:`${window.innerHeight}px`}}>
        <div className="submit">
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
