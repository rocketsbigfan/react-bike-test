import React, { Component } from 'react'
import { Card, Button, Table } from 'antd'
import axios from '@/axios'
export default class Carousels extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
    }
  }
  componentDidMount() {
    this.fetch()
  }
  fetch() {
    this.setState({
      loading: true,
    })
    axios.get('/peopleList').then(res => {
      if (res.data.code === 200) {
        this.setState({
          data: res.data.result,
        })
      }
    })
  }
  pageChange = (pagination, filters, sorter) => {
    console.log(pagination, filters, sorter)
  }
  render() {
    const column = [
      {
        key: 1,
        dataIndex: 'firstName',
        title: '姓',
      },
      {
        key: 2,
        dataIndex: 'lastName',
        title: '名',
      },
      {
        key: 3,
        dataIndex: 'name',
        title: '姓名',
        render: (text, record) => (
          <span>
            {record.firstName}
            {record.lastName}
          </span>
        ),
      },
    ]
    return (
      // pagination={{ total: 20 }} 设置表达式
      <Card title="表格演示">
        <Table
          columns={column}
          onChange={this.pageChange}
          dataSource={this.state.data}
        />
      </Card>
    )
  }
}
