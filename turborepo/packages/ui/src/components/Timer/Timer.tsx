import React, { ForwardRefRenderFunction, forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import styles from './Timer.module.scss'
import { Typography } from 'components/Typography'

export interface TimerProps {
  seconds?: number
  onFinish: () => void
}

export interface TimerRef {
  onStart: () => void
  onStop: () => void
  onExtension: (extensionSeconds: number) => void
}

const TimerComponent: ForwardRefRenderFunction<TimerRef, TimerProps> = (props, ref) => {
  const { seconds = 180, onFinish } = props

  useImperativeHandle(ref, () => ({
    onStart() {
      setTime(seconds)
      setShow(true)
    },
    onStop() {
      setTime(seconds)
      setShow(false)
    },
    onExtension(extensionSeconds) {
      setTime(prev => prev + extensionSeconds)
    },
  }))

  const [show, setShow] = useState<boolean>(false)
  const [time, setTime] = useState<number>(seconds)

  const getTimes = (seconds: number) => {
    const min = Math.floor(seconds / 60)
    const sec = seconds % 60 < 10 ? `0${seconds % 60}` : seconds % 60
    return min < 10 ? `0${min}:${sec}` : `${min}:${sec}`
  }

  useEffect(() => {
    setShow(true)
  }, [])

  useEffect(() => {
    let timer: NodeJS.Timeout
    if (show) {
      timer = setTimeout(() => {
        if (time > 0) {
          setTime(prev => prev - 1)
        } else {
          setShow(false)
          onFinish()
        }
      }, 1000)
    }

    return () => clearTimeout(timer)
  }, [show, time])

  useEffect(() => {
    setTime(seconds)
  }, [seconds])

  return (
    <>
      {show && (
        <Typography.Text className={styles.timer}>
          <Typography.Text type="primary">{getTimes(time)}</Typography.Text>
          {' 남음'}
        </Typography.Text>
      )}
    </>
  )
}

export const Timer = forwardRef(TimerComponent)
