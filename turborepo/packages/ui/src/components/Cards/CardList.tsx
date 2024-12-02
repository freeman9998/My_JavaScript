import React from 'react'
import styles from './CardList.module.scss'
import cn from 'classnames'
import { Box } from 'components/Boxes'
import { Icon } from 'components/Icon'
import { List } from 'components/List'
import { Typography } from 'components/Typography'
import { isEmpty } from 'utils'

export interface CardListProps {
  title?: React.ReactNode
  children: React.ReactNode
}

export const CardList = ({ title = undefined, children }: CardListProps) => {
  return (
    <Box className={styles.cardList}>
      {title && (
        <Box className={styles.helpMsg}>
          <Typography.SubTitle size="sm" type="white" long>
            {title}
          </Typography.SubTitle>
        </Box>
      )}
      <List>{children}</List>
    </Box>
  )
}

export interface CardItemProps {
  icon: string
  label: string
  status?: string
  isSearch?: boolean
  href?: string | undefined
  onClick?: () => void
}
const CardItem = (props: CardItemProps) => {
  const {
    icon,
    label = '',
    status = undefined,
    isSearch = false,
    href,
    onClick,
  } = props

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <List.Item>
      <a
        href={href ?? '#'}
        onClick={handleClick}
        // tabIndex={href || onClick ? 0 : -1}
      >
        <Box className={styles.icon}>
          <Icon icon={icon} alt="" ariaHidden />
        </Box>
        <Typography.SubTitle type="secondary" size="sm" long>
          {label}
        </Typography.SubTitle>
        {(!isEmpty(status) || isSearch) && (
          <Typography.SubTitle
            size="sm"
            type="primary"
            long
            className={cn(styles.str, { [styles.status as string]: status })}
          >
            {status || (isSearch && '조회')}
          </Typography.SubTitle>
        )}
      </a>
    </List.Item>
  )
}

CardList.Item = CardItem
