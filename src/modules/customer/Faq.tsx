import * as React from 'react'
import './Faq.less'
import { changeTitle } from 'utils/helpers'
import { mark } from 'utils/request'
import { MarkBlock } from '../../components/markblock/MarkBlock'
import { ColumnSpan } from '../../components/ColumnSpan'

export default class Faq extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    changeTitle('常见问题')
    mark({ module: '打点', function: '常见问题', action: '打开常见问题' })
  }

  render() {
    return (
      <div className="faq-container">
        <div className="faq-title">常见问题</div>
        <MarkBlock module={'打点'} func={'账号问题'} action={'点击账号问题'}
                   className="faq-header arrow">
          账号问题
        </MarkBlock>
        <MarkBlock module={'打点'} func={'购买问题'} action={'点击购买问题'}
                   className="faq-header arrow">
          购买问题
        </MarkBlock>
        <MarkBlock module={'打点'} func={'发票问题'} action={'点击发票问题'}
                   className="faq-header arrow">
          发票问题
        </MarkBlock>
        <MarkBlock module={'打点'} func={'课程学习'} action={'点击课程学习'}
                   className="faq-header arrow">
          课程学习
        </MarkBlock>
        <MarkBlock module={'打点'} func={'其他问题'} action={'点击其他问题'}
                   className="faq-header arrow">
          其他问题
        </MarkBlock>
        <ColumnSpan/>
        <MarkBlock module={'打点'} func={'联系客服'} action={'点击联系客服'}
                   className="faq-header arrow">
          联系客服
        </MarkBlock>
        <ColumnSpan/>
        <MarkBlock module={'打点'} func={'意见反馈'} action={'点击意见反馈'}
                   className="faq-header arrow">
          意见反馈
        </MarkBlock>
      </div>
    )
  }
}
