import * as React from 'react'
import './ShowCertificate.less'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'reduxutil/actions'
import { loadCertificates } from './async'
import { MarkBlock } from '../../../components/markblock/MarkBlock'
import * as _ from 'lodash'

@connect(state => state)
export default class ShowCertificate extends React.Component {

  constructor() {
    super()
    this.state = { tab: 1, data: '' }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  async componentWillMount() {
    mark({ view: true, module: '打点', function: '个人中心', action: '打开我的荣誉证书页面' })
    changeTitle('荣誉证书')
    const { dispatch } = this.props
    let res = await loadCertificates()
    if(res.code === 200) {
      this.setState({
        data: res.msg
      })
    } else {
      dispatch(alertMsg(res.msg))
    }
  }

  goCertificateView(certificateNo) {
    let query = { certificateNo:certificateNo }
    this.context.router.push({ pathname: '/rise/static/customer/certificate', query })
  }



  render() {
    const { data = [], tab } = this.state
    const { finishDto, gradeDto } = data

    const renderSelect = () => {
      return (
        <div className="header-container">
          <div className={`finish-certificate-container ${tab === 1 ? 'active' : ''}`}
               onClick={() => this.setState({ tab: 1 })}>
            <span>结课证书</span>
            <div className="border"></div>
          </div>
          <div className={`finish-certificate-container ${tab === 2 ? 'active' : ''}`}
               onClick={() => this.setState({ tab: 2 })}>
            <span>优秀证书</span>
            <div className="border"></div>
          </div>
        </div>
      )
    }

    const renderCertificates = () => {
      return (
        <div className="select-certificate-container">
          {tab === 1 ? renderFinished() : renderGrade()}
        </div>
      )
    }

    const renderFinished = () => {
      return (
        <div className="render-container">
          {_.isEmpty(finishDto) ?
            <div className="no-certificate-container">
              <img src="https://static.iqycamp.com/images/no-certificate.png" style={{ width: 100, height: 100 }}/>
              <div className="show-no-certificate">
                您现在还没有任何证书哦
              </div>
              <div className="show-info">
                速速去上课获取吧
              </div>
            </div> :
            finishDto.map((finish, index) => {
              const { abbreviation, certificateNo, month } = finish
              return (
                <MarkBlock module={'打点'} function={'我的证书'} action={'查看我的结课证书'} className="certificate-section"
                           onClick={() => {this.goCertificateView(certificateNo)}}>
                  <div className="certificate-name">
                    {abbreviation}结课证书</div>
                  <div className="certificate-count">{month}月主修课程</div>
                </MarkBlock>
              )
            })
          }
        </div>
      )
    }

    const renderGrade = () => {
      return (
        <div className="render-container">
          {_.isEmpty(gradeDto) ?
            <div className="no-certificate-container">
              <img src="https://static.iqycamp.com/images/no-certificate.png" style={{ width: 100, height: 100 }}/>
              <div className="show-no-certificate">
                您现在还没有优秀证书哦
              </div>
              <div className="show-info">
                继续努力加油吧！
              </div>
            </div> :
            gradeDto.map((grade, index) => {
              const { abbreviation, certificateNo, month,typeName } = grade
              return (
                <MarkBlock module={'打点'} function={'我的证书'} action={'查看我的优秀证书'} className="certificate-section"
                           onClick={() => {this.goCertificateView(certificateNo)}}>
                  <div className="certificate-name">
                    {abbreviation}{typeName}</div>
                  <div className="certificate-count">{month}月训练营</div>
                </MarkBlock>
              )
            })
          }
        </div>
      )
    }

    return (
      <div className="show-certificate-container">
        {renderSelect()}
        {renderCertificates()}
      </div>
    )
  }

}
