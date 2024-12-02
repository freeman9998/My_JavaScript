import React from 'react'
import styles from './CheckBox.module.scss'
import { Box } from 'components/Boxes'
import cn from 'classnames'
import { Typography } from 'components/Typography'
import { isEmpty } from 'utils'

export type CheckBoxShape = 'basic' | 'rounded' | 'no-border'

export interface CheckBoxProps {
  label?: string | React.ReactNode
  checked: boolean
  disabled?: boolean
  shape?: CheckBoxShape
  onChange: (checked: boolean) => void
}

export const CheckBox = (props: CheckBoxProps) => {
  const {
    label = '',
    checked = false,
    disabled = false,
    shape = 'basic',
    onChange,
  } = props

  const handleCheck =
    (chk: boolean) => (event: React.MouseEvent<HTMLLabelElement>) => {
      event.stopPropagation()
      onChange(chk)
    }

  return (
    <label
      htmlFor="idname"
      className={styles.checkbox}
      onClick={handleCheck(!checked)}
    >
      <input
        type="checkbox"
        checked={checked}
        disabled={disabled}
        className={cn(styles[shape], {})}
        onChange={() => {}}
      />
      {label && !isEmpty(label) && typeof label === 'string' ? (
        <Typography.SubTitle type="secondary">{label}</Typography.SubTitle>
      ) : (
        label
      )}
    </label>
  )
}

export interface CheckBoxOptionProps {
  label: string | React.ReactNode
  value: string
  disabled?: boolean
}

export interface CheckBoxGroupProps {
  value: string[]
  options: CheckBoxOptionProps[]
  useAllCheck?: boolean | string
  checkOne?: boolean
  vertical?: boolean
  disabled?: boolean
  shape?: CheckBoxShape
  onChange: (value: string[]) => void
}

export const CheckBoxGroup = (props: CheckBoxGroupProps) => {
  const {
    value = [],
    options,
    useAllCheck = false,
    checkOne = false,
    vertical = false,
    disabled = false,
    shape = 'basic',
    onChange,
  } = props

  const handleChangeAllCheck = (checked: boolean) => {
    onChange(checked ? options.map(option => option.value) : [])
  }

  const handleChange = (checkValue: string) => (checked: boolean) => {
    if (checked) {
      onChange(checkOne ? [checkValue] : [...value, checkValue])
    } else {
      onChange(checkOne ? [] : value.filter(v => v !== checkValue))
    }
  }

  return (
    <Box className={cn(styles.group, vertical ? styles.vertical : '')}>
      {useAllCheck && (
        <CheckBox
          label={typeof useAllCheck === 'string' ? useAllCheck : '전체 선택'}
          checked={value.length === options.length}
          disabled={disabled}
          shape={shape}
          onChange={handleChangeAllCheck}
        />
      )}
      {options.map((option: CheckBoxOptionProps) => {
        return (
          <CheckBox
            key={option.value}
            label={option.label}
            checked={value.includes(option.value)}
            disabled={option?.disabled || disabled}
            shape={shape}
            onChange={handleChange(option.value)}
          />
        )
      })}
    </Box>
  )
}
