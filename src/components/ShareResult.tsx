'use client'

import { useState } from 'react'

interface Props {
  score: number
  oneLiner: string
  targetRole?: string
}

export function ShareResult({ score, oneLiner, targetRole }: Props) {
  const [isOpen, setIsOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const roleText = targetRole ? ` na stanowisko ${targetRole}` : ''
  const shareUrl = 'https://ocenacv.pl'
  const shareText = `Moje CV${roleText} otrzymało ocenę ${score}/100 na ocenacv.pl! 💀\n\nWerdykt AI: "${oneLiner}"\n\nSprawdź swoje CV bez rejestracji na ${shareUrl}`

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Ocena CV z ocenacv.pl',
          text: shareText,
          url: shareUrl,
        })
      } catch (err) {
        // user cancelled or fallback
        if ((err as Error).name !== 'AbortError') {
          setIsOpen(true)
        }
      }
    } else {
      setIsOpen(true)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(shareText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const whatsappUrl = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`
  const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`

  return (
    <div className="flex justify-center mt-6">
      <button
        onClick={handleShare}
        className="inline-flex items-center gap-2 border border-slate-200 hover:border-[#F97316] hover:text-[#F97316] text-slate-600 font-bold text-sm px-6 py-3 rounded-2xl shadow-sm hover:shadow-md transition-all cursor-pointer bg-white"
      >
        <span className="material-symbols-outlined text-lg">share</span>
        Udostępnij wynik znajomym
      </button>

      {isOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[200] flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-white border border-slate-100 rounded-3xl p-6 max-w-md w-full shadow-2xl relative text-left animate-fade-in-up">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer"
            >
              <span className="material-symbols-outlined">close</span>
            </button>

            <h3 className="font-bold text-lg text-slate-900 mb-2 flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-500">share</span>
              Udostępnij wynik
            </h3>
            <p className="text-slate-500 text-xs md:text-sm mb-4 leading-relaxed">
              Skopiuj poniższy tekst, aby wysłać go znajomym na WhatsAppie, Messengerze lub wstawić w post na Facebooku.
            </p>

            {/* Preview Box */}
            <div className="bg-slate-50 border border-slate-100 p-4 rounded-2xl text-xs md:text-sm text-slate-600 font-sans leading-relaxed mb-5 whitespace-pre-wrap select-all select-none">
              {shareText}
            </div>

            <div className="space-y-3">
              <button
                onClick={handleCopy}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer text-sm"
              >
                <span className="material-symbols-outlined text-lg">
                  {copied ? 'check_circle' : 'content_copy'}
                </span>
                {copied ? 'Skopiowano!' : 'Skopiuj tekst i link'}
              </button>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-slate-200 hover:border-green-500/20 hover:bg-green-50/35 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs md:text-sm transition-all"
                >
                  <span className="material-symbols-outlined text-green-500 text-lg">chat</span>
                  WhatsApp
                </a>
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 border border-slate-200 hover:border-blue-500/20 hover:bg-blue-50/35 text-slate-700 font-semibold py-2.5 px-4 rounded-xl text-xs md:text-sm transition-all"
                >
                  <span className="material-symbols-outlined text-blue-500 text-lg">public</span>
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
