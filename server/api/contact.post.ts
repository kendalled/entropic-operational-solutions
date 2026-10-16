// Receives inquiries from /contact.
//
// TODO before launch: deliver inquiries somewhere a person will see them
// (email provider, CRM, or help desk). Right now they are validated and
// written to the server log only.

interface Inquiry {
  name?: unknown
  email?: unknown
  business?: unknown
  businessType?: unknown
  budget?: unknown
  interests?: unknown
  message?: unknown
  website?: unknown // honeypot; real visitors never see or fill it
}

const text = (value: unknown, max: number) =>
  typeof value === 'string' ? value.trim().slice(0, max) : ''

export default defineEventHandler(async (event) => {
  const body = await readBody<Inquiry>(event)

  // Quietly accept bot submissions without processing them.
  if (text(body?.website, 200)) return { ok: true }

  const inquiry = {
    name: text(body?.name, 200),
    email: text(body?.email, 320),
    business: text(body?.business, 200),
    businessType: text(body?.businessType, 100),
    budget: text(body?.budget, 100),
    interests: Array.isArray(body?.interests) ? body.interests.map(item => text(item, 100)).filter(Boolean).slice(0, 12) : [],
    message: text(body?.message, 5000),
  }

  const errors: Record<string, string> = {}
  if (!inquiry.name) errors.name = 'Please enter your name.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) errors.email = 'Please enter a valid email address.'
  if (inquiry.message.length < 10) errors.message = 'Please tell us a little more about what you need.'

  if (Object.keys(errors).length) {
    throw createError({ statusCode: 422, statusMessage: 'Invalid inquiry', data: { errors } })
  }

  console.info('[contact] New inquiry', inquiry)

  return { ok: true }
})
