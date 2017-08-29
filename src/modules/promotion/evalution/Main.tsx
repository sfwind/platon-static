import * as React from 'react'
import { connect } from 'react-redux'
import './Main.less'
import { startLoad, endLoad, alertMsg, set } from '../../../redux/actions'
import { scroll } from '../../../utils/helpers'
import { mark } from 'utils/request'
import { Dialog } from 'react-weui'
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

@connect(state => state)
export class Main extends React.Component <any, any> {
  constructor() {
    super()
    this.state = {
      practice: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      showResult: false,
      showNext: false,
      analysis:'',
      isRight:true
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
        question: `1、毕业后行政工作做了三年，为了得到更大的发展，你打算跳槽到互联网公司做运营。为了顺利转行，你会：`,
        choiceList: [
          { subject: '认为运营需要客服经验，客服岗容易申请，也和自身经历相符，所以先申请客服岗位。', id: 1, point: 0, analysis: '糟糕。虽然顺利申请到了客服岗位，但发现客服岗位的经验对于申请运营的帮助很小，只能在入职三个月后再次辞职，重新找运营岗位工作。' },
          { subject: '找一些互联网运营的朋友，询问他们的工作体验和岗位职责。', id: 2, point: 1, analysis: '好棒！通过了解相关信息，你确定自己适合这一岗位，并根据岗位要求精心准备了简历和面试，得到了面试官的青睐，顺利入职。' },
          { subject: '直接在招聘网站上查找岗位，投递简历，要广撒网才能拿到心仪的offer。', id: 3, point: 0, analysis: '糟糕。虽然投递了几十份简历，但都没有拿到面试机会。你很沮丧，去找了一些互联网运营的朋友，询问他们的工作体验和岗位职责，重新准备简历，再次申请，终于顺利通过。' }
        ]
      },
      {
        question: `2、终于顺利入职新公司。你组织了一个线下活动，活动反馈中有用户评分很低，抱怨你的活动主题很无聊。你会：`, choiceList: [
        { subject: '你决定找到这些用户私下交流，了解详细情况。', id: 1, point: 1, analysis:'好棒！经过澄清，你发现是因为他们在活动中的参与度低，而你没有顾及到。你和他们进行沟通，并寄了小礼品给他们，顺利解决了这次的小矛盾。' },
        { subject: '既然用户对我的主题不满意，那就再去脑暴活动主题，重新设计。', id: 2, point: 0, analysis:'糟糕。虽然你从众多主题中挑了最好的一个，但第二次活动还是有人不满意。你只好私下找用户交流，发现是自己没有顾及到他们的参与度。重新设计了活动机制后，用户反馈果然提高了很多。' }
      ]
      },
      {
        question: `3、活动结束了，老板说，你写一份活动总结，周五给我。你会：`,
        choiceList: [
          { subject: '噢，体现我执行力的时候到了，马上就去做！', id: 1, point: 0, analysis:'糟糕。虽然你辛苦熬了三天三夜，但是总结没有符合老板的要求，被打回，重新做。' },
          { subject: '啊，这个看上去好难啊，要先和老板确定相关要求。', id: 2, point: 1, analysis:'好棒！机智如你，先和老板确定了相关的要求，再按照要求写总结，得到了老板的认可！' },
          { subject: '我要把总结写得条理清晰，要先去网上下载一个模板再写。', id: 3, point: 0, analysis:'糟糕。虽然你辛辛苦苦写完，但是总结没有符合老板的要求，被打回，重新做。' }
        ]
      },
      {
        question: `4、同事小胖的总结被老板打回两次，他来向你请教如何写活动总结，你会：`,
        choiceList: [
          { subject: '告诉小胖，先去和老板确认报告的要求，然后回来再说。', id: 1, point: 1, analysis:'好棒！机智如你，先让小胖和老板明确要求，再指导他按照要求写总结。小胖终于得到了老板的认可，对你千恩万谢，并请你吃了一顿小龙虾。' },
          { subject: '慷慨地把自己的总结给小胖，让他当模板照着做。', id: 2, point: 0, analysis:'糟糕。虽然你很善良，但是小胖按照你的模板做，并不符合老板的要求，再次被打回。小胖很失望，连续三个星期都没有和你讲话。' }
        ]
      },
      {
        question: `5、你最近工作很忙，每天都加班，没有时间陪女朋友。女朋友很生气，打电话指责你不爱她了，你会：`, choiceList: [
        { subject: '告诉女朋友，我努力工作也是为了你，我是很爱你的。', id: 1, point: 0, analysis:'糟糕。虽然这句话很中听，但是女朋友非常不买账，愤怒地挂掉电话，连续三天没有理你。' },
        { subject: '先安抚女朋友，然后早些下班去陪她吃饭。', id: 2, point: 1, analysis:'好棒！贴心如你，准确地猜对了女朋友的心思。下班陪她去吃小龙虾，女朋友很高兴并陪你在王者荣耀开黑。' },
        { subject: '女生嘛，发脾气没什么的，过几天就好了。', id: 3, point: 0, analysis:'糟糕。女朋友很愤怒并拉黑了你，连续三个星期没有理你。' }
      ]
      },
      {
        question: `6、最近你觉得工作压力越来越大，事情总也做不完，为了提升工作效率，你会：`,
        choiceList: [
          { subject: '列出所有要做的事，从最容易解决的开始，比如整理电脑。', id: 1, point: 0, analysis:'糟糕。整理完电脑，已经过去了两个小时。老板交代的工作还没有开始，当天任务完不成，又加了一个晚上的班。' },
          { subject: '要先停下来休个假，好好思考人生，想清楚人生目标才能继续努力。', id: 2, point: 0, analysis:'糟糕！假期太美好，只顾着享受了。人生目标还是没有想清楚，回到工作岗位，效率仍然很低。' },
          { subject: '列出所有要做的事，找到能解决的也比较重要的，比如项目复盘。', id: 3, point: 1, analysis:'好棒！项目复盘完成后，你发现了以前工作中的一些误区并找到了改进方法，结果工作效率大幅提升，没有加班就完成了今天的工作任务。'}
        ]
      },
      {
        question: `7、你的工作状态越来越好，承担越来越多的责任，但老板却毫无察觉，你考虑要和老板提出加薪要求，你会：`, choiceList: [
        { subject: '告诉老板你最近工作很辛苦，经济压力很大，希望他给你涨点工资。', id: 1, point: 0, analysis:'糟糕。虽然老板也觉得你很辛苦，大力夸奖了你，但是似乎并不想提及加薪，你也一头雾水，百思不得其解。' },
        { subject: '告诉老板你之前对公司做出的贡献，并规划自己未来如何为公司带来的价值，然后再顺势提出涨工资请求。', id: 2, point: 1, analysis:'好棒！太机智了，把自己的薪资和公司的发展紧密相连，强调了自己可以为公司带来的价值，老板觉得你说得很在理，决定给你双倍加薪。' },
        { subject: '跟老板说，最近工作很辛苦，希望加工资，并且告诉老板，最近很多猎头找你呢，暗示自己会有跳槽的机会。', id: 3, point: 0, analysis:'糟糕。虽然老板当下没有表态，但是默默地想好了你的替代人选，并在合适的机会开除了你。' }
      ]
      }
    )
    this.setState({ practice: practiceList, practiceCount: practiceList.length })
  }

  setChoice() {
    let { practice, currentIndex, selected } = this.state
    practice[ currentIndex ].choice = selected
    this.setState({ practice })
  }

  next() {
    const { dispatch, location } = this.props
    const { selected, practice, currentIndex, practiceCount } = this.state
    const { practicePlanId } = location.query
    this.setState({ showNext: false })
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
    this.setState({ selected: choice, analysis:choice.analysis })
    let isRight = true
    if(choice.point  === 0){
      isRight = false
    }

    if(currentIndex !== practiceCount - 1) {
      this.setState({ showNext: true, isRight }, ()=>{
        let modal = document.querySelector('.modal-container')
        if(modal) {
          modal.style.opacity = 0
          setTimeout(() => {
            modal.style.opacity = 1
          }, 200)
        }
      })
    } else {
      this.setState({ showResult: true, isRight }, ()=>{
        let modal = document.querySelector('.modal-container')
        if(modal) {
          modal.style.opacity = 0
          setTimeout(() => {
            modal.style.opacity = 1
          }, 200)
        }
      })
    }
  }

  onSubmit() {
    const { dispatch } = this.props
    const { selected, practice, currentIndex, practiceCount } = this.state
    const { practicePlanId } = this.props.location.query
    this.setChoice()
    this.setState({ showResult: false })
    if(selected.length === 0) {
      dispatch(alertMsg('你还没有选择答案哦'))
      return
    }

    let score = 0

    practice.forEach(p => {
      score += p.choice.point
    })

    this.context.router.push({ pathname: '/rise/static/eva/result', query: { score } })
  }

  render() {
    const { practice, currentIndex, selected, practiceCount, showNext, showResult, analysis, isRight } = this.state
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
          <span className={`index ${choice.point === 0? 'wrong':''}`}>{sequenceMap[ idx ]}</span>
          <span className={`text ${choice.point === 0? 'wrong':''}`}>{subject}</span>
        </div>
      )
    }

    const renderModal = () => {
      if(showNext) {
        return (
          <div className="modal-container">
            <div className="eva-modal-outbound">
              <div className={`modal-outbound ${isRight? '': 'wrong'}`}>
                <div className={`modal ${isRight? '': 'wrong'}`}>{analysis}</div>
              </div>
              <div className={`modal-button ${isRight? '': 'wrong'}`} onClick={()=>this.next()}></div>
            </div>
          </div>
        )
      }

      if(showResult) {
        return (
          <div className="modal-container">
            <div className="eva-modal-outbound">
              <div className={`modal-outbound ${isRight? '': 'wrong'}`}>
                <div className={`modal ${isRight? '': 'wrong'}`}>{analysis}</div>
              </div>
              <div className={`modal-button2 ${isRight? '': 'wrong'}`} onClick={()=>this.onSubmit()}></div>
            </div>

          </div>
        )
      }

      return null
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
        { renderModal() }
      </div>
    )
  }
}
