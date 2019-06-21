import React, { Component } from 'react'
import { Form, Card, Button, Input, DatePicker, Checkbox } from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const formLayout = {
  labelCol: { span: 3 },
  wrapperCol: { span: 14 },
}
const formItemLayout = {
  wrapperCol: {
    offset: 3,
  },
}

class FormLogin extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loginFormValue: {
        username: 'fanghao',
        password: '123',
      },
    }
  }

  componentDidMount() {}

  handleSubmit = event => {
    event.preventDefault()
    this.props.form.validateFields((error, value) => {
      // 当有值时，error为null，未填写时error为rules对象
      if (!error) {
        console.log(value)
      } else {
      }
    })
    return false
  }
  handleCancel = _ => {
    console.log(this.props.form)
    this.props.form.resetFields()
  }
  render() {
    const { getFieldDecorator } = this.props.form
    const { password, username } = this.state.loginFormValue
    return (
      <Form onSubmit={this.handleSubmit} labelAlign="right" {...formLayout}>
        <FormItem
          label="用户名"
          validateStatus="warning"
          extra="用户名为登录唯一标识"
        >
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
            initialValue: username,
          })(<Input placeholder="用户名" />)}
        </FormItem>
        <FormItem label="账号">
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
            initialValue: password,
          })(<Input placeholder="密码" type="password" />)}
        </FormItem>
        <FormItem {...formItemLayout}>
          {getFieldDecorator('remember', {
            rules: [],
            valuePropName: 'checked',
            initialValue: true,
          })(<Checkbox>记住密码</Checkbox>)}
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button type="primary" htmlType="submit">
            登录
          </Button>
          <Button
            style={{ marginLeft: '10px' }}
            type="default"
            onClick={this.handleCancel}
          >
            取消
          </Button>
        </FormItem>
      </Form>
    )
  }
}

class NoRequiredForm extends Component {
  getValue = _ => {
    let values = this.props.form.getFieldValue('test2')
    console.log(values.format('YYYY-MM-DD'))
  }
  render() {
    const { getFieldDecorator } = this.props.form
    return (
      <Form {...formLayout}>
        <FormItem label="测试1">
          {getFieldDecorator('test1', {
            rules: [],
            initialValue: '',
          })(<Input placeholder="" />)}
        </FormItem>
        <FormItem label="测试2">
          {getFieldDecorator('test2', {
            rules: [],
            initialValue: moment('2015/01/01', 'YYYY/MM/DD'),
          })(<DatePicker format="YYYY-MM-DD" />)}
        </FormItem>
        <Form.Item {...formItemLayout}>
          <Button type="primary" onClick={this.getValue}>
            取值
          </Button>
        </Form.Item>
      </Form>
    )
  }
}

const LoginCard = Form.create()(FormLogin)
const TestCard = Form.create()(NoRequiredForm)

class Login extends Component {
  componentDidMount() {}
  render() {
    return (
      <div>
        <Card title="登录表单">
          <LoginCard wrappedComponentRef={ref => (this.formRef = ref)} />
        </Card>
        <Card style={{ marginTop: '10px' }} title="测试表单">
          <TestCard />
        </Card>
      </div>
    )
  }
}

export default Login
