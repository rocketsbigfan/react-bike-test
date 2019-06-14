import React, { Component } from 'react'
import { Card, Button } from 'antd'
// import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

export default class Buttons extends Component {
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
    }
  }

  componentDidMount() {}

  handleClick = () => {
    this.setState(
      {
        loading: true,
      },
      () => {
        console.log(1)
      },
    )
    setTimeout(() => {
      this.setState({
        loading: false,
      })
    }, 2000)
  }

  render() {
    let style = {
      margin: '0 10px',
    }
    return (
      <Card title="按钮演示" hoverable>
        <Button
          type="primary"
          loading={this.state.loading}
          onClick={this.handleClick}
          style={style}
        >
          Loading
        </Button>
        <Button shape="circle" type="primary" loading style={style} />
        <Button type="primary" disabled style={style}>
          disabled
        </Button>
      </Card>
    )
  }
}
