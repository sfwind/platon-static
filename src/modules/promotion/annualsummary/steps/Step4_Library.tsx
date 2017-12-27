import * as React from 'react'
import './Step4_Library.less'

export class Step4_Library extends React.Component {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <section className="annual-library">
        <div className="text text1">
          在圈外，你学习了&nbsp;&nbsp;
          <span className="highlight" style={{ fontSize: '3rem' }}>25</span>
          <span className="highlight">门课程</span>
        </div>
        <div className="text text2">
          掌握了&nbsp;&nbsp;
          <span className="highlight" style={{ fontSize: '3rem' }}>30</span>
          <span className="highlight">个知识点</span>
          ，顺利拿下&nbsp;&nbsp;
          <span className="highlight" style={{ fontSize: '3rem' }}>18</span>
          <span className="highlight">个全对</span>
        </div>
        <div className="text text3">还记得给你点评和指导的圈外教练吗？</div>
        <div className="profile-box asst">
          <div className="annual-profile">
            <img className="headimage" src={"https://static.iqycamp.com/headImage-97yboxsa-blob"}></img>
            <div className="nickname">三十文</div>
          </div>
          <div className="annual-profile">
            <img className="headimage" src={"https://static.iqycamp.com/headImage-97yboxsa-blob"}></img>
            <div className="nickname">薛定谔的猫</div>
          </div>
          <div className="annual-profile">
            <img className="headimage" src={"https://static.iqycamp.com/headImage-97yboxsa-blob"}></img>
            <div className="nickname">aDASdwfe</div>
          </div>
        </div>
        <div className="text text4">还记得陪你完成小组作业，提醒你学习，一路和你成长的圈外同学嘛？</div>
        <div className="profile-box classmates">
          <div className="annual-profile">
            <img className="headimage" src={"https://static.iqycamp.com/headImage-97yboxsa-blob"}></img>
            <div className="nickname">三十文</div>
          </div>
          <div className="annual-profile">
            <img className="headimage" src={"https://static.iqycamp.com/headImage-97yboxsa-blob"}></img>
            <div className="nickname">薛定谔的猫</div>
          </div>
          <div className="annual-profile">
            <img className="headimage" src={"https://static.iqycamp.com/headImage-97yboxsa-blob"}></img>
            <div className="nickname">aDASdwfe</div>
          </div>
        </div>
        <div></div>
      </section>
    )
  }

}
