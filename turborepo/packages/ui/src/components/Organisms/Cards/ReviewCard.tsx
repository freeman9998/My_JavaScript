import React from 'react'
import styles from './ReviewCard.module.scss'
import { ContentCard } from 'components/Card'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import { Avatar } from 'components/Avatar'
import { isEmpty } from 'utils'

export interface ReviewCardProps {
  author: string
  createdDate?: string
  profile: string | undefined
  children?: React.ReactNode
}

export const ReviewCard = ({
  author,
  createdDate,
  profile,
  children,
}: ReviewCardProps) => {
  return (
    <ContentCard className={styles.reviewCard}>
      <Box className={styles.reviewInfo}>
        <Typography.SubTitle className={styles.reviewName} size="sm">
          {author}
        </Typography.SubTitle>
        {!isEmpty(createdDate) && (
          <Typography.Text className={styles.reviewDate} size="sm">
            {createdDate}
          </Typography.Text>
        )}
        <Avatar src={profile} alt={author} />
      </Box>
      <Box className={styles.reviewDesc}>
        <Typography.Text size="sm">{children || '내용없음'}</Typography.Text>
      </Box>
    </ContentCard>
  )
}
