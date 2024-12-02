import React from 'react'
import styles from './SectionHeader.module.scss'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import { Icon } from 'components/Icon'

export interface SectionHeaderProps {
  title: string
  icon?: string | React.ReactNode
  description?: string
  onClick?: () => void
}

export const SectionHeader = (props: SectionHeaderProps) => {
  const { title, icon, description, onClick } = props

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Box className={styles.secHeader} onClick={handleClick}>
      <Typography.SubTitle type="secondary" size="md" long>
        {title}
      </Typography.SubTitle>
      {icon && <Icon icon={icon} alt={`${title} 더보기`} />}
      {description && (
        <Typography.Text type="info" size="md">
          {description}
        </Typography.Text>
      )}
    </Box>
  )
}
