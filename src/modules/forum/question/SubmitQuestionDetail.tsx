import * as React from "react";
import { connect } from "react-redux";
import { ForumButton } from "../commons/ForumComponent";
import { submitQuestion, getQuestion, loadTag } from "../async"
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import {removeHtmlTags} from "../../../utils/helpers"
import { mark } from "../../../utils/request"
import Editor from "../../../components/editor/Editor";
import _ from "lodash";
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
    }
  }

  componentWillMount() {
    mark({ module: "打点", function: "论坛", action: "打开写问题页面" });
    const { dispatch, location } = this.props;
    const { questionId } = location.query;
    if(questionId) {
      //修改提问
      dispatch(startLoad());
      getQuestion(questionId).then(res => {
        const { code, msg } = res;
        dispatch(endLoad());
        if(code === 200) {
          this.setState({
            title:msg.topic , detail: msg.description,
            selectedTagList: msg.forumTags
          });
        } else {
          dispatch(alertMsg(msg));
        }
      }).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      })
    }else{
      //提问
      loadTag().then(
          res => {
            dispatch(endLoad());
            const {title} = this.props;
            if(res.code === 200) {
              this.setState({ tagList:res.msg, title});
            } else {
              dispatch(alertMsg(res.msg));
            }
          }
      ).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      })
    }
  }

  submit() {
    const { dispatch, location } = this.props;
    const { title, selectedTagList } = this.state;
    const detail = this.refs.editor.getValue();
    if(!detail){
      dispatch(alertMsg('问题描述不能为空哦'));
      return;
    }
    let tagIds = [];
    if(removeHtmlTags(detail).length > 1000) {
      dispatch(alertMsg('问题描述不能超过1000个字哦'));
      return;
    }
    if(!selectedTagList || selectedTagList.length === 0){
      dispatch(alertMsg('请先选择标签哦'));
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

  onClick(tag) {
    const { dispatch } = this.props;
    const { tagList } = this.state;
    let selectedTagList = [];
    //已选中则删除，反之则选中
    tagList.forEach((item) => {
      if(item.id === tag.id) {
        item.selected = !tag.selected;
      }
      if(item.selected) {
        selectedTagList.push(item);
      }
    });
    if(selectedTagList.length > 3) {
      dispatch(alertMsg("最多选择 3 个问题标签"));
      this.onClick(tag);
    }
    this.setState({ tagList });
  }


  render() {
    const { tagList = [], title, selectedTagList=[] } = this.state;

    const renderLine = (tagLineList) => {
      return (
          <div className="tag-line">
            {tagLineList.map((tag, idx) => {
              return (
                  <div className={`${tag.selected ? 'tag-selected' : 'tag'}`}
                       key={idx} onClick={() => this.onClick(tag)}>
                    {tag.name}
                  </div>
              )
            })}
          </div>
      )
    };

    const renderTagList = () => {
      // 包含所有的行元素的数组
      let tagAll = [];
      // 一共渲染几行
      let line = tagList.length / 3;
      for(let j = 0; j < line; j++) {
        // 一行标签的数组
        let tagLineList = [];
        for(let i = 0; i < 3; i++) {
          if(j * 3 + i === tagList.length) {
            break;
          }
          tagLineList.push(tagList[j * 3 + i]);
        }
        tagAll.push(tagLineList);
      }
      return (
          <div className="tag-list">
            {
              tagAll.map((tagLineList, idx) => {
                return (
                    renderLine(tagLineList)
                )
              })
            }
          </div>
      )
    };

    // 渲染文本样式 tag 列表
    const renderTagListText = () => {
      let tagContent = '';
      if(selectedTagList.length > 0) {
        tagContent = tagContent.concat('已选标签：');
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
    };

    const renderButton = () => {
      return (
        <ForumButton content={'提交'} clickFunc={() => this.submit()}/>
      )
    };

    const renderEditor = () => {
      return (
        <div className="editor">
          <Editor
            ref="editor"
            moduleId="5"
            maxLength="1000"
            scrollContainer="question-detail-container"
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
    };

    return (
      <div className="question-detail-container">
        <div className="question-page">
          <div className="page-title">
            {title}
          </div>
          <div className="tag-divide">
            选择标签
          </div>
          {_.isEmpty(selectedTagList)? renderTagList(): renderTagListText() }
          <div className="question-detail">
            {renderEditor()}
          </div>
          {renderButton()}
        </div>
      </div>
    )

  }
}
