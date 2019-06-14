import React, { Component } from 'react'
import { Card, Button, notification } from 'antd'
const key = 'notification'
const openNotification = () => {
  notification.error({
    key,
    placement: 'bottomLeft',
    message: '测试提醒功能',
    description: '这是测试这是测试',
    onCLick: _ => {
      console.log('关闭了')
    },
  })
  setTimeout(_ => {
    notification.close(key)
  }, 1000)
}
export default class Loadings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}
  render() {
    return (
      <Card hoverable title="消息提醒演示">
        <Button type="default" onClick={openNotification}>
          显示提醒
        </Button>
      </Card>
    )
  }
}
