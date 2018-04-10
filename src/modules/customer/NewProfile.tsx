import * as React from 'react'
import { connect } from 'react-redux'
import './NewProfile.less'
import * as _ from 'lodash'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import DropDownList from './components/DropDownList'
import { pget, ppost, mark } from 'utils/request'
import { loadUserProfileInfo } from './async'
import { changeTitle } from 'utils/helpers'
import { MarkBlock } from '../../components/markblock/MarkBlock'

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

/**
 * 个人信息修改页
 */
@connect(state => state)
export default class NewProfile extends React.Component<any, any> {
  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor(props) {
    super(props)
    this.state = {
      nickName: window.ENV.userName,
      memberTypeId: null,
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
      married: null
    }
    this.btnWidth = 690 / 750 * window.innerWidth
  }

  componentWillMount() {
    mark({ module: '打点', function: '个人中心', action: '打开我的信息页面' })
    changeTitle('个人信息')
    const { dispatch, region, location } = this.props
    dispatch(startLoad())
    loadUserProfileInfo().then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        let defaultIsFull = res.msg.isFull
        this.setState(_.merge({}, { defaultIsFull: defaultIsFull }, res.msg), () => {
        })
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
    for(let i = 1960; i <= 2017; i++) {
      workingYearList.push({ id: '' + i, value: '' + i })
    }
    this.setState({ workingYearList: workingYearList })
  }

  componentDidMount() {
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
          this.checkIsFull()
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
      this.checkIsFull()
    })
  }

  onChoiceIndustry(industry) {
    this.setState({ industry: industry.value }, () => {
      this.checkIsFull()
    })
  }

  modifyPhoto(headImgUrl) {
    this.context.router.push({
      pathname: `/rise/static/customer/modify/headImg`,
      query: {
        headImgUrl: headImgUrl
      }
    })
  }

  onChoiceWorkingYear(workingYear) {
    this.setState({ workingYear: workingYear.value }, () => {
      this.checkIsFull()
    })
  }

  onChoiceMarry(marry) {
    this.setState({ married: marry.value })
  }

  checkFull() {
    const functionValue = _.get(this.state, 'function')
    const { memberTypeId, nickName, city, province, industry, workingYear, realName, address, receiver } = this.state
    if(memberTypeId === 3) {
      if(nickName && city && province && industry && workingYear && functionValue && realName && address && receiver) {
        return true
      }
    } else {
      if(nickName && city && province && industry && workingYear && functionValue && realName) {
        return true
      }
    }
    return false
  }

  submitProfile() {
    const { dispatch } = this.props
    const { nickName, city, province, industry, workingYear, realName, address, receiver, married } = this.state
    const functionValue = _.get(this.state, 'function')
    if(this.checkFull()) {
      let param = {
        nickName: nickName,
        city: city,
        province: province,
        industry: industry,
        workingYear: workingYear,
        function: functionValue
      }

      _.merge(param, { realName: realName, address: address, receiver: receiver, married })
      dispatch(startLoad())
      ppost('/rise/customer/new/profile', param).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          dispatch(alertMsg('提交成功'))
          window.ENV.userName = nickName
          this.setState({ isFull: true })
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

  checkIsFull() {
    let isFull = this.checkFull()
    this.setState({ isFull: isFull })
    return isFull
  }

  goMobileCheck() {
    this.context.router.push({
      pathname: '/rise/static/customer/mobile/check',
      query: { person: true }
    })
  }

  render() {
    const { region } = this.props

    const provinceList = _.get(region, 'provinceList')
    const cityList = _.get(region, 'cityList')
    const { memberTypeId, memberId, phone, riseId, className, city, province, cityId, provinceId, industry, isFull, bindMobile, defaultIsFull, workingYearList, workingYear, realName, address, receiver, married } = this.state
    const renderFunction = () => {
      return (
        <div className='select-wrapper-has-no-cut'>
          <input id="functionInput" placeholder="请填写" type="text" {...this.bind('function', this.getInputValue)}/>
        </div>
      )
    }

    const renderRegion = () => {
      const userData = [{ value: province, id: provinceId }, { value: city, id: cityId }]
      return (
        <MarkBlock module={'打点'} func={'个人信息页'} action={'选择居住地点'}
                   className={province ? 'select-wrapper-has' : 'select-wrapper-choice'}>
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
        <div className={'select-wrapper-has-no-cut'} style={{ marginRight: 0 }}>
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

    const renderProfileHeader = () => {
      if(isFull) {
        return (
          <div className="profile-header-tip" style={{ color: '#f7a466', backgroundColor: '#FFFFFF' }}>
            个人资料完整，30积分get！
          </div>
        )
      } else {
        return (
          <div className="profile-header-tip" style={{ color: '#FFFFFF', backgroundColor: '#f9b685' }}>
            完整的个人资料=30积分
          </div>
        )
      }
    }

    const renderClassInfo = () => {
      return (
        <div className="profile-container">
          <div className="profile-item">
            <div className="item-label">
              学号
            </div>
            <div className="item-content">
              {memberId}
            </div>
          </div>
          <div className="profile-item">
            <div className="item-label">
              班级
            </div>
            <div className="item-content">
              {className}
            </div>
          </div>
        </div>
      )
    }

    const renderPhoto = () => {
      return (
        <div className='select-wrapper-has'>
          <img
            src={window.ENV.headImgUrl}
            style={{ width: 40, marginTop: 10 }}/>
        </div>
      )
    }

    const renderNickName = () => {
      return (
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="nickName" placeholder="请填写" type="text" {...this.bind('nickName', this.getInputValue)}/>
        </div>
      )
    }

    const renderCompany = () => {
      return(
        <div className='select-wrapper-has-no-cut' style={{ marginRight: 0 }}>
          <input id="company" placeholder="请填写" type="text" {...this.bind('company', this.getInputValue)}/>
        </div>
      )
    }


    const renderTel = () => {
      return (
        <div className='select-wrapper-has'>
          {phone}
        </div>
      )
    }
    return (
      <div className="new-profile">
        <div className="profile-header">
          {renderProfileHeader()}
        </div>

        {!_.isEmpty(memberId) && renderClassInfo()}

        <div className="profile-container">
          <div className="title-container">
            基本信息
          </div>
          <div className="profile-item">
            <div className="item-label">
              昵称
            </div>
            <div className="item-content">
              {renderNickName()}
            </div>
          </div>

          <MarkBlock module={'个人中心'} func={'个人信息页'} action={'点击修改头像'}
                     onClick={() => this.modifyPhoto(window.ENV.headImgUrl)}
                     className="profile-item">
            <div className="item-label">
              头像
            </div>
            <div className="item-content">
              {renderPhoto()}
            </div>
          </MarkBlock>

          <div className="profile-item">
            <div className="item-label">
              首次参加工作年份
            </div>
            <div className="item-content">
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
              {renderFunction()}
            </div>
          </div>

          <div className="profile-item">
            <div className="item-label">
              手机号
            </div>
            <div className="item-content">
              {renderFunction()}
            </div>
          </div>

          <div className="profile-item">
            <div className="item-label">
              微信号
            </div>
            <div className="item-content">
              {renderFunction()}
            </div>
          </div>


          <div className="profile-item">
            <div className="item-label">
              邮箱
            </div>
            <div className="item-content">
              {renderFunction()}
            </div>
          </div>

          <div className="profile-item">
            <div className="item-label">
              感情状态（选填）
            </div>
            <div className="item-content">
              {renderMarried()}
            </div>
          </div>

          <div className="profile-item">
            <div className="item-label">
              感情状态（选填）
            </div>
            <div className="item-content">
              {renderMarried()}
            </div>
          </div>
          <div className="introduction-container">
            <div className="introduction-header">
              个人简介
            </div>
            <div className="introduction-body">
              <textarea placeholder="请填写个人简介">

              </textarea>
            </div>

          </div>

          {memberTypeId===3 || memberTypeId ===8 &&
            <div className="title-container">
              邮寄信息（本信息用于邮寄你的圈外商学院礼包）
            </div>
          }

          {memberTypeId===3 || memberTypeId ===8 &&
            <div className="profile-item">
              <div className="item-label">
                真实姓名
              </div>
              <div className="item-content">
                {renderRealName()}
              </div>
            </div>
          }

          {memberTypeId===3 || memberTypeId ===8 &&
            <div className="profile-item">
              <div className="item-label">
                收件人
              </div>
              <div className="item-content">
                {renderReceiver()}
              </div>
            </div>
          }

          {memberTypeId===3 || memberTypeId ===8 &&
            <MarkBlock module={'个人中心'} function={'个人信息页'} action={'点击修改联系方式'} className="profile-item"
                       onClick={() => this.goMobileCheck()}>
              <div className="item-label">
                联系电话
              </div>
              <div className="item-content">
                {renderTel()}
              </div>
            </MarkBlock>
          }
          {memberTypeId===3 || memberTypeId ===8 &&
            <div className="profile-item">
              <div className="address-tips">收件地址</div>
              <textarea className="address" placeholder="请填写" value={address}
                        onChange={(e) => this.setState({ address: e.currentTarget.value }, () => {
                          this.checkIsFull()
                        })}
              />
            </div>
          }

        </div>
        <div className="profile-bottom">
          <MarkBlock module={'打点'} func={'个人信息页'} action={'提交个人信息修改'}
                     className={`submit-btn ${isFull ? '' : 'disabled'}`} style={{
            width: `${this.btnWidth}px`, borderRadius: 100, height: 44, lineHeight: `44px`, fontSize: 17,
            letterSpacing: `4.7px`
          }}
                     onClick={this.submitProfile.bind(this)}>
            完成
          </MarkBlock>
        </div>
      </div>
    )
  }
}
