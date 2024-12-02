import React from 'react'
import styles from './ImageCard.module.scss'
import { Box } from 'components/Boxes'
import { Image } from 'components/Image'
import { isEmpty } from 'utils'
import { Typography } from 'components/Typography'
import cn from 'classnames'
import { ContentCard } from 'components/Card'
import { Icon } from 'components/Icon'
import YoutubeIcon from '@assets/icons/img_watchon_youtube.png'

export interface ImageCardProps {
  image: string
  imageAlt: string
  imagePosition?: 'side' | 'above'
  label?: string | React.ReactNode
  title: string | React.ReactNode
  description?: string | React.ReactNode
  className?: string
  buttonComponent?: React.ReactNode
  isYoutube?: boolean
  onClick?: () => void
}

export const ImageCard = ({
  image,
  imageAlt = '',
  imagePosition = 'side',
  label = undefined,
  title = '',
  description = undefined,
  className,
  buttonComponent = undefined,
  isYoutube = false,
  onClick,
}: ImageCardProps) => {
  return (
    <ContentCard
      className={cn(styles.imageCard, { [styles.above as string]: imagePosition === 'above' })}
      onClick={() => onClick?.()}
    >
      {/* Image영역 start */}
      {/* imagePosition에 따른 image 배치 */}
      <Box className={styles.imgArea}>
        <Image src={image} alt={imageAlt} />
        {isYoutube && imagePosition === 'above' && (
          <Box className={styles.youtubeIcon}>
            <Icon icon={YoutubeIcon} alt="watch on youtube" />
          </Box>
        )}
      </Box>
      {/* Image영역 end */}

      {/* content 영역 start */}
      <Box className={styles.cont}>
        {typeof label !== 'undefined' && (
          <>
            {typeof label === 'string' ? (
              <>
                {!isEmpty(label) && (
                  <Typography.Text className={styles.label}>{label}</Typography.Text>
                )}
              </>
            ) : (
              label
            )}
          </>
        )}

        {typeof title === 'string' ? (
          <Typography.SubTitle
            type="secondary"
            size={imagePosition === 'side' ? 'lg' : 'md'}
            className={styles.title}
          >
            {title}
          </Typography.SubTitle>
        ) : (
          title
        )}

        {typeof description !== 'undefined' && (
          <>
            {typeof description === 'string' ? (
              <>
                {!isEmpty(description) && (
                  <Typography.Text className={styles.txt}>
                    {description}
                  </Typography.Text>
                )}
              </>
            ) : (
              description
            )}
          </>
        )}
      </Box>

      {typeof buttonComponent !== 'undefined' && (
        <Box className={styles.btn}>{buttonComponent}</Box>
      )}
      {/* content 영역 end */}
    </ContentCard>
  )
}

interface ImageCardGroupProps {
  children: React.ReactNode
}
export const ImageCardGroup = ({ children }: ImageCardGroupProps) => {
  return <ContentCard className={styles.imageCardGroup}>{children}</ContentCard>
}
