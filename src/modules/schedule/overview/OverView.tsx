import * as React from 'react'
import { startLoad, endLoad, alertMsg } from 'redux/actions'
import { connect } from 'react-redux'
import { loadPersonalSchedule, updateCourseScheduleAll } from '../async'
import { calcScheduleData } from './util'
import { MonthSchedule } from './components/MonthSchedule'
import { SubmitButton } from '../components/SubmitButton'
import './OverView.less'
import Toast from '../../../components/Toast'
import AssetImg from '../../../components/AssetImg'

@connect(state => state)
export default class OverView extends React.Component {

  constructor() {
    super()
  }

  state = {
    scheduleList: [],
    draggable: false,
    showSubmitButton: true
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props
    dispatch(startLoad())
    loadPersonalSchedule().then(res => {
      if(res.code === 200) {
        dispatch(endLoad())
        this.setState({
          scheduleList: res.msg
        })
      } else {
        dispatch(alertMsg(res.msg))
      }
    }).catch(e => dispatch(alertMsg(e)))
  }

  componentWillUnmount() {
    this.disableAutoScroll()
  }

  scrollFunc(e) {
    let container = document.getElementById('overview-container')
    let containerHeight = container.offsetHeight
    let clientY = e.changedTouches[0].clientY
    let pageY = e.changedTouches[0].pageY
    if(clientY < window.innerHeight / 5 && pageY > 0) {
      for(let i = 0; i < 10; i++) {
        window.scrollTo(window.scrollX, window.scrollY - 1)
      }
    }
    if(clientY > window.innerHeight * 4 / 5 && pageY < containerHeight - window.innerHeight / 5) {
      for(let i = 0; i < 10; i++) {
        window.scrollTo(window.scrollX, window.scrollY + 1)
      }
    }
  }

  enableAutoScroll() {
    document.body.addEventListener('touchmove', this.scrollFunc, false)
  }

  disableAutoScroll() {
    document.body.removeEventListener('touchmove', this.scrollFunc, false)
  }

  switchDraggableStatus(draggable) {
    if(draggable) {
      let node = document.getElementById('overview-scroll')
      let result = calcScheduleData(node)
      updateCourseScheduleAll(result).then(res => {
        if(res.code === 200) {
          this.context.router.push('/middle')
        }
      })
    } else {
      this.setState({
        draggable: !this.state.draggable
      })
    }
  }

  handleSubmitButton(draggable) {
    if(draggable) {
      let node = document.getElementById('overview-scroll')
      let result = calcScheduleData(node)
      const { dispatch } = this.props
      dispatch(startLoad())
      updateCourseScheduleAll(result).then(res => {
        dispatch(endLoad())
        if(res.code === 200) {
          this.setState({ showToast: true, draggable: false })
        } else {
          dispatch(alertMsg(res.msg))
        }
      }).catch(e => dispatch(alertMsg(e)))
    } else {
      this.context.router.push(`/rise/static/course/schedule/plan`)
    }
  }

  render() {
    const { scheduleList = [], draggable = false, showSubmitButton = true, showToast = false } = this.state
    return (
      <div className="overview-container" id="overview-container" ref="overview-container">
        <div className="overview-title">学习计划</div>
        {
          draggable ?
            null :
            <div>
              <span className="overview-tips">根据你的回答，为您制定的学习计划如下</span>
              <span className="overview-tips" style={{ marginTop: '1rem' }}>（仅辅修课可点击选择/取消）</span>
            </div>
        }
        <div className="modify-tips-block">
          {
            draggable ?
              <section>
                <span className="modify-drag-tips">按住小课右侧按钮，即可拖动到其他月份（仅辅修课）</span>
              </section>
              : null
          }
          <span className={`modify-sequence ${draggable ? 'draggable' : ''}`}
                onClick={() => this.switchDraggableStatus(draggable)}>{draggable ? '恢复默认排序' : '调整课程顺序'}</span>
        </div>
        <div id="overview-scroll" className="overview-scroll">
          {
            scheduleList.map((schedules, index) => {
              return (
                <MonthSchedule key={index}
                               id={index}
                               schedules={schedules}
                               draggable={draggable}
                               switchSubmitButton={(submitButtonStatus) => {
                                 this.setState({ showSubmitButton: submitButtonStatus })
                               }}
                               enableAutoScroll={() => this.enableAutoScroll()}
                               disableAutoScroll={() => this.disableAutoScroll()}/>
              )
            })
          }
        </div>
        {
          showSubmitButton ?
            <SubmitButton clickFunc={() => this.handleSubmitButton(draggable)}
                          buttonText={draggable ? '完成顺序调整' : '确定'}/> : null
        }
        <Toast show={showToast} timeout={2000} height={220} width={200} top={160}>
          <AssetImg type="success" width={60} style={{ marginTop: 60 }}/>
          <div className="text">绑定成功</div>
        </Toast>
      </div>
    )
  }

}
