import React from 'react'
import styles from './List.module.scss'

export interface ListProps extends React.ComponentProps<'ul'> {
  children: React.ReactNode
}

export const List = ({ children, ...props }: ListProps) => {
  return <ul {...props}>{children}</ul>
}

export interface ListItemProps extends React.ComponentProps<'li'> {
  children: React.ReactNode
  onClick?: () => void
}
const Item = ({ children, onClick, ...props }: ListItemProps) => {
  return (
    <li onClick={onClick} {...props}>
      {children}
    </li>
  )
}

List.Item = Item
