import * as React from "react";
import "./KnowledgeViewer.less";
import AssetImg from "../../../components/AssetImg";
import Audio from "../../../components/Audio";

export default class KnowledgeViewer extends React.Component<any, any> {
  render() {
    const { knowledge, closeModal } = this.props
    const { analysis, means, keynote, audio,pic } = knowledge

    return (
      <div className="knowledge-page">
        <div className="container has-footer">
          <div className="warm-up-intro">
            <div className="page-header">{knowledge.knowledge}</div>
            <div className="intro-container">
              { audio ? <div className="context-audio">
                <Audio url={audio}/>
              </div> : null }
              { pic ? <div className="context-img">
                  <img src={pic}/>
                </div> : null }
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/analysis.png"/>
              </div>
              <div className="context">
                <pre>{analysis}</pre>
              </div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/means.png"/>
              </div>
              <div className="context">
                <pre>{means}</pre>
              </div>

              {keynote ?
                <div>
                  <div className="context-title-img">
                    <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/keynote.png"/>
                  </div>
                  <div className="context">
                    <pre>{keynote}</pre>
                  </div>
                </div>
                : null}

            </div>
          </div>
        </div>
        <div className="button-footer" onClick={closeModal}>关闭</div>
      </div>
    )
  }
}
