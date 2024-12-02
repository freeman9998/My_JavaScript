import React from 'react'
import styles from './Banner.module.scss'
import { Box } from 'components/Boxes'
import cn from 'classnames'
import { Image } from 'components/Image'
import { isEmpty } from 'utils'

export interface BannerProps {
  src?: string
  alt?: string
  className?: string
  ariaHidden?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

export const Banner = ({
  src,
  alt = '',
  className,
  ariaHidden = false,
  children,
  onClick,
}: BannerProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }

  return (
    <Box className={cn(styles.banner, className)} onClick={handleClick}>
      {!isEmpty(src) ? (
        <Image src={src} alt={alt} ariaHidden={ariaHidden} />
      ) : (
        children
      )}
    </Box>
  )
}
