import * as React from "react"
import { connect } from "react-redux"
import "./Main.less"
import { startLoad, endLoad, alertMsg, set } from "../../../redux/actions"
import { scroll } from "../../../utils/helpers"
import {submitEva} from "async"

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
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { _s } = this.props.location.query
    if(_s && _s == 'course') {
      this.setState({ scene: 1 })
    } else {
      this.setState({ scene: 2 })
    }
    let practiceList = []
    practiceList.push(
      {
        question: `这是一个毕业生勇闯职场的故事！<br/>
你历经重重面试大关，收到offer，即将入职新公司。你觉得自己马上就要走上人生巅峰了。“一定要努力！”你对自己说。可是，职场之路不是一帆风顺的，一定要通关成功才能顺利加薪升职，迎娶白富美，加油吧！<br/>
注：本测试故事设置的情节纯属虚构。<br/><br/>

1、今天是你入职新公司的第一天。上午的培训过后，老板说，你去做一份母婴行业分析报告吧，这周五给我。你会`, choiceList: [
        { subject: "A、啊，我以前没有做过这个报告，肯定会花很多时间，而且这周就要交，所以要抓紧时间，马上就去做。", id: 1, point: 0 },
        { subject: "B、啊，我以前没做过这个，要先和老板确定相关要求、目的和效果什么的，否则万一做错了，再返工就惨了。", id: 2, point: 1 }
      ]
      },
      {
        question: `2、你的行业报告得到了老板的认可，但其他部门的新人小胖的报告直接被打回，老板让小胖向你学习经验，重新写报告。你会：`, choiceList: [
        { subject: "A、告诉小胖，先去和老板确认行业分析报告的要求，然后回来再教他。", id: 1, point: 1 },
        { subject: "B、慷慨地把自己的行业分析报告给小胖，让小胖当模板照着做。", id: 2, point: 0 }
      ]
      },
      {
        question: `3、这天，你在公司接到了一个客户的电话，客户说：“我们想请你们对我们公司做一个组织架构优化的方案，最好下个月就启动这个项目，时间很紧急，你们明天就先发个方案过来吧！”你会怎么回复？`,
        choiceList: [
          { subject: "A、好的，我们明天就把建议书发给你！", id: 1, point: 0 },
          { subject: "B、好的，我们今天约一个电话会议讨论一下方案的内容吧？", id: 2, point: 1 }
        ]
      },
      {
        question: `4、为了跟进这个这个优化方案，你连续加了一周的班，推掉了和女朋友的约会。周末到了，好朋友小王约你去打篮球，你很高兴，打电话告诉女朋友取消当天的晚饭。女朋友说，我今天不太舒服，但是既然你和小王约好了，那你就去好好放松吧。你会：`,
        choiceList: [
          { subject: "A、按照女朋友的要求，先去打球，打完球后再打电话给女朋友。", id: 1, point: 0 },
          { subject: "B、按照女朋友的要求，先去打球，打完球后再去看女朋友。", id: 2, point: 1 },
          { subject: "C、先关心女朋友哪里不舒服，然后再决定，是否去打球，或者直接去看女朋友。", id: 3, point: 2 }
        ]
      },
      {
        question: `5、你和团队完成的优化方案获得客户的认可，在项目汇报会上，对方并没有表示不满，但是却迟迟不支付尾款，你百思不得其解，你会：`, choiceList: [
        { subject: "A、先思考客户不愿意付款的原因，看是否存在其他自己没有考虑到的因素，或者是没有满足对方的真正需求，然后再调整方案。", id: 1, point: 1 },
        { subject: "B、吃人嘴短、拿人手短，客户迟迟不支付尾款，一定是因为关系不到位，所以多次请客户吃饭，搞好关系。", id: 2, point: 0 }
      ]
      },
      {
        question: `6、在成功搞定这个优化方案后，你受到了老板的认可和器重。老板让你尝试带领团队完成项目，工作非常多，让你感觉很焦虑也很迷茫：既要完成自己的工作，还要管理团队，又要和客户沟通，还有一些和其他部门的合作事宜。你应该：`,
        choiceList: [
          { subject: "A、先把所有的事情列成清单，然后从容易解决的事情入手，比如先清理电脑文件，然后再完成其他工作。", id: 1, point: 0 },
          { subject: "B、先把所有的事情列成清单，然后找到目前最重要的事情，比如先思考一下自己未来的人生规划，到底要不要继续在这家公司工作，然后再完成其他工作。", id: 2, point: 1 },
          { subject: "C、先把所有的事情列成清单，然后找到重要的事情中比较容易解决的，比如先安排团队成员的工作，然后再完成其他工作。", id: 3, point: 2 },
        ]
      },
      {
        question: `7、经过一段时间调整，你在工作中状态越来越好。你的朋友小王看到很羡慕，和你说，他也想去你的公司，刚好你的公司现在缺人，所以请你帮助他内推，你会：`, choiceList: [
        { subject: "A、立马回复小王，说没问题，朋友之间当然要互相帮助，然后第二天就去找公司人事了解情况。", id: 1, point: 0 },
        { subject: "B、问小王，你为什么想跳槽啊？你觉得现在的工作有什么不好吗？", id: 2, point: 1 }
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
    scroll('.container', '.container')
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
      dispatch(alertMsg("你还没有选择答案哦"))
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
    scroll('.container', '.container')
  }

  onChoiceSelected(choice) {
    const { practicePlanId } = this.props.location.query
    const { currentIndex, selected, practiceCount, practice } = this.state

    if (currentIndex === practiceCount - 1){
      this.setState({canSubmit:true})
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
    this.setChoice()
    if(selected.length === 0) {
      dispatch(alertMsg("你还没有选择答案哦"))
      return
    }

    let score = 0

    practice.forEach(p => {
      score += p.choice.point
    })

    // console.log(score)

    submitEva(score).then(res => {
      if(res.code === 200){
        wx.closeWindow()
      }else{
        dispatch(alertMsg(res.msg))
      }
    })

  }

  render() {
    const { practice, currentIndex, selected, practiceCount, canSubmit } = this.state
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
                 style={{ width: (window.innerWidth -30) / practiceCount * (currentIndex+1)}}></div>
          </div>
          {questionRender(practice[ currentIndex ] || {})}
        </div>
        { currentIndex !== 0 ?
          <div className="eva-last-question" onClick={this.prev.bind(this)}>
            上一题
          </div> : null}
        { currentIndex === practiceCount - 1 ?
          canSubmit ?
            <div className={`eva-button-footer`} onClick={this.onSubmit.bind(this)}>
              提交
            </div> :
            <div className={`eva-button-footer disabled`}>
              提交
            </div>  : null}
      </div>
    )
  }
}
