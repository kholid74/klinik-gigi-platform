'use server'

import { z } from 'zod'
import { createClient } from '@/lib/supabase/server'
import type { ActionResult } from '@/types'

const contactSchema = z.object({
  name: z.string().min(2, 'Nama minimal 2 karakter'),
  email: z.string().email('Format email tidak valid').optional(),
  phone: z.string().optional(),
  subject: z.string().min(3, 'Subjek minimal 3 karakter'),
  message: z.string().min(10, 'Pesan minimal 10 karakter').max(1000),
})

export async function sendContactMessage(
  input: z.infer<typeof contactSchema>,
): Promise<ActionResult<{ id: string }>> {
  const parsed = contactSchema.safeParse(input)
  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Data tidak valid' }
  }

  try {
    const supabase = await createClient()
    const messagePayload = {
      name: parsed.data.name,
      email: parsed.data.email ?? null,
      phone: parsed.data.phone ?? null,
      subject: parsed.data.subject,
      message: parsed.data.message,
    } as never

    const { data, error } = await supabase
      .from('contact_messages')
      .insert(messagePayload)
      .select('id')
      .single()

    if (error) throw error
    const message = data as { id: string }
    return { data: { id: message.id } }
  } catch {
    return { error: 'Gagal mengirim pesan. Silakan coba lagi atau hubungi via WhatsApp.' }
  }
}
