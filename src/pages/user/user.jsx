import React, { Component } from 'react'
import {
  Card,
  Button,
  Table,
  Tag,
  Modal,
  Select,
  Form,
  Input,
  Radio,
  message,
} from 'antd'
import axios from '@/axios'
const FormItem = Form.Item
const Option = Select.Option
// 字段及表单布局
const formLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
}
// 修改表单
class UserEditForm extends Component {
  render() {
    const { getFieldDecorator } = this.props.form
    let { username, account, state, job } = this.props
    return (
      <Form {...formLayout}>
        <FormItem label="账号">
          {getFieldDecorator('username', {
            rules: [
              { type: 'string', required: true, message: '账号不能为空' },
            ],
            initialValue: username,
          })(<Input readOnly />)}
        </FormItem>
        <FormItem label="用户名">
          {getFieldDecorator('account', {
            rules: [
              { type: 'string', required: true, message: '用户名不能为空' },
            ],
            initialValue: account,
          })(<Input />)}
        </FormItem>

        <FormItem label="职位">
          {getFieldDecorator('job', {
            rules: [{ type: 'array', required: true, message: '请选择职位' }],
            initialValue: job,
          })(
            <Select placeholder="请选择职位" mode="multiple">
              <Option value={1}>电工</Option>
              <Option value={2}>木工</Option>
              <Option value={3}>教师</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem label="状态">
          {getFieldDecorator('state', { initialValue: state })(
            <Radio.Group>
              <Radio value={1}>启用</Radio>
              <Radio value={0}>禁用</Radio>
            </Radio.Group>,
          )}
        </FormItem>
      </Form>
    )
  }
}
const UserEditFormCreate = Form.create({})(UserEditForm)

// 新增表单
class UserAddForm extends Component {
  confirmPassword = (rule, value, callback) => {
    const { form } = this.props
    if (value && value !== form.getFieldValue('password1')) {
      callback('两次密码输入不一致，请确认')
    }
    callback()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...formLayout}>
        <FormItem label="用户名">
          {getFieldDecorator('username', {
            rules: [
              { type: 'string', required: true, message: '请输入用户名' },
            ],
          })(<Input placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem label="账号">
          {getFieldDecorator('account', {
            rules: [{ type: 'string', required: true, message: '请输入账号' }],
          })(<Input placeholder="请输入账号" />)}
        </FormItem>
        <FormItem label="密码">
          {getFieldDecorator('password1', {
            rules: [{ type: 'string', required: true, message: '请输入密码' }],
          })(<Input.Password placeholder="请输入密码" />)}
        </FormItem>
        <FormItem label="确认密码">
          {getFieldDecorator('password2', {
            rules: [
              { type: 'string', required: true, message: '请输入确认密码' },
              {
                validator: this.confirmPassword,
              },
            ],
          })(<Input.Password placeholder="请输入确认密码" />)}
        </FormItem>
        <FormItem label="工作">
          {getFieldDecorator('job', {
            rules: [
              { type: 'array', required: true, message: '请选择工作类型' },
            ],
          })(
            <Select mode="multiple" placeholder="请选择职位">
              <Option value={1}>1</Option>
              <Option value={2}>2</Option>
              <Option value={3}>3</Option>
            </Select>,
          )}
        </FormItem>
      </Form>
    )
  }
}
const UserAddFormCreate = Form.create({})(UserAddForm)

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      showEditModal: false,
      showAddModal: false,
      confirmLoading: false,
      addLoading: false,
      pagination: {
        current: 1,
        pageSize: 10,
      },
      userData: {
        username: '',
        account: '',
        password: '',
        state: 0,
        job: [],
      },
    }
  }
  componentDidMount() {
    this.fetch(this.state.pagination)
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
  // 点击修改按钮
  hanldeEdit = userData => {
    this.setState({
      userData,
      showEditModal: true,
    })
  }
  // 关闭修改弹窗
  handleCloseModal = _ => {
    this.setState({
      showEditModal: false,
    })
    const { resetFields } = this.editForm.props.form
    resetFields()
  }
  // 关闭新增弹窗
  handleCloseAddModal = _ => {
    this.setState({
      showAddModal: false,
    })
  }
  // 点击修改框ok按钮
  handleOk = _ => {
    const { validateFields, resetFields } = this.editForm.props.form
    validateFields((err, value) => {
      this.setState({
        confirmLoading: true,
      })
      if (!err) {
        console.log(value)
        // ajax
        setTimeout(_ => {
          this.setState({
            showEditModal: false,
            confirmLoading: false,
          })
          // 清空修改数据
          resetFields()
          message.success('修改成功')
        }, 3000)
      }
    })
  }
  // 打开新增弹窗
  handleAdd = _ => {
    this.setState({
      showAddModal: true,
    })
  }
  // 点击新增框ok按钮
  handleAddOk = _ => {
    const { validateFields, resetFields } = this.addForm.props.form
    validateFields((err, value) => {
      if (!err) {
        this.setState({
          addLoading: true,
        })
        console.log(value)
        // ajax
        setTimeout(_ => {
          this.setState({
            showAddModal: false,
            addLoading: false,
          })
          // 清空修改数据
          resetFields()
          message.success('添加成功')
        }, 3000)
      }
    })
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
        key: 3,
        dataIndex: 'state',
        title: '状态',
        render: (text, record) =>
          text ? <Tag color="geekblue">启用</Tag> : <Tag color="red">禁用</Tag>,
      },
      {
        key: 5,
        dataIndex: 'job',
        title: '状态',
        render: (text, record) => text.map(item => item),
      },
      {
        key: '4',
        title: '修改',
        render: (text, record) => {
          return <Button onClick={() => this.hanldeEdit(text)}>编辑</Button>
        },
      },
    ]
    return (
      // pagination={{ total: 20 }} 设置表达式
      <Card title="人员管理">
        <Button
          type="primary"
          style={{ marginBottom: '10px' }}
          onClick={this.handleAdd}
        >
          新增账号
        </Button>
        <Table
          loading={this.state.loading}
          columns={column}
          dataSource={this.state.data}
          onChange={this.handlePageChange}
          pagination={this.state.pagination}
        />
        <Modal
          title="新增账户"
          visible={this.state.showAddModal}
          onCancel={this.handleCloseAddModal}
          onOk={this.handleAddOk}
          confirmLoading={this.state.addLoading}
        >
          <UserAddFormCreate
            wrappedComponentRef={form => (this.addForm = form)}
          />
        </Modal>
        <Modal
          title="修改用户信息"
          visible={this.state.showEditModal}
          onCancel={this.handleCloseModal}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
        >
          <UserEditFormCreate
            {...this.state.userData}
            wrappedComponentRef={form => (this.editForm = form)}
          />
        </Modal>
      </Card>
    )
  }
}
