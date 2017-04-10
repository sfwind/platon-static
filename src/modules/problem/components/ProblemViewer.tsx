import * as React from "react";
import "./ProblemViewer.less";
import Audio from "../../../components/Audio";
import AssetImg from "../../../components/AssetImg";
import { Toast, Dialog } from "react-weui";
const { Alert } = Dialog

export default class ProblemViewer extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      showAlert: false,
      showTip: false,
      alert: {
        buttons: [
          {
            label: '再看看',
            onClick: this.close.bind(this)
          },
          {
            label: '想好了',
            onClick: ()=>{this.setState({showAlert:false});this.props.submitProblem(this.props.problem.id)}
          }
        ]
      }
    }
  }

  show() {
    this.setState({showAlert: true})
  }

  close() {
    this.setState({showAlert: false})
  }

  render() {
    const {closeModal, problem, readonly} = this.props;
    const {length, why, how, what, who, descPic, audio, roadMapList} = problem;
    const {showTip} = this.state

    const renderRoadMap = (roadMap, idx) => {
      return (
          <div key={idx}>
            <div className="roadmap">[第{roadMap.series}节]{'  '}{roadMap.intro}</div>
          </div>
      )
    }

    return (
      <div className="problem-page">
        <div className="container has-footer">
          <div className="problem-intro">
            <div className="page-header">{problem.problem}</div>
            <div className="page-content">
              { audio ? <div className="context-audio">
                <Audio url={audio}/>
              </div> : null }
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/why.png"/>
              </div>
              <div className="text">
                <pre>{why}</pre>
              </div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/how.png"/>
              </div>
              <div className="text">
                <pre>{how}</pre>
                <AssetImg width={'100%'} url={descPic}/>
              </div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/what.png"/>
              </div>
              <div className="text">
                <pre>{what}</pre>
                {roadMapList?roadMapList.map((roadMap, idx) => renderRoadMap(roadMap, idx)):null}
              </div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/who.png"/>
              </div>
              <div className="text">
                <pre>{who}</pre>
              </div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/when.png"/>
              </div>
              <div className="text">
                <div className="time-tip-content">推荐进度：每天学习1节，尽量完成其中的应用训练<br/><br/>

                  开放时长：至少需要学习{Math.round(length/2)}天，最长可学习30天
                  {showTip?<div className="tip"><br/>
                        说明：<br/>
                        如果选择快进，在{Math.round(length/2)}天内学完，那再复习一下吧，多做做应用题<br/>
                        专题最多开放30天，过期会自动关闭。是不是一下子有了学习的紧迫感？<br/>
                      </div>:<span onClick={()=>this.setState({showTip:true})}>
                        <AssetImg width={16} height={16} type="question-mark"/></span>}
                </div>

              </div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="http://www.iqycamp.com/images/fragment/where.png"/>
              </div>
              <div className="text">
                <div>手机微信：圈外训练营-RISE<br/><br/>

                  网站：www.iquanwai.com，点击RISE<br/>
                  (学过的专题永久开放，暂不支持理解训练）<br/><br/>

                  电脑微信（仅windows客户端）：圈外训练营-RISE</div>
              </div>
            </div>
          </div>
        </div>
        { readonly ? <div className="button-footer" onClick={()=>closeModal()}>返回</div> :
        <div className="button-footer">
          <div className="left" onClick={()=>closeModal()}>
            返回
          </div>
          <div className="right" onClick={()=>this.show()}>
            选择
          </div>
        </div>
          }
        <Alert { ...this.state.alert }
          show={this.state.showAlert}>
          <p>选择后，需要完成该专题，才能开启下一专题，想好了吗？</p>
        </Alert>
      </div>
    )
  }
}
