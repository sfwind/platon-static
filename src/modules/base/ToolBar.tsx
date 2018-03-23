import * as React from 'react'
import { connect } from 'react-redux'
import {
  Tab,
  TabBody,
  TabBar,
  TabBarItem,
  TabBarIcon,
  TabBarLabel,
  Article,
} from 'react-weui'
import './ToolBar.less'
import { startLoad, endLoad, alertMsg, set } from 'reduxutil/actions'
import { loadOldCount } from '../message/async'

var FastClick = require('fastclick')

const tabItems = {
  home: {
    key: 0,
    bar: {
      icon: 'http://static.iqycamp.com/landing_home-xknjkbl8.png?imageslim',
      activeIcon: 'http://static.iqycamp.com/landing_home_active-oo64fchs.png?imageslim',
      label: '首页',
    },
  },
  learn: {
    key: 1,
    bar: {
      icon: 'https://static.iqycamp.com/images/tabbar_book_v2.png?imageslim',
      activeIcon: 'https://static.iqycamp.com/images/tabbar_book_active_v2.png?imageslim',
      label: '学习',
    },
  },
  mine: {
    key: 2,
    bar: {
      icon: 'https://static.iqycamp.com/images/tabbar_mine_v2.png?imageslim',
      activeIcon: 'https://static.iqycamp.com/images/tabbar_mine_active_v2.png?imageslim',
      label: '我的',
    },
  },
}

/**
 * 修改方式：
 * 1.在tabs里增加／删除导航项
 * 2.修改check url的部分
 * 3.增加handleChangeTab，增加点击事件
 * 导航项最少三个，最多五个
 */
@connect(state => state)
export class ToolBar extends React.Component<any, any> {

  static contextTypes = {
    router: React.PropTypes.object.isRequired,
  }

  componentWillMount () {
    let tabs = []
    tabs.push(tabItems.home)
    tabs.push(tabItems.learn)
    tabs.push(tabItems.mine)

    this.state = {
      tabs: tabs,
    }
    // check url
    const { dispatch } = this.props
    let tabIndex = 0

    console.log(window.location.pathname)

    if (window.location.pathname.indexOf('/rise/static/home') != -1) {
      console.log('enter 0')
      tabIndex = 0
    } else if (window.location.pathname.indexOf('/rise/static/rise') != -1 || window.location.pathname.indexOf('/rise/static/camp') != -1 || window.location.pathname.indexOf('/rise/static/learn') != -1) {
      console.log('enter 1')
      tabIndex = 1
    } else if (window.location.pathname.indexOf('/rise/static/customer') != -1 || window.location.pathname.indexOf('/rise/static/message') != -1) {
      console.log('enter 2')
      //消息中心和个人中心
      tabIndex = 2
    }
    dispatch(set('tabIndex', tabIndex))
    const { noticeMsgCount } = this.props
    loadOldCount().then(res => {
      if (res.code === 200) {
        dispatch(set('noticeMsgCount', res.msg))
      }
    })
  }

  componentDidMount () {
    FastClick.attach(document.querySelector('#tool_bar'))
  }

  handleChangeTab (tabIndex) {
    const { dispatch } = this.props
    dispatch(set('tabIndex', tabIndex))
    if (tabIndex === 0) {
      this.context.router.push('/rise/static/home')
    } else if (tabIndex === 1) {
      this.context.router.push('/rise/static/learn')
    } else if (tabIndex === 2) {
      this.context.router.push('/rise/static/customer/personal')
    }
  }

  render () {
    const { tabIndex = 0, noticeMsgCount } = this.props

    const renderIcon = (item, idx) => {
      const { bar } = item
      if (item.key === 0) {
        return (
          <img className={`left ${(this.state.tabs.length === 5 && idx === 2)
            ? 'bigger_img'
            : ''}`} src={tabIndex == item.key ? bar.activeIcon : bar.icon}/>
        )
      } else {
        return (
          <img className={`${(this.state.tabs.length === 5 && idx === 2)
            ? 'bigger_img'
            : ''}`} src={tabIndex == item.key ? bar.activeIcon : bar.icon}/>
        )
      }
    }

    return (
      this.props.hidden ? <div></div> : <div className="toolbar">
        <TabBar ref="toolBar" id={'tool_bar'}>
          {this.state.tabs.map((item, idx) => {
            const { bar } = item
            if (item.key === 2) {
              return (
                <TabBarItem key={idx}
                            className={`tab_bar_count_${this.state.tabs.length}`}
                            active={tabIndex == item.key}
                            onClick={() => this.handleChangeTab(item.key)}>
                  <TabBarIcon>
                    <img className={`${item.key === 2 ? 'mine_icon' : ''}`}
                         src={tabIndex == item.key ? bar.activeIcon : bar.icon}/>
                    {noticeMsgCount ?
                     <span>{noticeMsgCount > 99 ? 99 : noticeMsgCount}</span> :
                     null}
                  </TabBarIcon>
                  <TabBarLabel>{bar.label}</TabBarLabel>
                </TabBarItem>
              )
            } else {
              return (
                <TabBarItem key={idx}
                            className={`tab_bar_count_${this.state.tabs.length}`}
                            active={tabIndex == item.key}
                            onClick={() => this.handleChangeTab(item.key)}
                            label={bar.label}
                            icon={
                              <div className={`${(this.state.tabs.length === 5 && idx === 2) ? 'bigger_icon' : ''}`}>
                                {renderIcon(item, idx)}
                              </div>
                            }/>
              )
            }
          })}
        </TabBar>
      </div>
    )
  }
}
