import React, { Component } from 'react'
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts'
import { Card } from 'antd'
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return <Card title="饼图" />
  }
}
