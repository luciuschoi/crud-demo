'use client'
import React from 'react'
import { z } from 'zod'
import { useState } from 'react'

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
})

type Message = z.infer<typeof schema>

const SimpleForm = () => {
  const [data, setData] = useState<Message>()
  const [error, setError] = useState({})
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const formObj = Object.fromEntries(formData.entries())

    // create a new message
    const result = schema.safeParse(formObj)
    if (!result.success) {
      setError(result.error.issues)
      return
    }

    fetch('/api/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(result.data),
    }).then((res) => res.json())
      .then((res) => {
        if (res.success) {
          setData(res.data)
          setError({})
          form.reset()
        } else {
          setError(res.error)
          setData(undefined)
        }
      })

  }

  return (
    <div className='grid grid-cols-2 gap-3'>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg shadow-md dark:border-neutral-800"
      >
        <input type="text" placeholder="Name" name="name" className='border rounded-lg p-2' />
        <input type="text" placeholder="Message" name="message" className='border rounded-lg p-2' />
        <button className='bg-blue-500 text-white rounded-lg p-2'>Submit</button>

      </form>
      <div className='flex flex-col gap-4 p-4 bg-blue-500 text-white border-blue-800 rounded-lg shadow-md dark:border-neutral-800'>
        {Object.keys(error).length === 0 && data && <pre>{JSON.stringify(data, null, 2)}</pre>}
        {Object.keys(error).length > 0 && <pre>{JSON.stringify(error, null, 2)}</pre>}
      </div>
    </div>
  )
}

export default SimpleForm