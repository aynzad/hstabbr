'use client'

import { MouseEvent } from 'react'
import { useRouter } from 'next/navigation'
import { XMarkIcon, CogIcon } from '@heroicons/react/20/solid'
import { useMutation } from 'react-query'
import superagent from 'superagent'
import { toast } from 'react-toastify'

interface Props {
  id: string
}

function RemoveSaveSearchButton({ id }: Props) {
  const router = useRouter()

  const removeSaveSearch = useMutation(
    async (id: string) => {
      await superagent.delete('/api/removeSearch').query({ id })
    },
    {
      mutationKey: `remove-save-search-${id}`,
      onSuccess: () => {
        router.refresh()
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.body?.error || 'Something went wrong'
        toast(errorMessage, { type: 'error' })
      }
    }
  )

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    event.stopPropagation()
    removeSaveSearch.mutate(id)
  }

  return (
    <button
      onClick={handleClick}
      disabled={removeSaveSearch.isLoading}
      type="button"
      className="hidden group-hover:block bg-transparent hover:ring-0 focus:ring-0"
    >
      {removeSaveSearch.isLoading ? (
        <CogIcon width={16} className="animate-spin" />
      ) : (
        <XMarkIcon
          width={16}
          className="text-primary-dark hover:text-red-500 transition-colors"
        />
      )}
    </button>
  )
}

export default RemoveSaveSearchButton
