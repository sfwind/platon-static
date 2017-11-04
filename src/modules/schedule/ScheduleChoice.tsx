import React, { Component } from 'react';
import { connect } from 'react-redux';
import './ScheduleChoice.less'
import AssetImg from '../../components/AssetImg'
import { mark } from '../../utils/request'

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
export default class ScheduleChoice extends Component {
  constructor() {
    super();
    this.state = {
      practice: [],
      currentIndex: 0,
      practiceCount: 0,
      selected: [],
      showResult: false,
      showNext: false,
      analysis: '',
      isRight: true
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    mark({ module: "打点", function: "课程计划", action: "打开选择题页面" })
    let practiceList = []
    practiceList.push(
      {
        id: 1,
        question: `1、在你的日常工作中，哪个场景出现得更多：`,
        choiceList: [
          {
            subject: '公开演讲，包括对公司、对客户等', id: 1,
            analysis: '糟糕。虽然顺利申请到了客服岗位，但发现客服岗位的经验对于申请运营的帮助很小，只能在入职三个月后再次辞职，重新找运营岗位工作。'
          },
          {
            subject: '商务写作，包括分析报告、工作汇报等', id: 2, point: 1,
            analysis: '好棒！通过了解相关信息，你确定自己适合这一岗位，并根据岗位要求精心准备了简历和面试，得到了面试官的青睐，顺利入职。'
          },
        ]
      },
      {
        id: 2,
        question: `2、你是否清楚自己的天赋优势：`,
        choiceList: [
          {
            subject: '是', id: 1, point: 1,
            analysis: '好棒！经过澄清，你发现是因为他们在活动中的参与度低，而你没有顾及到。你和他们进行沟通，并寄了小礼品给他们，顺利解决了这次的小矛盾。'
          },
          {
            subject: '否', id: 2, point: 0,
            analysis: '糟糕。虽然你从众多主题中挑了最好的一个，但第二次活动还是有人不满意。你只好私下找用户交流，发现是自己没有顾及到他们的参与度。重新设计了活动机制后，用户反馈果然提高了很多。'
          }
        ]
      },
      {
        id: 3,
        question: `3、你目前的工作岗位是什么：`,
        choiceList: [
          { subject: '学生', id: 1, point: 0, analysis: '糟糕。虽然你辛苦熬了三天三夜，但是总结没有符合老板的要求，被打回，重新做。' },
          {
            subject: '基层员工', id: 2, point: 1,
            analysis: '好棒！机智如你，先和老板确定了相关的要求，再按照要求写总结，得到了老板的认可！'
          },
          { subject: '资深员工', id: 3, point: 0, analysis: '糟糕。虽然你辛辛苦苦写完，但是总结没有符合老板的要求，被打回，重新做。' },
          { subject: '一线主管', id: 4, point: 0, analysis: '糟糕。虽然你辛辛苦苦写完，但是总结没有符合老板的要求，被打回，重新做。' },
          { subject: '部门经理', id: 5, point: 0, analysis: '糟糕。虽然你辛辛苦苦写完，但是总结没有符合老板的要求，被打回，重新做。' },
          { subject: '总监或副总', id: 6, point: 0, analysis: '糟糕。虽然你辛辛苦苦写完，但是总结没有符合老板的要求，被打回，重新做。' },
          { subject: 'CEO、创始人或联合创始人', id: 7, point: 0, analysis: '糟糕。虽然你辛辛苦苦写完，但是总结没有符合老板的要求，被打回，重新做。' },
        ]
      },
      {
        id: 4,
        question: `4、在自我管理方面，你觉得哪方面最困难：`,
        choiceList: [
          {
            subject: '很难养成好的习惯，自制力不足', id: 1, point: 1,
            analysis: '好棒！机智如你，先让小胖和老板明确要求，再指导他按照要求写总结。小胖终于得到了老板的认可，对你千恩万谢，并请你吃了一顿小龙虾。'
          },
          {
            subject: '很难控制自己的情绪，经常感情用事', id: 2, point: 0,
            analysis: '糟糕。虽然你很善良，但是小胖按照你的模板做，并不符合老板的要求，再次被打回。小胖很失望，连续三个星期都没有和你讲话。'
          },
          {
            subject: '经常感到压力很大，不知如何调节', id: 3, point: 0,
            analysis: '糟糕。虽然你很善良，但是小胖按照你的模板做，并不符合老板的要求，再次被打回。小胖很失望，连续三个星期都没有和你讲话。'
          }
        ]
      },
      {
        id: 5,
        question: `5、在你的工作场景中，需要自己独立思考更多，还是团队开会脑暴更多：`,
        choiceList: [
          {
            subject: '独立思考', id: 1, point: 0, analysis: '糟糕。虽然这句话很中听，但是女朋友非常不买账，愤怒地挂掉电话，连续三天没有理你。'
          },
          {
            subject: '团队脑暴', id: 2, point: 1,
            analysis: '好棒！贴心如你，准确地猜对了女朋友的心思。下班陪她去吃小龙虾，女朋友很高兴并陪你在王者荣耀开黑。'
          },
        ]
      },
      {
        id: 6,
        question: `6、在看一些关于热点事件的评论时，你是不是经常觉得两个相反的观点都很有道理、逻辑很难挑剔：`,
        choiceList: [
          {
            subject: '是', id: 1, point: 0,
            analysis: '糟糕。整理完电脑，已经过去了两个小时。老板交代的工作还没有开始，当天任务完不成，又加了一个晚上的班。'
          },
          {
            subject: '否', id: 2, point: 0,
            analysis: '糟糕！假期太美好，只顾着享受了。人生目标还是没有想清楚，回到工作岗位，效率仍然很低。'
          },
          {
            subject: '列出所有要做的事，找到能解决的也比较重要的，比如项目复盘。', id: 3, point: 1,
            analysis: '好棒！项目复盘完成后，你发现了以前工作中的一些误区并找到了改进方法，结果工作效率大幅提升，没有加班就完成了今天的工作任务。'
          }
        ]
      },
      {
        id: 7,
        question: `7、在你面对问题时，下意识的反应是马上去解决，还是花很多时间去澄清？`,
        choiceList: [
          {
            subject: '马上去解决', id: 1, point: 0,
            analysis: '糟糕。虽然老板也觉得你很辛苦，大力夸奖了你，但是似乎并不想提及加薪，你也一头雾水，百思不得其解。'
          },
          {
            subject: '花时间澄清', id: 2, point: 1,
            analysis: '好棒！太机智了，把自己的薪资和公司的发展紧密相连，强调了自己可以为公司带来的价值，老板觉得你说得很在理，决定给你双倍加薪。'
          },
        ]
      },
      {
        id: 8,
        question: `8、你在人际相处中，觉得最困难的场景是什么`,
        choiceList: [
          {
            subject: '跟同事合作', id: 1, point: 0,
            analysis: '糟糕。虽然老板也觉得你很辛苦，大力夸奖了你，但是似乎并不想提及加薪，你也一头雾水，百思不得其解。'
          },
          {
            subject: '结识比自己牛的人', id: 2, point: 1,
            analysis: '好棒！太机智了，把自己的薪资和公司的发展紧密相连，强调了自己可以为公司带来的价值，老板觉得你说得很在理，决定给你双倍加薪。'
          }, {
            subject: '跟陌生人快速熟悉', id: 3, point: 1,
            analysis: '好棒！太机智了，把自己的薪资和公司的发展紧密相连，强调了自己可以为公司带来的价值，老板觉得你说得很在理，决定给你双倍加薪。'
          },
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
    this.setState({ selected: choice, analysis: choice.analysis })
    let isRight = true
    if(choice.point === 0) {
      isRight = false
    }

    if(currentIndex !== practiceCount - 1) {
      this.setState({ showNext: true, isRight }, () => {
        let modal = document.querySelector('.modal-container')
        if(modal) {
          modal.style.opacity = 0
          setTimeout(() => {
            modal.style.opacity = 1
          }, 200)
        }
      })
    } else {
      this.setState({ showResult: true, isRight }, () => {
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
          {practiceCount !== 0 && currentIndex <= practiceCount - 1 ? <div className="intro-index">
            <span className="index">第{currentIndex + 1}/{practiceCount}题</span>
          </div> : null}
          <div className="question">
            <div dangerouslySetInnerHTML={{ __html: question }}/>
          </div>
          <div className="choice-list">
            {choiceList.map((choice, idx) => {
              return (
                <div key={id} className={`choice${selected.id === id ? ' selected' : ''}`}
                     onClick={e => this.onChoiceSelected(choice)}>
                  <span className={`index ${choice.point === 0 ? 'wrong' : ''}`}>{sequenceMap[ idx ]}</span>
                  <span className={`text ${choice.point === 0 ? 'wrong' : ''}`}>{choice.subject}</span>
                </div>
              )
            })}
          </div>
        </div>
      )
    }

    return (
      <div className="schedule-choice" style={{ minHeight: window.innerHeight }}>
        <div className="eva-container">
          <div className="eva-page-header">制定学习计划</div>
          <div className="eva-progress">
            <div className="eva-progress-bar"
                 style={{ width: (window.innerWidth - 90) / practiceCount * (currentIndex + 1) }}/>
          </div>
          {questionRender(practice[ currentIndex ] || {})}
        </div>
        {currentIndex === practiceCount - 1 ? <div className="submit-btn btn">提交</div> : null}
      </div>
    )
  }
}
