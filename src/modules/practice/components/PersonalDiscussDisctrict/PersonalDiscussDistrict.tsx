import * as React from 'react'
import './PersonalDiscussDistrict.less'
import AssetImg from '../../../../components/AssetImg'
import { formatDate, getRealLength, removeHtmlTags } from '../../../../utils/helpers'
import { Dialog } from 'react-weui'
import { requestApplicationComment } from '../../../message/async'

const { Alert } = Dialog

export default class PersonalDiscussDistrict extends React.Component {

  constructor () {
    super()
    this.state = {
      confirmParams: {},
      showConfirm: false,
      confirmContent: '',
    }
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

  handleClickDeleteComment (id) {
    const { deleteFunc, } = this.props
    this.setState({
      confirmParams: {
        buttons: [
          { label: '取消', onClick: () => this.setState({ showConfirm: false }) },
          {
            label: '确认',
            onClick: () => {
              this.setState({
                showConfirm: false,
              })
              deleteFunc(id)
            },
          },
        ],
      },
      showConfirm: true,
      confirmContent: '确认删除此评论？',
    })
  }

  async handleRequestApplicationComment (id) {
    let res = await requestApplicationComment(id)
    if (res.code === 200) {
      this.setState({
        confirmParams: {
          buttons: [
            { label: '我知道了', onClick: () => this.setState({ showConfirm: false }) },
          ],
        },
        showConfirm: true,
        confirmContent: '求点评成功',
      })
    } else {
      this.setState({
        confirmParams: {
          buttons: [
            { label: '我知道了', onClick: () => this.setState({ showConfirm: false }) },
          ],
        },
        showConfirm: true,
        confirmContent: '本课程求点评次数已用完',
      })
    }
  }

  async handleClickVote (discuss) {
    const { id, selfVoted } = discuss
    if (selfVoted) {
      return
    }
    const {
      voteFunc = () => {
      },
    } = this.props
    let targetDiscuss = JSON.parse(JSON.stringify(this.state.discuss))
    targetDiscuss.selfVoted = true
    targetDiscuss.voteCount = targetDiscuss.voteCount + 1
    this.setState({
      discuss: targetDiscuss,
    })
    voteFunc(id)
  }

  render () {
    const {
      discuss = {
        id: 0,
        avatar: '',
        addTime: '',
        content: '',
        nickname: '',
        publishTime: '',
      },
      comments = [],
      showDiscussAll = false,
      confirmParams = {},
      showConfirm = false,
      confirmContent = '',
    } = this.state
    const {
      deleteFunc,
      showVote = false,
      showRequestComment = false,
    } = this.props

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
                          url="https://static.iqycamp.com/asst-gh4skljm.png"></AssetImg>
              }
              {
                showRequestComment &&
                <div className="request-comment"
                     style={{ color: '#56cec0' }}
                     onClick={() => this.handleRequestApplicationComment(discuss.id)}>
                  <AssetImg className="icon"
                            url="https://static.iqycamp.com/request_comment_2-g9tnvx5x.png"/>
                  <span className="request-span">求点评</span>
                </div>
              }
              {
                showVote &&
                <div className="vote-data"
                     onClick={() => this.handleClickVote(discuss)}>
                  <AssetImg className="icon"
                            url={discuss.selfVoted ? 'https://static.iqycamp.com/voted-9lfn0uhh.png' : 'https://static.iqycamp.com/forvote-fjcbveqn.png'}/>
                  <span className="vote-count">&nbsp;&nbsp;{discuss.voteCount}</span>
                </div>
              }
            </div>
            <div className={`comment ${showDiscussAll ? '' : 'hidden'}`}>
              <div dangerouslySetInnerHTML={{ __html: showDiscussAll ? discuss.content : removeHtmlTags(discuss.content), }}></div>
            </div>
            {
              (discuss.content && (getRealLength(removeHtmlTags(discuss.content)) > 90 || discuss.content.indexOf('<p') > -1 || discuss.content.indexOf('<img') > -1)) &&
              <div className="show-tips"
                   onClick={() => this.handleClickToggleDiscussShow()}>
                {showDiscussAll ? '收起' : '展开'}
              </div>
            }
            <div className="bottom-data">
              <div className="publish">{formatDate(new Date(discuss.publishTime), 'yyyy-MM-dd hh:mm')}</div>
              {
                deleteFunc &&
                <div className="delete"
                     onClick={() => this.handleClickDeleteComment(discuss.id)}>删除</div>
              }
            </div>
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
                                url="https://static.iqycamp.com/asst-gh4skljm.png"></AssetImg>
                    }
                  </div>
                  <div className={`comment ${item.showCommentAll ? '' : 'hidden'}`}>{item.showCommentAll ? item.content : removeHtmlTags(item.content)}</div>
                  {
                    getRealLength(removeHtmlTags(item.content)) > 75 &&
                    <div className="show-tips"
                         onClick={() => this.handleClickToggleCommentsShow(index)}>
                      {item.showCommentAll ? '收起' : '展开'}
                    </div>
                  }
                  <div className="bottom-data">
                    <div className="publish">{formatDate(new Date(item.publishTime), 'yyyy-MM-dd hh:mm')}</div>
                  </div>
                </div>
              </div>
            )
          })
        }

        <Alert {...confirmParams} show={showConfirm}>
          <p>{confirmContent}</p>
        </Alert>
      </div>
    )
  }

}
