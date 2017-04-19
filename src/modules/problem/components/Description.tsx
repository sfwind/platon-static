import * as React from "react";
import "./Description.less";
import {memberDescription} from "../async"
import {startLoad, endLoad, alertMsg} from "../../../redux/actions";

export default class Description extends React.Component <any, any> {

    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }

    componentWillMount() {
        memberDescription()
    }

    render() {
        const {closeModal} = this.props
        return (
            <div className="description-page">
                <div className="container has-footer">
                    <div className="context">
                        选择正式版，你可以学习RISE所有的小课，并收获：
                        <ul>
                            <li>系统学习所有知识</li>
                            <li>将知识内化为能力</li>
                            <li>解决实际工作问题</li>
                            <li>参与案例分析直播</li>
                            <li>得到圈外教练的反馈</li>
                            <li>参加线下工作坊</li>
                        </ul>
                    </div>
                    <div className="context">
                        选择试用版，可以试学其中一个小课前3组的内容
                    </div>
                </div>
                <div className="button-footer" onClick={()=>closeModal()}>返回</div>
            </div>
        )
    }
}
