import React, { useState } from 'react'
import styles from './Filter.module.scss'
import { BottomSheet } from 'components/BottomSheet'
import { List, ListItemLabel } from 'components/List'
import { Box } from 'components/Boxes'
import { Button } from 'components/Button'
import { Typography } from 'components/Typography'

export interface FilterOptionProps {
  label: string
  value: string
  disabled?: boolean
}

export interface FilterProps {
  title?: string
  value: string
  options: FilterOptionProps[]
  onChange: (value: string) => void
}

export const Filter = ({ title, value, options, onChange }: FilterProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const handleClick = (value: string) => () => {
    onChange(value)
    setOpen(false)
  }

  return (
    <>
      <Box className={styles.filter}>
        <Box tabIndex={0} className={styles.btn} onClick={() => setOpen(true)}>
          <Typography.Text size="md" type="secondary">
            {options.find(item => item.value === value)?.label}
          </Typography.Text>
        </Box>
      </Box>
      <BottomSheet open={open} title={title} closable onClose={() => setOpen(false)}>
        <List>
          {options.map((option: FilterOptionProps) => {
            return (
              <ListItemLabel
                key={option.value}
                label={option.label}
                disabled={option.disabled}
                isSelected={option.value === value}
                onClick={handleClick(option.value)}
              />
            )
          })}
        </List>
      </BottomSheet>
    </>
  )
}
