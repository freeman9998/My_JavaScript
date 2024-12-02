import React from 'react'
import styles from './Radio.module.scss'
import { Box } from 'components/Boxes'
import cn from 'classnames'
import { Typography } from 'components/Typography'

export interface RadioOptionProps {
  label: string
  value: string
  disabled?: boolean
}

export interface RadioProps {
  name: string
  value: string
  options: RadioOptionProps[]
  vertical?: boolean
  disabled?: boolean
  onChange: (value: string) => void
}

export const Radio = (props: RadioProps) => {
  const {
    name,
    value,
    options,
    vertical = false,
    disabled = false,
    onChange,
  } = props

  const handleChange = (v: string) => {
    if (!disabled) {
      onChange(v)
    }
  }

  return (
    <Box className={cn(styles.group, vertical ? styles.vertical : '')}>
      {options.map((option: RadioOptionProps) => {
        return (
          <RadioElement
            key={option.value}
            name={name}
            label={option.label}
            value={option.value}
            isSelected={option.value === value}
            disabled={option.disabled}
            onChange={handleChange}
          />
        )
      })}
    </Box>
  )
}

interface RadioElementProps {
  name: string
  label: string | React.ReactNode
  value: string
  disabled?: boolean
  isSelected: boolean
  onChange: (value: string) => void
}

export const RadioElement = ({
  name,
  label,
  value,
  disabled = undefined,
  isSelected = false,
  onChange,
}: RadioElementProps) => {
  const handleChange =
    (v: string) => (event: React.MouseEvent<HTMLLabelElement>) => {
      if (!disabled) {
        // event.preventDefault()
        event.stopPropagation()
        onChange(v)
      }
    }

  return (
    <label htmlFor="idname" className={styles.radio} onClick={handleChange(value)}>
      <input
        type="radio"
        name={name}
        value={value}
        checked={isSelected}
        onChange={() => {}}
      />
      {typeof label === 'string' ? (
        <Typography.Text size="lg" type="secondary">
          {label}
        </Typography.Text>
      ) : (
        label
      )}
    </label>
  )
}
