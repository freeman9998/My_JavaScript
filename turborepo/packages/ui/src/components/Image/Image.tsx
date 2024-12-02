import React from 'react'

export interface ImageProps extends React.ComponentProps<'img'> {
  ariaHidden?: boolean
}

export const Image = ({ src, alt, ariaHidden = false, ...props }: ImageProps) => {
  return <img src={src} alt={alt} aria-hidden={ariaHidden} {...props} />
}
