import * as React from "react";
import MetaButton from "./MetaButton";

export default class MetaButtonTest extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div>
        <MetaButton id='hello' className='hello-container' onClick={() => console.log(1)}>
          按钮
        </MetaButton>
      </div>
    )
  }

}
