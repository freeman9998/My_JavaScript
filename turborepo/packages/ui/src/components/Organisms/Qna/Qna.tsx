import React from 'react'
import styles from './Qna.module.scss'
import { Section } from 'components/Section'

export interface QnaProps {
  children: React.ReactNode
}

export const Qna = ({ children }: QnaProps) => {
  return (
    <Section className={styles.qna}>
      <dl className={styles.qnaDl}>{children}</dl>
    </Section>
  )
}
