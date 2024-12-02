import React from 'react'
import styles from './ContentCard.module.scss'
import { Box } from 'components/Boxes'
import cn from 'classnames'

export interface ContentCardProps {
  className?: string
  children: React.ReactNode
  onClick?: () => void
}

export const ContentCard = ({ className, children, onClick }: ContentCardProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      event.preventDefault()
      event.stopPropagation()
      onClick()
    }
  }

  return (
    <Box
      className={cn(styles.contentCard, className)}
      tabIndex={onClick ? 0 : -1}
      onClick={handleClick}
    >
      {children}
    </Box>
  )
}
