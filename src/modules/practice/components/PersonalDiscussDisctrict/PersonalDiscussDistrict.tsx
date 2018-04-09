import * as React from 'react'
import './PersonalDiscussDistrict.less'
import AssetImg from '../../../../components/AssetImg'
import { formatDate, getRealLength, removeHtmlTags, splitContent } from '../../../../utils/helpers'

export default class PersonalDiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {}
  }

  componentWillMount () {
    let {
      discuss = {},
      comments = [],
    } = this.props
    comments.map(comment => comment.showCommentAll = false)
    this.setState({
      discuss: discuss,
      comments: comments,
    })
  }

  handleClickToggleDiscussShow () {
    this.setState({
      showDiscussAll: !this.state.showDiscussAll,
    })
  }

  handleClickToggleCommentsShow (index) {
    let targetCommenst = JSON.parse(JSON.stringify(this.state.comments))
    targetCommenst.map((comment, seq) => {
      if (seq === index) {
        comment.showCommentAll = !comment.showCommentAll
      }
    })
    this.setState({
      comments: targetCommenst,
    })
  }

  render () {
    const {
      discuss = {
        avatar: '',
        addTime: '',
        content: '',
        nickname: '',
        publishTime: '',
      },
      comments = [],
      showDiscussAll = false,
    } = this.state

    return (
      <div className="personal-discuss-district-component">
        <div className="personal-block">
          <AssetImg url={discuss.avatar}
                    className="headimg"/>
          <div className="right-block">
            <div className="person-detail">
              <div className="nickname">{discuss.nickname}</div>
              {
                discuss.isAsst &&
                <AssetImg className="person-title"
                          url="https://static.iqycamp.com/asst_icon-dlwllkbr.png"></AssetImg>
              }
            </div>
            <div className={`comment ${showDiscussAll ? '' : 'hidden'}`}>
              <div dangerouslySetInnerHTML={{ __html: discuss.content, }}></div>
            </div>
            {
              getRealLength(removeHtmlTags(discuss.content)) > 90 &&
              <div className="show-tips"
                   onClick={() => this.handleClickToggleDiscussShow()}>
                {showDiscussAll ? '收起' : '展开'}
              </div>
            }
            <div className="publish">{formatDate(new Date(discuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
          </div>
        </div>
        {
          comments.map((item, index) => {
            return (
              <div key={index}
                   className="personal-block comment-block">
                <AssetImg url={item.avatar}
                          className="headimg"/>
                <div className="right-block">
                  <div className="person-detail">
                    <div className="nickname">{item.nickname}</div>
                    {
                      item.isAsst &&
                      <AssetImg className="person-title"
                                url="https://static.iqycamp.com/asst_icon-dlwllkbr.png"></AssetImg>
                    }
                  </div>
                  <div className={`comment ${item.showCommentAll ? '' : 'hidden'}`}>{item.content}</div>
                  {
                    getRealLength(item.content) > 75 &&
                    <div className="show-tips"
                         onClick={() => this.handleClickToggleCommentsShow(index)}>
                      {item.showCommentAll ? '收起' : '展开'}
                    </div>
                  }
                  <div className="publish">{formatDate(new Date(item.publishTime), 'yyyy-MM-dd hh:mm')}</div>
                </div>
              </div>
            )
          })
        }
      </div>
    )
  }

}
