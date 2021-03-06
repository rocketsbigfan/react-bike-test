import React, { Component } from 'react'
import { Menu } from 'antd'
import { Link, withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { ChangeTagNavText, ChangeMenu } from '@/redux/actionCreator'
const { SubMenu } = Menu

class NavLeft extends Component {
  constructor(props) {
    super(props)
    this.state = {
      current: this.props.location.pathname,
    }
  }

  componentDidMount() {
    let menu = this.props.menu
    // import('@/config/menuConfig').then(menuConfig => {
    //   this.props.changeMenu(menuConfig.default)
    let Menu = this.renderMenu(menu)
    this.setState({
      Menu,
    })
    // })
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
        <Menu.Item title={item.title} key={item.key}>
          <Link to={item.key}>{item.title}</Link>
        </Menu.Item>
      )
    })
  }

  handleClick = ({ key, item }) => {
    this.props.changeTagNav(item.props.title)
    this.setState({
      current: key,
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
const mapDispatchToProps = dispatch => {
  return {
    changeTagNav: tagNav => {
      dispatch(ChangeTagNavText(tagNav))
    },
    changeMenu: menu => {
      dispatch(ChangeMenu(menu))
    },
  }
}
export default connect(
  state => {
    return {
      menu: state.menu,
    }
  },
  mapDispatchToProps,
)(withRouter(NavLeft))
