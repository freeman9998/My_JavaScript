import React from 'react'
import styles from './Parts.module.scss'
import { Typography } from 'components/Typography'
import cn from 'classnames'

export interface PartsProps {
  children: React.ReactNode
  selected: boolean
  onClick: () => void
}

export const Parts = ({ children, selected = false, onClick }: PartsProps) => {
  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    onClick()
  }

  return (
    <a href="#" onClick={handleClick}>
      <Typography.Text
        size="lg"
        type={selected ? 'white' : 'primary'}
        className={cn(styles.parts, {
          [styles.selected]: selected,
        })}
      >
        {children}
      </Typography.Text>
    </a>
  )
}
