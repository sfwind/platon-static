import * as React from 'react'
import { connect } from 'react-redux'
import './SchoolFriend.less'
import { alertMsg } from 'reduxutil/actions'
import { loadAllElites } from './async'

/**
 * 校友录（只有核心项目和商业进阶看到，展示核心项目和商业进阶）
 */
@connect(state => state)
export default class SchoolFriend extends React.Component<any, any> {

  constructor() {
    super()
    this.state = {
      clickedItem: 0,
      elites: [],

    }
  }

  async componentWillMount() {
    const { dispatch } = this.props
    let res = await loadAllElites()
    console.log(res)
    if(res.code === 200) {
      this.setState({
        elites: res.msg
      })
    } else {
      dispatch(alertMsg(res.msg))
    }

  }

  goAll() {
    this.setState({
      clickItem: 0
    })
  }

  goCity() {

    this.setState({
      clickItem: 1
    })
  }

  goIndustry() {
    this.setState({
      clickItem: 2
    })
  }

  goWorkYear() {
    this.setState({
      clickItem: 3
    })
  }

  render() {

    const { clickItem = 0, elites = [] } = this.state

    const renderSelect = () => {
      return (
        <div className="select-container">
          <div className="select-item" onClick={(e, v) => this.goAll()}
               style={{ color: clickItem === 0 ? '#333333' : '#666666' }}>
            显示全部
          </div>
          <div className="select-item" onClick={(e, v) => this.goCity()}
               style={{ color: clickItem === 1 ? '#333333' : '#666666' }}>
            所在城市
          </div>
          <div className="select-item" onClick={(e, v) => this.goIndustry()}
               style={{ color: clickItem === 2 ? '#333333' : '#666666' }}>
            所在行业
          </div>
          <div className="select-item" onClick={(e, v) => this.goWorkYear()}
               style={{ color: clickItem === 3 ? '#333333' : '#666666' }}>
            工作年限
          </div>
        </div>
      )
    }

    const renderList = () => {
      return (
        <div className="school-friend-list">
          {
            elites.forEach((item)=>{
              <div className="school-friend-item">
                <img src={item.headImg}/>
                <div className='nickname'>
                  {item.nickName}
                </div>
                <div className="introduction">
                  {item.province} | {item.industry} | 工作年限：{item.workLife}
                </div>
                <div className="memberId">
                  学号：{item.memberId}
                </div>
              </div>
            })
          }
        </div>
      )
    }

    return (
      <div className="school-friend-container">
        {renderSelect()}
        {renderList()}
        {/*{renderChoice()}*/}
      </div>
    )
  }

}
