import * as React from "react";
import { connect } from "react-redux";
import { welcome,trial,becomRiser } from "./async";
import "./Welcome.less";
import { welcome } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import Description from "./components/Description"
import Scroll from "react-scroll";

@connect(state => state)
export class Welcome extends React.Component <any, any> {

  constructor(){
    super();
    this.state = {
      scroll:Scroll.animateScroll,
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
    welcome().then((res)=>{
      dispatch(endLoad());
      if(res.code === 200){
        if(res.msg){
          this.context.router.push({
            pathname: '/rise/static/problem/priority'
          })
        }
      }
    }).catch(ex=>{
      dispatch(endLoad());
    })
  }

  componentDidMount(){
    welcome()
    setTimeout(() => {
      this.setState({show:true})
    }, 1100)
    setTimeout(() => {
      this.setState({show2:true})
    }, 3100)

    setTimeout(() => {
      this.setState({show3:true})
    }, 4100)
  }

  onSubmit(){
    this.context.router.push({
      pathname: '/rise/static/problem/priority'
    })
  }

  goTrial(){
    trial();
    this.context.router.push({
      pathname: '/rise/static/problem/priority'
    })
  }

  becomeRiser(){
    becomRiser();
    window.location.href = `http://${window.location.hostname}/pay/pay`
  }

  got(){
    const {scroll} = this.state

    setTimeout(() => {
      this.setState({show4:true, confirm:true})
    }, 300)

    setTimeout(() => {
      this.setState({show5:true})
    }, 2300)

    setTimeout(() => {
      scroll.scrollTo(this.refs.welcome.offsetHeight)
    }, 2300)

    setTimeout(() => {
      this.setState({show6:true})
    }, 4300)


    setTimeout(() => {
      scroll.scrollMore(this.refs.welcome2.offsetHeight)
    }, 4300)

    setTimeout(() => {
      this.setState({show7:true})
    }, 5300)

    setTimeout(() => {
      scroll.scrollTo(400)
    }, 5300)
  }

  closeModal(){
    this.setState({description:false})
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
                        <img className="description-logo" src="http://www.iqycamp.com/images/fragment/description_logo.png"/>
                        <div className="guide-msg">
                          Hi，你来啦！我是你的移动端RISE教练
                        </div>
                      </div>:null}
                </div>
                <div>
                  {show2?
                      <div>
                        <img className="description-logo" src="http://www.iqycamp.com/images/fragment/description_logo.png"/>
                        <div className="guide-msg">
                          你知道吗？从你了解一个知识概念，到能够真正运用，解决实际问题，中间还差一个刻意练习的距离
                        </div>
                      </div>:null}
                </div>
                {!confirm && show3?
                    <div className="button-div" style={{marginTop:70}}>
                      <img className={"button"} src="http://www.iqycamp.com/images/fragment/rise_welcome_confirm.png"
                           onClick={this.got.bind(this)}/>

                    </div>:null}
                {show4?
                  <div className="right-div">
                    <div className="reply-msg" ref="welcome">
                      赞同
                    </div>
                    <img className={"head"} src={window.ENV.headImage}/>
                  </div>
                :null}
                {show5 ?
                    <div>
                      <img className="description-logo" src="http://www.iqycamp.com/images/fragment/description_logo.png"/>
                      <div className="guide-msg" ref="welcome2">
                        在RISE，你可以根据需要选择专题，我会据此制定你的每日训练计划，来帮助你学习知识、实践应用、解决问题
                      </div>
                    </div>:null
                }

                {show6 ?
                    <div>
                      <img className="description-logo" src="http://www.iqycamp.com/images/fragment/description_logo.png"/>
                      <div className="guide-msg" ref="welcome3">
                        现在，选择你感兴趣的版本，我们开始吧
                      </div>
                    </div>:null
                }

                <div>
                  <div className="button-div" style={{marginTop:50}}>
                    {show7 ?
                    <img className={"button"} src="http://www.iqycamp.com/images/fragment/rise_welcome_pay.png"
                         onClick={()=>this.becomeRiser()}/>:null}
                  </div>
                  <div className="button-div" style={{marginTop:25}}>
                    {show7 ?
                    <img className={"button"} src="http://www.iqycamp.com/images/fragment/rise_welcome_try.png"
                         onClick={()=>this.goTrial()}/>:null}
                  </div>
                </div>

              </div>
              {show7 ?
                  <div className="little-bg">
                    <img width={110} height={113}
                         src="http://www.iqycamp.com/images/fragment/rise_welcome_little_bg.png"/>
                  </div>: null
              }
              {show7?
                  <div className="tips" onClick={()=>this.setState({description:true})}>
                    <span>什么是专业版／试用版</span>
                    <img height={12} width={12} src="http://www.iqycamp.com/images/fragment/question_rise.png"/>
                  </div>:null
              }
            </div>
        }
      </div>
    )
  }
}
