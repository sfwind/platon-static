import * as React from "react";
import "./ProblemViewer.less";
import AssetImg from "../../../components/AssetImg";
import Audio from "../../../components/Audio";
import { Toast, Dialog } from "react-weui";
const { Alert } = Dialog

export default class ProblemViewer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      alert: {
        buttons: [
          {
            label: '再看看',
            onClick: this.close.bind(this)
          },
          {
            label: '想好了',
            onClick: ()=>{this.setState({showAlert:false});this.props.submitProblem(this.props.problem.id)}
          }
        ]
      }
    }
  }

  componentWillMount() {
    console.log('mount');
  }

  show() {
    this.setState({showAlert: true})
  }

  close() {
    this.setState({showAlert: false})
  }

  render() {
    const {closeModel, submitProblem, problem} = this.props;
    console.log(problem);
    return (
      <div className="problem-page">
        <div className="container has-footer">
          <div className="problem-intro">
            <div className="page-header">{problem.problem}</div>
            <div className="page-content" dangerouslySetInnerHTML={{__html: problem.description}}>
            </div>
          </div>
          <div className="button-footer">
            <div className="left-footer" onClick={()=>closeModel()}>
              返回
            </div>
            <div className="right-footer" onClick={()=>this.show()}>
              学这个
            </div>
          </div>
        </div>
        <Alert { ...this.state.alert }
          show={this.state.showAlert}>
          <p>提交后不能修改，想好了吗？</p>
        </Alert>
      </div>
    )
  }
}
