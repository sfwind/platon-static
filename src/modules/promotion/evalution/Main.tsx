import * as React from 'react'
import { connect } from 'react-redux'
import './Main.less'
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions'
import { scroll } from '../../../utils/helpers'
import { mark } from 'utils/request'
import { submitEva } from './async'
import { Dialog } from 'react-weui'
import AssetImg from '../../../components/AssetImg'
const { Alert } = Dialog

const sequenceMap = {
  0: 'A',
  1: 'B',
  2: 'C',
  3: 'D',
  4: 'E',
  5: 'F',
  6: 'G'
}

const ellipse = {
  0: '.',
  1: '..',
  2: '...'
}

let TIMER

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      practice: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      knowledge: {},
      integrated: false,
      scene: 0,
      canSubmit: false,
      show: false,
      completeEva: false,
      ellipses: -1
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: '打点', function: '测评', action: '点击测评开始按钮' })
    let practiceList = []
    practiceList.push(
      {
        question: `这是一个年轻人勇闯职场的故事。但是，职场之路不是一帆风顺的，一定要通关成功，才能顺利加薪升职，迎娶白富美，加油！
<br/><br/>

1、今天是你入职的第一天。培训过后，老板说，你去做一份共享单车行业分析报告吧，周五给我。你会：`, choiceList: [
        { subject: '啊，我以前没做过这个报告，要抓紧时间，马上去做。', id: 1, point: 0 },
        { subject: '啊，我以前没做过这个，怎么做啊，要先和老板确定相关要求。', id: 2, point: 1 }
      ]
      },
      {
        question: `2、你的报告得到了老板的认可。但其他部门的新人小胖很惨，他的报告直接被打回，老板让小胖向你学习经验，重写一份。你会：`, choiceList: [
        { subject: '告诉小胖，先去和老板确认报告的要求，然后回来再说。', id: 1, point: 1 },
        { subject: '慷慨地把自己的报告给小胖，让他当模板照着做。', id: 2, point: 0 }
      ]
      },
      {
        question: `3、在成功辅导小胖写完报告后，老板对你大为赞赏，决定让你开始参与项目。今天，你接到了一个客户的电话，客户要求你们做一份组织架构优化方案，明天就要。你会说：`,
        choiceList: [
          { subject: '好的，我们明天就把建议书发给你。', id: 1, point: 0 },
          { subject: '好的，我们今天约一个电话会议讨论一下方案的内容吧？', id: 2, point: 1 }
        ]
      },
      {
        question: `4、为了跟进这个方案，你连续加班一周。到了周末，你女朋友打电话约你吃饭，但你早已和好朋友约好去打球，女朋友说，那你去玩吧。你会：`,
        choiceList: [
          { subject: '既然女朋友说了，那就先去打球，打完球再打电话给女朋友。', id: 1, point: 0 },
          { subject: '既然女朋友说了，那就先去打球，打完球再去看女朋友。', id: 2, point: 1 },
          { subject: '先安抚女朋友，然后再决定后续安排。', id: 3, point: 2 }
        ]
      },
      {
        question: `5、连续加班一周后，你的方案终于获得了客户的认可。但对方却迟迟不愿意支付尾款，这个时候，你会：`, choiceList: [
        { subject: '看自己是不是没有考虑周全，没满足对方的需求，然后再调整方案。', id: 1, point: 1 },
        { subject: '吃人嘴短、拿人手短，没什么是一顿饭解决不了。只要请客户吃饭，搞好关系就好了。', id: 2, point: 0 }
      ]
      },
      {
        question: `6、终于成功搞定这个项目了！但是你感觉工作压力很大，很焦虑，你想要跳槽，但是又不知道自己的未来的发展方向，你应该：`,
        choiceList: [
          { subject: '先列出待办清单，然后从容易解决的入手，找到成就感。', id: 1, point: 0 },
          { subject: '先列出待办清单，然后找到当中能解决也比较重要的，比如先做上个项目的复盘，总结。', id: 2, point: 2 },
          { subject: '先列出待办清单，然后找到优先级最高的，比如先思考自己未来的发展方向，到底要不要继续在这家公司工作。', id: 3, point: 1 }
        ]
      },
      {
        question: `7、经过一段时间调整，你的工作状态越来越好。你的朋友很羡慕，说他也想去你的公司，请你帮助他内推，你会：`, choiceList: [
        { subject: '立马回复他，说没问题，朋友之间当然要互相帮助！', id: 1, point: 0 },
        { subject: '问他，你为什么想跳槽啊？你觉得现在的工作有什么不好吗？', id: 2, point: 1 }
      ]
      }
    )
    this.setState({ practice: practiceList, practiceCount: practiceList.length })
  }

  prev() {
    const { dispatch } = this.props
    const { currentIndex, practice } = this.state
    if(currentIndex > 0) {
      this.setChoice()
      const selected = practice[ `${currentIndex - 1}` ].choice
      this.setState({ currentIndex: currentIndex - 1, selected })
    }
    scroll('.eva-container', '.eva-container')
  }

  setChoice() {
    let { practice, currentIndex, selected } = this.state
    practice[ currentIndex ].choice = selected
    this.setState({ practice })
  }

  next() {
    const { dispatch, location } = this.props
    const { selected, practice, currentIndex, practiceCount } = this.state
    const { integrated, practicePlanId } = location.query

    if(selected.length === 0) {
      dispatch(alertMsg('你还没有选择答案哦'))
      return
    }

    if(currentIndex < practiceCount - 1) {
      this.setChoice()
      let selected = practice[ `${currentIndex + 1}` ].choice
      if(!selected) {
        selected = []
      }
      this.setState({ currentIndex: currentIndex + 1, selected })
    }
    scroll('.eva-container', '.eva-container')
  }

  onChoiceSelected(choice) {
    const { practicePlanId } = this.props.location.query
    const { currentIndex, selected, practiceCount, practice } = this.state

    if(currentIndex === practiceCount - 1) {
      this.setState({ canSubmit: true })
    }
    if(selected.id === choice.id) {
      this.next()
    } else {
      this.setState({ selected: choice })
      setTimeout(() => {
        if(currentIndex !== practiceCount - 1) {
          this.next()
        }
      }, 300)
    }
  }

  onSubmit() {
    const { dispatch } = this.props
    const { selected, practice, currentIndex, practiceCount } = this.state
    const { practicePlanId } = this.props.location.query
    this.setState({ canSubmit: false })
    this.setChoice()
    if(selected.length === 0) {
      dispatch(alertMsg('你还没有选择答案哦'))
      return
    }

    let score = 0

    practice.forEach(p => {
      score += p.choice.point
    })

    this.setState({ show: true })
    setInterval(() => {
      const { ellipses } = this.state
      let newEllipse = ellipses
      if(newEllipse === 2) {
        newEllipse = 0
      } else {
        newEllipse = ellipses + 1
      }
      this.setState({ ellipses: newEllipse })
    }, 500)
    submitEva(score).then(res => {
      if(res.code === 200) {
        this.setState({ completeEva: true })
        clearInterval(TIMER)
      } else {
        dispatch(alertMsg(res.msg))
      }
    })

  }

  onClose() {
    wx.closeWindow()
  }

  render() {
    const { practice, currentIndex, selected, practiceCount, canSubmit, show, completeEva, ellipses } = this.state
    const questionRender = (practice) => {
      const { question, pic, choiceList = [], score = 0 } = practice
      return (
        <div className="intro-container">
          { practiceCount !== 0 && currentIndex <= practiceCount - 1 ? <div className="intro-index">
            <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
          </div> : null}
          <div className="question">
            <div dangerouslySetInnerHTML={{ __html: question }}/>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => choiceRender(choice, idx))}
          </div>
        </div>
      )
    }

    const choiceRender = (choice, idx) => {
      const { id, subject } = choice
      return (
        <div key={id} className={`choice${selected.id === id ? ' selected' : ''}`}
             onClick={e => this.onChoiceSelected(choice)}>
          <span className="index">{sequenceMap[ idx ]}</span>
          <span className="text">{subject}</span>
        </div>
      )
    }

    return (
      <div className="eva-warm-up">
        <div className="eva-container">
          <div className="eva-page-header">圈外职场研究所-洞察力</div>
          <div className="eva-progress">
            <div className="eva-progress-bar"
                 style={{ width: (window.innerWidth - 90) / practiceCount * (currentIndex + 1) }}/>
          </div>
          {questionRender(practice[ currentIndex ] || {})}
        </div>
        { currentIndex !== 0 ?
          <div className="eva-last-question" onClick={this.prev.bind(this)}>
            上一题
          </div> : null}
        { currentIndex === practiceCount - 1 && !show && canSubmit ?
          <div className={`eva-button-footer`} onClick={this.onSubmit.bind(this)}>
            <AssetImg url={'https://static.iqycamp.com/images/eva_submit2.png'} height={65}/>
          </div> : null}
        {show ?
          <div className="modal-container">
            <div className="modal">
              {completeEva ? <div style={{ margin: 40 }}>你的职场洞察力检测报告已生成</div> :
                <div>
                  <div style={{ marginTop: 40 }}>职场闯关成功！</div>
                  <div>闯关表现分析中{ellipse[ ellipses ]}</div>
                </div>}
            </div>
            {completeEva ? <div className="modal-button" onClick={() => this.onClose()}/> : null}
          </div> : null}
      </div>
    )
  }
}
