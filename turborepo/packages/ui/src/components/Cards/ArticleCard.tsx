import React from 'react'
import styles from './ArticleCard.module.scss'
import { Box } from 'components/Boxes'
import { Image } from 'components/Image'
import { isEmpty } from 'utils'
import { Typography } from 'components/Typography'
import cn from 'classnames'

export interface ArticleCardProps {
  src: string
  alt: string
  label?: string | React.ReactNode
  title?: string | React.ReactNode
  className?: string
  size?: 'lg' | 'sm'
  onClick?: () => void
}

export const ArticleCard = ({
  src = '',
  alt = '',
  label = undefined,
  title = undefined,
  className = '',
  size = 'lg',
  onClick,
}: ArticleCardProps) => {
  return (
    <Box
      className={cn(
        styles.link,
        { [styles.lg as string]: size === 'lg' },
        { [styles.sm as string]: size === 'sm' },
      )}
      tabIndex={0}
      onClick={() => onClick?.()}
    >
      <Image src={src} alt={alt} />
      <Box className={styles.gradation}></Box>
      <Box className={styles.imgDsc}>
        {typeof label !== 'undefined' && (
          <>
            {typeof label === 'string' ? (
              <>
                {!isEmpty(label) && (
                  <>
                    {size === 'lg' ? (
                      <Typography.SubTitle type="white" size="sm">
                        {label}
                      </Typography.SubTitle>
                    ) : (
                      <Typography.Text size="sm" type="white">
                        {label}
                      </Typography.Text>
                    )}
                  </>
                )}
              </>
            ) : (
              label
            )}
          </>
        )}

        {typeof title !== 'undefined' && (
          <>
            {typeof title === 'string' ? (
              <>
                {!isEmpty(title) && (
                  <>
                    {size === 'lg' ? (
                      <Typography.Title type="white" className={styles.text}>
                        {title}
                      </Typography.Title>
                    ) : (
                      <Typography.SubTitle
                        size="sm"
                        type="white"
                        className={styles.text}
                      >
                        {title}
                      </Typography.SubTitle>
                    )}
                  </>
                )}
              </>
            ) : (
              title
            )}
          </>
        )}
      </Box>
    </Box>
  )
}
