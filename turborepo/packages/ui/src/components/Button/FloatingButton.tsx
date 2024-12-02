import React, { useEffect, useState } from 'react'
import styles from './FloatingButton.module.scss'
import { Box, ButtonBox } from 'components/Boxes'
import cn from 'classnames'

export interface FloatingButtonProps {
  vertical?: boolean
  className?: string
  children: React.ReactNode
}

export const FloatingButton = ({
  vertical = false,
  className,
  children,
}: FloatingButtonProps) => {
  // 스크롤 유무
  const [hasScroll, setHasScroll] = useState<boolean>(false)

  // 스크롤 종료여부
  const [endScroll, setEndScroll] = useState<boolean>(false)

  const handleScroll = () => {
    // viewport 높이
    const viewportHeight = window.innerHeight

    // 컨텐츠 높이
    const contentHeight =
      document.body.scrollHeight > document.documentElement.scrollHeight
        ? document.body.scrollHeight
        : document.documentElement.scrollHeight

    // 스크롤 위치
    const scrollTop = document.body.scrollTop

    setHasScroll(viewportHeight < contentHeight)
    setEndScroll(contentHeight - viewportHeight === scrollTop)
  }

  const handleScrollOnPopup = () => {
    // viewport 높이
    const viewportHeight = document.getElementById('popupContent')
      ?.clientHeight as number

    // 컨텐츠 높이
    const contentHeight = document.getElementById('popupContent')
      ?.scrollHeight as number

    // 스크롤 위치
    const scrollTop = document.getElementById('popupContent')?.scrollTop as number

    setHasScroll(viewportHeight < contentHeight)
    setEndScroll(contentHeight - viewportHeight === scrollTop)
  }

  useEffect(() => {
    if (document.getElementById('popupContent')) {
      handleScrollOnPopup()
      document
        .getElementById('popupContent')
        ?.addEventListener('scroll', handleScrollOnPopup)
    } else {
      handleScroll()
      document.body.addEventListener('scroll', handleScroll)
    }

    return () => {
      if (document.getElementById('popupContent')) {
        document
          .getElementById('popupContent')
          ?.removeEventListener('scroll', handleScrollOnPopup)
      } else {
        document.body.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  return (
    <Box
      className={cn(
        styles.floating,
        { [styles.scroll as string]: hasScroll && !endScroll },
        { [styles.vertical as string]: vertical },
        className,
      )}
    >
      {React.Children.count(children) > 1 ? (
        <ButtonBox vertical={vertical}>{children}</ButtonBox>
      ) : (
        children
      )}
    </Box>
  )
}
