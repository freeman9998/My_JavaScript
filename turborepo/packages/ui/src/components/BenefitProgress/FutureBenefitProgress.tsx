import React, { useEffect, useState } from 'react'
import styles from './FutureBenefitProgress.module.scss'
import { Box } from 'components/Boxes'
import { List } from 'components/List'
import cn from 'classnames'
import { Typography } from 'components/Typography'
import { OneAppFutureUserGradeType, FutureGrades, FutureGradeType } from 'components/Grade'

/**
 * grade 별 color
 * welcome(W) : mlbaseteal
 * basic(WB) : mlblue2
 * premiumn(WBP) : gradient4_v2
 */

export interface FutureBenefitProgressProps {
  userGrade?: OneAppFutureUserGradeType
}

export const FutureBenefitProgress = ({
  userGrade = 'W',
}: FutureBenefitProgressProps) => {
  const [grades, setGrades] = useState<ProgressProps[]>([])

  useEffect(() => {
    const gradeArray = Object.keys(FutureGrades)
    setGrades(
      gradeArray.map(grade => {
        return {
          grade: FutureGrades[grade] as FutureGradeType,
          isActive: userGrade.includes(grade),
          label: FutureGrades[grade] || '',
        }
      } ),
    )
  }, [userGrade])

  return (
    <Box className={styles.benfitProgress}>
      <List className={styles.benfitList}>
        {grades.map(grade => (
          <Progress key={grade.grade} {...grade} />
        ))}
      </List>
    </Box>
  )
}

interface ProgressProps {
  grade: FutureGradeType
  isActive: boolean
  label: string
}
const Progress = ({
  grade = 'Basic',
  isActive = false,
  label = '',
}: ProgressProps) => {
  return (
    <List.Item
      className={cn(styles.item, styles[grade.toLowerCase()], {
        [styles.on as string]: isActive,
      })}
    >
      {isActive ? (
        <Typography.SubTitle size="xs">{label}</Typography.SubTitle>
      ) : (
        <Typography.Text size="sm">{label}</Typography.Text>
      )}
    </List.Item>
  )
}
