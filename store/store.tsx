import { SaveSearchParams } from '@api/saveSearch'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { ReactNode, createContext, useContext, useState } from 'react'
import { useMutation } from 'react-query'

const initialState = {
  isSearching: false
}

type StoreData = {
  state: typeof initialState
  setIsSearching: (_value: boolean) => void
  saveSearch: (_body: SaveSearchParams) => void
}
const StoreContext = createContext<StoreData | undefined>(undefined)

interface Props {
  children: ReactNode
}

function StoreProvider({ children }: Props) {
  const [state, setState] = useState(initialState)
  const router = useRouter()

  function setIsSearching(value: boolean) {
    setState(oldValues => ({ ...oldValues, isSearching: value }))
  }

  const { mutate: saveSearch } = useMutation(
    async (body: SaveSearchParams) => {
      await axios.post('/api/saveSearch', body)
    },
    {
      mutationKey: 'save-search',
      onSuccess: () => {
        // it doesn't work yet, since it'll refresh only the current route
        // wait for Next.js update to refresh specific route
        // something like: router.refresh('/')
        router.refresh()
      }
    }
  )

  const storeData = { setIsSearching, saveSearch, state }

  return (
    <StoreContext.Provider value={storeData}>{children}</StoreContext.Provider>
  )
}

function useStore() {
  return useContext(StoreContext) as StoreData
}

export { StoreProvider, useStore, StoreContext }
