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
// 修改表单
class UserForm extends Component {
  render() {
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
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
const UserFormCreate = Form.create({})(UserForm)

export default class User extends Component {
  constructor(props) {
    super(props)
    this.state = {
      data: [],
      loading: false,
      showModal: false,
      confirmLoading: false,
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
    this.fetch()
  }
  fetch = _ => {
    this.setState({
      loading: true,
    })
    axios.post('/userList').then(res => {
      if (res.data.code === 200) {
        this.setState({
          loading: false,
          data: res.data.result,
        })
      }
    })
  }
  // 点击修改按钮
  hanldeEdit = userData => {
    this.setState(
      {
        userData,
      },
      _ => {
        this.setState({
          showModal: true,
        })
      },
    )
  }
  // 关闭弹窗
  handleCloseModal = _ => {
    this.setState({
      showModal: false,
    })
    const { resetFields } = this.form.props.form
    resetFields()
  }
  // 修改
  handleOk = _ => {
    this.setState({
      confirmLoading: true,
    })
    const { validateFields } = this.form.props.form
    validateFields((err, value) => {
      if (!err) {
        console.log(value)
        // ajax
        setTimeout(_ => {
          this.setState({
            showModal: false,
            confirmLoading: false,
          })
          message.success('修改成功')
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
        <Table
          loading={this.state.loading}
          columns={column}
          dataSource={this.state.data}
        />
        <Modal
          title="修改用户信息"
          visible={this.state.showModal}
          onCancel={this.handleCloseModal}
          onOk={this.handleOk}
          confirmLoading={this.state.confirmLoading}
        >
          <UserFormCreate
            {...this.state.userData}
            wrappedComponentRef={form => (this.form = form)}
          />
        </Modal>
      </Card>
    )
  }
}
