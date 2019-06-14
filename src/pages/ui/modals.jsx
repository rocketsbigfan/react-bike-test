import React, { Component } from 'react'
import { Card, Modal, Button } from 'antd'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class Modals extends Component {
  constructor(props) {
    super(props)
    this.state = {
      visible: false,
      loading: false,
    }
  }

  componentDidMount() {}

  handleClick = _ => {
    this.setState({
      visible: true,
    })
  }

  handleOk = () => {
    this.setState({ loading: true })
    setTimeout(() => {
      this.setState({ loading: false, visible: false })
    }, 3000)
  }

  handleCancel = e => {
    this.setState({
      visible: false,
    })
  }

  render() {
    return (
      <Card title="弹窗演示" hoverable>
        <Button onClick={this.handleClick}>显示弹窗</Button>
        <Modal
          visible={this.state.visible}
          title="弹窗"
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          footer={[
            <Button key="back" onClick={this.handleCancel}>
              返回
            </Button>,
            <Button
              key="submit"
              type="primary"
              loading={this.state.loading}
              onClick={this.handleOk}
            >
              提交
            </Button>,
          ]}
        />
      </Card>
    )
  }
}
