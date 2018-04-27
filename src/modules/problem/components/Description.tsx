import * as React from "react";
import "./Description.less";
import { mark } from 'utils/request'
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";
import AssetImg from "../../../components/AssetImg";
import { preview } from "../../helpers/JsConfig"

export default class Description extends React.Component <any, any> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentWillMount() {
      mark({ view: true, module: "打点", function: "付费相关", action: "打开会员说明页" })
    }

    view(e){
        let url = e.target.src
        preview(url, new Array(url))
    }

    render() {
        const {closeModal} = this.props
        return (
            <div className="description-page">
                <div className="container has-footer">
                    <div className="context"><b>【圈外同学】不同版本的差别</b></div>
                    <div className="context-img" onClick={(e)=>this.view(e)}><AssetImg url="https://static.iqycamp.com/images/fragment/difference1.jpg" width={'100%'}/></div>
                    <div className="context">1）关于<b>作业案例直播</b>：定期针对各个课程，以学员作业为案例，进行语音直播讲解和答疑，帮助理解</div>
                    <div className="context">2）关于<b>线下学习活动</b>：每场20-30人，圈外教练带领学习，并促进学员间进行职场社交，4月在上海施行，6月内推广到北京、深圳、广州，其它城市陆续推出，北上广深每个城市1年不少于6场</div>
                    <div className="context">3）关于<b>大咖直播分享</b>：定期针对学员需求，邀请相关大咖进行直播分享。比如很多学员之前提到“如何分析一个行业”，就邀请了一位朋友，之前在香港高盛，现在是Bloomberg某行业的全球主管，预计就在5月份。总之，圈外的直播，跟课程一样，频率不高，但都是精品，邀请合作讲师也是不看对方的流量、只看内容质量。</div>
                    <div className="context">4）关于<b>成为圈外教练</b>：是需要通过考核认证的，通过之后可以免费使用圈外所有学习产品，并接受线上线下的专属培训</div>
                    <div className="context"><b>【圈外同学】的学习体系</b></div>
                    <div className="context-img" onClick={(e)=>this.view(e)}><AssetImg url="https://static.iqycamp.com/images/fragment/difference2.jpg" width={'100%'}/></div>

                </div>
                <div className="button-footer" onClick={()=>closeModal()}>返回</div>
            </div>
        )
    }
}
