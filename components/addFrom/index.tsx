'use client'

import { useForm } from 'react-hook-form'
import { useRouter } from 'next/navigation'
import TextInput from '@components/TextInput'
import { type Prisma } from '@prisma/client'
import {
  CpuChipIcon,
  RocketLaunchIcon,
  CogIcon
} from '@heroicons/react/20/solid'
import { useMutation } from 'react-query'
import { RawSimpleWord, SimpleWord } from '@lib/db/types'
import superagent from 'superagent'
import classNames from 'classnames'
import { toast } from 'react-toastify'
import { GenerateAiParams } from '@api/generateAi'

interface Props {
  initialAbbreviation?: string
}

interface AddFormData
  extends Pick<
    Prisma.WordCreateInput,
    'abbreviation' | 'definition' | 'description'
  > {
  categories: string
}

function AddForm({ initialAbbreviation }: Props) {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<AddFormData>({
    defaultValues: {
      abbreviation: initialAbbreviation || '',
      definition: '',
      description: '',
      categories: ''
    }
  })
  const abbreviation = watch('abbreviation')
  const definition = watch('definition')

  const generateWord = useMutation(
    async (body: GenerateAiParams) => {
      const res = await superagent.post('/api/generateAi').send(body)
      return res.body as { data: RawSimpleWord }
    },
    {
      mutationKey: 'generate-ai',
      onSuccess: ({ data }) => {
        setValue('abbreviation', data.abbreviation.toUpperCase())
        setValue('definition', data.definition.toLocaleLowerCase())
        setValue('categories', data.categories.toLocaleLowerCase())
        setValue('description', data.description)
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.body?.error || 'Something went wrong'
        toast(errorMessage, { type: 'error' })
      }
    }
  )

  const addWord = useMutation(
    async (body: AddFormData) => {
      const res = await superagent
        .post('/api/create')
        .send({ ...body, ai: generateWord.isSuccess })
      return res.body as { data: SimpleWord }
    },
    {
      mutationKey: 'generate-ai',
      onSuccess: ({ data }) => {
        router.push(`/${data.abbreviation}`)
      },
      onError: (error: any) => {
        const errorMessage =
          error?.response?.body?.error || 'Something went wrong'
        toast(errorMessage, { type: 'error' })
      }
    }
  )

  const generateAiDisabled =
    abbreviation.length < 2 ||
    abbreviation.length > 6 ||
    !!errors.abbreviation ||
    generateWord.isLoading ||
    addWord.isLoading

  const onSubmit = (data: AddFormData) => {
    addWord.mutate(data)
  }

  const onGenerateAi = () => {
    generateWord.mutate({ abbreviation, definition: definition || undefined })
  }

  return (
    <form className="p-6" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-10 pb-4 border-b border-white border-opacity-[16%] flex justify-between">
        <h1 className="font-semibold text-2xl text-white text-opacity-80">
          Add New Abbreviation
        </h1>
        <div className="flex gap-4">
          {!generateWord.isSuccess && (
            <button
              onClick={onGenerateAi}
              disabled={generateAiDisabled}
              type="button"
              className="button button__third"
            >
              <CpuChipIcon
                width={16}
                className={classNames(
                  'mr-1',
                  generateWord.isLoading && 'animate-spin'
                )}
              />
              Generate w/ AI
            </button>
          )}
          <button
            type="submit"
            className="button"
            disabled={addWord.isLoading || generateWord.isLoading}
          >
            {addWord.isLoading ? (
              <CogIcon width={16} className="mr-1 animate-spin" />
            ) : (
              <RocketLaunchIcon width={16} className="mr-1" />
            )}
            Publish
          </button>
        </div>
      </div>
      <div className="grid gap-8">
        <TextInput
          label="Abbreviation"
          className="text-4xl"
          placeholder="Type the abbreviation word..."
          error={errors.abbreviation}
          {...register('abbreviation', {
            required: true,
            maxLength: 6,
            minLength: 2
          })}
          readOnly={generateWord.isLoading || addWord.isLoading}
        />
        <TextInput
          label="Definition"
          className="text-xl"
          placeholder="Type the full form of above abbreviation word..."
          error={errors.definition}
          {...register('definition', {
            required: true,
            maxLength: 60,
            minLength: 8
          })}
          readOnly={generateWord.isLoading || addWord.isLoading}
        />
        <TextInput
          label="Categories"
          className="text-base"
          placeholder="Tag this word, split with comma (,)"
          error={errors.categories}
          {...register('categories', {
            required: true,
            maxLength: 60,
            minLength: 3
          })}
          readOnly={generateWord.isLoading || addWord.isLoading}
        />
        <TextInput
          label="Description (optional)"
          className="text-base"
          placeholder="Define the word in a sentence or two..."
          error={errors.description}
          multiLine
          {...register('description', {
            required: false,
            maxLength: 450,
            minLength: 20
          })}
          readOnly={generateWord.isLoading || addWord.isLoading}
        />
      </div>
    </form>
  )
}

export default AddForm
