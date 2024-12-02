import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import styles from './Select.module.scss'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import { BottomSheet } from 'components/BottomSheet'
import { List } from 'components/List'
import cn from 'classnames'
import { isEmpty } from 'utils'
import { HelperText } from 'components/HelperText'

export interface SelectOptionProps {
  label: string
  value: string
  disabled?: boolean
}

export interface SelectProps {
  initialOpen?: boolean
  label?: string
  value: string
  options: SelectOptionProps[]
  disabled?: boolean
  placeholder?: string
  error?: boolean
  helperText?: string
  onChange: (value: string) => void
}

export interface SelectRef {
  onOpenSelectOption: () => void
}

const SelectComponent: ForwardRefRenderFunction<SelectRef, SelectProps> = (
  props,
  ref,
) => {
  const {
    initialOpen = false,
    label = '',
    value,
    disabled = false,
    options,
    placeholder = '선택하세요.',
    error = false,
    helperText = '',
    onChange,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [open, setOpen] = useState<boolean>(initialOpen)

  useImperativeHandle(ref, () => ({
    onOpenSelectOption() {
      inputRef.current?.focus()
      setOpen(true)
    },
  }))

  const handleClick = () => {
    if (!disabled) setOpen(!open)
  }

  const handleSelect = (selectValue: string) => {
    setOpen(false)
    onChange(selectValue)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      handleClick()
    }
  }

  useEffect(() => {
    if (initialOpen) inputRef.current?.focus()
  }, [initialOpen])

  return (
    <>
      <Box className={styles.select} onClick={handleClick}>
        <Box className={styles.label}>
          <Typography.Text size="sm">{label}</Typography.Text>
        </Box>
        <Box className={styles.inner}>
          <input
            ref={inputRef}
            className={cn(styles.inp, { [styles.error as string]: error })}
            value={options.find(option => option.value === value)?.label}
            placeholder={placeholder}
            disabled={disabled}
            readOnly
            onKeyDown={handleKeyDown}
          />
          {/** 포커스시 라인
          {!disabled && <span className={styles.focusLine}></span>}
           */}
        </Box>
        {!isEmpty(helperText) && (
          <HelperText type={error ? 'error' : 'success'}>{helperText}</HelperText>
        )}
      </Box>

      <BottomSheet open={open} title={label} closable onClose={() => setOpen(false)}>
        <Option selected={value} options={options} onSelect={handleSelect} />
      </BottomSheet>
    </>
  )
}

export const Select = forwardRef(SelectComponent)

interface OptionProps {
  selected: string
  options: SelectOptionProps[]
  onSelect: (value: string) => void
}

const Option = ({ selected, options, onSelect }: OptionProps) => {
  const handleClick = (value: string) => {
    onSelect(value)
  }
  return (
    <List className={styles.optionList}>
      {options.map((option: SelectOptionProps) => {
        return (
          <List.Item
            key={option.value}
            onClick={() => handleClick(option.value)}
            className={selected === option.value ? styles.active : ''}
          >
            <a onClick={e => e.preventDefault()}>{option.label}</a>
          </List.Item>
        )
      })}
    </List>
  )
}
