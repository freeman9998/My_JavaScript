import React from 'react'
import styles from './ListItemLabel.module.scss'
import { TagColor, Tags } from 'components/Tags'
import { Box } from 'components/Boxes'
import { isEmpty } from 'utils'
import { Typography } from 'components/Typography'
import { Icon } from 'components/Icon'
import cn from 'classnames'

export interface ListItemLabelProps {
  label: string | React.ReactNode
  description?: string | React.ReactNode
  tagLabel?: string
  tagColor?: TagColor
  iconRight?: string
  isSelected?: boolean
  labelBold?: boolean
  disabled?: boolean
  onClick?: () => void
}

export const ListItemLabel = ({
  label = '',
  description = undefined,
  tagLabel = undefined,
  tagColor = undefined,
  iconRight = undefined,
  isSelected = false,
  labelBold = false,
  disabled = false,
  onClick,
}: ListItemLabelProps) => {
  const handleClick = () => {
    if (!disabled) {
      onClick?.()
    }
  }

  return (
    <li onClick={handleClick} className={styles.listItemLabel} tabIndex={0}>
      <Box className={styles.inner}>
        <Box className={styles.title}>
          {typeof tagLabel === 'string' &&
            !isEmpty(tagLabel) &&
            typeof tagColor !== 'undefined' && (
              <Tags label={tagLabel} color={tagColor || 'purple'} />
            )}
          {typeof label !== 'undefined' &&
            (typeof label === 'string' ? (
              labelBold || isSelected ? (
                <Typography.SubTitle
                  size="md"
                  type={isSelected ? 'primary' : 'secondary'}
                  className={styles.subTitle}
                >
                  {label}
                </Typography.SubTitle>
              ) : (
                <Typography.Text
                  size="lg"
                  type="secondary"
                  className={cn(styles.subTitle, { [styles.disabled as string]: disabled })}
                >
                  {label}
                </Typography.Text>
              )
            ) : (
              label
            ))}
        </Box>

        {typeof description !== 'undefined' &&
          (typeof description === 'string' ? (
            <Box className={styles.description}>
              <Typography.Text size="sm" type="info">
                {description}
              </Typography.Text>
            </Box>
          ) : (
            description
          ))}
      </Box>

      {typeof iconRight !== 'undefined' && (
        <Box className={styles.arrowRight}>
          <Icon icon={iconRight} alt="" />
        </Box>
      )}
    </li>
  )
}
