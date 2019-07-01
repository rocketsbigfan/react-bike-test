import React, { Component } from 'react'
import { Provider } from 'react-redux'
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
import { message } from 'antd'
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
  withRouter,
} from 'react-router-dom'
import App from '@/App'

const About = ({ location }) => (
  <div>
    <h3>
      这是about路由 <code>{location.pathname}</code>
    </h3>
  </div>
)
const NoMatch = ({ location }) => {
  return (
    <div>
      <h3>
        404，不存在路由 <code>{location.pathname}</code>
      </h3>
    </div>
  )
}
class Auth extends Component {
  constructor() {
    super()
    this.state = {
      isLoggied: sessionStorage.getItem('token') ? true : false,
    }
  }
  render() {
    const { component: Component, ...rest } = this.props
    const { isLoggied } = this.state
    !isLoggied && message.error('未授权的登录')
    return (
      <Route
        {...rest}
        render={props => {
          return isLoggied ? <Component {...props} /> : <Redirect to="/login" />
        }}
      />
    )
  }
}
// 登录控制get，页面路由控制no 2019/6/24
const AuthRouter = withRouter(Auth)

const MainRoute = _ => {
  return (
    <Main>
      <Switch>
        <Route path="/home" component={Home} />
        <Route path="/ui/buttons" component={Button} />
        <Route path="/ui/modals" component={Modal} />
        {/* <AuthRouter path="/home" component={Home} />
        <AuthRouter path="/ui/buttons" component={Button} />
        <AuthRouter path="/ui/modals" component={Modal} /> */}
        <Route path="/ui/loadings" component={Loading} />
        <Route path="/ui/notification" component={Notifications} />
        <Route path="/ui/messages" component={Messages} />
        <Route path="/ui/carousel" component={Carousel} />
        <Route path="/form/login" component={FormLogin} />
        <Route path="/form/reg" component={Reg} />
        <Route path="/table/basic" component={BasicTable} />
        <Route path="/charts/bar" component={Bar} />
        {/* <Redirect to="/home" component={Home} /> */}
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
              <AuthRouter path="/" component={MainRoute} />)
            </Switch>
          </App>
        </Router>
      </Provider>
    )
  }
}