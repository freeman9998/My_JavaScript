import React from 'react'
import styles from './ButtonBox.module.scss'
import cn from 'classnames'
export interface ButtonBoxProps {
  className?: string
  vertical?: boolean
  children: React.ReactNode
}

export const ButtonBox = ({
  className,
  vertical = false,
  children,
}: ButtonBoxProps) => {
  return (
    <div
      className={cn(styles.buttonBox, className, vertical ? styles.vertical : '')}
    >
      {children}
    </div>
  )
}
