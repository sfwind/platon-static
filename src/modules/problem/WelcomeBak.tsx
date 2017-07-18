import * as React from "react";
import { connect } from "react-redux";
import { welcome,mark } from "./async";
import "./WelcomeBak.less";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import Description from "./components/Description"
// import Scroll from "react-scroll";
import {scroll} from "../../utils/helpers"
import AssetImg from "../../components/AssetImg"


@connect(state => state)
export class Welcome extends React.Component <any, any> {

  constructor(){
    super();
    this.state = {
      show:false,
      show2:false,
      show3:false,
      show4:false,
      show5:false,
      show6:false,
      show7:false,
      confirm:false,
      description:false,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    // 查看是否试用版
    const {dispatch} = this.props;
    dispatch(startLoad());
    mark({module:"打点",function:"付费相关",action:"打开",memo:"欢迎页"});
    welcome().then((res)=>{
      dispatch(endLoad());
      if(res.code === 200){
        if(res.msg){
          // TODO 临时注释，测试防止跳转
          // this.context.router.push({
          //   pathname: '/rise/static/problem/explore'
          // })
        }
      }
    }).catch(ex=>{
      dispatch(endLoad());
    })
  }

  componentDidMount(){
    setTimeout(() => {
      this.setState({show:true})
    }, 500)
    setTimeout(() => {
      this.setState({show2:true})
    }, 1500)

    setTimeout(() => {
      this.setState({show3:true})
    }, 2500)
  }

  goTrial(){
    mark({module:"打点",function:"付费相关",action:"点击试用版",memo:"欢迎页"}).then(()=>{
      this.context.router.push({
        pathname: '/rise/static/problem/explore'
      })
    })
  }

  becomeRiser(){
    mark({module:"打点",function:"付费相关",action:"点击成为RISER",memo:"欢迎页"}).then(()=>{
      window.location.href = `https://${window.location.hostname}/pay/pay`
    }).catch(()=>{
      window.location.href = `https://${window.location.hostname}/pay/pay`
    });
  }

  play(){
    mark({module:"打点",function:"付费相关",action:"点击怎么练习呢",memo:"欢迎页"});
    // var autoScroll = Scroll.animateScroll;
    setTimeout(() => {
      this.setState({show4:true, confirm:true})
    }, 300)

    setTimeout(() => {
      this.setState({show5:true}, ()=>scroll('#welcome', '.problem-list'))
    }, 800)

    setTimeout(() => {
      this.setState({show6:true}, ()=> scroll('#welcome2', '.problem-list'))
    }, 2800)


    setTimeout(() => {
      this.setState({show7:true}, ()=>scroll('#welcome3', '.problem-list'))
    }, 4800)
  }

  closeModal(){
    this.setState({description:false},()=>{ scroll('.info', '.problem-list')})
  }

  handleClickWhatIsVersion(){
    mark({module:"打点",function:"首页",action:"点击什么是正式版",memo:"欢迎页"});
    this.setState({description:true})
  }

  render() {
    const {show,show2,show3,show4,show5,show6,show7,confirm,description} = this.state


    return (
      <div>

        {description?
            <Description closeModal={this.closeModal.bind(this)}/>:

            <div className="problem-list">
              <div className="info">
                <div>
                  {show?
                      <div>
                        <img className="description-logo" src="https://static.iqycamp.com/images/fragment/description_logo.png?imageslim"/>
                        <div className="guide-msg">
                          Hi，你来啦！我是你的移动端RISE教练
                        </div>
                      </div>:null}
                </div>
                <div>
                  {show2?
                      <div>
                        <img className="description-logo" src="https://static.iqycamp.com/images/fragment/description_logo.png?imageslim"/>
                        <div className="guide-msg">
                          相信你也知道，我们从了解知识概念、到用它来解决问题，中间还差一个刻意练习的距离。RISE就提供这样的刻意练习
                        </div>
                      </div>:null}
                </div>
                {!confirm && show3?
                    <div className="button-div" style={{marginTop:70}}>
                      <img className={"button"} src="https://static.iqycamp.com/images/fragment/rise_welcome_confirm_2.png?imageslim"
                           onClick={this.play.bind(this)}/>
                    </div>:null}
                {show4?
                    <div className="right-div">
                      <div className="reply-msg" id="welcome">
                        怎样练习呢？
                      </div>
                      <img className={"head"} src={window.ENV.headImage}/>
                    </div>
                    :null}

                {show5 ?
                    <div>
                      <img className="description-logo" src="https://static.iqycamp.com/images/fragment/description_logo.png?imageslim"/>
                      <div className="guide-msg" id="welcome2">
                        你可以根据需要，选择要学习的RISE小课，我会据此制定你的练习计划，来帮助你学习知识、实践应用、解决问题
                      </div>
                    </div>:null
                }

                {show6 ?
                    <div>
                      <img className="description-logo" src="https://static.iqycamp.com/images/fragment/description_logo.png?imageslim"/>
                      <div className="guide-msg" id="welcome3">
                        选择正式版，开始学习所有小课吧！如果你不确定，也可以点击试用版，选择体验一个小课的前3节内容
                      </div>
                    </div>:null
                }

                <div>
                  <div className="button-div" style={{marginTop:50}}>
                    {show7 ?
                    <img className={"button"} src="https://static.iqycamp.com/images/fragment/rise_welcome_pay_2.png?imageslim"
                         onClick={()=>this.becomeRiser()}/>:null}
                  </div>
                  <div className="button-div" style={{marginTop:25}}>
                    {show7 ?
                    <img className={"button"} src="https://static.iqycamp.com/images/fragment/rise_welcome_try.png?imageslim"
                         onClick={()=>this.goTrial()}/>:null}
                  </div>
                </div>

              </div>
              {show7 ?
                  <div className="little-bg">
                    <AssetImg width={110} height={113} url="https://static.iqycamp.com/images/fragment/rise_welcome_little_bg.png"/>
                  </div>: null
              }
              {show7?
                  <div className="tips" onClick={()=>this.handleClickWhatIsVersion()}>
                    <span>什么是正式版／试用版</span>
                    <AssetImg style={{margin:'-1px 0'}} size={12} url="https://static.iqycamp.com/images/fragment/question_rise.png"/>
                  </div>:null
              }
            </div>
        }
      </div>
    )
  }
}
