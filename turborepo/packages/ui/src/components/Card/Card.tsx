import React from 'react'
import styles from './Card.module.scss'
import { Box } from 'components/Boxes'
import cn from 'classnames'
export interface CardProps {
  className?: string
  isSelected?: boolean
  useHover?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export const Card = (props: CardProps) => {
  const {
    className,
    isSelected = false,
    useHover = false,
    children,
    onClick,
  } = props

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Box
      className={cn(
        styles.card,
        className,
        { [styles.selected as string]: isSelected },
        { [styles.useHover as string]: useHover },
        { [styles.link as string]: onClick },
      )}
      tabIndex={onClick ? 0 : -1}
      onClick={handleClick}
    >
      {children}
    </Box>
  )
}
