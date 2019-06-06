import React, { Component } from 'react'
import { Breadcrumb } from 'antd'
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
// } from 'react-router-dom'

export default class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userName: 'didi',
    }
  }

  componentDidMount() {}

  render() {
    return (
      <header className="main-content-header">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        <div className="right">
          <span className="name">您好! {this.state.userName}</span>
          <span className="logout">退出</span>
        </div>
      </header>
    )
  }
}
