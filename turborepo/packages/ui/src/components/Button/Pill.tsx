import React from 'react'
import styles from './Pill.module.scss'
import cn from 'classnames'
import { Typography } from 'components/Typography'

export interface PillProps {
  label: string | React.ReactNode
  size?: 'medium' | 'small'
  isActive?: boolean
  isSelected?: boolean
  onClick?: () => void
}

export const Pill = (props: PillProps) => {
  const {
    label,
    size = 'medium',
    isActive = false,
    isSelected = false,
    onClick,
  } = props
  return (
    <button
      type="button"
      className={cn(
        styles.pill,
        { [styles.active as string]: isActive },
        { [styles.selected as string]: isSelected },
        styles[size],
      )}
      onClick={() => onClick?.()}
    >
      {typeof label === 'string' ? (
        <Typography.Text size={size === 'medium' ? 'md' : 'sm'} type="secondary">
          {label}
        </Typography.Text>
      ) : (
        label
      )}
    </button>
  )
}
