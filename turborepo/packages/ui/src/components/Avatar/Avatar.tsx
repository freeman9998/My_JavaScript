import React from 'react'
import styles from './Avatar.module.scss'
import Profile from '@assets/icons/ic_avatar_empty_40.svg'
import { Box } from 'components/Boxes'
import { Image } from 'components/Image'

export interface AvatarProps {
  src: string | undefined
  alt: string | undefined
  ariaHidden?: boolean
}

export const Avatar = ({ src, ariaHidden = false, ...rest }: AvatarProps) => {
  return (
    <Box className={styles.avatar}>
      <Image src={src || Profile} aria-hidden={ariaHidden} {...rest} />
    </Box>
  )
}
