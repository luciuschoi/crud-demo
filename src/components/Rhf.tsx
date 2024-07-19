'use client'
import React from 'react'
import { z } from 'zod'
import { useState } from 'react'
import { createMessage } from '@/prisma/actions'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
})

type Message = z.infer<typeof schema>

const Rhf = () => {
  const [data, setData] = useState<Message>({ name: '', message: '' })

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors } } = useForm<Message>({
      resolver: zodResolver(schema),
      defaultValues: data,
    })

  const onSubmit = async (data: Message) => {
    const formData = new FormData()
    formData.append('name', data.name)
    formData.append('message', data.message)

    const result = await createMessage(formData)

    if (result.success) {
      setData(result?.data as Message)
      reset()
    } else {
      console.log(result.error)
    }
  }

  return (
    <div className='grid grid-cols-2 gap-3'>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-4 p-4 border border-gray-300 rounded-lg shadow-md dark:border-neutral-800"
      >
        <input {...register('name')} placeholder="Name" className='border rounded-lg p-2' />
        {errors.name && <p className='text-red-500'>{errors.name.message}</p>}
        <input {...register('message')} placeholder="Message" className='border rounded-lg p-2' />
        {errors.message && <p className='text-red-500'>{errors.message.message}</p>}
        <button className='bg-blue-500 text-white rounded-lg p-2'>Submit</button>
      </form>
      <div className='flex flex-col gap-4 p-4 bg-blue-500 text-white border-blue-800 rounded-lg shadow-md dark:border-neutral-800'>
        {data && <pre>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  )
}

export default Rhf