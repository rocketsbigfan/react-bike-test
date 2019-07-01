import React, { Component } from 'react'
import { Card, Carousel, Radio, Button } from 'antd'
const RadioGroup = Radio.Group
export default class Carousels extends Component {
  constructor(props) {
    super(props)
    this.state = {
      radioValue: 'bottom',
    }
    this.Carousel = React.createRef()
  }
  handleChange = e => {
    this.setState({
      radioValue: e.target.value,
    })
  }
  handleClick = _ => {
    this.Carousel.current.next()
  }
  handleClickPrev = _ => {
    this.Carousel.current.prev()
  }
  render() {
    return (
      <Card title="轮播演示">
        <RadioGroup
          style={{ marginBottom: 10 }}
          onChange={this.handleChange}
          defaultValue={this.state.radioValue}
        >
          <Radio value="top">上</Radio>
          <Radio value="bottom">下</Radio>
          <Radio value="left">左</Radio>
          <Radio value="right">右</Radio>
        </RadioGroup>
        <Carousel
          autoplay
          ref={this.Carousel}
          dots
          dotPosition={this.state.radioValue}
        >
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
          <div>5</div>
        </Carousel>
        <Button
          style={{ marginTop: 10, marginRight: 10 }}
          onClick={this.handleClickPrev}
        >
          上一下
        </Button>
        <Button style={{ marginTop: 10 }} onClick={this.handleClick}>
          下一页
        </Button>
      </Card>
    )
  }
}
