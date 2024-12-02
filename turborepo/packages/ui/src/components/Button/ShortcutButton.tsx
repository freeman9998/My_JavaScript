import React, {
  ForwardRefRenderFunction,
  forwardRef,
  useImperativeHandle,
  useRef,
} from 'react'
import styles from './ShortcutButton.module.scss'
import { Typography } from 'components/Typography'
import { isEmpty } from 'utils'
import { Icon } from 'components/Icon'

export interface ShortcutButtonProps {
  icon: string | React.ReactNode
  label?: string
  title?: string
  onClick?: () => void
}

export interface ShortcutRef {
  onFocus: () => void
}

const ShortcutComponent: ForwardRefRenderFunction<
  ShortcutRef,
  ShortcutButtonProps
> = (props, ref) => {
  useImperativeHandle(ref, () => ({
    onFocus() {
      shortcutRef?.current?.focus()
    },
  }))

  const { icon, label = '', title, onClick } = props

  const shortcutRef = useRef<HTMLButtonElement>(null)
  const handleClick = () => {
    if (onClick) onClick()
  }
  return (
    <button
      ref={shortcutRef}
      type="button"
      className={styles.shortcutButton}
      title={title}
      onClick={handleClick}
    >
      <span className={styles.icon}>
        <Icon icon={icon} alt="" ariaHidden />
      </span>
      {!isEmpty(label) && (
        <Typography.SubTitle type="secondary" className={styles.txt} size="xs">
          {label}
        </Typography.SubTitle>
      )}
    </button>
  )
}

export const ShortcutButton = forwardRef(ShortcutComponent)
