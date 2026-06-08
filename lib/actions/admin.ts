'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'
import type { ActionResult } from '@/types'

// ─── Booking ──────────────────────────────────────────────────────────────────

export async function updateBookingStatus(
  id: string,
  status: string,
  adminNotes?: string,
): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('bookings')
      .update({ status, admin_notes: adminNotes ?? null })
      .eq('id', id)
    if (error) throw error
    revalidatePath('/admin/booking')
    return { data: undefined }
  } catch {
    return { error: 'Gagal update status booking.' }
  }
}

// ─── Doctor ───────────────────────────────────────────────────────────────────

export async function upsertDoctor(formData: FormData): Promise<ActionResult<{ id: string }>> {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string | null
    const payload = {
      name: formData.get('name') as string,
      slug: (formData.get('name') as string).toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      specialty: formData.get('specialty') as string,
      bio: (formData.get('bio') as string) || null,
      education: JSON.parse((formData.get('education') as string) || '[]'),
      certifications: JSON.parse((formData.get('certifications') as string) || '[]'),
      photo_url: (formData.get('photo_url') as string) || null,
      is_active: formData.get('is_active') === 'true',
    }

    let result
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (supabase as any).from('doctors').update(payload).eq('id', id).select('id').single()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (supabase as any).from('doctors').insert(payload).select('id').single()
    }

    if (result.error) throw result.error
    revalidatePath('/admin/dokter')
    revalidatePath('/dokter')
    return { data: { id: result.data.id } }
  } catch {
    return { error: 'Gagal menyimpan data dokter.' }
  }
}

export async function deleteDoctor(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('doctors').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/dokter')
    revalidatePath('/dokter')
    return { data: undefined }
  } catch {
    return { error: 'Gagal menghapus dokter.' }
  }
}

// ─── Service ─────────────────────────────────────────────────────────────────

export async function upsertService(formData: FormData): Promise<ActionResult<{ id: string }>> {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string | null
    const name = formData.get('name') as string
    const payload = {
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      category: formData.get('category') as string,
      short_desc: (formData.get('short_desc') as string) || null,
      description: (formData.get('description') as string) || null,
      benefits: JSON.parse((formData.get('benefits') as string) || '[]'),
      price_min: formData.get('price_min') ? Number(formData.get('price_min')) : null,
      price_max: formData.get('price_max') ? Number(formData.get('price_max')) : null,
      duration_mins: formData.get('duration_mins') ? Number(formData.get('duration_mins')) : null,
      icon_name: (formData.get('icon_name') as string) || null,
      is_active: formData.get('is_active') === 'true',
      sort_order: Number(formData.get('sort_order') || 0),
    }

    let result
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (supabase as any).from('services').update(payload).eq('id', id).select('id').single()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (supabase as any).from('services').insert(payload).select('id').single()
    }

    if (result.error) throw result.error
    revalidatePath('/admin/layanan')
    revalidatePath('/layanan')
    return { data: { id: result.data.id } }
  } catch {
    return { error: 'Gagal menyimpan layanan.' }
  }
}

export async function deleteService(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('services').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/layanan')
    revalidatePath('/layanan')
    return { data: undefined }
  } catch {
    return { error: 'Gagal menghapus layanan.' }
  }
}

// ─── Article ─────────────────────────────────────────────────────────────────

export async function upsertArticle(formData: FormData): Promise<ActionResult<{ id: string }>> {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string | null
    const title = formData.get('title') as string
    const payload = {
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      excerpt: (formData.get('excerpt') as string) || null,
      content: (formData.get('content') as string) || null,
      category: formData.get('category') as string,
      thumbnail_url: (formData.get('thumbnail_url') as string) || null,
      author: (formData.get('author') as string) || 'Tim Senyum Sehat',
      read_time_mins: formData.get('read_time_mins') ? Number(formData.get('read_time_mins')) : null,
      is_featured: formData.get('is_featured') === 'true',
      is_published: formData.get('is_published') === 'true',
    }

    let result
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (supabase as any).from('articles').update(payload).eq('id', id).select('id').single()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (supabase as any).from('articles').insert(payload).select('id').single()
    }

    if (result.error) throw result.error
    revalidatePath('/admin/artikel')
    revalidatePath('/edukasi')
    return { data: { id: result.data.id } }
  } catch {
    return { error: 'Gagal menyimpan artikel.' }
  }
}

export async function deleteArticle(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('articles').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/artikel')
    revalidatePath('/edukasi')
    return { data: undefined }
  } catch {
    return { error: 'Gagal menghapus artikel.' }
  }
}

// ─── Promo ────────────────────────────────────────────────────────────────────

export async function upsertPromo(formData: FormData): Promise<ActionResult<{ id: string }>> {
  try {
    const supabase = await createClient()
    const id = formData.get('id') as string | null
    const title = formData.get('title') as string
    const payload = {
      title,
      slug: title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, ''),
      description: (formData.get('description') as string) || null,
      promo_code: (formData.get('promo_code') as string) || null,
      discount_type: formData.get('discount_type') as string,
      discount_value: formData.get('discount_value') ? Number(formData.get('discount_value')) : null,
      original_price: formData.get('original_price') ? Number(formData.get('original_price')) : null,
      promo_price: formData.get('promo_price') ? Number(formData.get('promo_price')) : null,
      start_date: formData.get('start_date') as string,
      end_date: formData.get('end_date') as string,
      max_claims: formData.get('max_claims') ? Number(formData.get('max_claims')) : null,
      eligibility: (formData.get('eligibility') as string) || 'all',
      image_url: (formData.get('image_url') as string) || null,
      terms: JSON.parse((formData.get('terms') as string) || '[]'),
      is_featured: formData.get('is_featured') === 'true',
    }

    let result
    if (id) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (supabase as any).from('promos').update(payload).eq('id', id).select('id').single()
    } else {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      result = await (supabase as any).from('promos').insert(payload).select('id').single()
    }

    if (result.error) throw result.error
    revalidatePath('/admin/promo')
    revalidatePath('/promo')
    return { data: { id: result.data.id } }
  } catch {
    return { error: 'Gagal menyimpan promo.' }
  }
}

export async function deletePromo(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any).from('promos').delete().eq('id', id)
    if (error) throw error
    revalidatePath('/admin/promo')
    revalidatePath('/promo')
    return { data: undefined }
  } catch {
    return { error: 'Gagal menghapus promo.' }
  }
}

// ─── Contact message ──────────────────────────────────────────────────────────

export async function markMessageRead(id: string): Promise<ActionResult> {
  try {
    const supabase = await createClient()
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const { error } = await (supabase as any)
      .from('contact_messages')
      .update({ is_read: true })
      .eq('id', id)
    if (error) throw error
    revalidatePath('/admin/pesan')
    return { data: undefined }
  } catch {
    return { error: 'Gagal update pesan.' }
  }
}
