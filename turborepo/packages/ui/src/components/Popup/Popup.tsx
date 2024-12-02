import React, { useEffect, useRef, useState } from 'react'
import styles from './Popup.module.scss'
import { Box, ButtonBox } from 'components/Boxes'
import { isEmpty } from 'utils'
import { Typography } from 'components/Typography'
import { Button, ButtonProps, FloatingButton } from 'components/Button'
import { Icon } from 'components/Icon'
import cn from 'classnames'
import topClose from '@assets/icons/ico-top-close.svg'

export type PopupType = 'default' | 'fullscreen'

export interface PopupButtonProps extends Omit<ButtonProps, 'children'> {}

export interface PopupProps {
  open: boolean
  type?: PopupType
  title?: string | React.ReactNode
  closable?: boolean
  hideButton?: boolean
  content?: React.ReactNode
  footer?: React.ReactNode
  children?: React.ReactNode
  okButtonProps?: PopupButtonProps
  cancelButtonProps?: PopupButtonProps
  onClose?: () => void
  onOk?: () => void
  onCancel?: () => void
  [key: string]: any
}

export const Popup = (props: PopupProps) => {
  const {
    open = false,
    type = 'default',
    title = undefined,
    closable = false,
    content = undefined,
    footer = null,
    children = undefined,
    okButtonProps = undefined,
    cancelButtonProps = undefined,
    hideButton = false,
    onClose,
    onOk,
    onCancel,
  } = props

  const popupRef = useRef<HTMLDivElement>(null)
  const [archiveBodyStyleOverflow, setArchiveBodyStyleOverflow] =
    useState<string>('')

  useEffect(() => {
    setArchiveBodyStyleOverflow(document.body.style.overflow)
    const result = document.getElementById('popup_container')
    document.body.style.overflow = result ? 'hidden' : 'auto'

    if (popupRef && popupRef.current !== null) {
      popupRef.current?.focus()
    }

    return () => {
      document.body.style.overflow = archiveBodyStyleOverflow
    }
  }, [open])

  const handleClose = (event: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClose) {
      event.preventDefault()
      onClose()
    }
  }

  const handleCancel = () => {
    onCancel?.()
  }

  const handleOk = () => {
    onOk?.()
  }

  return (
    <>
      {open && (
        <Box
          id="popup_container"
          className={cn(styles.popup, {
            [styles.fullscreen as string]: type === 'fullscreen',
          })}
        >
          <Box className={styles.dim}>&nbsp;</Box>
          <Box className={styles.item} ref={popupRef} tabIndex={0}>
            {/** Header(title) Area */}
            {(!isEmpty(title) || closable) && (
              <Box className={styles.header}>
                {!isEmpty(title) && (
                  <>
                    {typeof title === 'string' ? (
                      <Typography.SubTitle
                        size={type === 'fullscreen' ? 'lg' : 'xl'}
                      >
                        {title}
                      </Typography.SubTitle>
                    ) : (
                      title
                    )}
                  </>
                )}
                {closable && (
                  <a href="#" className={styles.close} onClick={handleClose}>
                    <Icon icon={topClose} alt="팝업창 닫기" />
                  </a>
                )}
              </Box>
            )}

            <Box
              id="popupContent"
              className={cn(styles.children, { [styles.empty as string]: !children })}
            >
              {content ? (
                <Typography.Text className={styles.content} size="lg" type="info">
                  {content}
                </Typography.Text>
              ) : (
                children
              )}
            </Box>

            {/** Footer(button) Area */}
            {!hideButton && (
              <Footer
                type={type}
                footer={footer}
                okButtonProps={okButtonProps}
                cancelButtonProps={cancelButtonProps}
                onOk={handleOk}
                onCancel={onCancel || cancelButtonProps ? handleCancel : undefined}
              />
            )}
          </Box>
        </Box>
      )}
    </>
  )
}

interface FooterProps {
  type: PopupType
  footer?: React.ReactNode
  okButtonProps?: PopupButtonProps
  cancelButtonProps?: PopupButtonProps
  onOk: () => void
  onCancel?: () => void
}

const Footer = (props: FooterProps) => {
  const {
    type = 'default',
    footer = null,
    okButtonProps = undefined,
    cancelButtonProps = undefined,
    onOk,
    onCancel,
  } = props

  const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (cancelButtonProps?.onClick) {
      cancelButtonProps?.onClick(event)
    } else {
      onCancel?.()
    }
  }

  const handleOk = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (okButtonProps?.onClick) {
      okButtonProps?.onClick(event)
    } else {
      onOk()
    }
  }

  return type === 'fullscreen' ? (
    <FloatingButton className={styles.floatingWrap}>
      {footer || (
        <>
          {(cancelButtonProps || onCancel) && (
            <Button type="secondary" outline onClick={handleCancel}>
              {cancelButtonProps?.label || '취소'}
            </Button>
          )}
          <Button onClick={handleOk}>{okButtonProps?.label || '확인'}</Button>
        </>
      )}
    </FloatingButton>
  ) : (
    <>
      {footer || (
        <ButtonBox className={styles.bottomBox}>
          {(cancelButtonProps || onCancel) && (
            <Button type="secondary" outline onClick={handleCancel}>
              {cancelButtonProps?.label || '취소'}
            </Button>
          )}
          <Button onClick={handleOk}>{okButtonProps?.label || '확인'}</Button>
        </ButtonBox>
      )}
    </>
  )
}
