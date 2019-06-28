import React, { Component } from 'react'
import { Card } from 'antd'
import { Chart, Geom, Axis, Tooltip, Legend } from 'bizcharts'
export default class Bar extends Component {
  componentDidMount() {}

  render() {
    // 数据源
    const data = [
      { genre: 'Sports', sold: 275, income: 2300 },
      { genre: 'Strategy', sold: 115, income: 667 },
      { genre: 'Action', sold: 120, income: 982 },
      { genre: 'Shooter', sold: 350, income: 5271 },
      { genre: 'Other', sold: 150, income: 3710 },
    ]

    // 定义度量
    const cols = {
      sold: { alias: '销售量' },
      genre: { alias: '游戏种类' },
    }
    return (
      <Card title="柱形图演示">
        <Chart height={400} forceFit data={data} scale={cols}>
          <Axis name="genre" title />
          <Axis name="sold" title />
          <Legend position="top" dy={-20} />
          <Tooltip />
          <Geom type="interval" position="genre*sold" color="genre" />
        </Chart>
      </Card>
    )
  }
}
