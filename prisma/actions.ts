'use server'

import { z } from 'zod';
import prisma from './db';

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
})

export async function createMessage(formData: FormData) {
  const data = Object.fromEntries(formData.entries())
  const result = schema.safeParse(data)
  if (!result.success) {
    return { success: false, error: result.error.format() }
  }

  const { name, message } = result.data
  
  try {
    const newMessage = await prisma.message.create({
      data: { name, message },
    })
    return { success: true, data: result.data }
  } catch (error) {
    return { success: false, error: result.error}
  }
}