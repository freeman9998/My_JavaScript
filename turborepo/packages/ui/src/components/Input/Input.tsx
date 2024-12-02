import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import styles from './Input.module.scss'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import { HelperText, HelperTextType } from 'components/HelperText'
import cn from 'classnames'
import { isEmpty, isNumber } from 'utils'
import { Icon } from 'components/Icon'
import IcoSearch from '@assets/icons/ic_search.svg'
import IcoCalendar from '@assets/icons/ic_calendar.svg'
import IcoEyeMask from '@assets/icons/ic_eye_mask.svg'
import IcoEyeUnMask from '@assets/icons/ic_eye_unmask.svg'

export type InputType = 'text' | 'number' | 'rrn' | 'password' | 'cert'
type InnerIcon = 'search' | 'calendar'
export interface InputProps {
  label?: string
  value: string
  type?: InputType
  placeholder?: string
  className?: string
  disabled?: boolean
  readOnly?: boolean
  required?: boolean
  maxLength?: number
  status?: HelperTextType
  helperText?: string
  icon?: undefined | InnerIcon
  onChange: (value: string) => void
  onKeyPressEnter?: (value: string) => void
  onKeyPressBackspace?: () => void
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void
  onClick?: (event?: React.MouseEvent<HTMLInputElement>) => void
  onClickInnerIcon?: (value: string) => void
  onFocusEvent?: (event: React.FocusEvent<HTMLInputElement>) => void
  onBlurEvent?: (event: React.FocusEvent<HTMLInputElement>) => void
}

export interface InputRef {
  onFocus: () => void
  onBlur: () => void
}

const InputComponent: ForwardRefRenderFunction<InputRef, InputProps> = (
  props,
  ref,
) => {
  const {
    label = '',
    value = '',
    type = 'text',
    placeholder = '',
    className = '',
    disabled = false,
    readOnly = false,
    required = false,
    maxLength,
    status = 'info',
    helperText = '',
    icon,
    onChange,
    onKeyPressEnter,
    onKeyPressBackspace,
    onPaste,
    onClick,
    onClickInnerIcon,
    onFocusEvent,
    onBlurEvent,
  } = props

  const inputRef = useRef<HTMLInputElement>(null)
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const [isMasked, setIsMasked] = useState<boolean>(type === 'password')

  useImperativeHandle(ref, () => ({
    onFocus() {
      if (!readOnly && !disabled) {
        inputRef?.current?.focus()
      }
    },
    onBlur() {
      inputRef?.current?.blur()
    },
  }))

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value: inputValue },
    } = event

    if (['cert', 'rrn'].includes(type)) {
      if (isNumber(inputValue)) {
        if (type === 'rrn') {
          if (String(inputValue).length <= 1) {
            onChange(inputValue)
          }
        } else {
          const nativeEvent = event.nativeEvent as InputEvent
          if (nativeEvent.inputType === 'insertText') {
            if (isEmpty(inputValue)) {
              onChange('')
            } else {
              if (inputValue.length === 6) {
                onChange(inputValue)
              } else {
                onChange(inputValue.charAt(inputValue.length - 1))
              }
            }
          } else {
            onChange(inputValue)
          }
        }
      }
    } else if (type === 'number') {
      if (isNumber(inputValue)) {
        if (maxLength) {
          if (String(inputValue).length <= maxLength) {
            onChange(inputValue)
          }
        } else {
          onChange(inputValue)
        }
      }
    } else {
      onChange(inputValue)
    }
  }

  const handleDeleteValue = () => {
    onChange('')
  }

  const getMaxLength = useCallback(
    (inputType: InputType) => {
      if (inputType === 'rrn') {
        return 1
      }

      return maxLength
    },
    [type],
  )

  const onClickIcon = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!disabled) {
      onClickInnerIcon?.(value)
    }
  }

  const onClickPasswordMasking = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (!disabled) {
      if (type === 'password') {
        setIsMasked(!isMasked)
      }
    }
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    // Enter
    if (event.keyCode === 13) {
      event.preventDefault()
      event.stopPropagation()
      onKeyPressEnter?.(value)
    }

    // Backspace
    if (event.keyCode === 8) {
      if (isEmpty(value)) {
        event.preventDefault()
        event.stopPropagation()
        onKeyPressBackspace?.()
      }
    }
  }

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    onPaste?.(event)
  }

  return (
    <Box className={cn(styles.inputSection, { [styles.labelType as string]: label })}>
      <Box className={styles.inner}>
        {!isEmpty(label) && (
          <Box
            className={cn(styles.label, { [styles.labelFocus as string]: isFocused || value })}
            onClick={() => {
              if (!readOnly && !disabled) {
                inputRef.current?.focus()
                onClick?.()
              }
            }}
          >
            <Typography.Text size="sm">{label}</Typography.Text>
          </Box>
        )}

        <input
          ref={inputRef}
          value={value}
          type={
            type === 'password' && isMasked
              ? 'password'
              : ['number', 'rrn', 'cert'].includes(type)
              ? 'tel'
              : 'text'
          }
          placeholder={isFocused ? placeholder : ''}
          className={cn(styles.inp, className, {
            [styles.error as string]: status === 'error',
          })}
          disabled={disabled}
          readOnly={readOnly || icon === 'calendar'}
          required={required}
          maxLength={getMaxLength(type)}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          onBlur={(event: React.FocusEvent<HTMLInputElement>) => {
            setIsFocused(false)
            onBlurEvent && onBlurEvent(event)
          }}
          onFocus={(event: React.FocusEvent<HTMLInputElement>) => {
            if (!readOnly && !disabled) {
              setIsFocused(true)
              onFocusEvent && onFocusEvent(event)
            }
          }}
          onPaste={handlePaste}
          onClick={(event: React.MouseEvent<HTMLInputElement>) => {
            onClick?.(event)
          }}
        />

        {/* type password */}
        {type === 'password' && (
          <a
            href="#"
            className={styles.innerIcoBtn}
            onClick={onClickPasswordMasking}
          >
            <Icon icon={isMasked ? IcoEyeMask : IcoEyeUnMask} alt={'패스워드'} />
          </a>
        )}

        {/* with inner Icon */}
        {type !== 'password' && icon && (
          <a href="#" className={styles.innerIcoBtn} onClick={onClickIcon}>
            <IconComponent icon={icon} isFocused={isFocused} value={value} />
          </a>
        )}

        {/** 입력값 삭제 아이콘 */}
        {!isEmpty(value) &&
          icon !== 'calendar' &&
          !['cert', 'rrn', 'password'].includes(type) &&
          isFocused && (
            <span
              className={cn(styles.remove)}
              onMouseDown={e => {
                e.preventDefault()
                e.stopPropagation()
                setIsFocused(true)
              }}
              onClick={handleDeleteValue}
            />
          )}

        {/** 주민등록번호 뒷자리 */}
        {type === 'rrn' && (
          <Box className={styles.residentRegistrationNumber}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </Box>
        )}
      </Box>
      {!isEmpty(helperText) && <HelperText type={status}>{helperText}</HelperText>}
    </Box>
  )
}

export const Input = forwardRef(InputComponent)

interface IconComponentProps {
  icon: InnerIcon
  isFocused: boolean
  value: string
}

const IconComponent = ({
  icon,
  isFocused = false,
  value = '',
}: IconComponentProps) => {
  if (icon === 'search') {
    if (!isFocused || isEmpty(value)) {
      return <Icon icon={IcoSearch} alt="검색" />
    }
  }

  if (icon === 'calendar') {
    return <Icon icon={IcoCalendar} alt="달력" />
  }

  return <></>
}
