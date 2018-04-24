import * as React from 'react';
import { connect } from 'react-redux';
import './KnowledgeViewer.less';
import AssetImg from '../../../components/AssetImg';
import Audio from '../../../components/Audio';
import WordUnfold from '../../../components/WordUnfold';
import {
  loadDiscuss,
  discussKnowledge,
  loadKnowledge,
  loadKnowledges,
  deleteKnowledgeDiscuss,
  learnKnowledge, loadKnowledgePriorityDiscuss,
} from './async';
import _ from 'lodash';
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions';
import { scroll } from '../../../utils/helpers';
import { mark } from '../../../utils/request';
import QYVideo from '../../../components/QYVideo';
import { FooterButton } from '../../../components/submitbutton/FooterButton';
import { Block } from '../../../components/Block';
import { SectionProgressHeader } from '../components/SectionProgressHeader';
import { ColumnSpan } from '../../../components/ColumnSpan';
import KnowledgeDiscussDistrict from './KnowledgeDiscussDistrict/KnowledgeDiscussDistrict';

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
};

@connect(state => state)
export default class KnowledgeViewer extends React.Component<any, any> {
  constructor () {
    super();
    this.state = {
      showTip: false,
      showDiscuss: false,
      commentId: 0,
      knowledge: {},
      discuss: {},
      placeholder: '提出你的疑问或意见吧（限1000字）',
      isReply: false,
      content: '',   //评论内容
      audioPlay:"audioPlay.false", //第一个音频自动播放标识
      analysisPlay:"analysisPlay.false" ,//第二个音频自动播放标识
      meansPlay:"meansPlay.false", //第三个音频自动播放标识
      keynotePlay:"keynotePlay.false", //第四个音频自动播放标识
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  async componentWillMount () {
    mark({ module: '打点', function: '学习', action: '打开知识点页面' });
    const { dispatch, location } = this.props;
    const { id, practicePlanId, complete } = this.props.location.query;

    if (practicePlanId) {
      let knowledge = await loadKnowledges(practicePlanId);   // 打开知识点
      this.setState({ knowledge: knowledge.msg[0], referenceId: knowledge.msg[0].id });
      let discussRes = await loadKnowledgePriorityDiscuss(knowledge.msg[0].id);   // 获取当前知识点加精过后的讨论 区域
      this.setState({ discussData: discussRes.msg });  // 留言数据

      if (complete == 'false') {
        // 完成练习动效
        dispatch(set('completePracticePlanId', practicePlanId));
      }
    } else if (id) {
      let knowledge = await loadKnowledge(id); // 加载知识点
      this.setState({ knowledge: knowledge.msg });
      let discussRes = await loadKnowledgePriorityDiscuss(id);
      this.setState({ discussData: discussRes.msg });
    }
  }

  reply (item) {
    this.setState({
      showDiscuss: true,
      isReply: true,
      placeholder: '回复 ' + item.name + ':',
      content: '',
      repliedId: item.id,
      referenceId: item.knowledgeId,
    });
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
评论之后的重新加载
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  reload () {
    const { knowledge } = this.state;
    loadDiscuss(knowledge.id, 1).then(res => {   // 加载更多讨论
      if (res.code === 200) {
        this.setState({
          discuss: res.msg, showDiscuss: false, repliedId: 0, isReply: false,
          placeholder: '提出你的疑问或意见吧（限1000字）', content: '',
        });
        scroll('.discuss', '.container');
      }
    });
  }

  onChange (value) {
    this.setState({ content: value });
  }

  cancel () {
    this.setState({ placeholder: '提出你的疑问或意见吧（限1000字）', isReply: false, showDiscuss: false, repliedId: 0 });
  }

  onSubmit () {
    mark({
      module: '打点',
      function: '学习',
      action: '点击提交知识点评论',
    });
    const { dispatch } = this.props;
    const { referenceId, repliedId, content } = this.state;
    if (content.length == 0) {
      dispatch(alertMsg('请填写评论'));
      return;
    }

    let discussBody = { comment: content, referenceId: this.state.knowledge.id };

    if (repliedId) {
      _.merge(discussBody, { repliedId: repliedId });
    }

    discussKnowledge(discussBody).then(res => {
      const { code, msg } = res;
      if (code === 200) {
        this.reload();
      }
      else {
        dispatch(alertMsg(msg));
      }
    }).catch(ex => {
      dispatch(alertMsg(ex));
    });
  }

  onDelete (id) {
    const { dispatch } = this.props;
    const { knowledge } = this.state;
    dispatch(startLoad());
    deleteKnowledgeDiscuss(id).then(res => {     // 删除知识点评论
      loadDiscuss(knowledge.id, 1).then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          this.setState({
            discuss: res.msg, showDiscuss: false, repliedId: 0, isReply: false,
            placeholder: '提出你的疑问或意见吧（限1000字）', content: '',
          });
        }
      });
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
去往练习题
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  handleClickGoWarmup (practicePlanId) {
    const { dispatch } = this.props;
    dispatch(startLoad());
    mark({ module: '打点', function: '知识点', action: '完成知识点学习' });
    learnKnowledge(practicePlanId).then(res => {    // 学习知识点
      dispatch(endLoad());
      if (res.code === 200) {
        this.refs.sectionProgress.goNextPage();
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(er => alertMsg(er));
  }

/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
完成播放后得到的标识  重新赋值
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  getPlayStation(flag) {
    if (flag === "audioPlay"){
      this.setState({audioPlay:"audioPlay.false",analysisPlay:"analysisPlay.true" ,meansPlay:"meansPlay.false",keynotePlay:"keynotePlay.false",});
      window.scrollTo(0,this.refs.analysis.offsetTop);
    }else if (flag === "analysisPlay"){
      this.setState({audioPlay:"audioPlay.false",analysisPlay:"analysisPlay.false" ,meansPlay:"meansPlay.true",keynotePlay:"keynotePlay.false",});
     window.scrollTo(0,this.refs.means.offsetTop);
    }else if (flag === "meansPlay"){
      this.setState({audioPlay:"audioPlay.false",analysisPlay:"analysisPlay.false" ,meansPlay:"meansPlay.false",keynotePlay:"keynotePlay.true",});
      window.scrollTo(0,this.refs.keynote.offsetTop);
    }
  }
 /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 真实的DOM被渲染出来后调用
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  componentDidMount(){
    /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    touchstart只事件触发一次函数  让语音全部播放然后暂停   解决ios必须触发才能播放的问题
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
    this.listenFun(this.refs.knowledgeAll,'touchstart',()=>{
      this.setState({audioPlay:"audioPlay.true",analysisPlay:"analysisPlay.true" ,meansPlay:"meansPlay.true",keynotePlay:"keynotePlay.true",});
      let audt = setTimeout(()=>{
        this.setState({audioPlay:"audioPlay.false",analysisPlay:"analysisPlay.false" ,meansPlay:"meansPlay.false",keynotePlay:"keynotePlay.false",});
      },1000)
    })
  }
  /*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
  事件监听函数
  -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/
  listenFun(dom,event,callBack){
    let handle = function () {
      callBack();
      dom.removeEventListener(event,handle)
    };
    dom.addEventListener(event,handle)
  }
  render () {
    const { showTip, showDiscuss, knowledge, discuss = [], isReply, placeholder } = this.state;
    const {
      analysis, means, keynote, audio, audioWords, pic, example, analysisPic, meansPic, keynotePic, fileId,
      analysisAudio, analysisAudioWords, meansAudio, meansAudioWords, description, keynoteAudio, keynoteAudioWords, videoUrl, videoPoster, videoWords,
    } = knowledge;
    const { location } = this.props;
    const { practicePlanId, planId, complete } = location.query;

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice;
      return (
        <div key={id}
             className={`choice${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>
            {sequenceMap[idx]}
          </span>
          <span className={`subject`}>{subject}</span>
        </div>
      )
    };

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight ? sequenceMap[idx] + ' ' : '')
    };

    return (
      <Block>
        <div className={`knowledge-view-container`} ref='knowledgeAll'>
          {
            practicePlanId ?
              <SectionProgressHeader ref={'sectionProgress'} practicePlanId={practicePlanId} planId={planId}/> :
              <div className="page-header">{knowledge.knowledge}</div>
          }
          {
            videoUrl &&
            <div style={{ marginTop: '20px', marginBottom: '20px' }}>
              <QYVideo videoUrl={videoUrl}
                       videoPoster={videoPoster}
                       videoWords={videoWords}
                       fileId={fileId}/></div>
          }
          {/*-----  音频的渲染   -----*/}
          <div className="intro-container">
            {
              audio &&
              <div className="context-audio">
                <Audio url={audio} words={audioWords} playFlag={this.state.audioPlay} getPlayEnd={this.getPlayStation.bind(this)}/>
              </div>
            }

            {
              description && <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: description }}/>
              </div>
            }

            {pic && <div className="context-img"><img src={pic}/></div>}
            {
              analysis &&
              <div ref="analysis">
                <div className="context-title-img">
                  <AssetImg height={17} url="https://static.iqycamp.com/images/fragment/analysis3.png"/>
                </div>
                {analysisAudio &&
                <div className="context-audio">
                  <Audio url={analysisAudio} words={analysisAudioWords} playFlag={ this.state.analysisPlay } getPlayEnd={this.getPlayStation.bind(this)}/>
                </div>}
                <div className="text">
                  <pre dangerouslySetInnerHTML={{__html: analysis}}/>
                </div>
                {analysisPic && <div className="context-img"><img src={analysisPic}/></div>}
              </div>
            }
            {
              means &&
              <div ref="means">
                <div className="context-title-img">
                  <AssetImg height={17} url="https://static.iqycamp.com/images/fragment/means3.png"/>
                </div>
                {meansAudio && <div className="context-audio">
                  <Audio url={meansAudio} words={meansAudioWords} playFlag={this.state.meansPlay} getPlayEnd={this.getPlayStation.bind(this)}/>
                </div>
                }
                <div className="text">
                  <pre dangerouslySetInnerHTML={{ __html: means }}/>
                </div>
                {meansPic && <div className="context-img"><img src={meansPic}/></div>}
              </div>
            }
            {
              keynote &&
              <div ref="keynote">
                <div className="context-title-img">
                  <AssetImg height={17}
                            url="https://static.iqycamp.com/images/fragment/keynote3.png"/>
                </div>
                {
                  keynoteAudio &&
                  <div className="context-audio"><Audio url={keynoteAudio} words={keynoteAudioWords} playFlag={this.state.keynotePlay} getPlayEnd={this.getPlayStation.bind(this)}/></div>
                }
                <div className="text">
                  <pre dangerouslySetInnerHTML={{ __html: keynote }}/>
                </div>
                {keynotePic && <div className="context-img"><img src={keynotePic}/></div>}
              </div>
            }
            {
              example &&
              <div>
                <div className="context-title-img">
                  <AssetImg height={17}
                            url="https://static.iqycamp.com/images/fragment/example2.png"/>
                </div>
                <div className="question">
                  <pre dangerouslySetInnerHTML={{ __html: example.question }}></pre>
                </div>
                <div className="choice-list">
                  {example.choiceList.map((choice, idx) => choiceRender(choice, idx))}
                </div>
                {
                  showTip ?
                    <div className="analysis">
                      <div className="title-bar">解析</div>
                      <div className="context">
                        正确答案：{example.choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
                      </div>
                      <pre dangerouslySetInnerHTML={{ __html: example.analysis }}></pre>
                    </div> :
                    <WordUnfold words="点击查看解析"
                                onUnfold={() => this.setState({ showTip: true })}/>
                }
              </div>
            }
            <ColumnSpan height={15}
                        style={{ margin: '2rem -2.5rem 0' }}/>
            <KnowledgeDiscussDistrict data={this.state.discussData}
                                      clickFunc={() => {
                                        this.context.router.push({
                                          pathname: '/rise/static/practice/submit/comment',
                                          query: {
                                            referenceId: this.state.knowledge.id,
                                            type: 1,
                                          },
                                        });
                                      }}/>
          </div>
          {
            practicePlanId &&
            <FooterButton btnArray={[
              {
                click: () => this.handleClickGoWarmup(practicePlanId),
                text: complete == 'true' ? '下一题' : '学完了，下一题',
              }]}/>
          }
        </div>
      </Block>
    );
  }
}
