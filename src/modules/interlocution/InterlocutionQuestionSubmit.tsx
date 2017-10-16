import React, { Component } from 'react';
import { connect } from 'react-redux';
import { startLoad, endLoad, alertMsg, set } from "../../redux/actions"
import { submitInterlocutionQuestion, loadInterlocutionDateInfo } from './async';
import * as _ from 'lodash';

const headerStyle = {
  fontSize: '1.7em',
  textAlign: 'center',
  color: '#666',
  padding: '15px 0'
}

const questionStyle = {
  width: `${window.innerWidth - 30}px`,
  marginLeft: '15px',
  padding: '5px 0'
}

const lengthDiv = {
  marginRight: '10px',
  marginTop: '-25px',
}

const lengthTip = {
  color: '#999',
  fontSize: '11px',
  textAlign: 'right',
}

const footerStyle = {
  position: 'fixed',
  textAlign: 'center',
  width: '100%',
  bottom: 0,
  left: 0,
  zIndex: 1000,
  height: '65px',
  borderTop: '1px solid #ccc',
  backgroundColor: '#fff'
}

const btnStyle = {
  position: 'absolute',
  top: '50%',
  left: 0,
  margin: '0 6%',
  width: '88%',
  webKitTransform: 'translateY(-50%)',
  transform: 'translateY(-50%)',
  backgroundColor: '#55cbcb',
  color: '#fff',
  height: '40px',
  borderRadius: '20px',
  textAlign: 'center',
  lineHeight: '40px',
  fontSize: '2rem'
}

const txtStyle = {
  borderRadius: '4px',
  height: '150px',
  width: `${window.innerWidth - 56}px`,
  display: 'inline-block',
  resize: 'none',
  border: '1px solid #ccc',
  fontSize: '16px',
  padding: '10px 12px',
  boxShadow: '0 0 0 transparent',
  webkitAppearance: 'none',
}

@connect(state => state)
export default class InterlocutionQuestionSubmit extends Component {
  constructor() {
    super();
    this.state = {
      length: 0,
      title: '',
      lengthLimit: 50,
      id: null,
    }
  }

  static contextTypes = {
    router: React.PropTypes.object.isRequired
  }

  componentWillMount() {
    const { dispatch } = this.props;
    let interloctionDate = _.get(this.props, 'location.query.date');
    dispatch(startLoad());
    loadInterlocutionDateInfo(interloctionDate).then(res => {
      dispatch(endLoad());
      if(res.code === 200) {
        this.setState({ dateInfo: res.msg });
      } else {
        dispatch(alertMsg(res.msg));
      }
    }).catch(ex => {
      dispatch(endLoad());
      dispatch(alertMsg(ex));
    })

  }

  writeTitle(title) {
    this.setState({ title, length: title.length });
  }

  handleClickSubmit() {
    const { dispatch, location } = this.props;
    const { title, id } = this.state;
    const { date } = location.query;
    if(title) {
      dispatch(startLoad());
      submitInterlocutionQuestion({
        topic: title, id: id, interlocutionDate: date
      }).then(res => {
        dispatch(endLoad());
        if(res.code === 200) {
          // 提交成功
          this.context.router.push({
            pathname: '/rise/static/inter/questions',
            query: { date: date },
          })
        } else {
          // 提交失败
          dispatch(alertMsg(res.msg));
        }

      }).catch(ex => {
        dispatch(endLoad());
        dispatch(alertMsg(ex));
      })
    } else {
      dispatch(alertMsg('请输入提问内容'))
    }
  }

  render() {
    const { title, length, lengthLimit, dateInfo = {} } = this.state;
    return (
      <div>
        <div style={headerStyle}>
          提问
        </div>
        <div style={questionStyle}>
            <textarea
              style={txtStyle}
              placeholder={`提出你关于“${dateInfo.topic ? dateInfo.topic : ''}”的问题（50字以内）`}
              id="textarea" maxLength={lengthLimit} defaultValue={title} value={title}
              onChange={(e) => this.writeTitle(e.currentTarget.value)}
            />
          <div style={lengthDiv}>
            <div style={lengthTip}>
              {length} / {lengthLimit}
            </div>
          </div>
        </div>
        <div style={footerStyle} onClick={() => this.handleClickSubmit()}>
          <div style={btnStyle}>
            提交
          </div>
        </div>
      </div>
    )
  }
}
