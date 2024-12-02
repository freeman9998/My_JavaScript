import React from 'react'
import styles from './IconButton.module.scss'

export interface IconButtonProps {
  icon: React.ReactNode
  disabled?: boolean
  onClick: () => void
}

export const IconButton = ({ icon, disabled = false, onClick }: IconButtonProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick()
    }
  }

  return (
    <button
      type="button"
      className={styles.iconButton}
      onClick={handleClick}
      disabled={disabled}
    >
      {icon}
    </button>
  )
}
