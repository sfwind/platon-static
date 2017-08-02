import * as React from "react";
import { connect } from "react-redux";
import _ from "lodash";
import "./Main.less";
import { answer,getOpenStatus,openConsolidation } from "./async";
import { mark } from "../../../utils/request"
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions";
import Tutorial from "../../../components/Tutorial"
import AssetImg from "../../../components/AssetImg";
import { scroll } from "../../../utils/helpers"

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

const WARMUP_AUTO_SAVING = 'rise_warmup_autosaving';

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      list: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      knowledge: {},
      integrated: false,
    }
  }

  componentWillMount() {
    const {dispatch, location, res} = this.props;
    const { integrated, practicePlanId} = location.query;
    this.setState({integrated});
    dispatch(endLoad());
    const {code, msg} = res;
    let list = msg;
    if (code === 200) {
      const {practice} = msg;
      let currentIndex = 0;
      let selected = [];
      if (practice) {
        let storageDraft = JSON.parse(window.localStorage.getItem(WARMUP_AUTO_SAVING));
        if(storageDraft && storageDraft.id == practicePlanId)  {
          const selectedChoices = storageDraft.selectedChoices;
          selectedChoices.map((choiceSelected, questionIdx)=>{
            _.set(list, `practice.${questionIdx}.choice`, choiceSelected);
          });
          selected = _.get(list, `practice.${selectedChoices.length - 1}.choice`);
          currentIndex = selectedChoices.length - 1;
        }
        this.setState({list, practiceCount: msg.practice.length, currentIndex, selected});
        if(msg.practice[0].knowledge){
          this.setState({knowledgeId: msg.practice[0].knowledge.id})
        }
      }
    } else dispatch(alertMsg(msg));

    getOpenStatus().then(res => {
      if(res.code === 200) {
        this.setState({ openStatus: res.msg });
      }
    })
  }

  onChoiceSelected(choiceId) {
    const {practicePlanId} = this.props.location.query;
    const { list, currentIndex, selected } = this.state;
    let _list = selected;
    if (_list.indexOf(choiceId) > -1) {
      _.remove(_list, n => n === choiceId);
    } else {
      _list.push(choiceId);
    }
    // 临时保存到localstorage
    let storageDraft = JSON.parse(window.localStorage.getItem(WARMUP_AUTO_SAVING));
    if(storageDraft && storageDraft.id == practicePlanId){
      let {selectedChoices} = storageDraft;
      if(selectedChoices.length >= currentIndex+1){
        selectedChoices[currentIndex] = _list;
      }else{
        selectedChoices.push(_list);
      }
    } else {
      // 初始化
      storageDraft = {id:practicePlanId, selectedChoices: [_list]};
    }
    window.localStorage.setItem(WARMUP_AUTO_SAVING, JSON.stringify(storageDraft));
    this.setState({ selected: _list });
  }

  setChoice(cb) {
    let { list, currentIndex, selected } = this.state;
    _.set(list, `practice.${currentIndex}.choice`, selected);
    this.setState({ list });
    if(cb) {
      cb(list.practice);
    }
  }

  prev() {
    const { dispatch } = this.props;
    const { currentIndex, list } = this.state;
    if(currentIndex > 0) {
      this.setChoice();
      const selected = list.practice[`${currentIndex - 1}`].choice;
      this.setState({ currentIndex: currentIndex - 1, selected });
      dispatch(set('warmup_currentIndex', currentIndex - 1));
    }
    scroll('.container', '.container');
  }

  next() {
    const { dispatch,location } = this.props;
    const { selected, list, currentIndex, practiceCount } = this.state;
    const { integrated, practicePlanId} = location.query;

    if(selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"))
      return
    }

    if(currentIndex < practiceCount - 1) {
      this.setChoice();
      let selected = list.practice[`${currentIndex + 1}`].choice;
      if(!selected) {
        selected = []
      }
      let problemId =  _.get(list,'practice[0].problemId');
      let questionId = _.get(list,`practice[${currentIndex}].id`);
      let sequence = _.get(list,`practice[${currentIndex}].sequence`);
      if(problemId == 9){
        mark({
          module: "打点",
          function: questionId,
          action: "做选择题",
          memo: sequence
        });
      }
      this.setState({ currentIndex: currentIndex + 1, selected });
    }
    scroll('.container', '.container');
  }

  onSubmit() {
    const { dispatch } = this.props;
    const { selected, practice, currentIndex, practiceCount } = this.state;
    const { practicePlanId } = this.props.location.query;
    if(selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"));
      return
    }
    if(currentIndex === practiceCount - 1) {
      this.setChoice(p => {
        dispatch(startLoad());
        answer({ practice: p }, practicePlanId).then(res => {
          dispatch(endLoad());
          const { code, msg } = res;
          if (code === 200) {
            dispatch(set('completePracticePlanId', practicePlanId));
            this.clearStorage();
            // redux 存储弹卡片弹出区分变量
            dispatch(set('CompleteChapterPracticePlanId', practicePlanId));
            this.props.router.push({
              pathname: '/rise/static/practice/warmup/result',
              query: _.merge(msg, this.props.location.query)
            })
          } else {
            dispatch(alertMsg(msg))
          }
        }).catch(ex => {
          dispatch(endLoad())
          dispatch(alertMsg(ex))
        })
      })
    }
  }

  tutorialEnd() {
    const { dispatch } = this.props
    const { openStatus } = this.state
    openConsolidation().then(res => {
      const {code,msg} = res
      if(code === 200){
        this.setState({openStatus:_.merge({},openStatus,{openConsolidation:true})})
      } else {
        dispatch(alertMsg(msg))
      }
    })
  }

  clearStorage(){
    window.localStorage.removeItem(WARMUP_AUTO_SAVING);
  }

  render() {
    const { list, currentIndex, selected, practiceCount, openStatus = {}, integrated, knowledgeId } = this.state
    const { practice = [] } = list

    const questionRender = (practice) => {
      const { question, pic, choiceList = [], score = 0 } = practice
      return (
        <div className="intro-container">
          { practiceCount !== 0 && currentIndex <= practiceCount - 1 ? <div className="intro-index">
            <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
            <span className="type"><span className="number">{score}</span>分</span>
          </div> : null}
          {pic ? <div className="context-img">
            <AssetImg url={pic}/></div> : null
          }
          <div className="question">
            <div dangerouslySetInnerHTML={{ __html: question }}></div>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
          {integrated == 'false' ?
            <div className="knowledge-link"
                 onClick={() => this.props.router.push(`/rise/static/practice/knowledge?id=${knowledgeId}`)}>不确定?瞄一眼知识点</div> : null}
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${selected.indexOf(id) > -1 ? ' selected' : ''}`}
             onClick={e => this.onChoiceSelected(id)}>
          <span className="index">{sequenceMap[idx]}</span>
          <span className="text">{subject}</span>
        </div>
      )
    }

    return (
      <div>
        <div>
          <div className="container has-footer" style={{ height: window.innerHeight - 49 }}>
            <div className="warm-up">
              {practice[currentIndex] && practice[currentIndex].knowledge ?
                  <div className="page-header">{practice[currentIndex].knowledge.knowledge}</div> :
                  <div className="page-header">综合练习</div>
              }
              {questionRender(practice[currentIndex] || {})}
            </div>
          </div>
          <div className="button-footer">
            <div className={`left origin ${currentIndex === 0 ? ' disabled' : ''}`} onClick={this.prev.bind(this)}>上一题
            </div>
            { currentIndex !== practiceCount - 1 ? <div className={`right`} onClick={this.next.bind(this)}>下一题</div> :
                <div className={`right`} onClick={this.onSubmit.bind(this)}>提交</div>
            }
          </div>
        </div>
        <Tutorial bgList={['https://static.iqycamp.com/images/rise_tutorial_gglx_0420.png?imageslim']} show={_.isBoolean(openStatus.openConsolidation) && !openStatus.openConsolidation} onShowEnd={()=>this.tutorialEnd()}/>
      </div>
    )
  }
}
