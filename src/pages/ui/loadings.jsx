import React, { Component } from 'react'
import { Card, Spin, Alert } from 'antd'

export default class Loadings extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}
  render() {
    return (
      <Card hoverable title="loading演示">
        <Spin />
        <Spin spinning delay={500} tip="加载中">
          <Alert
            title="测试loading"
            description="Further details about the context of this alert."
          />
        </Spin>
      </Card>
    )
  }
}
