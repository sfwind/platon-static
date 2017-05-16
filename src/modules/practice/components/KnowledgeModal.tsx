import * as React from "react";
import {connect} from "react-redux"
import "./KnowledgeModal.less";
import AssetImg from "../../../components/AssetImg";
import Audio from "../../../components/Audio";

import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

@connect(state=>state)
const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

@connect(state=>state)
export default class KnowledgeViewer extends React.Component<any, any> {
  constructor(props) {
    super(props)
    this.state = {
      showTip:false,
      showDiscuss:false,
      commentId:0,
    }
  }

  componentWillMount(){
    console.log('in')
  }

  render() {
    const { knowledge } = this.props
    const { showTip } = this.state
    const { analysis, means, keynote, audio, pic,example } = knowledge

    const choiceRender = (choice, idx) => {
      const {id, subject} = choice
      return (
          <div key={id} className={`choice${choice.isRight ? ' right' : ''}`}>
          <span className={`index`}>
            {sequenceMap[idx]}
          </span>
            <span className={`subject`}>{subject}</span>
          </div>
      )
    }

    const rightAnswerRender = (choice, idx) => {
      return (choice.isRight? sequenceMap[idx]+' ' :'')
    }

    return (
      <div className="knowledge-container">
        <div className="close-button" onClick={()=>this.props.closeModal()}><AssetImg type="white_close_btn" size={32}/></div>
        <div className="pin"></div>
        <div className="knowledge-modal">
          <div className="page-header">{knowledge.knowledge}</div>
          <div className="intro-container">
            { audio ? <div className="context-audio"><Audio url={audio}/></div> : null }
            { pic ? <div className="context-img"><img src={pic}/></div> : null }
            { analysis?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/analysis2.png"/>
                  </div>
                  <div className="text">
                    <pre>{analysis}</pre>
                  </div>
                </div>
                : null}
            { means?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/means2.png"/>
                  </div>
                  <div className="text">
                    <pre>{means}</pre>
                  </div>
                </div>
                : null }
            {keynote ?<div><div className="context-title-img">
                  <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/keynote2.png"/>
                </div><div className="text">
                  <pre>{keynote}</pre>
                </div></div>: null}
            {example ?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/example.png"/>
                  </div>
                  <div className="question">
                    <div className="context" dangerouslySetInnerHTML={{__html: example.question}}></div>
                  </div>
                  <div className="choice-list">
                    {example.choiceList.map((choice, idx) => choiceRender(choice, idx))}
                  </div>

                  {showTip?
                  <div className="analysis">
                    <div className="title-bar">解析</div>
                    <div className="context">
                      正确答案：{example.choiceList.map((choice, idx) => rightAnswerRender(choice, idx))}
                    </div>
                    <div className="context"
                         dangerouslySetInnerHTML={{__html: example.analysis}}></div>
                  </div>
                      :<div className="analysis"><div className="analysis-tip" onClick={() => this.setState({showTip:true})}>点击查看解析</div></div>}
                </div>
            : null}
          </div>
        </div>
      </div>
    )
  }
}