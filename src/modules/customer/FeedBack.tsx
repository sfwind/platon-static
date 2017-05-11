import * as React from "react"
import "./FeedBack.less"
import {changeTitle} from "utils/helpers"
import {pget, ppost} from "utils/request"


export default class FeedBack extends React.Component<any,any>{
  constructor(props){
    super(props);
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    changeTitle("帮助");
    pget("/rise/customer/feedback/open");
  }

  render(){
    return (
      <div className="feedback">
        <div onClick={()=>this.context.router.push("/rise/static/customer/userprotocol")} className="feedback-header arrow">
          用户协议
        </div>
        <div className="feedback-container">
          <div className="tip">
            <p style={{fontSize:'15px',fontWeight:'bolder'}}>有疑问或建议，请给后台留言</p>
            <div className="serverCode">
              <img src="https://www.iqycamp.com/images/personalFeedbackv1.png"/>
            </div>
            <p style={{fontSize:'15px',fontWeight:'bolder'}}>常见问题</p><br/>

            <p className="q">-巩固练习的选择题是单项还是多项呢？</p>
            <p>-都是不定项选择，可能有1或多个答案</p><br/>

            <p className="q">-做完巩固练习后有疑问，怎么办？</p>
            <p>-下方的问答区可以提问，被回答后会在首页的消息中心通知你</p><br/>

            <p className="q">-页面文字看起来太小/太大</p>
            <p>-点击右上角三个点，可以调整文字大小</p><br/>

            <p className="q">-可以在电脑端完成RISE练习吗？</p>
            <p>-windows电脑可以在微信客户端—圈外训练营里打开RISE并完成练习，mac微信客户端暂不支持。小课论坛、应用练习和小目标，都可以登录www.iquanwai.com/community完成</p><br/>


            <p className="q">-为什么我的练习任务显示锁定？</p>
            <p>-之前的巩固练习或知识点没有完成</p><br/>

            <p className="q"> -为什么我的小课到期关闭了？</p>
            <p>-书非借不能读，为了每个人能有动力坚持完成练习，每个小课的开放天数=30天(拖延症福利)，到期后自动关闭</p>
          </div>
        </div>
      </div>
    )
  }

}
