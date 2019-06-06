import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
const { SubMenu } = Menu
// import {
//   BrowserRouter as Router,
//   Route,
//   Switch,
// } from 'react-router-dom'

export default class extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: '/home',
    }
  }

  componentDidMount() {
    import('@/config/menuConfig').then(menuConfig => {
      let Menu = this.renderMenu(menuConfig.default)
      this.setState({
        Menu,
      })
    })
  }

  renderMenu = menu => {
    return menu.map(item => {
      if (item.children) {
        return (
          <SubMenu key={item.key} title={item.title}>
            {this.renderMenu(item.children)}
          </SubMenu>
        )
      }
      return <Menu.Item key={item.key}>{item.title}</Menu.Item>
    })
  }

  handleClick = props => {
    // console.log(props)
    this.setState({
      current: props.key,
    })
  }

  render() {
    return (
      <aside>
        <Menu
          theme="dark"
          onClick={this.handleClick}
          selectedKeys={[this.state.current]}
          mode="vertical"
        >
          {this.state.Menu}
        </Menu>
      </aside>
    )
  }
}
