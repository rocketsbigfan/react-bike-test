import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Card, Form, Input, Button, message } from 'antd'
import { AsyncLogin, ChangeMenu } from '@/redux/actionCreator'
import { setMenu } from '@/libs/utils'
import './style.less'
import axios from '@/axios'
import { withRouter } from 'react-router-dom'
const FormItem = Form.Item
class LoginForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }
  // 箭头函数影响性能
  handleClick = e => {
    e.preventDefault()
    const { validateFields } = this.props.form
    const { asyncLogin, history, changeMenu } = this.props
    validateFields((err, value) => {
      if (!err) {
        this.setState({
          loading: true,
        })
        axios.get('/login').then(res => {
          if (res.data.code === 200) {
            this.setState({
              loading: false,
            })
            asyncLogin().then(res => {
              this.setState({
                loading: false,
              })
              // ajax请求异步信息
              import('@/config/menuConfig').then(res => {
                setMenu(res.default)
                changeMenu(res.default)
                // 登录成功跳转
                history.push('/home')
              })
            })
          }
        })
      } else {
        message.error('请输入完整信息！')
      }
    })
  }
  render() {
    const formLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 18 },
    }
    const formItemLayout = {
      wrapperCol: {
        offset: 6,
        span: 18,
      },
    }
    const { getFieldDecorator } = this.props.form
    // const { password, username } = this.state
    return (
      <Form {...formLayout}>
        <FormItem label="用户名">
          {getFieldDecorator('username', {
            rules: [
              {
                type: 'string',
                required: true,
                message: '请输入用户名',
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem label="密码">
          {getFieldDecorator('password', {
            rules: [
              { type: 'string', required: true, message: '密码不能为空' },
              { min: 6, message: '请输入正确密码' },
            ],
          })(<Input.Password />)}
        </FormItem>
        <FormItem {...formItemLayout}>
          <Button
            block
            type="primary"
            loading={this.state.loading}
            onClick={this.handleClick}
          >
            登录
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const Login = Form.create()(LoginForm)

class LoginBox extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    const { asyncLogin, changeMenu, history } = this.props
    return (
      <section className="login-wrapper">
        <section className="login-wrapper-bg" />
        <Card title="登录" className="login-box">
          <Login
            history={history}
            changeMenu={changeMenu}
            asyncLogin={asyncLogin}
          />
        </Card>
      </section>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    asyncLogin: token => {
      return dispatch(AsyncLogin(token))
    },
    changeMenu: menu => {
      dispatch(ChangeMenu(menu))
    },
  }
}
export default connect(
  _ => {
    return {}
  },
  mapDispatchToProps,
)(withRouter(LoginBox))
