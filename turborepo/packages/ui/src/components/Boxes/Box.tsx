import React, { forwardRef } from 'react'
import styles from './Box.module.scss'

export interface BoxProps extends React.ComponentProps<'div'> {
  children?: React.ReactNode
}

export const Box = forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }, ref) => {
    return (
      <div ref={ref} {...props}>
        {children}
      </div>
    )
  },
)
