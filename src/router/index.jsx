import React, { Component, PureComponent } from 'react'
import { Provider, connect } from 'react-redux'
import store from '../redux/store'
import Main from '@/components/Main'
import Home from '@/pages/home'
import Modal from '@/pages/ui/modals'
import Button from '@/pages/ui/buttons'
import Loading from '@/pages/ui/loadings'
import Notifications from '@/pages/ui/notifications'
import Carousel from '@/pages/ui/carousel'
import Messages from '@/pages/ui/messages'
import FormLogin from '@/pages/form/login'
import Reg from '@/pages/form/reg'
import Bar from '@/pages/charts/bar'
import Login from '@/pages/login'
import BasicTable from '@/pages/table/basic'
import User from '@/pages/user/user'
import Permission from '@/pages/permission/permission'
import NoMatch from '@/pages/error-page/noMatch'
import { message } from 'antd'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom'
import App from '@/App'
import { checkRouter } from '@/libs/utils'

const About = ({ location }) => (
  <div>
    <h3>
      这是about路由 <code>{location.pathname}</code>
    </h3>
  </div>
)
class Auth extends PureComponent {
  render() {
    // const pathname = this.props.location.pathname
    const { component: Component, menu, ...rest } = this.props
    const isLoggied = sessionStorage.getItem('token') ? true : false
    // const hasPermission = checkRouter(menu, pathname)
    // console.log('拥有权限 ==> ', hasPermission)
    !isLoggied && message.error('未授权的登录')
    return (
      <Route
        {...rest}
        render={props => {
          return isLoggied ? (
            // hasPermission ? (
            <Component {...props} />
          ) : (
            // ) : (
            //   <Redirect to="/noPermission" />
            // )
            <Redirect to="/login" />
          )
        }}
      />
    )
  }
}
const mapStateToProps = state => {
  return {
    menu: state.menu,
    token: state.token,
  }
}
// 登录控制get，页面路由控制 2019/6/24
const AuthRouter = connect(mapStateToProps)(withRouter(Auth))

const MainRoute = _ => {
  return (
    <Main>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/ui/buttons" component={Button} />
        <Route path="/ui/modals" component={Modal} />
        <Route path="/ui/loadings" component={Loading} />
        <Route path="/ui/notification" component={Notifications} />
        <Route path="/ui/messages" component={Messages} />
        <Route path="/ui/carousel" component={Carousel} />
        <Route path="/form/login" component={FormLogin} />
        <Route path="/form/reg" component={Reg} />
        <Route path="/table/basic" component={BasicTable} />
        <Route path="/user" component={User} />
        <Route path="/permission" component={Permission} />
        <Route path="/charts/bar" component={Bar} />
        <Route path="/" component={NoMatch} />
      </Switch>
    </Main>
  )
}
export default class ARouter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <Router>
          <App>
            <Switch>
              <Route path="/about" component={About} />
              <Route path="/login" component={Login} />
              <Route path="/nomatch" component={NoMatch} />
              <Route
                path="/noPermission"
                render={_ => <div>您没有权限访问</div>}
              />
              {/* <AuthRouter path="/" component={MainRoute} /> */}
              <Route
                path="/"
                render={_ => {
                  return (
                    <Main>
                      <Switch>
                        <AuthRouter path="/home" component={Home} />
                        <AuthRouter path="/ui/buttons" component={Button} />
                        <AuthRouter path="/ui/modals" component={Modal} />
                        <AuthRouter path="/ui/loadings" component={Loading} />
                        <AuthRouter
                          path="/ui/notification"
                          component={Notifications}
                        />
                        <AuthRouter path="/ui/messages" component={Messages} />
                        <AuthRouter path="/ui/carousel" component={Carousel} />
                        <AuthRouter path="/form/login" component={FormLogin} />
                        <AuthRouter path="/form/reg" component={Reg} />
                        <AuthRouter
                          path="/table/basic"
                          component={BasicTable}
                        />
                        <AuthRouter path="/user" component={User} />
                        <AuthRouter path="/permission" component={Permission} />
                        <AuthRouter path="/charts/bar" component={Bar} />
                        <Redirect to="/nomatch" />
                        {/* <Route path="/" component={NoMatch} /> */}
                      </Switch>
                    </Main>
                  )
                }}
              />
            </Switch>
          </App>
        </Router>
      </Provider>
    )
  }
}
