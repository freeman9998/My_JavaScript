import React from 'react'
import styles from './Question.module.scss'
import { Typography } from 'components/Typography'
import cn from 'classnames'

export interface QuestionProps {
  children: React.ReactNode
}

export const Question = ({ children }: QuestionProps) => {
  return (
    <dt className={styles.qnaDt}>
      <Typography.SubTitle className={cn(styles.qnaUnit, styles.q)} size="sm">
        Q
      </Typography.SubTitle>
      <Typography.SubTitle size="sm" type="secondary">
        {children}
      </Typography.SubTitle>
    </dt>
  )
}
