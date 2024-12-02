import React, { useEffect, useState } from 'react'
import styles from './BenefitProgress.module.scss'
import { Box } from 'components/Boxes'
import { List } from 'components/List'
import cn from 'classnames'
import { Typography } from 'components/Typography'
import { OneAppHealthUserGradeType, HealthGrades, HealthGradeType } from 'components/Grade'

/**
 * grade 별 color
 * basic(B) : green(#A4CE4E)
 * standard(BS) : new_green(#0B8201)
 * family(BSF) : blue_02(#007ABC)
 * premiumn(BSFP, BSP) : dark_blue_01(#0061A0)
 */

export interface BenefitProgressProps {
  userGrade?: OneAppHealthUserGradeType
}

export const BenefitProgress = ({ userGrade = 'B' }: BenefitProgressProps) => {
  const [grades, setGrades] = useState<ProgressProps[]>([])

  useEffect(() => {
    const gradeArray =
      userGrade === 'BSP' ? ['B', 'S', 'P', 'F'] : Object.keys(HealthGrades)
    setGrades(
      gradeArray.map(grade => {
        return {
          grade: HealthGrades[grade] as HealthGradeType,
          isActive: userGrade.includes(grade),
          label: HealthGrades[grade] || '',
        }
      }),
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
  grade: HealthGradeType
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
