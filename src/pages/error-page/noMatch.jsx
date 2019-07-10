import React, { useEffect, useState, useRef } from 'react'
import { Button } from 'antd'
const NoMatch = ({ location, history }) => {
  const [seconds, setSecond] = useState(5)
  const second = useRef(5)
  const timer = useRef(null)
  function countdown() {
    clearTimeout(timer.current)
    timer.current = setTimeout(_ => {
      if (second.current <= 0) {
        timer.current = null
        history.go(-1)
      } else {
        second.current = second.current - 1
        setSecond(second.current)
        countdown()
      }
    }, 1000)
  }
  useEffect(() => {
    countdown()
    return _ => {
      clearTimeout(timer.current)
      timer.current = null
    }
  })
  function goBack() {
    history.go(-1)
  }
  return (
    <div className="nomatch">
      <h3>
        404，不存在路由 <code>{location.pathname}</code>, 还剩{seconds}
        秒返回上一层
      </h3>
      <Button onClick={goBack} style={{ marginTop: '10px' }}>
        点击退回上一下
      </Button>
    </div>
  )
}
export default NoMatch
