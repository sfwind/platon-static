import * as React from "react"
import "./FeedBack.less"
import {changeTitle} from "utils/helpers"
import {mark} from "../problem/async"
import AssetImg from "../../components/AssetImg";


export default class FeedBack extends React.Component<any,any>{
  constructor(props){
    super(props);
  }
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount(){
    changeTitle("帮助");
    mark({module: "打点", function: "帮助", action: "打开帮助页面"})
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
              <AssetImg url="https://static.iqycamp.com/images/personalFeedbackv2.png"/>
            </div>
            <p style={{fontSize:'15px',fontWeight:'bolder'}}>常见问题</p><br/>

            <p className="q">-可以在电脑端完成圈外小课练习吗？</p>
            <p>-可以登录www.iquanwai.com/community完成</p><br/>

            <p className="q">-为什么我的小课到期关闭了？</p>
            <p>-书非借不能读，为了每个人能有动力坚持完成练习，每个小课的开放天数=30天(拖延症福利)，到期后自动关闭</p><br/>

            <p className="q">-课程的老师是谁啊？</p>
            <p>-圈外的小课多数是圈圈设计、整个团队一同打磨出来的，另外的是和一些业界大V合作开发的</p><br/>

            <p className="q">还想了解更多【商学院】的使用问题？戳链接直达：</p>
            <p><a style={{color:'#55cbcb',textDecoration:'underline'}} href="https://shimo.im/doc/TlGjkheoUysG7ME2?r=L8QE82/">
              {'https://shimo.im/doc/TlGjkheoUysG7ME2?r=L8QE82/'}</a>
            </p>
            <br/>
          </div>
        </div>
        <div className="padding-footer"/>
      </div>
    )
  }
}
