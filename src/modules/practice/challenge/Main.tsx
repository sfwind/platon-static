import * as React from "react";
import { connect } from "react-redux";
import "./Main.less";
import { loadChallengePractice, submitChallengePractice } from "./async";
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import Work from "../components/NewWork"
import Editor from "../../../components/simditor/Editor"
import { merge } from 'lodash'
import { mark } from "../../../utils/request"
import AssetImg from "../../../components/AssetImg";

/**
 * 小目标页
 */
@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      data: {},
      knowledge: {},
      submitId: 0,
      page: 1,
      otherList: [],
      opacity: 0,
      edit: true,
    }
    this.pullElement = null;
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentDidMount() {
  }

  componentWillUnmount() {
    this.pullElement ? this.pullElement.destroy() : null;
  }

  componentWillMount() {
    mark({ module: "打点", function: "学习", action: "打开小目标页" });

    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadChallengePractice(location.query.id, location.query.planId).then(res => {
      dispatch(endLoad())
      const { code, msg } = res
      if(code === 200) {
        const { content } = msg
        this.setState({ data: msg, submitId: msg.submitId, planId: msg.planId })
        if(content) {
          this.setState({ edit: false })
        }
      }
      else dispatch(alertMsg(msg))
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  onEdit() {
    this.setState({ edit: true })
  }

  goComment(submitId) {
    this.context.router.push({
      pathname: "/rise/static/practice/challenge/comment",
      query: merge({ submitId: submitId }, this.props.location.query)
    })
  }

  onSubmit() {
    mark({
      module:'打点',
      function:'学习',
      action:'点击小目标提交按钮'
    })
    const { dispatch, location } = this.props;
    const { data, planId } = this.state;
    const { complete, practicePlanId } = location.query;
    const answer = this.refs.editor.getValue();
    if(answer == null || answer.length === 0) {
      dispatch(alertMsg('请填写作业'));
      return
    }
    this.setState({ showDisable: true });
    submitChallengePractice(planId, location.query.id, { answer }).then(res => {
      const { code, msg } = res;
      if(code === 200) {
        dispatch(startLoad());
        if(complete == 'false') {
          dispatch(set('completePracticePlanId', practicePlanId));
        }
        loadChallengePractice(location.query.id, location.query.planId).then(res => {
          dispatch(endLoad());
          const { code, msg } = res;
          if(code === 200) {
            this.setState({ data: msg, submitId: msg.submitId, planId: msg.planId, edit: false })
          }
          else dispatch(alertMsg(msg))
        })
        this.setState({ showDisable: false })
      }
      else {
        dispatch(alertMsg(msg));
        this.setState({ showDisable: false })
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
      this.setState({ showDisable: false })
    })
  }

  render() {
    const { data, edit, showDisable } = this.state
    const { content } = data

    const renderTip = () => {
      if(edit) {
        return (
          <div className="no-comment">
            <div className="content">
              <div className="text">更喜欢电脑上提交?</div>
              <div className="text">登录www.iquanwai.com/community</div>
            </div>
          </div>
        )
      } else {
        return (
          <div>
            <Work onEdit={()=>this.onEdit()} operation={false}
                  headImage={window.ENV.headImage} userName={window.ENV.userName} {...data}/>
          </div>
        )
      }
    }

    return (
      <div>
        <div className="container">
          <div className="challenge">
            <div className="page-header">{'小目标'}</div>
            <div className="intro-container">
              <div className="context-img">
                <AssetImg url="https://static.iqycamp.com/images/fragment/challenge_practice_2.png" alt=""/>
              </div>
              <div className="challenge-context">
                <div>
                  <p className="challenge context">你有什么目标，可以利用本课程的训练实现呢？制定目标帮你更积极地学习，也带给你更多成就感！</p>
                  <p className="tip-title">小提示</p>
                  <p className="tip">本题答案仅自己可见</p>
                  <p className="tip">目标最好是某个具体问题或场景</p>
                  <p className="tip">制定目标之前，可以先回顾该课程的知识体系</p>
                </div>
              </div>
            </div>
            <div ref="workContainer" className="work-container">
              <div className="submit-bar">{ content === null ? '提交方式' : '我的目标'}</div>
              {renderTip()}
              {edit &&
                <div className="editor">
                  <Editor ref="editor" moduleId={3} value={content}
                          placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。完成后点下方按钮提交，就会得到点赞和专业点评哦！"/>
                </div>}
            </div>
          </div>
        </div>
        { showDisable ?
          <div className="button-footer disabled">提交中</div>
          :
          edit && <div className="button-footer" onClick={()=>this.onSubmit()}>提交</div>
        }
      </div>
    )
  }
}
