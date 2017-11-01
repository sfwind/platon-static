import * as React from 'react'
import { connect } from 'react-redux'
import { set, startLoad, endLoad, alertMsg } from 'redux/actions'
import './PersonalModify.less'

@connect(state => state)
export default class PersonalModify extends React.Component {

  constructor() {
    super()
  }

}
