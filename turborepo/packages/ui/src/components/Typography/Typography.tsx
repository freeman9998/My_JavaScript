import React from 'react'
import styles from './Typography.module.scss'
import { Box } from 'components/Boxes'
import cn from "classnames";

/**
 * Typography
 *
 * Type(Color)
 * default: black
 * primary(success): blue_02
 * secondary: darkest_gray
 * info: dark_gray
 * white: white
 * error: red
 *
 * Typography.Title
 * size(weight/fontSize/line-height/letter-spacing)
 * - xl(700/40px/52px/-0.6px)
 * - lg(700/36px/46px/-0.6px)
 * - md(700/32px/42px/-0.6px)
 * - sm(700/28px/38px/-0.6px)
 * - xs(700/24px/34px/-0.6px) => default
 *
 * Typography.SubTitle
 * size(weight/fontSize/line-height/letter-spacing)
 * - xl(700/20px/28px/-0.6px)
 * - lg(700/18px/26px/-0.6px)
 * - md(700/16px/22px/-0.6px) => default
 * - md + long(700/16px/28px/-0.6px)
 * - sm(700/14px/20px/-0.6px)
 * - sm + long(700/14px/24px/-0.6px)
 * - xs(700/12px/18px/-0.6px)
 *
 * Typography(Body/Paragraph)
 * size(weight/fontSize/line-height/letter-spacing)
 * - lg(400/24px/32px/-0.6px)
 * - lg + bold(500/24px/32px/-0.6px)
 * - md(400/22px/30px/-0.6px) => default
 * - md + bold(500/22px/30px/-0.6px)
 * - sm(400/20px/28px/-0.6px)
 * - sm + bold(500/20px/28px/-0.6px)
 *
 * Typography.Text(Text/String)
 * size(weight/fontSize/line-height/letter-spacing)
 * - lg(400/16px/24px/-0.6px)
 * - lg + bold(500/16px/24px/-0.6px)
 * - lg + long(400/16px/28px/-0.6px)
 * - md(400/14px/20px/-0.6px) => default
 * - md + bold(500/14px/20px/-0.6px)
 * - md + long(400/14px/24px/-0.6px)
 * - sm(400/12px/18px/-0.6px)
 */

type TextAlign = 'left' | 'center' | 'right'
type TextType = 'default' | 'primary' | 'secondary' | 'info' | 'white' | 'error'

export interface TypographyProps {
  size?: 'lg' | 'md' | 'sm'
  type?: TextType
  bold?: boolean
  underline?: boolean
  className?: string
  children: string | React.ReactNode
  onClick?: () => void
}

export const Typography = (props: TypographyProps) => {
  const {
    size = 'md',
    type = 'default',
    bold = false,
    underline = false,
    className,
    children,
  } = props

  return (
    <span
      className={cn(
        styles.body, // default 스타일
        styles[size], // font size
        styles[type], // type
        {
          [styles.bold as string]: bold, // bold
          [styles.underline as string]: underline, // underline
        },
        className,
      )}
    >
      {children}
    </span>
  )
}

interface TextProps {
  size?: 'lg' | 'md' | 'sm'
  type?: TextType
  bold?: boolean
  underline?: boolean
  long?: boolean
  className?: string
  children: string | React.ReactNode
}
const Text = (props: TextProps) => {
  const {
    size = 'md',
    type = 'info',
    bold = false,
    underline = false,
    long = false,
    className,
    children,
  } = props
  return (
    <span
      className={cn(
        styles.text,
        styles[size],
        styles[type],
        {
          [styles.long as string]: size !== 'sm' && long,
          [styles.bold as string]: size !== 'sm' && !long && bold,
          [styles.underline as string]: underline,
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
Typography.Text = Text

interface TitleProps {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  type?: TextType
  underline?: boolean
  className?: string
  children: string | React.ReactNode
}
const Title = (props: TitleProps) => {
  const {
    size = 'xs',
    type = 'default',
    underline = false,
    className,
    children,
  } = props
  return (
    <span
      className={cn(
        styles.title,
        styles[size],
        styles[type],
        { [styles.underline as string]: underline },
        className,
      )}
    >
      {children}
    </span>
  )
}
Typography.Title = Title

interface SubTitleProps {
  size?: 'xl' | 'lg' | 'md' | 'sm' | 'xs'
  type?: TextType
  long?: boolean
  underline?: boolean
  className?: string
  children: string | React.ReactNode
}
const SubTitle = (props: SubTitleProps) => {
  const {
    size = 'md',
    type = 'default',
    long = false,
    underline = false,
    className,
    children,
  } = props
  return (
    <span
      className={cn(
        styles.subTitle,
        styles[size],
        styles[type],
        {
          [styles.long as string]: ['md', 'sm'].includes(size) && long,
          [styles.underline as string]: underline,
        },
        className,
      )}
    >
      {children}
    </span>
  )
}
Typography.SubTitle = SubTitle
