import { useState } from 'react'
import { Loader } from './Loader'

export interface LoadingProps {
  isLoading: boolean
  showLoading: () => void
  hideLoading: () => void
}

export const withLoading = (WrappedComponent: any) => {
  return (props: any) => {
    const [loading, setLoading] = useState<boolean>(false)

    const showLoading = () => setLoading(true)
    const hideLoading = () => setLoading(false)

    return (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {loading && <Loader />}
        <WrappedComponent
          {...props}
          isLoading={loading}
          showLoading={showLoading}
          hideLoading={hideLoading}
        />
      </div>
    )
  }
}
