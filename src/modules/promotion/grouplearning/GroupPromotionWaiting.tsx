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
        <span className={'waiting-tip-large'}>你已接受{leaderName}的邀请<br/>加入《认知自己》互助学习！</span>
        <span className={'waiting-tip-small'}>还差最后1人加入，免费解锁前7天课程</span>
        <span className={'waiting-invite'}
              onClick={() => {
                window.location.href = `https://${window.location.hostname}/pay/static/camp/group?groupCode=${groupCode}&share=true`
              }}>邀请更多好友加入</span>
      </section>
    )
  }

}
