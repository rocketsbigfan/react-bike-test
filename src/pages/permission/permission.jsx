import React, { Component } from 'react'
import { Card, Table, Button, Modal, Tree, message, Spin } from 'antd'
import axios from '@/axios'
const { TreeNode } = Tree
export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pagination: {
        current: 1,
        pageSize: 10,
      },
      loading: false,
      data: [],
      modalVisible: false,
      menuConfig: [],
      checkedDatas: [],
      confirmLoading: false,
      permissionLoading: false,
    }
  }

  componentDidMount() {
    this.fetch({ current: 1 })
  }

  fetch = ({ current }) => {
    this.setState({
      loading: true,
    })
    axios
      .post('/userList', {
        current,
      })
      .then(res => {
        if (res.data.code === 200) {
          const pagination = { ...this.state.pagination }
          pagination.total = 200
          this.setState({
            loading: false,
            data: res.data.result,
            pagination,
          })
        }
      })
  }

  // 点击分页
  handlePageChange = pagination => {
    let { current } = pagination
    pagination.current = current
    this.setState({
      pagination,
    })
    this.fetch(pagination)
  }
  hanldeEdit = text => {
    this.setState({
      modalVisible: true,
      menuConfig: [],
    })
    this.getPermission()
  }

  renderTree = data => {
    return data.map(item => {
      if (item.children && item.children.length) {
        return (
          <TreeNode title={item.title} key={item.key}>
            {this.renderTree(item.children)}
          </TreeNode>
        )
      }
      return <TreeNode {...item} />
    })
  }
  // 获取权限
  getPermission = _ => {
    this.setState({
      permissionLoading: true,
    })
    axios.get('/permission').then(res => {
      if (res.data.code === 200) {
        this.setState({
          menuConfig: res.data.result,
          permissionLoading: false,
        })
      }
    })
  }
  // 关闭弹窗
  handleCancel = _ => {
    this.setState({
      modalVisible: false,
    })
  }
  // 点击复选框
  handleCheck = datas => {
    this.setState({
      checkedDatas: datas,
    })
  }
  //
  handleOk = _ => {
    this.setState({
      confirmLoading: true,
    })
    // ajax
    setTimeout(_ => {
      this.setState({
        modalVisible: false,
        confirmLoading: false,
        checkedDatas: [],
      })
      // 清空修改数据
      message.success('权限修改成功')
    }, 3000)
  }
  render() {
    const column = [
      {
        key: 1,
        dataIndex: 'account',
        title: '账号',
      },
      {
        key: 2,
        dataIndex: 'username',
        title: '用户名',
      },
      {
        key: '4',
        title: '修改',
        render: (text, record) => {
          return <Button onClick={() => this.hanldeEdit(text)}>编辑权限</Button>
        },
      },
    ]
    return (
      <Card title="权限设置">
        <Table
          loading={this.state.loading}
          columns={column}
          onChange={this.handlePageChange}
          dataSource={this.state.data}
          pagination={this.state.pagination}
        />
        <Modal
          title="编辑权限"
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          visible={this.state.modalVisible}
          confirmLoading={this.state.confirmLoading}
        >
          <Spin
            style={{ display: 'block' }}
            spinning={this.state.permissionLoading}
          >
            {/* 针对treetree组件的缓存处理 */}
            {this.state.menuConfig.length ? (
              <Tree checkable onCheck={this.handleCheck}>
                {this.renderTree(this.state.menuConfig)}
              </Tree>
            ) : (
              ''
            )}
          </Spin>
        </Modal>
      </Card>
    )
  }
}
