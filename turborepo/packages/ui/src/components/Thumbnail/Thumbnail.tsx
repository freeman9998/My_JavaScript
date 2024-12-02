import React from 'react'
import { Box } from 'components/Boxes'
import { Image } from 'components/Image'
import styles from './Thumbnail.module.scss'
import cn from 'classnames'

/**
 * type
 * list : weight 343 / height 140
 * detail : weight 375 / height 375
 */

export interface ThumbnailProps {
  src: string
  alt?: string
  type: 'list' | 'detail'
  ariaHidden?: boolean
  onClick?: () => void
}

export const Thumbnail = ({
  src,
  alt = '',
  type = 'list',
  ariaHidden = false,
  onClick,
}: ThumbnailProps) => {
  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (onClick) {
      event.preventDefault()
      onClick()
    }
  }
  return (
    <Box
      className={cn(styles.thumbnail, {
        [styles.list as string]: type === 'list',
        [styles.detail as string]: type === 'detail',
      })}
      onClick={handleClick}
    >
      <Image src={src} alt={alt} ariaHidden={ariaHidden} />
    </Box>
  )
}
