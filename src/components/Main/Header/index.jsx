import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
import { connect } from 'react-redux'
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
// } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <header className="main-content-header">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        <div className="right">
          <span className="name">您好! {this.props.name}</span>
          <span className="logout">退出</span>
        </div>
      </header>
    )
  }
}
const mapStateToProps = state => {
  return {
    name: state.value,
  }
}
export default connect(mapStateToProps)(Header)
