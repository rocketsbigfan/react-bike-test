import React, { Component } from 'react'
// import { Row, Col } from 'antd'
import Header from './Header'
import { Layout } from 'antd'
import './style.less'
import Menu from './Menu'
const { Footer, Sider, Content } = Layout
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
// } from 'react-router-dom'

export default class Main extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Layout className="main">
        <Sider className="main-side">
          <div className="logo">logo</div>
          <Menu />
        </Sider>
        <Layout className="main-content">
          <Header />
          <div className="main-content-box">content</div>
        </Layout>
      </Layout>
    )
  }
}
