import * as React from "react";
import { connect } from "react-redux";
import "./ProblemIntroduction.less"
import Audio from "../../components/Audio";
import AssetImg from "../../components/AssetImg";
import {startLoad, endLoad, alertMsg} from "redux/actions";
import {loadProblem, createPlan, checkCreatePlan} from "./async";
import { Toast, Dialog } from "react-weui";
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
        this.context.router.push({pathname: '/rise/static/learn'})
      } else {
        dispatch(alertMsg(msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex))
    })
  }

  render(){
    const {data = {}} = this.state;
    const { difficultyScore,catalog,subCatalog,pic, authorDesc, length, why, how, what, who, descPic, audio, chapterList, problem, categoryPic} = data;

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

    const renderWho = (who) => {
      if(who){
        let whoArr = who.split(";");
        return whoArr.map((item,key)=>{
          return (
            <div className="who-item" key={key}>
              <span className="wi-sequence">{key+1}</span><span className="wi-text">{item}</span>
            </div>
          )
        });
      } else {
        return null;
      }
    };

    return (
      <div className="problem-introduction">
        <div className="pi-header">
          <img className="pi-h-bg" src={`${pic}`}/>
          <div className="pi-h-body">
            <div className="pi-h-b-icon"><AssetImg type="rise_icon_problem_introduction" size={37}/></div>
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
            <Header icon="rise_icon_introduction_book" title="知识体系"/>
            <div className="pi-c-s-content">
              <AssetImg width={'100%'} url={descPic}/>
              <pre className="pi-c-s-text" dangerouslySetInnerHTML={{__html:how}}/>
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
            <Header icon="rise_icon_man" title="适合人群"/>
            <div className="pi-c-m-content">
              {renderWho(who)}
            </div>
          </div>
          <div className="pi-c-ability white-content mg-25">
            <Header icon="rise_icon_ability" title="能力项"/>
            <div className="pi-c-a-content">
              <div className="text">在RISE，我们的小课都根据“个人势能模型”进行设计，本小课在模型中的能力项为：</div>
              <AssetImg width={'100%'} url={categoryPic} marginTop="25"/>
              <div className="text2"
                   onClick={()=>window.location.href='https://mp.weixin.qq.com/s?__biz=MzA5ODI5NTI5OQ==&mid=2651673801&idx=1&sn=c0bc7ad463474f5d8f044ae94d8e6af7&chksm=8b6a3fa5bc1db6b335c423b51e8e987c0ba58546c9a4bcdba1c6ea113e710440e099981fac22&mpshare=1&scene=1&srcid=0522JbB9FCiJ2MLTYIJ9gHp8&key=97c2683b72ba12a9fe14a4718d1e2fc1db167b4659eda45c59be3b3c39723728975cf9c120462d5d896228edb74171fb9bfefc54a6ff447b7b3389e626e18744f9dca6103f6a3fbeb523c571631621eb&ascene=0&uin=MjYxMjUxOTM4MA%3D%3D&devicetype=iMac+MacBookPro11%2C1+OSX+OSX+10.10.5+build(14F27)&version=12010310&nettype=WIFI&fontScale=100&pass_ticket=sl95nanknHuEvflHY9fNI6KUKRA3koznfByp5C1nOV70kROWRuZNqQwkqvViYXiw'}
              >了解"个人势能模型"</div>

            </div>
          </div>
        </div>
      </div>
    );
  }
}

interface HeaderProps{
  icon:string,
  title:string
}

class Header extends React.Component<HeaderProps,any>{
  constructor(props:HeaderProps){
    super(props);
  }

  render(){
    return (
      <div className="page-item-header">
        <div className="pih-icon">
          <AssetImg type={this.props.icon} size={20}/>
        </div>
        <div className="pih-title">
          {this.props.title}
        </div>
      </div>
    )
  }
}
