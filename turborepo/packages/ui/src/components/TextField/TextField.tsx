import React, { useState } from 'react'
import styles from './TextField.module.scss'
import { Box } from 'components/Boxes'
import { HelperText } from 'components/HelperText'
import cn from 'classnames'

export interface TextFieldProps {
  value: string
  maxLength?: number
  disabled?: boolean
  placeholder?: string
  error?: boolean
  onChange: (value: string) => void
}

export const TextField = (props: TextFieldProps) => {
  const {
    value,
    maxLength = 200,
    disabled = false,
    placeholder = '',
    error = false,
    onChange,
  } = props
  const [length, setLength] = useState<number>(0)

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const {
      target: { value },
    } = event

    if (value.length <= maxLength) {
      onChange(value)
      setLength(value.length)
    }
  }
  return (
    <Box className={cn(styles.textField, { [styles.error as string]: error })}>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={handleChange}
        disabled={disabled}
      />
      <HelperText
        type={error ? 'error' : 'info'}
      >{`${length}/${maxLength}`}</HelperText>
    </Box>
  )
}
