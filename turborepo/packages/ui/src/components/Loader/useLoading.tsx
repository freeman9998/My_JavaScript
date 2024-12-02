import { createContext, useContext, useState } from 'react'
import { Loader } from './Loader'

interface LoadingContextProps {
  showLoading: () => void
  hideLoading: () => void
}

const LoadingContext: React.Context<LoadingContextProps> = createContext({
  showLoading: () => {},
  hideLoading: () => {},
})

export const LoadingProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState<boolean>(false)
  return (
    <LoadingContext.Provider
      value={{
        showLoading: () => setIsLoading(true),
        hideLoading: () => setIsLoading(false),
      }}
    >
      {isLoading && <Loader />}
      {children}
    </LoadingContext.Provider>
  )
}

export const useLoading = () => useContext(LoadingContext)
