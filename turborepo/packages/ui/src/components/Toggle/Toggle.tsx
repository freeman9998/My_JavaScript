import React from 'react'
import styles from './Toggle.module.scss'

export interface ToggleProps {
  checked: boolean
  disabled?: boolean
  onChange: (checked: boolean) => void
}

export const Toggle = ({
  checked = false,
  disabled = false,
  onChange,
}: ToggleProps) => {
  const handleChange = () => {
    onChange(!checked)
  }
  return (
    <input
      type="checkbox"
      className={styles.toggle}
      checked={checked}
      disabled={disabled}
      onChange={handleChange}
    />
  )
}
