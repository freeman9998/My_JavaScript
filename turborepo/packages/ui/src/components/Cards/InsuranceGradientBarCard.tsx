import React from 'react'
import styles from './InsuranceGradientBarCard.module.scss'
import { TagColor } from 'components/Tags'
import { Box } from 'components/Boxes'
import { Typography } from 'components/Typography'
import { isEmpty } from 'utils'
import { RadioElement } from 'components/Radio'
import { ContentCard } from 'components/Card'
import cn from 'classnames'

/**
 * Gradient Type
 * $gradient1_v2: #a4ce4e, #0090da;
 * $gradient2_v2: #379b94, #0090da;
 * $gradient3_v2: #1e4c76, #007abc;
 * $gradient4_v2: #000016, #1e4c76;
 * $gradient5_v2: #00aca0, #a4ce4e;
 * $gradient6_v2: #210d3c, #614f94;
 * $gradient7_v2: #007abc, #1e4c76;
 */

type GradientType =
  | 'gradient1'
  | 'gradient2'
  | 'gradient3'
  | 'gradient4'
  | 'gradient5'
  | 'gradient6'
  | 'gradient7'
export interface InsuranceGradientBarCardProps {
  gradient: GradientType
  title: string | React.ReactNode
  description?: string | React.ReactNode
  tag?: React.ReactNode
  tagColor?: TagColor
  children?: React.ReactNode
  checkValue?: string
  value?: string
  onCheck?: (value: string) => void
  onClick?: () => void
}

export const InsuranceGradientBarCard = ({
  gradient = 'gradient1',
  title = undefined,
  description = undefined,
  tag = undefined,
  tagColor,
  children = undefined,
  checkValue,
  value,
  onCheck,
  onClick,
}: InsuranceGradientBarCardProps) => {
  return (
    <ContentCard
      className={cn(
        styles.futureItem,
        tagColor && styles[tagColor],
        styles[gradient],
      )}
      onClick={() => onClick?.()}
    >
      {typeof value === 'string' && typeof title === 'string' ? (
        <RadioElement
          name="insuranceGradient"
          label={
            <Typography.SubTitle size="lg" type="secondary">
              {title}
            </Typography.SubTitle>
          }
          value={value}
          isSelected={value === checkValue}
          onChange={(v: string) => onCheck?.(v)}
        />
      ) : (
        <>
          {typeof title === 'string' ? (
            <Typography.Title size="xs" className={styles.title}>
              {title}
            </Typography.Title>
          ) : (
            title
          )}
        </>
      )}

      {typeof tag !== 'undefined' && <Box className={styles.tag}>{tag}</Box>}
      {typeof description !== 'undefined' && (
        <>
          {typeof description === 'string' ? (
            <>
              {!isEmpty(description) && (
                <Typography.Text size="lg">{description}</Typography.Text>
              )}
            </>
          ) : (
            description
          )}
        </>
      )}

      {typeof children !== 'undefined' && (
        <Box className={styles.description}>{children}</Box>
      )}
    </ContentCard>
  )
}
