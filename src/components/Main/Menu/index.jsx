import React, { Component } from 'react'
import { Menu, Icon } from 'antd'
import { Link, withRouter } from 'react-router-dom'
const { SubMenu } = Menu

class NavLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: this.props.location.pathname,
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
      return (
        <Menu.Item key={item.key}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
      )
    })
  }

  handleClick = props => {
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
export default withRouter(NavLeft)
