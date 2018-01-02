import * as React from 'react'
import './Step4_Library.less'
import { getPromotionLibrary } from '../async'
import AssetImg from '../../../../components/AssetImg'
import { mark } from '../../../../utils/request'

interface Step4_LibraryProps {
  getGlobalState: any
}

export class Step4_Library extends React.Component<Step4_LibraryProps, any> {

  constructor() {
    super()
    this.state = {}
  }

  async componentWillMount() {
    mark({ module: '打点', function: '年终回顾', action: '年终回顾第四页', memo: '4' })
    let res = await getPromotionLibrary(this.props.getGlobalState().riseId)
    if(res.code === 200) {
      let msg = res.msg
      this.setState({
        courseCount: msg.courseCount,
        knowledgeCount: msg.knowledgeCount,
        allRightCount: msg.allRightCount,
        assts: msg.assts,
        classmates: msg.classmates
      })
    }
  }

  render() {
    const { courseCount = 0, knowledgeCount = 0, allRightCount = 0, assts = [], classmates = [] } = this.state

    return (
      <section className="annual-library">
        <div className="scroll-container">
          <div className="text text1">
            在圈外，你学习了
            <span className="highlight"><large>&nbsp;{courseCount}&nbsp;</large>门课程</span>
          </div>
          <div className="text text1">
            掌握了
            <span className="highlight"><large>&nbsp;{knowledgeCount}&nbsp;</large>个知识点</span>
            ，顺利拿下
            <span className="highlight"><large>&nbsp;{allRightCount}&nbsp;</large>个全对</span>
          </div>
          <div className="text text3">还记得给你点评和指导的圈外教练吗？</div>
          <div className="profile-box asst">
            {
              assts.map((asst, index) => (
                <div className="annual-profile" key={index}>
                  <img className="headimage" src={asst.headImageUrl}></img>
                  <div className="nickname">{asst.nickName}</div>
                </div>
              ))
            }
          </div>
          <div className="text text4">还记得陪你完成小组作业，提醒你学习，一路和你成长的圈外同学嘛？</div>
          <div className="profile-box classmates">
            {
              classmates.map((classmate, index) => (
                <div className="annual-profile" key={index}>
                  <img className="headimage" src={classmate.headImageUrl}></img>
                  <div className="nickname">{classmate.nickName}</div>
                </div>
              ))
            }
          </div>
          <div></div>
        </div>
        <AssetImg className="triangle" url="https://static.iqycamp.com/images/triangle_left.png"/>
      </section>
    )
  }

}
