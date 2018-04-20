import * as React from 'react';
import { connect } from 'react-redux';
import './ProblemPreview.less';
import Audio from '../../../components/Audio';
import {
  learnPreview, loadPreview,
} from './async';
import { set } from '../../../redux/actions';
import { mark } from '../../../utils/request';
import QYVideo from '../../../components/QYVideo';
import { FooterButton } from '../../../components/submitbutton/FooterButton';
import { Block } from '../../../components/Block';
import { SectionProgressHeader } from '../components/SectionProgressHeader';

@connect(state => state)
export default class ProblemPreview extends React.Component<any, any> {
  constructor () {
    super();
    this.state = {
      preview: {},
    };
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  };

  async componentWillMount () {
    const { dispatch } = this.props;
    mark({ module: '打点', function: '学习', action: '打开知识点页面' });
    const { id, practicePlanId, complete } = this.props.location.query;

    if (practicePlanId) {
      let res = await loadPreview(practicePlanId);
      this.setState({ preview: res.msg });

      if (complete == 'false') {
        // 完成练习动效
        dispatch(set('completePracticePlanId', practicePlanId));
      }
    }
  }

  async handleClickGoKnowledge (practicePlanId) {
    const { dispatch } = this.props;
    mark({ module: '打点', function: '课前思考', action: '完成课前思考' });
    let res = await learnPreview(practicePlanId);
    this.refs.sectionProgress.goNextPage();
  }

  render () {
    const { preview } = this.state;
    const {
      description, audio, audioWords, videoUrl, videoPoster, videoWords,
    } = preview;
    const { location } = this.props;
    const { practicePlanId, planId, complete } = location.query;

    return (
      <Block>
        <div className="preview-container">
          {
            <SectionProgressHeader ref={'sectionProgress'}
                                   practicePlanId={practicePlanId}
                                   planId={planId}/>
          }
          {
            videoUrl && <QYVideo videoUrl={videoUrl}
                                 videoPoster={videoPoster}
                                 videoWords={videoWords}/>
          }
          <div className="intro-container">
            {
              audio &&
              <div className="context-audio">
                <Audio url={audio}
                       words={audioWords}/>
              </div>
            }
            <div className="description">
              <pre dangerouslySetInnerHTML={{ __html: description }}/>
            </div>
          </div>
          {
            practicePlanId &&
            <FooterButton btnArray={[
              {
                click: () => this.handleClickGoKnowledge(practicePlanId),
                text: complete == 'true' ? '下一题' : '学完了，下一题',
              }]}/>
          }
        </div>
      </Block>
    );
  }
}
