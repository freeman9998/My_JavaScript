import React, {
  useEffect,
  useState,
  useRef,
  forwardRef,
  ForwardRefRenderFunction,
} from 'react'
import styles from './Tabs.module.scss'
import { Box } from 'components/Boxes'
import cn from 'classnames'
import { Typography } from 'components/Typography'

export interface TabsProps {
  activeTab: string
  tabItems: TabItemProps[]
  onChange: (value: string) => void
}

type Align = 'left' | 'center'
export const Tabs = ({ activeTab, tabItems, onChange }: TabsProps) => {
  const [align, setAlign] = useState<Align>('center')
  const tabListRef = useRef<HTMLDivElement>(null)
  const tabRefs = useRef<(HTMLAnchorElement | null)[]>([])

  const handleClick = (value: string) => {
    if (activeTab !== value) {
      onChange(value)
    }
  }

  useEffect(() => {
    setAlign(tabItems.length > 3 ? 'left' : 'center')
  }, [tabItems])

  useEffect(() => {
    const scrollMove = () => {
      const activeTabIndex = tabItems.findIndex(item => item.value === activeTab)
      if (activeTabIndex > -1) {
        if (tabRefs.current[activeTabIndex] && tabListRef.current) {
          const activeTab = tabRefs.current[activeTabIndex]
          const tabList = tabListRef.current

          if (activeTab) {
            const activeTabLeft = activeTab.offsetLeft
            const activeTabWidth = activeTab.offsetWidth

            const tabListScrollLeft = tabList.scrollLeft
            const tabListWidth = tabList.offsetWidth

            if (
              activeTabLeft < tabListScrollLeft ||
              activeTabLeft + activeTabWidth > tabListScrollLeft + tabListWidth
            ) {
              const newScrollLeft =
                activeTabLeft + activeTabWidth / 2 - tabListWidth / 2
              tabList.scrollTo({ left: newScrollLeft, behavior: 'smooth' })
            }
          }
        }
      }
    }

    setTimeout(() => {
      scrollMove()
    }, 100)
  }, [activeTab, tabItems])

  return (
    <Box className={styles.tabs_wrapper}>
      <Box ref={tabListRef} className={cn(styles.scroll, styles[align])}>
        <Box className={styles.tabs}>
          {tabItems.map(({ value, ...rest }: TabItemProps, index: number) => (
            <Tab
              ref={el => (tabRefs.current[index] = el)}
              key={value}
              value={value}
              isActive={value === activeTab}
              {...rest}
              onClick={handleClick}
            />
          ))}
        </Box>
      </Box>
      <TabPanel>{tabItems.find(tab => tab.value === activeTab)?.panel}</TabPanel>
    </Box>
  )
}

export interface TabItemProps {
  value: string
  label: string
  panel: React.ReactNode
  tag?: React.ReactNode
}

interface TabProps extends TabItemProps {
  isActive: boolean
  onClick: (key: string) => void
}

const TabComponent: ForwardRefRenderFunction<HTMLAnchorElement, TabProps> = (
  { value, label, isActive = false, tag = undefined, onClick },
  ref,
) => {
  const handleClick =
    (activeTab: string) => (event: React.MouseEvent<HTMLAnchorElement>) => {
      event.preventDefault()
      onClick(activeTab)
    }

  return (
    <a
      ref={ref}
      href="#"
      className={cn(styles.tab, isActive && styles.isActive, {
        [styles.tagType as string]: tag,
      })}
      onClick={handleClick(value)}
    >
      {typeof tag !== 'undefined' && <>{tag}</>}
      <Typography.Text
        size="md"
        type="secondary"
        className={isActive ? styles.isActive : 'undefined'}
      >
        {label}
      </Typography.Text>
    </a>
  )
}
const Tab = forwardRef(TabComponent)
interface TabPanelProps {
  children: React.ReactNode
}
const TabPanel = ({ children }: TabPanelProps) => {
  return <Box className={styles.tabPanel}>{children}</Box>
}
