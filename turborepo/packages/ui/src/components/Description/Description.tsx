import React from 'react'
import styles from './Description.module.scss'

import { Box } from 'components/Boxes'
import cn from 'classnames'
import { Typography } from 'components/Typography'
import { List } from 'components/List'
import { isEmpty } from 'utils'

type DescriptionBgColorType = 'gray' | 'white'
export interface DescriptionProps {
  className?: string
  children: React.ReactNode
  backgroundColor?: DescriptionBgColorType
}

export const Description = ({
  className,
  children,
  backgroundColor = 'gray',
}: DescriptionProps) => {
  return (
    <Box className={cn(styles.description, className, styles[backgroundColor])}>
      <List>{children}</List>
    </Box>
  )
}

interface DescriptionItemProps {
  bold?: boolean
  title?: string | React.ReactNode
  children: React.ReactNode
}
const Item = ({
  bold = false,
  title = undefined,
  children,
}: DescriptionItemProps) => {
  return (
    <List.Item className={cn({ [styles.title as string]: title })}>
      {typeof title !== 'undefined' && (
        <>
          {typeof title === 'string' ? (
            <Typography.SubTitle size="sm" type="secondary">
              {title}
            </Typography.SubTitle>
          ) : (
            title
          )}
        </>
      )}
      <Typography.Text size="md" type="secondary" bold={bold}>
        {children}
      </Typography.Text>
    </List.Item>
  )
}
Description.Item = Item
