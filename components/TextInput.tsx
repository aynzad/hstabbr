'use client'

import React, { ForwardedRef, forwardRef, HTMLProps } from 'react'
import classNames from 'classnames'
import { FieldError } from 'react-hook-form'

type Props = HTMLProps<HTMLInputElement | HTMLTextAreaElement> & {
  label: string
  name: string
  error?: FieldError
  multiLine?: boolean
}

const TextInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, Props>(
  ({ label, name, error, className, multiLine = false, ...rest }, ref) => {
    return (
      <div
        className={classNames({
          'flex flex-col border-l pl-3 border-white border-opacity-[16%]': true,
          'border-red-500 border-opacity-100': !!error
        })}
      >
        <label
          htmlFor={name}
          className="text-[10px] font-normal text-white text-opacity-60 mb-1"
        >
          {label}
          {error && (
            <>
              {' - '}
              <small className="text-red-500 font-light">
                {error.type === 'required' && 'Required'}
                {error.type === 'minLength' && 'Need more char'}
                {error.type === 'maxLength' && 'Max length exceeded'}
              </small>
            </>
          )}
        </label>
        {multiLine ? (
          <textarea
            {...rest}
            ref={ref as ForwardedRef<HTMLTextAreaElement>}
            id={name}
            name={name}
            className={classNames(
              'w-full font-normal p-0 text-white placeholder:text-primary-darker placeholder:font-light border-0 outline-0 bg-transparent focus:outline-0 focus:ring-0 focus:border-0',
              className
            )}
            aria-invalid={!!error ? 'true' : 'false'}
            rows={4}
          />
        ) : (
          <input
            {...rest}
            ref={ref as ForwardedRef<HTMLInputElement>}
            id={name}
            name={name}
            className={classNames(
              'w-full font-normal p-0 text-white placeholder:text-primary-darker placeholder:font-light border-0 outline-0 bg-transparent focus:outline-0 focus:ring-0 focus:border-0',
              className
            )}
            aria-invalid={!!error ? 'true' : 'false'}
          />
        )}
      </div>
    )
  }
)

export default TextInput
