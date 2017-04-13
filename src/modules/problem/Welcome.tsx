import * as React from "react";
import { connect } from "react-redux";
import { remove } from "lodash";
import { welcome,trial,becomRiser } from "./async";
import "./Welcome.less";
import { welcome } from "./async";
import { startLoad, endLoad, alertMsg } from "redux/actions";

@connect(state => state)
export class Welcome extends React.Component <any, any> {

  constructor(){
    super();
    this.state = {
      show:false,
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
        this.setState({riseMember:res.msg});
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

  render() {
    const {show,riseMember} = this.state


    const renderButton = (buttons)=>{
      return buttons;
    }

    return (
      <div>
        <div className="problem-list">
          <div className="info">
            <img className={show?"show first":"hide first"} src="http://www.iqycamp.com/images/fragment/rise_welcome_1_1.png"/>
            <img className={show?"show second":"hide second"} src="http://www.iqycamp.com/images/fragment/rise_welcome_2.png"/>
            <img className={show?"show third":"hide third"} src="http://www.iqycamp.com/images/fragment/rise_welcome_3.png"/>
          </div>
          <div className="tips" onClick={()=>this.context.router.push("/rise/static/member/explain")}>
            什么是专业版／试用版？
          </div>
        </div>
        <div className="button-footer white-button">
          {riseMember?<div onClick={()=>this.onSubmit()}>下一步</div>:
            renderButton([<div className="button" onClick={()=>this.goTrial()}>试用版</div>,
                        <div className="button" onClick={()=>this.becomeRiser()}>成为RISEER</div>])
          }

        </div>
      </div>
    )
  }
}
