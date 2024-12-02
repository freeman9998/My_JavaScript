import React from 'react'
import styles from './Divider.module.scss'
import cn from 'classnames'

export interface DividerProps {}

export const Divider = (props: DividerProps) => {
  return (
    <hr
      className={cn(
        styles.divider,
        { [styles.line as string]: '' },
        { [styles.section as string]: '' },
        { [styles.info as string]: '' },
      )}
    />
  )
}
