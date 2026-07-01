import type { NextRequest } from 'next/server'

export async function GET(req: NextRequest) {
  const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || '127.0.0.1'
  const cleanIp = ip.split(',')[0].trim()

  try {
    const res = await fetch(`https://ipapi.co/${cleanIp}/country/`, {
      signal: AbortSignal.timeout(3000),
    })
    const country = res.ok && res.status === 200 ? (await res.text()).trim() : 'PL'
    return Response.json({ country: country.length === 2 ? country : 'PL' })
  } catch {
    return Response.json({ country: 'PL' })
  }
}
