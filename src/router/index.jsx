import React, { Component } from 'react'
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
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
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
export default class ARouter extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {}

  render() {
    return (
      <Router>
        <App>
          <Switch>
            <Route path="/about" component={About} />
            <Route
              path="/"
              render={() => (
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
                    {/* <Redirect to="/home" component={Home} /> */}
                  </Switch>
                </Main>
              )}
            />
          </Switch>
        </App>
      </Router>
    )
  }
}
