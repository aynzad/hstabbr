'use client'

import { SimpleWord } from '@lib/db/types'
import { Session } from 'next-auth'
import {
  CpuChipIcon,
  EyeIcon,
  CogIcon,
  XMarkIcon
} from '@heroicons/react/20/solid'
import superagent from 'superagent'
import { useRouter } from 'next/navigation'
import { useMutation } from 'react-query'
import { toast } from 'react-toastify'

interface Props {
  word: SimpleWord
  session: Session | null
}

function WordStatus({ word, session }: Props) {
  const router = useRouter()
  const removeWord = useMutation(
    async (id: string) => {
      await superagent.delete('/api/remove').query({ id })
    },
    {
      mutationKey: `remove-word-${word.id}`,
      onSuccess: () => {
        router.push('/')
        router.refresh()
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.body?.error || 'Something went wrong'
        toast(errorMessage, { type: 'error' })
      }
    }
  )

  const handleRemoveWord = () => {
    removeWord.mutate(word.id)
  }

  return (
    <div className="mt-2 flex gap-8 justify-center items-center opacity-50 hover:opacity-100 transition-opacity">
      <div className="flex items-center" title={`Added by ${word.user.name}`}>
        <img
          className="h-5 w-5 rounded-full mr-1"
          src={word.user.image || ''}
          title={word.user.name || undefined}
          alt={`${word.user.name?.[0] || ''} image`}
        />
        <span className="text-white text-opacity-50">{word.user.name}</span>
      </div>
      <div className="flex items-center" title={`${word.hit} times viewed`}>
        <EyeIcon className="text-white text-opacity-75 mr-1" width={20} />
        <span className="text-white text-opacity-50">{word.hit}</span>
      </div>
      {word.ai && (
        <div className="flex items-center" title={`Created with a help of AI`}>
          <CpuChipIcon className="text-white text-opacity-75 mr-1" width={20} />
          <span className="text-white text-opacity-50">AI</span>
        </div>
      )}
      {word.user.email === session?.user?.email && (
        <div title="Removing the word">
          <button
            onClick={handleRemoveWord}
            disabled={removeWord.isLoading}
            type="button"
            className="button button__danger"
          >
            {removeWord.isLoading ? (
              <CogIcon width={16} className="mr-1 animate-spin" />
            ) : (
              <XMarkIcon width={16} className="mr-1" />
            )}
            Remove word
          </button>
        </div>
      )}
    </div>
  )
}

export default WordStatus
