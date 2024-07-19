import { NextResponse } from 'next/server'
import prisma from '../../../../prisma/db'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, "Name is required"),
  message: z.string().min(1, "Message is required"),
})

export async function GET(request: Request) {
  const messages = await prisma.message.findMany()
  return NextResponse.json({ success: true, data: messages })
}

export async function POST(request: Request) {
  const data = await request.json()
  const result = schema.safeParse(data)
  if (!result.success) {
    return NextResponse.json({ success: false, error: result.error.format() })
  }

  try {
    const newMessage = await prisma.message.create({ data })
    return NextResponse.json({ success: true, data: newMessage })
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message })
  }
}