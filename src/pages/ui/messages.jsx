import React, { Component } from 'react'
import { message, Card, Button } from 'antd'

const openMessage = _ => {
  message.loading('测试message框', 0)
  setTimeout(_ => {
    message.destroy()
  }, 3000)
}

export default class Messages extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Card title="测试message">
        <Button onClick={openMessage}>显示</Button>
      </Card>
    )
  }
}
