import React from 'react'
import styles from './Loader.module.scss'
import ReactLottie from 'lottie-react'
import loadingLottie from './metlifeLoader.json'
import { Box } from 'components/Boxes'

export interface LoaderProps {}

export const Loader = (props: LoaderProps) => {
  return (
    <>
      <Box className={styles.loader}>
        <ReactLottie animationData={loadingLottie} />
      </Box>
    </>
  )
}
