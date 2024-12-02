import React from 'react'
import styles from './Button.module.scss'
import cn from 'classnames'
import { Icon } from 'components/Icon'

export type ButtonType = 'primary' | 'secondary' | 'mediumSecondary' | 'text'
export type ButtonSize = 'medium' | 'small'

export interface ButtonProps {
  type?: ButtonType
  size?: ButtonSize
  disabled?: boolean
  outline?: boolean
  className?: string
  label?: string
  children?: React.ReactNode
  iconLeft?: undefined | React.ReactNode
  iconRight?: undefined | React.ReactNode
  isSelected?: boolean
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export const Button = (props: ButtonProps) => {
  const {
    type = 'primary',
    size = 'medium',
    disabled = false,
    outline = false,
    className = '',
    label = '',
    children,
    iconLeft,
    iconRight,
    isSelected = false,
    onClick,
    ...rest
  } = props

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      event.preventDefault()
      event.stopPropagation()
      onClick(event)
    }
  }
  return (
    <button
      data-type={type}
      data-size={size}
      data-selected={isSelected}
      data-outline={outline}
      className={cn(styles.button, className)}
      disabled={disabled}
      onClick={handleClick}
      {...rest}
    >
      <IconComponent align="left" icon={iconLeft} />
      {label ? label : children}
      <IconComponent align="right" icon={iconRight} />
    </button>
  )
}

interface IconComponentProps {
  align?: 'left' | 'right'
  icon: undefined | string | React.ReactNode
}
const IconComponent = ({ align = 'left', icon }: IconComponentProps) => {
  if (!icon) return <></>

  return typeof icon === 'string' ? (
    <Icon icon={icon} alt="" ariaHidden />
  ) : (
    <>{icon}</>
  )
}
