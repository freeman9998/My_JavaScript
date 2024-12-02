import React from 'react'
import styles from './TextCard.module.scss'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import { Icon } from 'components/Icon'
import { ContentCard } from 'components/Card'

export interface TextCardProps {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  className?: string
  buttonComponent?: React.ReactNode
  tagComponent?: React.ReactNode
  icon?: string | React.ReactNode
  onClick?: () => void
}

export const TextCard = ({
  title,
  description = undefined,
  className,
  buttonComponent = undefined,
  tagComponent = undefined,
  icon = undefined,
  onClick,
}: TextCardProps) => {
  return (
    <ContentCard onClick={() => onClick?.()} className={styles.textCard}>
      <Box className={styles.rows}>
        <Box className={styles.cont}>
          {/* title */}
          <Box className={styles.title}>
            {typeof title === 'string' ? (
              <Typography.SubTitle size="lg" type="secondary">
                {title}
              </Typography.SubTitle>
            ) : (
              title
            )}
          </Box>

          {/* description */}
          {typeof description !== 'undefined' && (
            <Box className={styles.description}>
              {typeof description === 'string' ? (
                <Typography.Text size="md" type="secondary">
                  {description}
                </Typography.Text>
              ) : (
                description
              )}
            </Box>
          )}

          {/* tag */}
          {typeof tagComponent !== 'undefined' && <Box>{tagComponent}</Box>}
        </Box>

        {typeof icon !== 'undefined' && (
          <Box className={styles.icon}>
            {typeof icon === 'string' ? <Icon icon={icon} alt="" /> : icon}
          </Box>
        )}
      </Box>

      {/* buttonComponent area */}
      {typeof buttonComponent !== 'undefined' && (
        <Box className={styles.btn}>{buttonComponent}</Box>
      )}
    </ContentCard>
  )
}
