import * as React from 'react'

interface StarRatingProps {

}
interface StarRatingState {

}
export class StarRating extends React.Component<StarRatingProps, StarRatingState> {

  constructor() {
    super()
    this.state = {}
  }

  getInnerState() {
    return this.state
  }

  render() {
    return (
      <div className="star-rating-component">
        hello i'm starvote
      </div>
    )
  }

}
