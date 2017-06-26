import * as React from "react";
import { connect } from "react-redux";
import { ForumButton } from "../commons/ForumComponent";
import { submitQuestion, getQuestion } from "../async"
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import { removeHtmlTags } from "../../../utils/helpers"
import { mark } from "../../../utils/request"
import Editor from "../../../components/editor/Editor";
import "./SubmitQuestionDetail.less"

@connect(state => state)
export default class SubmitQuestionDetail extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      selectedTagList: [],
      index: 1,
      end: true,
      title: '',
      detail: '',
      length: 0,
    }
  }

  componentWillMount() {
    mark({module: "打点", function: "论坛", action: "打开写问题页面"});
    const { dispatch, location } = this.props;
    const { questionId } = location.query;
    if(questionId) {
      dispatch(startLoad());
      getQuestion(questionId).then(res => {
        const {code, msg} = res
        dispatch(endLoad());
        if(code === 200) {
          this.setState({
            title: msg.topic, detail: msg.description,
            selectedTagList: msg.forumTags, length: msg.topic.length
          })
        } else {
          dispatch(alertMsg(msg));
        }
      }).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      })
    }
  }

  componentDidMount() {
    const { questionId } = this.props.location.query;
    //提问时，从redux读取标签
    if(!questionId) {
      const { selectedTagList } = this.props;
      this.setState({ selectedTagList });
    }
  }

  submit() {
    const { title, selectedTagList } = this.state;
    const detail = this.refs.editor.getValue();
    let tagIds = [];
    const { dispatch, location } = this.props;
    if(!title) {
      dispatch(alertMsg('请填写问题标题'));
      return;
    } else if(title.length > 50) {
      dispatch(alertMsg('标题不能超过50个字哦'));
      return;
    }
    if(!detail) {
      dispatch(alertMsg('请填写问题描述'));
      return;
    } else if(removeHtmlTags(detail).length > 1000) {
      dispatch(alertMsg('问题描述不能超过1000个字哦'));
      return;
    }

    if(selectedTagList) {
      selectedTagList.forEach(selectedTag => {
        tagIds.push(selectedTag.id);
      });
    }

    dispatch(set('selectedTagList', undefined));
    dispatch(startLoad());
    const { questionId } = location.query;
    if(questionId) {
      submitQuestion({ topic: title, description: detail, tagIds, questionId }).then(res => {
          dispatch(endLoad());
          if(res.code === 200) {
            this.context.router.goBack();
          } else {
            dispatch(alertMsg(res.msg));
          }
        }
      ).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      });
    } else {
      submitQuestion({ topic: title, description: detail, tagIds }).then(res => {
          dispatch(endLoad());
          if(res.code === 200) {
            this.context.router.push({ pathname: '/forum/static/question', query: { questionId: res.msg } });
          } else {
            dispatch(alertMsg(res.msg));
          }
        }
      ).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      });
    }
  }

  writeTitle(e) {
    this.setState({ title: e.currentTarget.value, length: e.currentTarget.value.length })
  }

  render() {
    const { data = [], selectedTagList = [], length } = this.state;

    const renderLine = (tagLineList) => {
      return (
        <div className="tag-line">
          {tagLineList.map((tag, idx) => {
            return (
              <div className='tag-selected' key={idx}>
                {tag.name}
              </div>
            )
          })}
        </div>
      )
    }

    // 渲染文本样式 tag 列表
    const renderTagListText = () => {
      let tagContent = ''
      if(selectedTagList.length > 0) {
        tagContent = tagContent.concat('已选标签：')
        selectedTagList.map((tag, idx) => {
          if(idx === 0) {
            tagContent = tagContent.concat(tag.name)
          } else {
            tagContent = tagContent.concat(` | ${tag.name}`)
          }
        })
      }
      return (
        <div className="tag-list-text">{tagContent}</div>
      )
    }

    const renderButton = () => {
      return (
        <ForumButton content={'提交'} clickFunc={() => this.submit()}/>
      )
    }

    const renderEditor = () => {
      return (
        <div className="editor">
          <Editor
            ref="editor"
            moduleId="5"
            maxLength="1000"
            defaultValue={this.state.detail}
            onUploadError={(res) => {
              this.props.dispatch(alertMsg(res.msg))
            }}
            uploadStart={() => {
              this.props.dispatch(startLoad())
            }}
            uploadEnd={() => {
              this.props.dispatch(endLoad())
            }}
            placeholder="写下问题的详细背景，帮助他人更好地分析和解答你的问题（500字以内）。"
          />
        </div>
      )
    }

    return (
      <div className="question-detail-container">
        <div className="question-page">
          <div className="page-title">
            完善问题描述
          </div>
          {renderTagListText()}
          <div className="question-title">
                        <textarea placeholder="写下问题的标题吧，清晰的标题能够吸引更多的人来回答问题（50字以内）"
                                  onChange={(e) => this.writeTitle(e)} maxLength={50} defaultValue={this.state.title}/>
            <div className="length-div">
              <div className="length-tip">
                {length} / 50
              </div>
            </div>
          </div>
          <div className="question-detail">
            {renderEditor()}
          </div>
          {renderButton()}
        </div>
      </div>
    )

  }
}
