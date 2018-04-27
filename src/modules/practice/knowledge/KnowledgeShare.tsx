import * as React from 'react'
import { connect } from 'react-redux'
import './KnowledgeShare.less'
import { mark } from '../../../utils/request'
import AssetImg from '../../../components/AssetImg'
import Audio from '../../../components/Audio'
import WordUnfold from '../../../components/WordUnfold'
import { loadKnowledge } from './async'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'
import { mark } from '../../../utils/request'
import QYVideo from '../../../components/QYVideo'
import { ColumnSpan } from '../../../components/ColumnSpan'

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G'
}

@connect(state => state)
export default class KnowledgeShare extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      knowledge: {},
      showTip: false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ view: true, module: '打点', function: '学习', action: '打开知识点分享页面' })

    const { id, practicePlanId, complete } = this.props.location.query
    const { dispatch } = this.props
    dispatch(startLoad())
    loadKnowledge(id).then(res => {
      if(res.code === 200) {
        dispatch(endLoad())
        this.setState({ knowledge: res.msg })
      } else {
        dispatch(endLoad())
        dispatch(alertMsg(res.msg))
      }
    })
  }

  render() {
    const { knowledge, showTip } = this.state
    const {
      analysis, means, keynote, audio, audioWords, pic, example, analysisPic, meansPic, keynotePic, fileId,
      analysisAudio, analysisAudioWords, meansAudio, meansAudioWords, keynoteAudio, keynoteAudioWords, videoUrl, videoPoster, videoWords
    } = knowledge

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>
            {sequenceMap[ idx ]}
          </span>
          <span className={`subject`}>{subject}</span>
        </div>
      )
    }

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight ? sequenceMap[ idx ] + ' ' : '')
    }

    return (
      <div className="knowledge-share-container">
        <div className="follow-container">
          <img src="https://static.iqycamp.com/images/knowledge_share_head3.jpeg?imageslim"
               className="qrcode"/>
        </div>
        <div className="page-header">{knowledge.knowledge}</div>
        {
          videoUrl && <QYVideo videoUrl={videoUrl} videoPoster={videoPoster} videoWords={videoWords} fileId={fileId}/>
        }
        <div className="intro-container">
          {
            audio &&
            <div className="context-audio">
              <Audio url={audio} words={audioWords}/>
            </div>
          }
          {pic && <div className="context-img"><img src={pic}/></div>}
          {
            analysis &&
            <div>
              <div className="context-title-img">
                <AssetImg height={17} url="https://static.iqycamp.com/images/fragment/analysis3.png"/>
              </div>
              {analysisAudio &&
              <div className="context-audio"><Audio url={analysisAudio} words={analysisAudioWords}/></div>}
              <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: analysis }}/>
              </div>
              {analysisPic && <div className="context-img"><img src={analysisPic}/></div>}
            </div>
          }
          {
            means &&
            <div>
              <div className="context-title-img">
                <AssetImg height={17} url="https://static.iqycamp.com/images/fragment/means3.png"/>
              </div>
              {meansAudio && <div className="context-audio"><Audio url={meansAudio} words={meansAudioWords}/></div>}
              <div className="text">
                <pre dangerouslySetInnerHTML={{ __html: means }}/>
              </div>
              {meansPic && <div className="context-img"><img src={meansPic}/></div>}
            </div>
          }
          {
            keynote &&
            <div>
              <div className="context-title-img">
                <AssetImg height={17} url="https://static.iqycamp.com/images/fragment/keynote3.png"/>
              </div>
              {
                keynoteAudio &&
                <div className="context-audio"><Audio url={keynoteAudio} words={keynoteAudioWords}/></div>
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
                <AssetImg height={17} url="https://static.iqycamp.com/images/fragment/example2.png"/>
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
                  <WordUnfold words="点击查看解析" onUnfold={() => this.setState({ showTip: true })}/>
              }
            </div>
          }

          <div className="follow-container" style={{marginTop:'2.0rem'}}>
            <ColumnSpan />
            <img src="https://static.iqycamp.com/images/knowledge_share_tail2.jpeg?imageslim"
                 className="qrcode"/>
          </div>
        </div>
      </div>
    )
  }
}
