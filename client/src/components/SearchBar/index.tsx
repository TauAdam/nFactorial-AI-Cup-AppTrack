import React, { FormEvent, useEffect, useRef } from 'react'

export const SearchBar: React.FC = () => {
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const savedValue = localStorage.getItem('query')
    if (inputRef.current && savedValue) {
      inputRef.current.value = savedValue
    }
  }, [])

  useEffect(() => {
    const inputRefValue = inputRef.current
    return () => {
      const query = inputRefValue?.value || ''
      localStorage.setItem('query', query)
    }
  }, [])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
  }

  return (
    <form onSubmit={handleSubmit} className='flex items-center justify-center'>
      <input
        type='text'
        placeholder='Search something'
        ref={inputRef}
        className='bg-white focus:outline-none focus:shadow-outline border border-gray-300 rounded-lg py-2 px-4 block w-2/3 appearance-none leading-normal'
      />
      <button
        type='submit'
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg ml-2'
      >
        Search
      </button>
    </form>
  )
}
