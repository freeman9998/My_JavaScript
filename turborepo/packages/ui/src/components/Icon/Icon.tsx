import React from 'react'
import styles from './Icon.module.scss'

export interface IconProps {
  icon: string | React.ReactNode
  alt: string
  ariaHidden?: boolean
}

export const Icon = ({ icon, alt = '', ariaHidden = false }: IconProps) => {
  return (
    <>
      {typeof icon === 'string' ? (
        <img src={icon} alt={alt} className={styles.icon} aria-hidden={ariaHidden} />
      ) : (
        icon
      )}
    </>
  )
}
