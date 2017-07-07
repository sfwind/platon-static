import * as React from "react";
import { connect } from "react-redux";
import { ForumButton, SimpleQuestion, PullSlideTip } from "../commons/ForumComponent";
import { loadQuestionByTag, loadTag, searchQuestion } from "../async"
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
      selected:true,
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

  nextTask() {
    const { dispatch } = this.props;
    const { title } = this.state;
    dispatch(set('title', title));
    this.context.router.push('/forum/static/question/detail');
  }

  writeTitle(title) {
    const { dispatch } = this.props;
    this.setState({ title, length: title.length });
    searchQuestion(title, 1).then(res => {
      const { code, msg } = res;
      if(code === 200) {
        this.setState({ data: msg.list, page:1 })
      } else {
        dispatch(alertMsg(msg));
      }
    }).catch(e => {
      dispatch(alertMsg(e));
    });
  }

  render() {
    const { data = [], tagList = [], end } = this.state;

    const renderQuestionList = () => {
      if(!_.isEmpty(data)) {
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
        <div className={`question-page ${_.isEmpty(data)?'':'selected'}`}>
          <div className="page-title">
            写下问题标题
          </div>
          <div className="question-title">
            <textarea
                placeholder="写下问题的标题吧，清晰的标题能够吸引更多的人来回答问题（50字以内）"
                id="textarea"
                onCompositionEnd={(e) => this.writeTitle(e.currentTarget.value)} maxLength={50} defaultValue={this.state.title}/>
            <div className="length-div">
              <div className="length-tip">
                {length} / 50
              </div>
            </div>
          </div>
          { _.isEmpty(data) ? null :
            <div className="question-divide">
              相关的问题
            </div>
          }
          {renderQuestionList()}
          {/*{renderShowMore()}*/}
          {renderButton()}
        </div>
      </div>
    )

  }

}
