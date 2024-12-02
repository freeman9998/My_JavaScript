import React from 'react'
import styles from './Section.module.scss'

import cn from 'classnames'

export interface SectionProps {
  className?: string
  children: React.ReactNode
}

export const Section = ({ className, children }: SectionProps) => {
  return <section className={cn(styles.section, className)}>{children}</section>
}
