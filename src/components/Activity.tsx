import * as React from "react";
import {connect} from "react-redux";
import "./Activity.less";
import AssetImg from "./AssetImg";

@connect(state=>state)
export default class Activity extends React.Component<any,any> {
    static contextTypes = {
        router: React.PropTypes.object.isRequired
    }
    constructor(props) {
        super(props);
        this.state = {
            url:this.props.url,
            pic:this.props.pic,
            show:true,
        }
    }


    componentWillMount() {

    }

    activityPage(){
        const {url} = this.state;
        const reg = new RegExp('^http|https');
        this.setState({show:false});
        if(reg.test(url)){
            window.location.href = url;
        }else{
            this.context.router.push(url);
        }
    }

    render() {
        const {pic, show} = this.state;

        return (
            show ?
            <div className="activity-modal">
                <div className="close" onClick={()=>this.setState({show:false})}>
                    <AssetImg type='white_close_btn' size={36}/>
                </div>
                <div className="activity-pic" onClick={()=>this.activityPage()}>
                    <AssetImg url={pic} width={'100%'}/>
                </div>
            </div>:null
        )
    }
}
