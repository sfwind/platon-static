import * as React from 'react'
import './Faq.less'
import { changeTitle } from '../../../utils/helpers'
import { mark } from '../../../utils/request'
import { MarkBlock } from '../../../components/markblock/MarkBlock'
import { ColumnSpan } from '../../../components/ColumnSpan'

export default class Faq extends React.Component<any, any> {
  constructor(props) {
    super(props)
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    changeTitle('常见问题')
    mark({ view: true, module: '打点', function: '常见问题', action: '打开常见问题' })
  }

  render() {
    return (
      <div className="faq-container">
        <div className="faq-title">常见问题</div>
        <MarkBlock module={'打点'} func={'课程学习'} action={'点击课程学习'}
                   onClick={()=>this.context.router.push({pathname:'/rise/static/article',
                    query: {id: 'f44c4607'}})}
                   className="faq-header arrow">
          课程学习
        </MarkBlock>
        <MarkBlock module={'打点'} func={'使用问题'} action={'点击使用问题'}
                   onClick={()=>this.context.router.push({pathname:'/rise/static/article',
                    query: {id: 'f9302cdf'}})}
                   className="faq-header arrow">
          使用问题
        </MarkBlock>
        <MarkBlock module={'打点'} func={'奖项设置'} action={'点击奖项设置'}
                   onClick={()=>this.context.router.push({pathname:'/rise/static/article',
                    query: {id: 'f86cbc8c'}})}
                   className="faq-header arrow">
          奖项设置
        </MarkBlock>
        <MarkBlock module={'打点'} func={'发票问题'} action={'点击发票问题'}
                   onClick={()=>this.context.router.push({pathname:'/rise/static/article',
                    query: {id: 'f6435ca9'}})}
                   className="faq-header arrow">
          发票问题
        </MarkBlock>
        <MarkBlock module={'打点'} func={'其他问题'} action={'点击其他问题'}
                   onClick={()=>this.context.router.push({pathname:'/rise/static/article',
                    query: {id: 'f7ad7a79'}})}
                   className="faq-header arrow">
          其他问题
        </MarkBlock>
        <ColumnSpan/>
        <MarkBlock module={'打点'} func={'联系客服'} action={'点击联系客服'}
                   onClick={() => _MEIQIA('showPanel')}
                   className="faq-header arrow">
          联系客服
        </MarkBlock>
        <ColumnSpan/>
        <MarkBlock module={'打点'} func={'意见反馈'} action={'点击意见反馈'}
                   onClick={() => this.context.router.push('/rise/static/feedback')}
                   className="faq-header arrow">
          意见反馈
        </MarkBlock>
      </div>
    )
  }
}
