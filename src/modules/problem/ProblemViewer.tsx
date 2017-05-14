import * as React from "react";
import {connect} from "react-redux";
import "./ProblemViewer.less";
import Audio from "../../components/Audio";
import AssetImg from "../../components/AssetImg";
import {startLoad, endLoad, alertMsg} from "redux/actions";
import {loadProblem, createPlan, checkCreatePlan} from "./async";
import { Toast, Dialog } from "react-weui";
const { Alert } = Dialog

@connect(state => state)
export class ProblemViewer extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super();
    this.state = {
      data:{},
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
            onClick: this.submitProblem.bind(this),
          }
        ]
      }
    }
  }

  componentWillMount(){
    const {dispatch, location} = this.props
    const {id} = location.query
    dispatch(startLoad())
    loadProblem(id).then(res=>{
      dispatch(endLoad())
      const {msg, code} = res
      if(code === 200){
        this.setState({data:msg})
      }else{
        dispatch(alertMsg(msg))
      }
    })
  }

  submitProblem() {
    this.setState({showAlert:false})
    const {dispatch, location} = this.props
    dispatch(startLoad())
    createPlan(location.query.id).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        this.context.router.push({pathname: '/rise/static/plan/main'})
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  show() {
    checkCreatePlan(this.props.location.query.id).then(res=>{
      if(res.code === 200){
        this.setState({showAlert: true})
      }
    })
  }

  close() {
    this.setState({showAlert: false})
  }

  render() {
    const {data, showTip} = this.state;
    const {show} = this.props.location.query
    const {length, why, how, what, who, descPic, audio, chapterList, problem} = data;

    const renderRoadMap = (chapter, idx) => {
      const {sections} = chapter
      return (
          <div key={idx}>
            <div className={'chapter'}><b>{'第'+chapter.chapter+'章 '}{chapter.name}</b></div>
            {sections?sections.map((section, idx) => renderSection(section, idx, chapter.chapter)):null}
          </div>
      )
    }

    const renderSection = (section, idx, chapter) => {
      return (
          <div key={idx}>
            <div className={'section'}>{chapter}{'.'}{section.section+'节 '}{section.name}</div>
          </div>
      )
    }

    return (
      <div className="problem-page">
        <div className={`container ${show?'':'has-footer'}`}>
          <div className="problem-intro">
            <div className="page-header">{problem}</div>
            <div className="page-content">
              { audio ? <div className="context-audio">
                <Audio url={audio}/>
              </div> : null }
              <div style={{marginTop:30}}>
                <pre>{why}</pre>
              </div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="https://www.iqycamp.com/images/fragment/how_2.png"/>
              </div>
              <pre>{how}</pre>
              <AssetImg width={'100%'} style={{marginTop:25}} url={descPic}/>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="https://www.iqycamp.com/images/fragment/what_2.png"/>
              </div>
              <pre>{what}</pre>
              <div className="roadmap">{chapterList?chapterList.map((chapter, idx) => renderRoadMap(chapter, idx)):null}</div>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="https://www.iqycamp.com/images/fragment/who_2.png"/>
              </div>
              <pre><b>{who}</b></pre>
              <div className="context-title-img">
                <AssetImg width={'100%'} url="https://www.iqycamp.com/images/fragment/when_2.png"/>
              </div>
              <div className="text">随开随学，进度自控</div>
              <div className="text">教研团队的推荐进度：每天1节，保证学习效果</div>

              <div className="text"><div className="time-tip-content"><b>开放时长：</b>30天
                  {showTip?<div className="tip"><br/>
                        说明：<br/>
                        本小课最少开放{Math.round(length/2)}天，最多开放30天，过期会自动关闭。是不是一下子有学习的紧迫感了？<br/>
                      </div>:<div className="tip-img" onClick={()=>this.setState({showTip:true})}>
                        <AssetImg width={16} height={16} type="question-mark"/></div>}
              </div></div>


              <div className="context-title-img">
                <AssetImg width={'100%'} url="https://www.iqycamp.com/images/fragment/where_2.png"/>
              </div>
              <div className="text">随时随地，多客户端</div>
              <div className="text"><b>手机微信：</b>圈外学习号-RISE</div>
              <div className="text"><b>网站：</b>www.iquanwai.com，点击RISE</div>
              <div className="text"><b>电脑微信（仅windows客户端）：</b>圈外学习号-RISE</div>
            </div>
          </div>
        </div>
        { show ?
            null
            :
        <div className="button-footer" onClick={()=>this.show()}>
            选择
        </div>
          }
        <Alert { ...this.state.alert }
          show={this.state.showAlert}>
          <p className="global-pre">选择后，需要完成该小课，才能开启下一小课，想好了吗？</p>
        </Alert>
      </div>
    )
  }
}
