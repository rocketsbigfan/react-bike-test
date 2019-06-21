import React, { Component } from 'react'
import {
  Button,
  Card,
  Form,
  message,
  Input,
  Radio,
  DatePicker,
  Select,
  Checkbox,
} from 'antd'
import moment from 'moment'
const FormItem = Form.Item
const RadioGroup = Radio.Group
const TextArea = Input.TextArea
const Option = Select.Option

class Register extends Component {
  constructor(props) {
    super(props)
    this.state = {
      btnLoading: false,
    }
  }

  componentDidMount() {}

  disabledEndDate = time => {
    return moment(time).valueOf() >= new Date().valueOf()
  }

  handleReset = _ => {
    const { resetFields } = this.props.form
    resetFields()
  }

  handleSubmit = _ => {
    const { validateFieldsAndScroll } = this.props.form
    validateFieldsAndScroll(async (err, value) => {
      if (!err) {
        this.setState({
          btnLoading: true,
        })
        // 测试异步
        await new Promise((res, rej) => {
          setTimeout(_ => {
            console.log('done', value)
            res()
          }, 3000)
        })

        this.setState({
          btnLoading: false,
        })
      } else {
        message.error('请输入正确信息')
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form
    const formLayout = {
      labelCol: {
        span: 4,
      },
      wrapperCol: {
        span: 8,
      },
    }
    const options = [
      { label: '篮球', value: '篮球' },
      { label: '游泳', value: '游泳' },
    ]
    return (
      <Form {...formLayout}>
        <FormItem label="用户名">
          {getFieldDecorator('user', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(<Input placeholder="请输入用户名" />)}
        </FormItem>
        <FormItem label="密码">
          {getFieldDecorator('pwd', {
            rules: [{ required: true, message: '请输入密码' }],
          })(<Input type="password" placeholder="请输入密码" />)}
        </FormItem>
        <FormItem label="性别">
          {getFieldDecorator('sex', {
            rules: [{ required: true, message: '请选择性别' }],
            initialValue: '男',
          })(
            <RadioGroup>
              <Radio value="男">男</Radio>
              <Radio value="女">女</Radio>
            </RadioGroup>,
          )}
        </FormItem>
        <FormItem label="出生年月">
          {getFieldDecorator('birthday', {
            rules: [],
          })(
            <DatePicker
              placeholder="请选择时间"
              disabledDate={this.disabledEndDate}
            />,
          )}
        </FormItem>
        <FormItem label="联系地址">
          {getFieldDecorator('address')(
            <TextArea autosize={{ minRows: 1, maxRows: 2 }} />,
          )}
        </FormItem>
        <FormItem label="兴趣爱好">
          {getFieldDecorator('habit', {
            initialValue: ['篮球'],
          })(<Checkbox.Group options={options} />)}
        </FormItem>
        <FormItem label="婚姻状况">
          {getFieldDecorator('isMarried')(
            <Select placeholder="请选择婚姻状况">
              <Option value="已婚">已婚</Option>
              <Option value="未婚">未婚</Option>
            </Select>,
          )}
        </FormItem>
        <FormItem wrapperCol={{ offset: 4 }}>
          <Button
            loading={this.state.btnLoading}
            onClick={this.handleSubmit}
            type="primary"
          >
            提交
          </Button>
          <Button
            type="default"
            onClick={this.handleReset}
            style={{ marginLeft: '10px' }}
          >
            重置
          </Button>
        </FormItem>
      </Form>
    )
  }
}

const FormRegister = Form.create()(Register)

const CardRegister = () => {
  return (
    <Card title="注册表单">
      <FormRegister />
    </Card>
  )
}
export default CardRegister
