import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
// } from 'react-router-dom'

class TagsNav extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    let { name } = this.props
    return (
      <div className="tags-nav-box">
        <span>{name}</span>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    name: state.tagNav,
  }
}
export default connect(mapStateToProps)(withRouter(TagsNav))
