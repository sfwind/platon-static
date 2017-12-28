import * as React from 'react'
import './Step4_Library.less'
import { getPromotionLibrary } from '../async'

export class Step4_Library extends React.Component<{riseId: string}, any> {

  constructor() {
    super()
    this.state = {}
  }

  async componentWillMount() {
    let res = await getPromotionLibrary(this.props.riseId)
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

  componentWillReceiveProps(nextProps) {
    if(nextProps.riseId !== this.props.riseId) {
      this.props = nextProps
    }
  }

  render() {
    const { courseCount = 0, knowledgeCount = 0, allRightCount = 0, assts = [], classmates = [] } = this.state

    return (
      <section className="annual-library">
        <div className="text text1">
          在圈外，你学习了
          <span className="highlight"><large>{courseCount}</large>门课程</span>
        </div>
        <div className="text text2">
          掌握了
          <span className="highlight"><large>{knowledgeCount}</large>个知识点</span>
          ，顺利拿下
          <span className="highlight"><large>{allRightCount}</large>个全对</span>
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
      </section>
    )
  }

}
