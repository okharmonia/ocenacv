import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Polityka prywatności — OceńCV.pl',
  robots: { index: false, follow: true },
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen" style={{ background: '#F1F5F9' }}>
      <div className="container-ocena section-padding">
        <a href="/" className="inline-flex items-center gap-2 text-sm font-medium mb-8 transition-colors" style={{ color: '#F97316' }}>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Powrót do strony głównej
        </a>

        <div className="card max-w-3xl mx-auto prose prose-sm">
          <h1 className="text-2xl font-bold mb-8">Polityka prywatności</h1>
          <p className="text-sm" style={{ color: '#64748B' }}>Ostatnia aktualizacja: lipiec 2026</p>

          <div className="space-y-6 mt-8 text-sm leading-relaxed" style={{ color: '#334155' }}>
            <section>
              <h2 className="text-lg font-bold mb-3">1. Administrator danych</h2>
              <p>Administratorem Twoich danych jest właściciel serwisu ocenacv.pl. W sprawach związanych z ochroną danych osobowych możesz się z nami skontaktować poprzez formularz kontaktowy na stronie.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">2. Jakie dane zbieramy?</h2>
              <p>OcenCV.pl został zaprojektowany z myślą o minimalnym zbieraniu danych:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Treść CV, którą przesyłasz — jest <strong>przetwarzana wyłącznie w pamięci</strong> podczas analizy i <strong>natychmiast usuwana</strong> po zakończeniu. Nie przechowujemy Twojego CV na serwerze.</li>
                <li>Adres IP — wykorzystywany wyłącznie do określenia kraju (dla statystyk) i nie jest przechowywany.</li>
                <li>Nie używamy plików cookie do celów śledzących.</li>
                <li>Nie zbieramy adresów email, imion ani innych danych osobowych.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">3. Przetwarzanie danych przez AI</h2>
              <p>Treść Twojego CV jest wysyłana do zewnętrznego dostawcy AI (OpenRouter) w celu przeprowadzenia analizy. Zgodnie z polityką OpenRouter, przesłane dane nie są wykorzystywane do trenowania modeli AI. Po zakończeniu analizy dane są natychmiast usuwane.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">4. Przechowywanie danych</h2>
              <p>OcenCV.pl <strong>nie przechowuje</strong> żadnych danych osobowych ani treści CV na serwerze. Cały proces odbywa się w pamięci operacyjnej i kończy się wraz z zamknięciem sesji przez użytkownika.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">5. Linki zewnętrzne</h2>
              <p>Strona zawiera link do serwisu <a href="https://gen-cv.pl" target="_blank" rel="noopener noreferrer" className="underline" style={{ color: '#F97316' }}>gen-cv.pl</a>, który jest oddzielnym serwisem i ma własną politykę prywatności. Nie ponosimy odpowiedzialności za praktyki prywatności serwisów zewnętrznych.</p>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">6. Twoje prawa</h2>
              <p>Zgodnie z RODO masz prawo do:</p>
              <ul className="list-disc pl-6 mt-2 space-y-1">
                <li>Dostępu do swoich danych (choć my ich nie przechowujemy)</li>
                <li>Sprostowania danych</li>
                <li>Usunięcia danych (które i tak nie są przechowywane)</li>
                <li>Ograniczenia przetwarzania</li>
                <li>Wniesienia skargi do Prezesa UODO</li>
              </ul>
            </section>

            <section>
              <h2 className="text-lg font-bold mb-3">7. Kontakt</h2>
              <p>W razie pytań dotyczących prywatności, skontaktuj się z nami poprzez kanały dostępne na stronie głównej.</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
