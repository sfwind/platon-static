import * as React from 'react'
import './StarRating.less'

interface StarRatingProps {
  // 星星的个数，默认是五个
  levels?: number;
}
interface StarRatingState {
  showConfirmButton: boolean;

  // 选择层级
  chosenLevel: number;
  // 当前层级描述
  chosenLevelDesc: string;
}
export class StarRating extends React.Component<StarRatingProps, StarRatingState> {

  constructor() {
    super()
    this.state = {
      chosenLevel: 0
    }
  }

  getInnerState() {
    return this.state
  }

  componentWillReceiveProps(nextProps) {
    if(JSON.stringify(nextProps) !== JSON.stringify(this.props)) {
      this.props = nextProps
      this.render()
    }
  }

  handleSelect(level) {
    console.log('you click ' + level)
    const levelDesc = {
      '1': '没帮助',
      '2': '帮助不大',
      '3': '还可以',
      '4': '比较有帮助',
      '5': '非常有帮助'
    }

    this.setState({
      showConfirmButton: true,
      chosenLevel: level,
      chosenLevelDesc: levelDesc[level]
    })
  }

  render() {
    const { levels = 5 } = this.props
    const { showConfirmButton = false, chosenLevel, chosenLevelDesc = '' } = this.state

    const renderStars = () => {
      let starsDoms = []
      for(let i = 1; i <= levels; i++) {
        starsDoms.push(
          <div className={`star ${i <= chosenLevel ? 'selected' : ''}`}
               onClick={this.handleSelect.bind(this, i)}/>
        )
      }
      return starsDoms
    }

    return (
      <div className={`star-rating-component ${showConfirmButton ? 'selected' : ''}`}>
        <div className="star-rating">
          <span className="desc">1/1 三十文教练的评论，对你的学习理解和应用有帮助吗？来匿名反馈，帮助教练做得更好吧！</span>
          <div className="stars">
            {renderStars()}
          </div>
          <span className="stars-desc">{chosenLevelDesc}</span>
        </div>
        {
          showConfirmButton ?
            <div className="confirm">
              <span>确定</span>
            </div> :
            null
        }
      </div>
    )
  }

}
