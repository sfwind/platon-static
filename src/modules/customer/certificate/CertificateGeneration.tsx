import * as React from 'react'
import './CertificateGeneration.less'
import { connect } from 'react-redux'
import { convertBase64ToFile, getCertificateAndNextNo, updateCertificateDownloadTime } from './async'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import { changeTitle } from 'utils/helpers'

@connect(state => state)
export default class CertificateGeneration extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  constructor() {
    super()
    this.state = {}
  }

  domtoimage = require('dom-to-image')

  componentWillMount() {
    changeTitle('圈外证书')
    const { dispatch, location } = this.props
    const { certificateNo } = location.query
    dispatch(startLoad())
    getCertificateAndNextNo(certificateNo).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        //用户没有填姓名时，跳过
        if(!res.msg.name) {
          if(res.msg.nextCertificateNo) {
            this.context.router.push(`/rise/static/customer/certificate/generate?certificateNo=${res.msg.nextCertificateNo}`)
            this.state = {}
            this.componentWillMount()
          }
        } else {
          this.setState(res.msg, () => {
            setTimeout(() => {
              // 自动下载代码开启
              // this.generateSvg()
            }, 2000)
          })
        }
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch((err) => {
      dispatch(alertMsg(err))
    })
  }

  componentDidMount() {
    const { hiddenTab } = this.props
    hiddenTab()
  }

  generateSvg() {
    const { type, id, name, certificateNo, nextCertificateNo } = this.state
    let node = document.getElementById('container')

    const { dispatch } = this.props

    new Promise((resolve => {
      this.domtoimage.toPng(node).then(dataUrl => {
        resolve(dataUrl)
      })
    })).then(dataUrl => {
      return new Promise((resolve => {
        convertBase64ToFile({
          type: type, base64Str: dataUrl, imageName: `${type}-${id}-${name}`
        }).then(convertResult => {
          resolve(convertResult)
        })
      }))
    }).then(convertResult => {
      if(convertResult.code === 200) {
        return new Promise(resolve => {
          updateCertificateDownloadTime(certificateNo).then(updateDownloadTimeResult => {
            resolve(updateDownloadTimeResult)
          })
        })
      }
    }).then(updateDownloadTimeResult => {
      if(updateDownloadTimeResult.code === 200) {
        if(nextCertificateNo) {
          this.context.router.push(`/rise/static/customer/certificate/generate?certificateNo=${nextCertificateNo}`)
          this.state = {}
          this.componentWillMount()
        }
      }
    }).catch(e => {
      dispatch(alert((e)))
    })
  }

  render() {
    const {
      month, name, typeName, congratulation, problemName, certificateNo, type
    } = this.state
    return (
      <div
        onClick={() => this.generateSvg()}
        id="container" className="certificate-generation-container"
        style={{ width: 1500, height: 2668 }}>
        {type ?
          <div className={`certificate ${type === 5 ? 'ordinary' : 'excellent'}`}
               style={{ width: 1500, height: 2668 }}>
            <div className="certificate-description">
              <div className="description-text1">圈外同学 • {month}月小课训练营</div>
              <div className="description-text2">《{problemName}》</div>
            </div>
            <div className="certificate-name">
              {typeName}
            </div>
            <div className="name">
              {name}
            </div>
            <pre className="cong">
            {congratulation}
          </pre>
            <div className={`certificate-number ${type === 5 ? 'ordinary' : ''}`}>
              证书编号：{certificateNo}
            </div>
          </div> : null
        }
      </div>
    )
  }
}
