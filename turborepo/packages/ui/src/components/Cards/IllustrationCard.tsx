import React from 'react'
import styles from './IllustrationCard.module.scss'
import cn from 'classnames'
import { Box } from 'components/Boxes'
import { isEmpty } from 'utils'
import { Typography } from 'components/Typography'
import { ContentCard } from 'components/Card'

export interface IllustrationCardProps {
  title: string | React.ReactNode
  description?: string | React.ReactNode
  label?: string | React.ReactNode
  illustration?: React.ReactNode
  buttonComponent?: React.ReactNode
  className?: string
  onClick?: () => void
}

export const IllustrationCard = ({
  title = '',
  description = '',
  label = '',
  illustration = undefined,
  buttonComponent = undefined,
  className = '',
  onClick,
}: IllustrationCardProps) => {
  return (
    <ContentCard
      className={cn(styles.contCard, { [styles.auto as string]: label })}
      onClick={() => onClick?.()}
    >
      <Box className={styles.cont}>
        {typeof label !== 'undefined' && (
          <>
            {typeof label === 'string' && !isEmpty(label) ? (
              <Typography.Text className={styles.label}>{label}</Typography.Text>
            ) : (
              label
            )}
          </>
        )}

        {typeof title === 'string' && !isEmpty(title) ? (
          <Typography.SubTitle size="sm">{title}</Typography.SubTitle>
        ) : (
          title
        )}

        {typeof description !== 'undefined' && (
          <>
            {typeof description === 'string' && !isEmpty(description) ? (
              <Typography.Text className={styles.text}>
                {description}
              </Typography.Text>
            ) : (
              description
            )}
          </>
        )}
        {typeof buttonComponent !== 'undefined' && buttonComponent}
      </Box>
      {typeof illustration !== 'undefined' && illustration}
    </ContentCard>
  )
}
