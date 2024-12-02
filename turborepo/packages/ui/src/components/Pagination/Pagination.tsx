import React, { useEffect, useState } from 'react'
import styles from './Pagination.module.scss'
import { Button } from 'components/Button'
import { Parts } from './Parts'
import { Icon } from 'components/Icon'
import PrevBtn from '@assets/icons/_navigator_prev.svg'
import NextBtn from '@assets/icons/_navigator_next.svg'
import SkipBtn from '@assets/icons/_ellipsis.svg'
import { Box } from 'components/Boxes'

export interface PaginationProps {
  pageNo: number
  countPerPage: number
  totalCount: number
  onChange: (pageNo: number) => void
}

interface IPage {
  pageNo: number
  isSkip: boolean
  isSelected: boolean
}

export const Pagination = (props: PaginationProps) => {
  const { pageNo = 1, countPerPage = 10, totalCount = 0, onChange } = props

  const [pages, setPages] = useState<IPage[]>([])
  const [totalPages, setTotalPages] = useState<number>(
    Math.ceil(totalCount / countPerPage),
  )

  useEffect(() => {
    setTotalPages(Math.ceil(totalCount / countPerPage))
  }, [totalCount, pageNo])

  useEffect(() => {
    const currentPage = pageNo > totalPages ? 1 : pageNo

    let pageArr: IPage[] = Array(totalPages)
      .fill('')
      .map((_, i) => ({ pageNo: i + 1, isSkip: false, isSelected: false }))

    if (totalPages <= 7) {
      setPages(
        pageArr.map((item: IPage) => {
          if (item.pageNo === currentPage) {
            return { ...item, isSelected: true }
          } else {
            return item
          }
        }),
      )
    } else {
      let standard: IPage[] = pageArr.filter(
        (item: IPage) =>
          item.pageNo >= currentPage && item.pageNo <= currentPage + 2,
      )

      let before: IPage[] = []
      if (standard[0]){
        if (pageArr[0] && standard[0].pageNo > 3) {
          before = [pageArr[0], { pageNo: -1, isSkip: true, isSelected: false }]
        } else {
          before = pageArr.filter((item: IPage) => {if(standard[0]) item.pageNo < standard[0].pageNo})
        }
      }

      let after: IPage[] = []
      if (totalPages - (standard.at(-1)?.pageNo || currentPage) > 2) {
        after = [
          { pageNo: -1, isSkip: true, isSelected: false },
          pageArr.at(-1) as IPage,
        ]

        const convertLength = standard.length + before.length
        if (convertLength < 5) {
          standard = standard.concat(
            pageArr.filter(
              (item: IPage) =>
                item.pageNo > (standard.at(-1)?.pageNo || currentPage) &&
                item.pageNo <=
                  (standard.at(-1)?.pageNo || currentPage) + (5 - convertLength),
            ),
          )
        }
      } else {
        after = pageArr.filter(
          (item: IPage) => item.pageNo > (standard.at(-1)?.pageNo || currentPage),
        )

        const totalLength = before.length + standard.length + after.length
        if (totalLength < 7) {
          standard = pageArr
            .filter(
              (item: IPage) =>{
                if(standard[0])
                  item.pageNo >= standard[0].pageNo - (7 - totalLength) &&
                  item.pageNo < standard[0].pageNo
              }
            )
            .concat(standard)
        }
      }

      let convert: IPage[] = [...before, ...standard, ...after]
      setPages(
        convert.map((item: IPage) => {
          if (item.pageNo === currentPage) {
            return { ...item, isSelected: true }
          } else {
            return item
          }
        }),
      )
    }
  }, [pageNo, totalPages])

  const handleClick = (changeNo: number) => () => {
    if (changeNo !== pageNo) {
      onChange(changeNo)
    }
  }

  return (
    <Box className={styles.pagination}>
      <Button
        className={styles.navigatorBtn}
        disabled={pageNo === 1 || totalCount < countPerPage}
        onClick={() => onChange(pageNo - 1)}
      >
        <Icon alt="이전 페이지로" icon={PrevBtn} />
      </Button>
      {pages.map((page: IPage, index: number) =>
        page.isSkip ? (
          <Icon icon={SkipBtn} alt="" key={`page_${index}`} />
        ) : (
          <Parts
            key={`page_${index}`}
            selected={page.isSelected || false}
            onClick={handleClick(page.pageNo)}
          >
            {page.pageNo}
          </Parts>
        ),
      )}
      <Button
        className={styles.navigatorBtn}
        disabled={pageNo === totalPages || totalCount < countPerPage}
        onClick={() => onChange(pageNo + 1)}
      >
        <Icon alt="다음 페이지로" icon={NextBtn} />
      </Button>
    </Box>
  )
}
