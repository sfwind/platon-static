import * as React from 'react'
import './GroupPromotionWaiting.less'

interface GroupPromotionWaitingProps {
  leaderName: string,
  remainderCount: number,
  groupCode: string
}

export class GroupPromotionWaiting extends React.Component<GroupPromotionWaitingProps, any> {

  constructor() {
    super()
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  render() {
    console.log(this.props)
    const { leaderName = '', remainderCount = 1, groupCode = '' } = this.props

    return (
      <section className="group-promotion-waiting">
        <div className="waiting-image"/>
        <span className={'waiting-tip-large'}>你已接受{leaderName}邀请<br/>加入自我认识实验室！</span>
        <span className={'waiting-tip-small'}>还差最后{remainderCount}人加入，解锁前7天实验：<br/>请等待解锁成功通知</span>
        <span className={'waiting-invite'}
              onClick={() => {
                window.location.href = `https://${window.location.hostname}/pay/static/camp/group?groupCode=${groupCode}&share=true`
              }}>邀请更多好友加入</span>
      </section>
    )
  }

}
