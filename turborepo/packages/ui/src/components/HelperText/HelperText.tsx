import React from 'react'
import styles from './HelperText.module.scss'
import cn from 'classnames'

import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'

export type HelperTextType = 'success' | 'info' | 'warning' | 'error'

export interface HelperTextProps {
  type?: HelperTextType
  children: React.ReactNode
}

export const HelperText = ({ type = 'info', children }: HelperTextProps) => {
  /**
   * 임시처리 (HelperText와 Typography 타입 미정의)
   */
  const getTypes = (type: HelperTextType) => {
    if (type === 'success') {
      return 'primary'
    } else if (type === 'warning') {
      return 'secondary'
    } else {
      return type
    }
  }
  return (
    <Box className={cn(styles.helperText, styles[type])}>
      <Typography.Text type={getTypes(type)}>{children}</Typography.Text>
    </Box>
  )
}
