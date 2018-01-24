import * as React from 'react'
import './SelfComplete.less'
import { FooterButton } from '../../../components/submitbutton/FooterButton'

interface SelfCompleteProps {
  handleComplete: any
}

export class SelfComplete extends React.Component<SelfCompleteProps, any> {

  constructor() {
    super();
    this.state = { showTips: false };
  }

  handleClickShare() {
    const { handleComplete = () => {} } = this.props
    this.setState({ showTips: true });
    handleComplete();
  }

  render() {
    const { showTips } = this.state;
    return (
      <div className="self-complete-complete">
        <FooterButton btnArray={[ {
          text: '分享',
          click: () => this.handleClickShare()
        } ]}/>
        {showTips &&
        <div className="share-tip" onClick={() => this.setState({ showTips: false })}>
          <div className="tip-pic">
            <img src="https://static.iqycamp.com/images/share_pic1.png?imageslim" width="247"/>
          </div>
        </div>}
      </div>
    )
  }

}
