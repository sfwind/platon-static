import * as React from "react";
import { connect } from "react-redux";
import { ForumButton, SimpleQuestion, PullSlideTip } from "../commons/ForumComponent";
import { loadQuestionByTag, loadTag } from "../async"
import { mark } from "../../../utils/request"
import PullElement from "pull-element";
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import "./SubmitQuestionInit.less"
import _ from "lodash"

@connect(state => state)
export default class SubmitQuestionInit extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      data: [],
      tagList: [],
      index: 1,
      end: true,
    };
    this.pullElement = null;
  }

  componentWillMount() {
    mark({module: "打点", function: "论坛", action: "打开选择问题标签页面"});
    const { dispatch, location } = this.props;
    const { tagId } = location.query;
    dispatch(startLoad());
    loadTag().then(
      res => {
        dispatch(endLoad());
        if(res.code === 200) {
          let tagList = res.msg;
          const { selectedTagList } = this.props;
          tagList.forEach(tag => {
            tag.selected = false;
            if(selectedTagList) {
              selectedTagList.forEach(selected => {
                if(selected.id === tag.id) {
                  tag.selected = true;
                }
              })
            }
          });
          this.setState({ tagList });
        } else {
          dispatch(alertMsg(res.msg));
        }
      }
    ).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })
  }

  componentDidUpdate(preProps, preState) {
    const { dispatch, location } = this.props;
    const { data = [] } = this.state;
    if(data.length > 0 && !this.pullElement) {
      // 有内容并且米有pullElement
      const { dispatch } = this.props;
      this.pullElement = new PullElement({
        target: '.question-init-container',
        scroller: '.question-init-container',
        damping: 4,
        onPullUp: (data) => {
          if(this.props.iNoBounce){
            if(this.props.iNoBounce.isEnabled()){
              this.props.iNoBounce.disable();
            }
          }
        },
        detectScroll: true,
        detectScrollOnStart: true,
        onPullUpEnd: (data) => {
          loadQuestionByTag(this.state.index + 1).then(res => {
            const { code, msg } = res;
            if(code === 200) {
              if(msg && msg.list.length !== 0) {
                _.remove(msg.list, (item) => {
                  return _.findIndex(this.state.data, item) !== -1
                });
                this.setState({
                  data: this.state.data.concat(msg.list),
                  index: this.state.index + 1, end: msg.end
                });
                if(msg.end === true) {
                  this.pullElement.disable();
                }
              } else {
                dispatch(alertMsg(msg));
              }
            } else {
              dispatch(alertMsg(msg));
            }
          }).catch(ex => {
            dispatch(alertMsg(ex));
          });
          if(this.props.iNoBounce){
            if(!this.props.iNoBounce.isEnabled()){
              this.props.iNoBounce.enable();
            }
          }
        }
      })
      this.pullElement.init();
    }
  }

  onClick(tag) {
    const { dispatch, location } = this.props;
    const { tagList } = this.state;
    //已选中则删除，反之则选中
    tagList.forEach((item) => {
      if(item.id === tag.id) {
        item.selected = !tag.selected;
      }
    });
    this.setState({ tagList });
    //选中时加载，取消时不加载
    if(tag.selected){
      dispatch(startLoad());
      loadQuestionByTag(tag.id).then(res => {
        dispatch(endLoad());
        const { code, msg } = res;
        if(code === 200) {
          this.setState({
            data: msg.list,
            index: 1, end: msg.end
          });
          if(msg.end === true) {
            if(this.pullElement) {
              this.pullElement.disable();
            }
          }else{
            if(this.pullElement) {
              this.pullElement.enable();
            }
          }
        } else {
          dispatch(alertMsg(msg));
        }
      }).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      });
    }

  }

  nextTask() {
    const { dispatch } = this.props;
    const { tagList } = this.state;
    let selectedTagList = [];
    tagList.forEach(item => {
      if(item.selected) {
        selectedTagList.push(item);
      }
    });
    if(_.isEmpty(selectedTagList)) {
      dispatch(alertMsg('请先选择问题标签'));
      return;
    }
    if(selectedTagList.length > 3) {
      dispatch(alertMsg('最多选择 3 个问题标签'));
      return;
    }
    dispatch(set('selectedTagList', selectedTagList));
    this.context.router.push('/forum/static/question/detail');
  }

  render() {
    const { data = [], tagList = [], end } = this.state;

    const renderQuestionList = () => {
      return (
        <div className="question-list">
          {data.map((question, index) => {
            return (
              <SimpleQuestion key={index} answer={question.answerCount} follow={question.followCount}
                              title={question.topic}
                              onclickFunc={() => this.context.router.push({
                                pathname: '/forum/static/answer',
                                query: { questionId: question.id }
                              })}/>
            )
          })}
        </div>
      )
    }

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
    }

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
    }

    const renderShowMore = () => {
      if(!_.isEmpty(data)) {
        return (
          <PullSlideTip isEnd={end}/>
        )
      }
    }

    const renderButton = () => {
      return (
        <ForumButton content={'下一步'} clickFunc={() => this.nextTask()}/>
      )
    }

    return (
      <div className="question-init-container" style={{height: window.innerHeight + 1 }}>
        <div className="question-page">
          <div className="page-title">
            选择问题标签
          </div>

          {renderTagList()}
          { _.isEmpty(data) ? null :
            <div className="question-title">
              相关的问题
            </div>
          }
          {renderQuestionList()}
          {renderShowMore()}
          {renderButton()}
        </div>
      </div>
    )

  }

}
