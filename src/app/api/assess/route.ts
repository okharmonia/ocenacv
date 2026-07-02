import type { NextRequest } from 'next/server'

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://ocenacv.pl'

interface RequestBody {
  cvText: string
  targetRole?: string
  roastLevel?: 'friendly' | 'brutal' | 'nuclear'
}

export async function POST(req: NextRequest) {
  const startTime = Date.now()

  try {
    const body: RequestBody = await req.json()
    const { cvText, targetRole, roastLevel = 'brutal' } = body

    // Validate
    if (!cvText || cvText.length < 50) {
      return Response.json(
        { error: 'CV jest za kr\u00F3tkie. Minimum 50 znak\u00F3w.' },
        { status: 400 }
      )
    }
    if (cvText.length > 50000) {
      return Response.json(
        { error: 'CV jest za d\u0142ugie. Maksymalnie 50 000 znak\u00F3w.' },
        { status: 400 }
      )
    }

    // If no OpenRouter key, return mock data for development
    if (!OPENROUTER_API_KEY) {
      return Response.json({
        result: mockResult(cvText, targetRole),
        _meta: { elapsedMs: Date.now() - startTime, model: 'mock-dev' },
      })
    }

    // Build system prompt
    const SYSTEM_PROMPTS: Record<string, string> = friendlyPrompts()
    const systemPrompt = SYSTEM_PROMPTS[roastLevel] || SYSTEM_PROMPTS.brutal
    const roleContext = targetRole ? '\n\nStanowisko na ktore aplikujesz: ' + targetRole : ''
    const userPrompt = 'Przeanalizuj ponizsze CV i daj mi bezlitosna, szczera ocene.' + roleContext + '\n\n=== POCZATEK CV ===\n' + cvText + '\n=== KONIEC CV ==='

    // Call OpenRouter
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': 'Bearer ' + OPENROUTER_API_KEY,
        'Content-Type': 'application/json',
        'HTTP-Referer': SITE_URL,
        'X-Title': 'OcenCV.pl',
      },
      body: JSON.stringify({
        model: 'nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt },
        ],
        response_format: { type: 'json_object' },
        max_tokens: 4000,
        temperature: roastLevel === 'nuclear' ? 0.9 : 0.7,
      }),
    })

    if (!response.ok) {
      const errBody = await response.text().catch(() => '')
      console.error('OpenRouter error ' + response.status + ':', errBody)
      return Response.json(
        { error: 'AI tymczasowo niedost\u0119pne (' + response.status + '). Spr\u00F3buj za chwil\u0119.' },
        { status: 502 }
      )
    }

    const data = await response.json()
    const content = data?.choices?.[0]?.message?.content || ''

    // Parse JSON from response
    let result
    try {
      result = JSON.parse(content)
    } catch {
      const jsonMatch = content.match(/```(?:json)?\n?([\s\S]*?)```/)
      if (jsonMatch) {
        result = JSON.parse(jsonMatch[1])
      } else {
        const firstBrace = content.indexOf('{')
        const lastBrace = content.lastIndexOf('}')
        if (firstBrace !== -1 && lastBrace > firstBrace) {
          result = JSON.parse(content.slice(firstBrace, lastBrace + 1))
        } else {
          throw new Error('No JSON found')
        }
      }
    }

    const elapsed = Date.now() - startTime
    return Response.json({
      result: {
        score: typeof result.score === 'number' ? Math.round(result.score) : Math.floor(Math.random() * 40) + 20,
        oneLiner: result.oneLiner || 'AI nie zdo\u0142a\u0142o precyzyjnie oceni\u0107 Twojego CV.',
        roasts: Array.isArray(result.roasts) ? result.roasts.slice(0, 5) : [],
        atsBreakdown: Array.isArray(result.atsBreakdown) ? result.atsBreakdown.slice(0, 5) : [],
      },
      _meta: { elapsedMs: elapsed, model: data?.model || 'unknown' },
    })

  } catch (error) {
    console.error('Assess API error:', error)
    return Response.json(
      { error: 'Nie uda\u0142o si\u0119 przeanalizowa\u0107 CV. Spr\u00F3buj ponownie za chwil\u0119.' },
      { status: 500 }
    )
  }
}

/** Mock result for development without API key */
function mockResult(cvText: string, targetRole?: string) {
  const hasNumbers = /\d+%|\d+x|\d+\s*(osob|lat|ludzi|projekt|tys|mln)/i.test(cvText)
  const hasKeywords = /\b(zarzadzalem|kierowalem|optymalizowalem|wdrozylem|stworzylem|zwiekszylem|zmniejszylem)\b/i.test(cvText)
  const hasWeakPhrases = /\b(pracowity|gracz zespolowy|odpowiedzialny za|pomagalem)\b/i.test(cvText)

  let score = 30
  if (hasNumbers) score += 15
  if (hasKeywords) score += 15
  if (hasWeakPhrases) score -= 5
  if (targetRole) score -= Math.floor(Math.random() * 10)
  score = Math.max(10, Math.min(85, score + Math.floor(Math.random() * 15) - 7))

  const roleSuffix = targetRole ? ' na stanowisko ' + targetRole : ''

  return {
    score,
    oneLiner: 'Twoje CV' + roleSuffix + ' to lista obowiazkow, nie osiagniec. Rekruter zobaczy kolejnego kandydata.',
    roasts: [
      { id: 1, icon: 'brak-liczb', title: 'Brak konkretnych osiagniec', description: 'W Twoim CV' + roleSuffix + ' brak liczb. Kazdy punkt powinien zawierac konkretna liczbe lub procent.' },
      { id: 2, icon: 'puste-frazy', title: 'Puste frazesy', description: 'Jestem pracowitym graczem zespolowym - serio? Kazdy kandydat tak pisze.' },
      { id: 3, icon: 'slabe-podsumowanie', title: 'Slabe podsumowanie zawodowe', description: 'Podsumowanie' + roleSuffix + ' to pierwsze co widzi rekruter. Twoje jest zbyt ogolne.' },
      { id: 4, icon: 'slowa-kluczowe', title: 'Brak slow kluczowych z branzy', description: 'Systemy ATS szukaja konkretnych slow kluczowych' + roleSuffix + '.' },
      { id: 5, icon: 'red-flag', title: 'Brak osiagniec w CV', description: 'Opisujesz obowiazki, nie osiagniecia' + roleSuffix + '. Byles odpowiedzialny za... to nie jest osiagniecie.' },
    ],
    atsBreakdown: [
      'Dopasowanie do stanowiska: ' + (hasKeywords ? 'Srednie' : 'Niskie') + ' - brakuje kluczowych terminow',
      'Czytelnosc formatowania: Poprawna - ale mozna poprawic uklad sekcji',
      'Osiagniecia z liczbami: ' + (hasNumbers ? 'Sa, ale moglo byc wiecej' : 'Brak - to najwiekszy problem'),
      'Slowa kluczowe: ' + (hasKeywords ? 'Czesciowo obecne' : 'Brak specyficznych terminow branzowych'),
      'Ogolne wrazenie: Przecietne - nie wyroznia sie na tle innych kandydatow',
    ],
  }
}

/** System prompts stored as a function to avoid template literal issues */
function friendlyPrompts(): Record<string, string> {
  const baseRoast = JSON.stringify({
    score: 0,
    oneLiner: '...',
    atsBreakdown: ['...'],
    roasts: [
      { id: 1, icon: 'brak-liczb', title: '...', description: '...' },
      { id: 2, icon: 'puste-frazy', title: '...', description: '...' },
      { id: 3, icon: 'slabe-podsumowanie', title: '...', description: '...' },
      { id: 4, icon: 'slowa-kluczowe', title: '...', description: '...' },
      { id: 5, icon: 'red-flag', title: '...', description: '...' },
    ],
  })

  return {
    friendly: 'Pisz wyłącznie w czystym języku polskim, pod żadnym pozorem nie używaj słów z innych języków (np. hiszpańskiego jak "cualquier" czy angielskiego). Jesteś życzliwym ekspertem HR z 15-letnim doświadczeniem. Twoim zadaniem jest przeanalizować CV kandydata i dać mu konstruktywny feedback. Zasady: Oceniasz CV w skali 0-100 (większość CV dostaje 25-55). Podajesz DOKŁADNIE 5 konkretnych uwag (nie ogólników). Każda uwaga ma: tytuł (krótki, celny) i opis (dlaczego to problem i jak to naprawić). Uwagi muszą odnosić się do TREŚCI tego konkretnego CV. Oceniasz: osiągnięcia z liczbami, podsumowanie zawodowe, formatowanie, słowa kluczowe, spójność. Zwracasz też jeden "one-liner" — zdanie podsumowujące. FORMAT ODPOWIEDZI — TYLKO JSON (bez dodatkowego tekstu, bez znaczników markdown): ' + baseRoast,
    brutal: 'Pisz wyłącznie w czystym języku polskim, pod żadnym pozorem nie używaj słów z innych języków (np. hiszpańskiego jak "cualquier" czy angielskiego). Jesteś bezwzględnym rekruterem, który widział tysiące CV i ma dość frazesów. Mówisz prawdę prosto w oczy. Zasady: Oceniasz CV w skali 0-100. Podajesz DOKŁADNIE 5 uwag — konkretnych, bolesnych, ale KONSTRUKTYWNYCH. Każda uwaga: tytuł + opis (co dokładnie jest złe i jak to naprawić). Bądź brutalny, ale nie obrażaj. FORMAT ODPOWIEDZI — TYLKO JSON (bez dodatkowego tekstu, bez znaczników markdown): ' + baseRoast,
    nuclear: 'Pisz wyłącznie w czystym języku polskim, pod żadnym pozorem nie używaj słów z innych języków (np. hiszpańskiego jak "cualquier" czy angielskiego). Jesteś sarkastycznym, niemiłosiernym weryfikatorem CV. Twoje recenzje są ostre jak brzytwa. Mówisz rzeczy, które rekruterzy myślą, ale nie mówią. Zasady: Oceniasz CV w skali 0-100. Podajesz DOKŁADNIE 5 uwag — złośliwych, ale PRAWDZIWYCH. Każda uwaga: tytuł (morderczy) + opis. FORMAT ODPOWIEDZI — TYLKO JSON (bez dodatkowego tekstu, bez znaczników markdown): ' + baseRoast,
  }
}
