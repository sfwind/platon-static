import * as React from 'react'
import { connect } from 'react-redux'
import './Profile.less'
import * as _ from 'lodash'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import DropDownList from './components/DropDownList'
import { pget, ppost, mark } from 'utils/request'
import { loadUserProfileInfo } from './async'
import { changeTitle } from 'utils/helpers'
import { MarkBlock } from '../../components/markblock/MarkBlock'
import MobileBindComponent from './components/MobileBindComponent'

const industryList = [
  { id: '1', value: '互联网/电商' },
  { id: '2', value: '软件/IT服务' },
  { id: '3', value: '咨询' },
  { id: '4', value: '人力资源' },
  { id: '5', value: '法律' },
  { id: '6', value: '快消品' },
  { id: '7', value: '银行/证券/保险' },
  { id: '8', value: '机械/重工' },
  { id: '9', value: '房地产' },
  { id: '10', value: '教育/学术/科研/院校' },
  { id: '11', value: '医药/医疗设备' },
  { id: '12', value: '通信/电子' },
  { id: '13', value: '计算机硬件/半导体' },
  { id: '14', value: '能源/化工' },
  { id: '15', value: '物流' },
  { id: '16', value: '政府/公共事业/非营利' },
  { id: '17', value: '学生' },
  { id: '18', value: '其他' }
]

const marryList = [
  { id: '0', value: '已婚' },
  { id: '1', value: '未婚有对象' },
  { id: '2', value: '单身' }
]
/*-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
 1. 项目名称：platon-static
 2. 文件功能：入学完善个人信息页
 3. 作者： yangren@iquanwai.com
 4. 备注：
 -----------------------------------------------------------------------------------------------------------------------------------------------------------------------*/


@connect(state => state)
export default class Profile extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      function: null,
      industry: null,
      workingLife: null,
      city: null,
      province: null,
      isFull: false,
      workingTime: null,
      realName: null,
      address: null,
      receiver: null,
      married: null,
      mobile: '',
      code:null
    }
    this.btnWidth = 690 / 750 * window.innerWidth
  }

  componentWillMount() {
    mark({ module: '打点', function: '个人中心', action: '打开我的信息页面' })
    changeTitle('个人信息')
    const { dispatch, region } = this.props
    dispatch(startLoad())
    loadUserProfileInfo().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
          this.setState(_.merge({}, res.msg))
          this.checkCanSubmit()
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(err => {
      dispatch(endLoad())
      dispatch(alertMsg(err + ''))
    })

    if(!region) {
      pget('/rise/customer/region').then(res => {
        if(res.code === 200) {
          dispatch(set('region', res.msg))
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(err => dispatch(alertMsg(err.msg)))
    }

    // workingTime
    let workingYearList = []
    let date = new Date()
    let year = date.getFullYear()
    for(let i = 1960; i <= year; i++) {
      workingYearList.push({ id: '' + i, value: '' + i })
    }
    this.setState({ workingYearList: workingYearList })
  }

  changeValue(path, value, callback) {
    this.setState(_.set(_.merge({}, this.state), path, value), () => {
      if(callback) {
        callback()
      }
    })
  }

  bind(field, getValue) {
    return {
      value: this.state[field],
      onChange: (e) => {
        this.changeValue(field, getValue ? getValue(e) : e, () => {
          this.checkCanSubmit()
        })
      }
    }

  }

  getInputValue(e) {
    return e.currentTarget.value
  }

  onChoiceRegion(provinceRegion, cityRegion) {
    this.setState({
      province: provinceRegion.value,
      provinceId: provinceRegion.id,
      city: cityRegion.value,
      cityId: cityRegion.id
    }, () => {
      this.checkCanSubmit()
    })
  }

  onChoiceIndustry(industry) {
    this.setState({ industry: industry.value }, () => {
      this.checkCanSubmit()
    })
  }

  onChoiceWorkingYear(workingYear) {
    this.setState({ workingYear: workingYear.value }, () => {
      this.checkCanSubmit()
    })
  }

  onChoiceMarry(marry) {
    this.setState({ married: marry.value })
  }

  checkCanSubmit() {
    const functionValue = _.get(this.state, 'function')
    const { location } = this.props
    const { goRise } = location.query
    const { workingYear, province, city, industry, realName, receiver, address, mobile,mobileNo, weixinId } = this.state
    if(goRise) {
      if(workingYear && province && city && industry && functionValue && realName && receiver && address && mobileNo && (mobile || weixinId)) {
        this.setState({ canSubmit: true })
        return true
      }
    } else {
      if(workingYear && province && city && industry && functionValue && (mobile || weixinId)) {
        this.setState({ canSubmit: true })
        return true
      }
    }
    this.setState({ canSubmit: false })
    return false
  }

  submitProfile() {
    const { dispatch, location } = this.props
    const {
      city, province, industry, workingYear, realName, address, receiver, married, company,
      college,
      mobile,
      weixinId,
      email,
      introduction, mobileNo,code
    } = this.state
    const functionValue = _.get(this.state, 'function')
    const {goCamp } = location.query

    if(this.checkCanSubmit()) {
      let param = {
        city: city,
        province: province,
        industry: industry,
        workingYear: workingYear,
        function: functionValue,
        rate: 0
      }

      if(!_.isEmpty(introduction) && introduction.length >= 300) {
        dispatch(alertMsg('个人简介内容过长'))
        return
      }

      if(!_.isEmpty(company) && company.length>=30){
        dispatch(alertMsg('公司名称最长不能超过30字哦'))
        return
      }

      _.merge(param, {
        realName, address, receiver, married, company,
        college,
        mobile,
        weixinId,
        email,
        introduction, mobileNo,mobile,code
      })
      dispatch(startLoad())
      ppost('/rise/customer/profile', param).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          if(goCamp){
            window.location.href = `/rise/static/camp`
          }else{
            window.location.href = `/rise/static/rise`
          }
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(err => {
        dispatch(endLoad())
        dispatch(alertMsg(err + ''))
      })
    } else {
      dispatch(alertMsg('请全部填写后提交'))
    }
  }

  /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    子组件修改渲染父级页面回调函数设置手机号
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
  changeMobile(v) {
    this.setState({
      mobile: v
    })
    this.checkCanSubmit()
  }

  /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    子组件修改渲染父级页面回调函数设置code
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
  changeCode(v) {
    this.setState({
      code: v
    })
    this.checkCanSubmit()
  }

  /*++-----------------------------------------------------------------------------------------------------------------------------------------------------------------------
    子组件修改渲染父级页面回调函数修改微信号
    -----------------------------------------------------------------------------------------------------------------------------------------------------------------------++*/
  changeWeiXinId(v) {
    this.setState({
      weixinId: v
    })
    this.checkCanSubmit()
  }

  render() {
    const { mobile, weixinId } = this.state
    const { region, location } = this.props

    const { goCamp, goRise } = location.query

    const provinceList = _.get(region, 'provinceList')
    const cityList = _.get(region, 'cityList')
    const { city, province, cityId, provinceId, industry, workingYearList, workingYear, address, married, canSubmit, introduction } = this.state
    const renderFunction = () => {
      return (
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="functionInput" placeholder="请填写" type="text" {...this.bind('function', this.getInputValue)}/>
        </div>
      )
    }

    const renderCompany = () => {
      return (
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="company" placeholder="请填写" type="text" {...this.bind('company', this.getInputValue)}/>
        </div>
      )
    }

    const renderCollege = () => {
      return (
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="college" placeholder="请填写" type="text" {...this.bind('college', this.getInputValue)}/>
        </div>
      )
    }

    const renderMail = () => {
      return (
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="email" placeholder="请填写" type="text" {...this.bind('email', this.getInputValue)}/>
        </div>
      )
    }

    const renderTel = () => {
      return (
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="mobileNo" placeholder="请填写" type="number" {...this.bind('mobileNo', this.getInputValue)}/>
        </div>
      )
    }

    const renderRegion = () => {
      const userData = [{ value: province, id: provinceId }, { value: city, id: cityId }]
      return (
        <MarkBlock module={'打点'} func={'个人信息页'} action={'选择居住地点'}
                   className={provinceId && cityId ? 'select-wrapper-has' : 'select-wrapper-choice'}>
          <DropDownList level={2} data={[provinceList, cityList]} userData={userData[1].id ? userData : null}
                        placeholder="请选择"
                        onChoice={(one, two) => this.onChoiceRegion(one, two)}/>
        </MarkBlock>
      )
    }

    const renderRealName = () => {
      return (
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="realName" placeholder="请填写" type="text" {...this.bind('realName', this.getInputValue)}/>
        </div>
      )
    }

    const renderReceiver = () => {
      return (
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="receiver" placeholder="请填写" type="text" {...this.bind('receiver', this.getInputValue)}/>
        </div>
      )
    }

    const renderIndustry = () => {
      let myIndustry = { value: industry }
      for(let item in industryList) {
        if(_.isEqual(industryList[item].value, industry)) {
          myIndustry.id = industryList[item].id
          break
        }
      }

      return (
        <MarkBlock module={'打点'} func={'个人信息页'} action={'选择行业'}
                   className={industry ? 'select-wrapper-has' : 'select-wrapper-choice'}>
          <DropDownList level={1} data={[industryList]} userData={myIndustry.id ? [myIndustry] : null} placeholder="请选择"
                        onChoice={(one) => this.onChoiceIndustry(one)}/>
        </MarkBlock>
      )
    }

    const renderMarried = () => {
      let myMarried = { value: married }
      for(let item in marryList) {
        if(_.isEqual(marryList[item].value, married)) {
          myMarried.id = marryList[item].id
          break
        }
      }

      return (
        <MarkBlock module={'打点'} func={'个人信息页'} action={'选择感情状态'}
                   className={married ? 'select-wrapper-has' : 'select-wrapper-choice'}>
          <DropDownList level={1} data={[marryList]} userData={myMarried.id ? [myMarried] : null}
                        placeholder="请选择"
                        onChoice={(one) => this.onChoiceMarry(one)}/>
        </MarkBlock>
      )
    }

    const renderWorkingYear = () => {
      let myWorkingLife = { value: workingYear }
      for(let item in workingYearList) {
        if(_.isEqual(workingYearList[item].value, workingYear)) {
          myWorkingLife.id = workingYearList[item].id
          break
        }
      }

      return (
        <MarkBlock module={'打点'} func={'个人信息页'} action={'选择工作年份'}
                   className={workingYear ? 'select-wrapper-has' : 'select-wrapper-choice'}>
          <DropDownList level={1} data={[workingYearList]} userData={myWorkingLife.id ? [myWorkingLife] : null}
                        defaultData={[{ id: '2000', value: '2000' }]}
                        onChoice={(one) => this.onChoiceWorkingYear(one)}/>
        </MarkBlock>
      )
    }

    return (
      <div className="profile">
        <div className="go-rise">
          <div className="guide">
            {goCamp ?
              <div className="first-guide">填写工作和所在城市<br/>才能加入校友会！</div>
              : <div className="first-guide">填写工作、所在城市还有邮寄信息，<br/>才能加入校友会和收到入学礼包哦！</div>}
            <div className="second-guide">数据仅用于提升学习服务，圈外会严格保密。</div>
          </div>
        </div>
        <div className="interval">

        </div>

        <div className="profile-container">
          <div className="title-container">
            基本信息
          </div>
          {/*//手机绑定组件*/}
          <MobileBindComponent mobile={mobile} weixinId={weixinId} changeMobile={this.changeMobile.bind(this)} changeCode={this.changeCode.bind(this)} changeWeiXinId={this.changeWeiXinId.bind(this)} dispatch={this.props.dispatch}/>

          <div className="profile-item">
            <div className="item-label">
              首次参加工作年份
            </div>
            <div className="working-year-content">
              {renderWorkingYear()}
            </div>
          </div>

          <div className="profile-item">
            <div className="item-label">
              所在城市
            </div>
            <div className="item-content" id="region-select">
              {renderRegion()}
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

          <div className="profile-item">
            <div className="item-label">
              所在公司/机构
            </div>
            <div className="item-content">
              {renderCompany()}
            </div>
          </div>


          <div className="profile-item">
            <div className="item-label">
              目前职位
            </div>
            <div className="item-content">
              {renderFunction()}
            </div>
          </div>

          <div className="title-container">
            详细信息
          </div>

          <div className="profile-item">
            <div className="item-label">
              毕业院校
            </div>
            <div className="item-content">
              {renderCollege()}
            </div>
          </div>


          <div className="profile-item">
            <div className="item-label">
              邮箱
            </div>
            <div className="item-content">
              {renderMail()}
            </div>
          </div>

          <div className="profile-item">
            <div className="item-label">
              感情状态（选填）
            </div>
            <div className="working-year-content">
              {renderMarried()}
            </div>
          </div>

          <div className="introduction-container">
            <div className="introduction-header">
              个人简介
            </div>
            <div className="introduction-body">
              <textarea cols="30" rows="10"
                        placeholder="示例：王婷出生于新疆伊宁，上海财经大学电子商务专业毕业后，她先后服务于国际知名咨询公司IBM和德硕管理咨询，为各行业企业提供管理咨询服务，6年后加入德国汉高，担任亚太业务流程顾问经理一职。工作之余，王婷喜欢电影、体育和尝试不同国家的美食。她期望能够在圈外读书期间跟大家交朋友。"
                        value={introduction}
                        onChange={(e) => this.setState({ introduction: e.currentTarget.value })}/>
            </div>
          </div>

          {goRise &&
          <div className="title-container">
            邮寄信息（本信息用于邮寄你的圈外商学院礼包）
          </div>
          }

          {goRise &&
          <div className="profile-item">
            <div className="item-label">
              真实姓名
            </div>
            <div className="item-content">
              {renderRealName()}
            </div>
          </div>
          }

          {goRise &&
          <div className="profile-item">
            <div className="item-label">
              收件人
            </div>
            <div className="item-content">
              {renderReceiver()}
            </div>
          </div>
          }

          {goRise &&
          <div className="profile-item">
            <div className="item-label">
              联系电话
            </div>
            <div className="item-content">
              {renderTel()}
            </div>
          </div>
          }
          {goRise &&
          <div className="profile-item">
            <div className="address-tips">收件地址</div>
            <textarea className="address" placeholder="请填写" value={address}
                      onChange={(e) => this.setState({ address: e.currentTarget.value }, () => {
                        this.checkCanSubmit()
                      })}
            />
          </div>
          }

        </div>
        <div className="profile-bottom">
          <div
            className={`submit-btn ${canSubmit ? '' : 'disabled'}`} style={{ width: `${this.btnWidth}px` }}
            onClick={this.submitProfile.bind(this)}>
            完成
          </div>
        </div>
      </div>
    )
  }
}
