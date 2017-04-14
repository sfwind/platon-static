import * as React from "react";
import { connect } from "react-redux";
import { welcome,trial,becomRiser } from "./async";
import "./Welcome.less";
import { welcome } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";
import Description from "./components/Description"

@connect(state => state)
export class Welcome extends React.Component <any, any> {

  constructor(){
    super();
    this.state = {
      show:false,
      show2:false,
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
    }, 100)
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
    setTimeout(() => {
      this.setState({show2:true, confirm:true})
    }, 300)
  }

  closeModal(){
    this.setState({description:false})
  }

  render() {
    const {show,show2,confirm,description} = this.state


    return (
      <div>

        {description?
            <Description closeModal={this.closeModal.bind(this)}/>:

            <div className="problem-list">
              <div className="info">
                <div>
                  <img className={show?"show first":"hide first"} src="http://www.iqycamp.com/images/fragment/rise_welcome_1_2.png"/>
                </div>
                <div>
                  <img className={show?"show second":"hide second"} src="http://www.iqycamp.com/images/fragment/rise_welcome_2_2.png"/>
                </div>
                {!confirm?
                    <div className="button-div">
                      <img className={show?"show button1":"hide button1"} src="http://www.iqycamp.com/images/fragment/rise_welcome_confirm.png"
                           onClick={this.got.bind(this)}/></div>:null
                }
                <div className="right-div">
                  <img className={show2?"show third":"hide third"} src="http://www.iqycamp.com/images/fragment/rise_welcome_3_2.png"/>
                  <img className={show2?"show head":"hide head"} src={window.ENV.headImage}/>
                </div>
                <div>
                  <img className={show2?"show fourth":"hide fourth"} src="http://www.iqycamp.com/images/fragment/rise_welcome_4_2.png"/>
                </div>
                <div className="button-div">
                  <img className={`${show2?"show button2":"hide button2"}`} src="http://www.iqycamp.com/images/fragment/rise_welcome_pay.png"
                       onClick={()=>this.becomeRiser()}/>
                </div>
                <div className="button-div">
                  <img className={`${show2?"show button3":"hide button3"}`} src="http://www.iqycamp.com/images/fragment/rise_welcome_try.png"
                       onClick={()=>this.goTrial()}/>
                </div>
              </div>
              <div className="little-bg">
                <img width={110} height={113} src="http://www.iqycamp.com/images/fragment/rise_welcome_little_bg.png"/>
              </div>
              {show2?
                  <div className="tips">
                    <span>什么是专业版／试用版</span><img height={12} width={12} src="http://www.iqycamp.com/images/fragment/question_rise.png"
                                                onClick={()=>this.setState({description:true})}/>
                  </div>:null
              }
            </div>
        }
      </div>
    )
  }
}
