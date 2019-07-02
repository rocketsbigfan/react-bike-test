import React, { Component } from 'react'
import { Breadcrumb, message } from 'antd'
import { connect } from 'react-redux'
import { ChangeToken, ChangeMenu } from '@/redux/actionCreator'
import { setMenu, setToken } from '@/libs/utils'
import { withRouter } from 'react-router-dom'

class Header extends Component {
  handleClick = _ => {
    const { changeToken, changeMenu, history } = this.props
    changeToken('')
    changeMenu([])

    setMenu([])
    setToken('')
    message.success('退出登录成功！')
    history.push('/login')
  }
  render() {
    return (
      <header className="main-content-header">
        <Breadcrumb>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>An Application</Breadcrumb.Item>
        </Breadcrumb>
        <div className="right">
          <span className="name">您好! {this.props.name}</span>
          <span className="logout" onClick={this.handleClick}>
            退出
          </span>
        </div>
      </header>
    )
  }
}
const mapStateToProps = state => {
  return {
    name: state.value,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    changeMenu: menu => {
      dispatch(ChangeMenu(menu))
    },
    changeToken: token => {
      dispatch(ChangeToken(token))
    },
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withRouter(Header))
