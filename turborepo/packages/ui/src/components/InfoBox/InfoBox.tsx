import React, { useEffect, useRef, useState } from 'react'
import styles from './InfoBox.module.scss'
import { Icon } from 'components/Icon'
import TooltipIcon from '@assets/icons/ic_tooltip.svg'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import cn from 'classnames'

export type ArrowPosition = 'default' | 'right'
export interface InfoBoxProps {
  title?: string
  description?: string
  arrowPosition?: ArrowPosition
  children?: React.ReactNode
}

export const InfoBox = ({
  title = '',
  description = '',
  arrowPosition = 'default',
  children = undefined,
}: InfoBoxProps) => {
  const infoBoxRef = useRef<HTMLDivElement>(null)
  const [show, setShow] = useState<boolean>(false)

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.stopPropagation()
    event.preventDefault()
    setShow(!show)
  }

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (infoBoxRef.current && !infoBoxRef.current.contains(event.target as Node)) {
        setShow(false)
      }
    }
    window.addEventListener('mousedown', handleClick)
    return () => window.removeEventListener('mousedown', handleClick)
  }, [infoBoxRef])

  return (
    <Box ref={infoBoxRef} className={cn(styles.infoBox, styles[arrowPosition])}>
      <a href="#" onClick={handleClick}>
        <Icon icon={TooltipIcon} alt="툴팁" />
      </a>
      {show && (
        <>
          <Box className={styles.tooltip}>
            {children || (
              <>
                <Typography.SubTitle
                  className={styles.title}
                  size="sm"
                  type="secondary"
                >
                  {title}
                </Typography.SubTitle>
                <Typography.Text
                  className={styles.description}
                  size="sm"
                  type="secondary"
                >
                  {description}
                </Typography.Text>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  )
}
