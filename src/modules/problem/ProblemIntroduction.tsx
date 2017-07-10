import * as React from "react";
import { connect } from "react-redux";
import "./ProblemIntroduction.less"
import Audio from "../../components/Audio";
import AssetImg from "../../components/AssetImg";
import {startLoad, endLoad, alertMsg} from "redux/actions";
import {loadProblem, createPlan, checkCreatePlan} from "./async";
import { Toast, Dialog } from "react-weui";
import { merge } from "lodash";
const { Alert } = Dialog
const numeral = require('numeral');



@connect(state=>state)
export default class ProblemIntroduction extends React.Component<any,any>{

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(){
    super();
    this.state = {
      data:{},
      showAlert: false,
      showTip: false,
      tipMsg:"",
      alert: {
        buttons: [
          {
            label: '再看看',
            onClick: this.handleClickClose.bind(this)
          },
          {
            label: '想好了',
            onClick: this.handleClickSubmitProblem.bind(this),
          }
        ]
      },
      show:true,
    };
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
        console.log(msg);
      }else{
        dispatch(alertMsg(msg))
      }
    })
    this.picHeight = (window.innerWidth / (750 / 350)) > 175 ? 175 : (window.innerWidth / (750 / 350));
    this.headerContentTop = (window.innerWidth / (750 / 104)) > 52 ? 52 : (window.innerWidth/(750 / 104));
    this.headerContentLeft = (window.innerWidth / (750 / 50)) > 25 ? 25 : (window.innerWidth / (750 / 25));
    this.whoFontSize = (window.innerWidth / (750 / 30)) > 15 ? 15 : (window.innerWidth / (750 / 30));
    this.whoNumFontSize = (window.innerWidth / (750 / 48)) > 24 ? 24 : (window.innerWidth / (750 / 48));
  }

  handleClickClose() {
    this.setState({showAlert: false})
  }

  handleClickSubmitProblem() {
    this.setState({showAlert:false})
    const {dispatch, location} = this.props
    dispatch(startLoad())
    createPlan(location.query.id).then(res => {
      dispatch(endLoad())
      const {code, msg} = res
      if (code === 200) {
        this.context.router.push({pathname: '/rise/static/learn',query:{planId:res.msg}});
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  handleClickShow() {
    const {dispatch} = this.props
    checkCreatePlan(this.props.location.query.id).then(res=>{
      if(res.code === 201){
        // 选第二门了，需要提示
        this.setState({showAlert: true,tipMsg:res.msg})
      } else if(res.code === 200) {
        this.handleClickSubmitProblem();
      } else {
        dispatch(alertMsg(res.msg))
      }
    })
  }

  render(){
    const {data = {}} = this.state;
    const {show} = this.props.location.query

    const { difficultyScore,catalog,subCatalog,pic, authorDesc, length, why, how, what, who, descPic, audio, chapterList, problem, categoryPic, authorPic} = data;

    const renderCatalogName = (catalog,subCatalog) => {
      if(catalog && subCatalog) {
        return `#${catalog}-${subCatalog}`;
      } else if(catalog){
        return `#${catalog}`
      } else {
        return null;
      }
    }


    const renderRoadMap = (chapter, idx) => {
      const {sections} = chapter
      return (
        <div key={idx} className="chapter-item">
          <div className={'chapter'}>{'第'+chapter.chapter+'章 '}{chapter.name}</div>
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

    const renderWho = (who) => {
      if(who){
        let whoArr = who.split(";");
        if(whoArr.length === 1){
          return (
            <div className="who-item">
              <span style={{fontSize:`${this.whoFontSize}px`}} className="wi-text just-one">{who}</span>
            </div>
          );
        } else {
          return whoArr.map((item,key)=>{
            return (
              <div className="who-item" key={key}>
                <span style={{fontSize:`${this.whoNumFontSize}px`}} className="wi-sequence">{key+1}</span><span style={{fontSize:`${this.whoFontSize}px`}} className="wi-text">{item}</span>
              </div>
            )
          });
        }
      } else {
        return null;
      }
    };

    return (
      <div className="problem-introduction">
        <div className="pi-header" style={{height:`${this.picHeight}px`}}>
          <img className="pi-h-bg" src={`${pic}`}/>
          <div className="pi-h-body">
            <div className="pi-h-b-icon"><AssetImg url="https://static.iqycamp.com/images/rise_icon_problem_introduction.png?imageslim" size={37}/></div>
            <div className="pi-h-b-title left">{problem}</div>
            <div className="pi-h-b-content left">{renderCatalogName(catalog, subCatalog)}</div>
            <div className="pi-h-b-content left bottom">{`难度系数：${numeral(difficultyScore).format('0.0')}/5.0`}</div>
          </div>
        </div>
        <div className="pi-content">
          <div className="pi-c-foreword white-content">
            <div className="pi-c-f-header">
              <div className="pi-c-f-icon">
                <AssetImg type="rise_icon_lamp" width={24} height={29}/>
              </div>
              <div className="pi-c-f-h-title">
                引言
              </div>
            </div>
            <div className="pi-c-f-content">
              { audio ? <div className="context-audio">
                <Audio url={audio}/>
              </div> : null }
              <div>
                <pre className="pi-c-f-c-text">{why}</pre>
              </div>
            </div>

          </div>
          <div className="pi-c-system white-content mg-25">
            <Header icon="rise_icon_introduction_book" title="知识体系" lineHeight={"12px"} height={17}/>
            <div className="pi-c-s-content">
              <pre className="pi-c-s-text" dangerouslySetInnerHTML={{__html:how}}/>
              <AssetImg width={'100%'} url={descPic} marginTop={"15px"}/>
            </div>
          </div>
          <div className="pi-c-learn white-content mg-25">
            <Header icon="rise_icon_book" title="学习大纲"/>
            <div className="pi-c-l-content">
              {what?<pre className="pi-c-text" dangerouslySetInnerHTML={{__html:what}}/> :null}
              <div className="roadmap">{chapterList?chapterList.map((chapter, idx) => renderRoadMap(chapter, idx)):null}</div>
            </div>
          </div>
          <div className="pi-c-man white-content mg-25">
            <Header icon="rise_icon_man" title="适合人群"  width={18}/>
            <div className="pi-c-m-content">
              {renderWho(who)}
            </div>
          </div>
          <div className="pi-c-ability white-content mg-25">
            <Header icon="rise_icon_ability" title="能力项" marginLeft={"-1em"}/>
            <div className="pi-c-a-content">
              <div className="text" dangerouslySetInnerHTML={{__html:"在RISE，我们的小课都根据“个人势能模型”进行设计，本小课在模型中的能力项为："}}></div>
              <div className="pi-c-a-c-module" onClick={()=>window.location.href='https://mp.weixin.qq.com/s?__biz=MzA5ODI5NTI5OQ==&mid=2651673801&idx=1&sn=c0bc7ad463474f5d8f044ae94d8e6af7&chksm=8b6a3fa5bc1db6b335c423b51e8e987c0ba58546c9a4bcdba1c6ea113e710440e099981fac22&mpshare=1&scene=1&srcid=0522JbB9FCiJ2MLTYIJ9gHp8&key=97c2683b72ba12a9fe14a4718d1e2fc1db167b4659eda45c59be3b3c39723728975cf9c120462d5d896228edb74171fb9bfefc54a6ff447b7b3389e626e18744f9dca6103f6a3fbeb523c571631621eb&ascene=0&uin=MjYxMjUxOTM4MA%3D%3D&devicetype=iMac+MacBookPro11%2C1+OSX+OSX+10.10.5+build(14F27)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=sl95nanknHuEvflHY9fNI6KUKRA3koznfByp5C1nOV70kROWRuZNqQwkqvViYXiw'}>
                <div className="pi-c-a-c-m-rise">RISE</div>
                <div className="pi-c-a-c-m-text">
                  个人势能模型
                </div>
              </div>
              <AssetImg width={'100%'} url={categoryPic} marginTop="10"/>
            </div>
          </div>
          <div className="pi-c-author white-content mg-25">
            <Header icon="rise_icon_head" title="讲师介绍" width={26} height={16} lineHeight={"12px"}/>
            <AssetImg width={'100%'} url={authorPic} />
          </div>
          <div className="pi-c-learn-term white-content mg-25">
            <Header icon="rise_icon_learn_term" title="学习期限"/>
            <div className="pi-c-l-t-text special">
              随开随学，进度自控
            </div>
            <div className="pi-c-l-t-text">
              教研团队的推荐进度：每天1节，保证学习效果
            </div>
            <div className="pi-c-l-t-text">
              开放时间：30天
            </div>
          </div>
          <div className="pi-c-tool white-content mg-25">
            <Header icon="rise_icon_tool" title="学习工具"/>
            <div className="pi-c-t-text">
              随时随地，多客户端
            </div>
            <div className="pi-c-t-content">
              <div className="pi-c-t-item">
                <AssetImg url="https://static.iqycamp.com/images/rise_phone.png" width="120px"/>
                <div className="platform">
                  手机端
                </div>
                <div className="sub-title">
                  “圈外学习号”
                </div>
              </div>
              <div className="pi-c-t-item">
                <AssetImg url="https://static.iqycamp.com/images/rise_pcv2.png" width="120px"/>
                <div className="platform">
                  网站
                </div>
                <div className="sub-title">
                  www.iquanwai.com
                </div>
              </div>
            </div>
          </div>
        </div>
        {show?null:<div className="padding-footer" style={{height:'45px'}}/>}

        { show ?
          null
          :
          <div className="button-footer" onClick={()=>this.handleClickShow()}>
            学习该小课
          </div>
        }

        <Alert { ...this.state.alert }
          show={this.state.showAlert}>
          <div className="global-pre">{this.state.tipMsg}</div>
        </Alert>
      </div>
    );
  }
}

interface HeaderProps{
  icon:string,
  title:string,
  size?:number,
  width?:number,
  height?:number,
  marginLeft?:number,
  lineHeight?:number,
}

class Header extends React.Component<HeaderProps,any>{
  constructor(props:HeaderProps){
    super(props);
  }

  render(){
    const renderSize = () => {
      if(!this.props.size && !this.props.width && !this.props.height){
        return 20;
      } else {
        return this.props.size;
      }
    };
    return (
      <div className="page-item-header">
        <div className="pih-icon-container">
          <div className="pih-icon" style={{marginLeft:this.props.marginLeft,lineHeight:this.props.lineHeight?this.props.lineHeight:0}} >
            <AssetImg type={this.props.icon} size={renderSize()} width={this.props.width} height={this.props.height}/>
          </div>
          <div className="pih-title">
            {this.props.title}
          </div>
        </div>
      </div>
    );
  }
}
