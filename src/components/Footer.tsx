export function Footer() {
  return (
    <footer className="py-10 text-center" style={{ background: '#0F172A' }}>
      <div className="container-ocena">
        <div className="flex items-center justify-center gap-2 mb-2">
          <img src="/ocena.webp" alt="OceńCV.pl" className="h-6 w-auto object-contain" />
          <span className="font-bold text-lg text-white tracking-tighter">OceńCV.pl</span>
        </div>
        <p className="text-xs mb-6" style={{ color: '#64748B' }}>
          Bezpłatna ocena CV · Powered by AI
        </p>
        <div className="flex items-center justify-center gap-6 text-xs" style={{ color: '#475569' }}>
          <a href="/privacy" className="hover:text-slate-300 transition-colors underline underline-offset-2">
            Polityka prywatności
          </a>
          <span>·</span>
          <a
            href="https://gen-cv.pl"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-slate-300 transition-colors underline underline-offset-2"
          >
            gen-cv.pl
          </a>
        </div>
        <p className="text-[11px] mt-6" style={{ color: '#475569' }}>
          &copy; {new Date().getFullYear()} ocenacv.pl · Wszelkie prawa zastrzeżone
        </p>
      </div>
    </footer>
  )
}
