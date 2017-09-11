import * as React from 'react'

interface SlideSideBarProps {
}
interface SlideSideBarState {
}
export default class SlideSideBar extends React.Component<SlideSideBarProps, SlideSideBarState> {

  constructor() {
    super()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return JSON.stringify(nextProps) != JSON.stringify(this.props) || JSON.stringify(nextState) != JSON.stringify(this.state)
  }

  render() {

    return (
      <div className="slide-bar-container">

      </div>
    )
  }

}
