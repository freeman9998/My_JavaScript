import React from 'react'
import styles from './Answer.module.scss'
import { Typography } from 'components/Typography'
import cn from 'classnames'

export interface AnswerProps {
  children: React.ReactNode
}

export const Answer = ({ children }: AnswerProps) => {
  return (
    <dd className={styles.qnaDd}>
      <Typography.SubTitle size="sm" className={cn(styles.qnaUnit, styles.a)}>
        A
      </Typography.SubTitle>
      <Typography.Text>{children}</Typography.Text>
    </dd>
  )
}
