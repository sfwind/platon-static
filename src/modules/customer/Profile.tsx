import * as React from "react"
import {connect} from "react-redux"
import "./Profile.less"
import * as _ from "lodash"
import {set, startLoad, endLoad, alertMsg} from "redux/actions"
import DropDownList from  "./components/DropDownList"
import {pget, ppost} from "utils/request"
import {changeTitle} from "utils/helpers"
import { ButtonArea, Button } from "react-weui"


const industryList = [
  {id: "1", value: "互联网/电商"},
  {id: "2", value: "软件/IT服务"},
  {id: "3", value: "咨询"},
  {id: "4", value: "人力资源"},
  {id: "5", value: "法律"},
  {id: "6", value: "快消品"},
  {id: "7", value: "银行/证券/保险"},
  {id: "8", value: "机械/重工"},
  {id: "9", value: "房地产"},
  {id: "10", value: "学术/科研/院校"},
  {id: "11", value: "医药/医疗设备"},
  {id: "12", value: "通信/电子"},
  {id: "13", value: "计算机硬件/半导体"},
  {id: "14", value: "能源/化工"},
  {id: "15", value: "物流"},
  {id: "16", value: "政府/公共事业/非营利"},
  {id: "17", value: "其他"}
];


const workingLifeList = [
  {id: "2", value: "0"},
  {id: "3", value: "0~1年"},
  {id: "4", value: "1~3年"},
  {id: "5", value: "3~5年"},
  {id: "6", value: "5~7年"},
  {id: "7", value: "7~10年"},
  {id: "8", value: "10~15年"},
  {id: "9", value: "15年以上"}
];

@connect(state => state)
export default class Profile extends React.Component<any,any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      function: null,
      industry: null,
      workingLife: null,
      city: null,
      province: null,
      isFull: false,
    }
    this.btnWidth = 690/750 * window.innerWidth;
  }


  componentWillMount() {
    changeTitle("个人信息");
    const {dispatch,region}= this.props;
    dispatch(startLoad());
    pget('/rise/customer/profile')
      .then(res => {
        dispatch(endLoad());
        if (res.code === 200) {
          this.setState(res.msg);
        } else {
          dispatch(alertMsg(res.msg));
        }
      }).catch(err => {
      dispatch(endLoad());
      dispatch(alertMsg(err+""));
    });

    if (!region) {
      pget('/rise/customer/region')
        .then(res => {
          if (res.code === 200) {
            dispatch(set("region", res.msg));
          } else {
            dispatch(alertMsg(res.msg));
          }
        }).catch(err => dispatch(alertMsg(err.msg)));
    }
  }


  changeValue(path, value) {
    this.setState(_.set(_.merge({}, this.state), path, value))
  }

  bind(field, getValue) {
    return {
      value: this.state[field],
      onChange: (e) => {
        this.changeValue(field, getValue ? getValue(e) : e)
        this.checkIsFull()
      }
    }

  }

  getInputValue(e) {
    return e.currentTarget.value
  }

  onChoiceRegion(provinceRegion, cityRegion) {
    this.setState({province:provinceRegion.value,provinceId:provinceRegion.id,city:cityRegion.value,cityId:cityRegion.id});
    this.checkIsFull()
  }


  onChoiceIndustry(industry) {
    this.setState({industry:industry.value});
    this.checkIsFull()
  }

  onChoiceWorkingLife(workingLife) {
    this.setState({workingLife:workingLife.value});
    this.checkIsFull()
  }

  submitProfile() {
    const {dispatch}= this.props;
    const {city, province, industry, workingLife} = this.state;
    const functionValue = _.get(this.state, "function");
    if (city && province && industry && workingLife && functionValue) {
      dispatch(startLoad());
      ppost("/rise/customer/profile", {
        city: city,
        province: province,
        industry: industry,
        workingLife: workingLife,
        function: functionValue
      })
        .then(res => {
          dispatch(endLoad());
          if (res.code === 200) {
            dispatch(alertMsg("提交成功"));
            this.setState({isFull: true});
          } else {
            dispatch(alertMsg(res.msg));
          }
        }).catch(err => {
        dispatch(endLoad());
        dispatch(alertMsg(err+""));
      });
    } else {
      dispatch(alertMsg("请全部填写后提交"))
    }
  }

  checkIsFull(){
    const {city, province, industry, workingLife} = this.state;
    if (city && province && industry && workingLife){
      this.setState({isFull:true})
    }
  }

  render() {
    const {region} = this.props;
    const provinceList = _.get(region, "provinceList");
    const cityList = _.get(region, "cityList");
    const {city, province, cityId, provinceId, industry, workingLife,isFull} = this.state;
    const functionValue = _.get(this.state, "function");
    const renderFunction = () => {
        return (
          <div className={functionValue?"select-wrapper-has-no-cut":"select-wrapper"}>
            <input id="functionInput" placeholder="请填写" type="text" {...this.bind('function', this.getInputValue)}/>
          </div>
        )
    }

    const renderRegion = () => {
      const userData = [{value: province, id: provinceId}, {value: city, id: cityId}];
      return (
        <div className={provinceId && cityId?"select-wrapper-has":"select-wrapper"}>
          <DropDownList level={2} data={[provinceList,cityList]} userData={userData[1].id?userData:null}
            onChoice={(one,two)=>this.onChoiceRegion(one,two)}/>
        </div>
      )
    }

    const renderIndustry = () => {
      let myIndustry = {value: industry};
      for (let item in industryList) {
        if (_.isEqual(industryList[item].value, industry)) {
          myIndustry.id = industryList[item].id;
          break;
        }
      }

      return (
        <div className={industry?"select-wrapper-has":"select-wrapper"}>
          <DropDownList level={1} data={[industryList]} userData={myIndustry.id?[myIndustry]:null}
            onChoice={(one)=>this.onChoiceIndustry(one)}/>
        </div>
      )
    }

    const renderWorkingLife = () => {
      let myWorkingLife = {value: workingLife};
      for (let item in workingLifeList) {
        if (_.isEqual(workingLifeList[item].value, workingLife)) {
          myWorkingLife.id = workingLifeList[item].id;
          break;
        }
      }

      return (
        <div className={workingLife?"select-wrapper-has":"select-wrapper"}>
          <DropDownList level={1} data={[workingLifeList]} userData={myWorkingLife.id?[myWorkingLife]:null}
            onChoice={(one)=>this.onChoiceWorkingLife(one)}/>
        </div>
      )
    }

    const renderProfileHeader = () => {
      if (isFull) {
        return (
          <div className="profile-header-tip" style={{color:"#f7a466",backgroundColor:"#FFFFFF"}}>
            个人资料完整，30积分get！
          </div>
        )
      } else {
        return (
          <div className="profile-header-tip" style={{color:"#FFFFFF",backgroundColor:"#f9b685"}}>
            完整的个人资料=30积分
          </div>
        )
      }
    }
    return (
      <div className="profile">
        <div className="profile-header">
          {renderProfileHeader()}
        </div>
        <div className="profile-container">
          <div className="profile-item">
            <div className="item-label">
              工作年限
            </div>
            <div className="item-content">
              {renderWorkingLife()}
            </div>
          </div>
          <div className="profile-item">
            <div className="item-label">
              行业
            </div>
            <div className="item-content">
              {renderIndustry()}
            </div>
          </div>
          <div className="profile-item" style={{marginBottom:"10px",borderBottom:"none"}}>
            <div className="item-label">
              职业
            </div>
            <div className="item-content">
              {renderFunction()}
            </div>
          </div>
          <div className="profile-item" style={{borderBottom:"none"}}>
            <div className="item-label">
              省份/城市
            </div>
            <div className="item-content" id="region-select">
              {renderRegion()}
            </div>
          </div>
        </div>
        <div className="profile-bottom">
          <div className={`submit-btn ${isFull?'':'disabled'}`}  style={{width:`${this.btnWidth}px`}} onClick={this.submitProfile.bind(this)}>
            完成
          </div>
        </div>
      </div>
    )
  }
}
