import * as React from 'react'
import './Subject.less'
import { connect } from 'react-redux'
import { loadSubject  } from './async'
import { startLoad, endLoad, alertMsg } from '../../../redux/actions'

@connect(state => state)
export default class Subject extends React.Component<any, any> {
  constructor() {
    super()
    this.state = {
      article: {},
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch, location } = this.props
    dispatch(startLoad())
    loadSubject(location.query.submitId).then(res => {
      dispatch(endLoad())
      if(res.code === 200) {
        this.setState({ article: res.msg })
      } else {
        dispatch(endLoad())
        dispatch(alertMsg(res.msg))
      }
    }).catch(ex => {
      dispatch(endLoad())
      dispatch(alertMsg(ex.msg))
    })
  }

  render() {
    const { title, content, voteStatus, voteCount } = this.state.article

    const renderWorkContent = () => {
      return (
        <pre className="subject-content" dangerouslySetInnerHTML={{ __html: content }}/>
      )
    }

    return (
      <div>
        <div className="subject-container">
          <div className="article">
            <div className="article-header">{title}</div>
            {renderWorkContent()}
          </div>
        </div>
      </div>
    )
  }
}
