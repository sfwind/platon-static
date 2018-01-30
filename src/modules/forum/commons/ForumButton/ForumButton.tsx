import * as React from "react"
import "./ForumButton.less"

interface ForumButtonProps {
  content: string;
  clickFunc?: object;
  forbid?: boolean;
  primary?: boolean;
}


export default class ForumButton extends React.Component<ForumButtonProps, any> {

  constructor() {
    super()
  }

  render() {
    const {
        content, clickFunc = ()=>{}, forbid, primary
    } = this.props

    return (
        <div className="forum-button-div" onClick={()=>console.log('click')}>
          {forbid ?
              <div className={`forum-button forbid`}>
                {content}
              </div>:
              <div className={`forum-button ${primary? 'primary':'normal'}`} onClick={()=>clickFunc()}>
                {content}
              </div>
          }
        </div>
    )
  }

}
