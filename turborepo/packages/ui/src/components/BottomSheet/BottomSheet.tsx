import React, { useEffect, useState } from 'react'
import styles from './BottomSheet.module.scss'
import { isEmpty } from 'utils'
import cn from 'classnames'
import { Icon } from 'components/Icon'
import topClose from '@assets/icons/ico-top-close.svg'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'

export interface BottomSheetProps {
  open: boolean
  title?: React.ReactNode
  closable?: boolean
  content?: React.ReactNode
  children?: React.ReactNode
  onClose?: () => void
}

export const BottomSheet = (props: BottomSheetProps) => {
  const {
    open = false,
    title = undefined,
    closable = false,
    content = undefined,
    children = undefined,
    onClose,
  } = props

  const [archiveBodyStyleOverflow, setArchiveBodyStyleOverflow] =
    useState<string>('')

  useEffect(() => {
    setArchiveBodyStyleOverflow(document.body.style.overflow)
    document.body.style.overflow = open ? 'hidden' : 'auto'

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

  return (
    <>
      {open && (
        <Box className={cn(styles.roundDialog, styles.active)}>
          <Box className={styles.roundDim} onClick={() => onClose?.()}>
            <></>
          </Box>
          <Box className={styles.roundItem}>
            {(!isEmpty(title) || closable) && (
              <Box className={styles.header}>
                {!isEmpty(title) && (
                  <Typography.SubTitle size="lg">{title}</Typography.SubTitle>
                )}
                {closable && (
                  <a
                    href="#handleClose"
                    className={styles.close}
                    onClick={handleClose}
                  >
                    <Icon icon={topClose} alt="팝업창 닫기" />
                  </a>
                )}
              </Box>
            )}
            <Box className={styles.children}>{content || children}</Box>
          </Box>
        </Box>
      )}
    </>
  )
}
