import * as React from 'react';
import { connect } from 'react-redux';
import './Challenge.less';
import { loadChallengePractice, submitChallengePractice } from './async';
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions';
import Editor from '../../../components/simditor/Editor';
import { merge } from 'lodash';
import { mark } from '../../../utils/request';
import AssetImg from '../../../components/AssetImg';
import { ColumnSpan } from '../../../components/ColumnSpan';
import { Block } from '../../../components/Block';
import { ProblemTitle } from '../../problem/components/ProblemTitle';
import { FooterButton } from '../../../components/submitbutton/FooterButton';
import ChallengeDiscussDistrict from './challengeDiscussDistrict/ChallengeDiscussDistrict';

@connect(state => state)
export default class Challenge extends React.Component <any, any> {
  constructor () {
    super();
    this.state = {
      data: {},
      knowledge: {},
      submitId: 0,
      page: 1,
      otherList: [],
      opacity: 0,
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  componentWillMount () {
    mark({ module: '打点', function: '学习', action: '打开小目标页' });

    const { dispatch, location } = this.props;
    dispatch(startLoad());
    loadChallengePractice(location.query.id, location.query.planId).then(res => {
      dispatch(endLoad());
      const { code, msg } = res;
      if (code === 200) {
        const { content } = msg;
        this.setState({ data: msg, submitId: msg.submitId, planId: msg.planId, edit: !content });
      }
      else dispatch(alertMsg(msg));
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    });
  }

  onEdit () {
    this.setState({ edit: true });
  }

  goComment (submitId) {
    this.context.router.push({
      pathname: '/rise/static/practice/challenge/comment',
      query: merge({ submitId: submitId }, this.props.location.query),
    });
  }

  onSubmit () {
    mark({ module: '打点', function: '小目标', action: '提交小目标' });
    const { dispatch, location } = this.props;
    const { data, planId } = this.state;
    const { complete, practicePlanId } = location.query;
    const answer = this.refs.editor.getValue();
    if (answer == null || answer.length === 0) {
      dispatch(alertMsg('请填写作业'));
      return;
    }
    this.setState({ showDisable: true });
    submitChallengePractice(planId, location.query.id, { answer }).then(res => {
      const { code, msg } = res;
      if (code === 200) {
        dispatch(startLoad());
        if (complete == 'false') {
          dispatch(set('completePracticePlanId', practicePlanId));
        }
        loadChallengePractice(location.query.id, location.query.planId).then(res => {
          dispatch(endLoad());
          const { code, msg } = res;
          if (code === 200) {
            this.setState({ data: msg, submitId: msg.submitId, planId: msg.planId, edit: false });
          }
          else dispatch(alertMsg(msg));
        });
        this.setState({ showDisable: false });
      }
      else {
        dispatch(alertMsg(msg));
        this.setState({ showDisable: false });
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
      this.setState({ showDisable: false });
    });
  }

  render () {
    const { data, edit = false, showDisable } = this.state;
    const { content } = data;
    const { planId } = this.props.location.query;

    return (
      <Block>
        <ProblemTitle problemId={this.props.location.query.id}/>
        <div className="challenge-container">
          <div className="challenge-header">小目标</div>
          <div className="challenge-context">
            你有什么目标，可以利用本课程的训练实现呢？制定目标帮你更积极地学习，也带给你更多成就感！
          </div>

          <div className="intro-container">
            <AssetImg className='challenge-image'
                      url="https://static.iqycamp.com/images/fragment/challenge_practice_2.png"/>
            <div className="challenge-tips">
              <p className="tip-title">小提示</p>
              <p className="tip">本题答案仅自己可见</p>
              <p className="tip">目标最好是某个具体问题或场景</p>
              <p className="tip">制定目标之前，可以先回顾该课程的知识体系</p>
            </div>
          </div>

          <ColumnSpan style={{ margin: '0 -3rem' }}/>

          {
            edit ?
              <Block>
                <div className="working-tip">
                  <p>更喜欢电脑上提交?</p>
                  <p>登录www.iquanwai.com/community</p>
                </div>
                <Editor ref="editor"
                        moduleId={3}
                        value={content}
                        placeholder="有灵感时马上记录在这里吧，系统会自动为你保存。"/>
                {
                  showDisable ?
                    <FooterButton btnArray={[{ text: '提交中' }]}/> :
                    <FooterButton btnArray={[{ click: () => this.onSubmit(), text: '提交' }]}/>
                }
              </Block> :
              <Block>
                <ChallengeDiscussDistrict data={{
                  discuss: {
                    id: data.id,
                    avatar: window.ENV.headImgUrl,
                    addTime: data.submitUpdateTime,
                    content: data.content,
                    nickname: window.ENV.userName,
                    publishTime: data.submitUpdateTime,
                  },
                }}/>
                <FooterButton btnArray={[
                  {
                    click: () => this.context.router.push({ pathname: '/rise/static/plan/study', query: { planId } }),
                    text: '返回',
                  }]}/>
              </Block>
          }
          <AssetImg url="https://static.iqycamp.com/icon_bianji@2x-gmynhbel.png"
                    className="edit-icon"
                    onClick={() => this.setState({ edit: true })}/>
        </div>
      </Block>
    );
  }
}
