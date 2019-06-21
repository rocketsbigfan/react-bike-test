import React, { Component } from 'react'
import Header from './Header'
import Menu from './Menu'
import TagsNav from './TagsNav'
import { Layout } from 'antd'
import './style.less'
import '@/assets/css/index.less'
// import axios from '@/axios/index.js'
const { Sider, Content } = Layout

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
          <TagsNav />

          <Content className="main-content-box">{this.props.children}</Content>
        </Layout>
      </Layout>
    )
  }
}
