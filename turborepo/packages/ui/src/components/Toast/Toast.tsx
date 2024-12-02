import React, { useEffect, useState } from 'react'
import styles from './Toast.module.scss'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import cn from 'classnames'
import topClose from '@assets/icons/ico-top-close.svg'
import { Icon } from 'components/Icon'

export type ToastType = 'success' | 'info' | 'error'

export interface ToastProps {
  show: boolean
  type?: ToastType
  message: string
  duration?: number
  onClick?: () => void
  onClose?: () => void
}

export const Toast = (props: ToastProps) => {
  const { show = false, type = 'info', message = '', duration = 3000, onClick, onClose } = props

  const [visible, setVisible] = useState(show)

  const handleClose = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClose) {
      event.preventDefault()
      onClose()
    }
  }

  useEffect(() => {
    setVisible(show)

    let timer: NodeJS.Timeout
    if (show) {
      timer = setTimeout(() => {
        onClose?.()
        setVisible(false)
      }, duration)
    }

    return () => clearTimeout(timer)
  }, [show, onClose, duration])

  return (
    <>
      {visible && (
        <Box className={cn(styles.toast, styles[type])} onClick={onClick}>
          <span className={styles.ico}></span>
          <Box className={styles.msg}>
            <Typography.Text size="lg" type="secondary">
              {message}
            </Typography.Text>
          </Box>
          <a href="#" onClick={handleClose}>
            <Icon icon={topClose} alt="닫기 버튼" />
          </a>
        </Box>
      )}
    </>
  )
}
