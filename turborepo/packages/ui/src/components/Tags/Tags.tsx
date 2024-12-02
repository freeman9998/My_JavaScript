import React from 'react'
import styles from './Tags.module.scss'
import { Typography } from 'components/Typography'
import cn from 'classnames'

export type TagColor =
  | 'purple'
  | 'berry'
  | 'teal'
  | 'yellow'
  | 'gray'
  | 'green'
  | 'orange'
  | 'blue1'
  | 'blue3'
  | 'darkyellow'

export interface TagsProps {
  label: string
  classname?: string
  hashTag?: boolean
  color?: TagColor
  rounded?: 'xl' | 'xs'
  labelColor?: 'white' | 'black'
}

export const Tags = ({
  label = '',
  classname,
  hashTag = false,
  color = undefined,
  rounded = 'xs',
  labelColor = undefined,
}: TagsProps) => {
  return (
    <span
      className={cn(styles.tag, classname, color ? styles[color] : '', {
        [styles.xs as string]: rounded === 'xs',
        [styles.whiteLabel as string]: hashTag || labelColor === 'white',
        [styles.blackLabel as string]: labelColor === 'black',
      })}
    >
      <Typography.SubTitle
        size={rounded === 'xs' ? 'xs' : 'sm'}
        type={
          (color && ['yellow', 'green', 'orange'].includes(color)) ||
          labelColor === 'black'
            ? 'default'
            : 'white'
        }
      >
        {hashTag ? (label.includes('#') ? label : `#${label}`) : label}
      </Typography.SubTitle>
    </span>
  )
}
