import * as React from "react";
import "./KnowledgeViewer.less";
import AssetImg from "../../../components/AssetImg";
import Audio from "../../../components/Audio";
import { startLoad, endLoad, alertMsg } from "../../../redux/actions";

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G',
}

export default class KnowledgeViewer extends React.Component<any, any> {
  constructor(props) {
    super()
    this.state = {
      showTip:false,
    }
  }

  render() {
    const { knowledge, closeModal } = this.props
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
      <div className={`knowledge-page${closeModal? '': ' no-footer'}`}>
        <div className={`container${closeModal? ' has-footer': ''}`}>
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
                    <div className="discuss">
                      评论平六年
                    </div>
                </div>
            : null}


            </div>
        </div>
        {closeModal?<div className="button-footer" onClick={closeModal}>返回</div>:null}
      </div>
    )
  }
}
