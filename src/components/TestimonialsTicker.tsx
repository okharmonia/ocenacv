'use client'

import Image from 'next/image'

interface Testimonial {
  id: number
  name: string
  role: string
  rating: number
  text: string
  avatar: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    id: 1,
    name: 'Jan Kowalski',
    role: 'Frontend Developer',
    rating: 5,
    text: 'Po zmianach z gen-cv dostałem 3 zaproszenia na rozmowę w jeden tydzień! Wcześniej była cisza.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'Kasia Nowak',
    role: 'UX/UI Designer',
    rating: 5,
    text: 'Brutalny test, ale otworzył mi oczy. Poprawiłam sekcję o projektach i to działa rewelacyjnie!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'Michał Wiśniewski',
    role: 'Python Developer',
    rating: 5,
    text: 'Wskazówki dotyczące formatowania pod ATS to złoto. Moje CV wreszcie przechodzi automatyczną selekcję.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 4,
    name: 'Ola Wójcik',
    role: 'Project Manager',
    rating: 5,
    text: 'Genialne narzędzie. W 10 sekund dostałam gotową listę błędów, które robiłam w CV od lat.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 5,
    name: 'Piotr Kamiński',
    role: 'DevOps Engineer',
    rating: 5,
    text: 'Ocena 34/100 na tym szablonie zabolała, ale po poprawkach mam już nową pracę. Polecam wszystkim!',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 6,
    name: 'Karolina Lewandowska',
    role: 'QA Engineer',
    rating: 5,
    text: 'Darmowe, szybkie i bez rejestracji. Otrzymałam konkretne uwagi bez owijania w bawełnę.',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 7,
    name: 'Mateusz Zieliński',
    role: 'Data Analyst',
    rating: 5,
    text: 'Super sprawa z tym porównaniem przed/po. Od razu widać, jak pisać o swoich osiągnięciach.',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 8,
    name: 'Ania Szymańska',
    role: 'Marketing Specialist',
    rating: 5,
    text: 'Dzięki audytowi zmieniłam nudne opisy na język korzyści. Rekruterzy sami piszą na LinkedIn!',
    avatar: 'https://images.unsplash.com/photo-1489424900224-723b89d9707b?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 9,
    name: 'Tomek Dąbrowski',
    role: 'Product Owner',
    rating: 5,
    text: 'Wskaźnik przejrzystości CV otworzył mi oczy na to, jak rekruterzy czytają dokument w 6 sekund.',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 10,
    name: 'Monika Kozłowska',
    role: 'HR Specialist',
    rating: 5,
    text: 'Jako rekruter potwierdzam – uwagi z tego audytu to dokładnie to, na co zwracamy uwagę przy selekcji.',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=face'
  }
]

export function TestimonialsTicker() {
  // Duplicate testimonials array to create a seamless infinite loop
  const duplicatedList = [...TESTIMONIALS, ...TESTIMONIALS]

  return (
    <section className="bg-[#090F19] py-8 border-y border-white/5 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-4">
        <p className="text-center text-xs font-semibold text-[#EA580C] uppercase tracking-wider">
          Opinie naszych użytkowników
        </p>
      </div>
      
      <div className="relative w-full flex items-center">
        {/* Left & Right gradient masks for smooth fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-r from-[#090F19] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 md:w-32 bg-gradient-to-l from-[#090F19] to-transparent z-10 pointer-events-none" />

        {/* Marquee list flying Left to Right (reverse) */}
        <div className="animate-marquee-reverse gap-6 py-2 flex">
          {duplicatedList.map((item, index) => (
            <div 
              key={`${item.id}-${index}`}
              className="bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-[#EA580C]/30 p-5 rounded-2xl w-[320px] shrink-0 transition-all duration-300 shadow-md flex flex-col justify-between"
            >
              <div className="flex gap-3.5 items-start">
                <div className="relative w-11 h-11 rounded-full overflow-hidden border border-white/10 shrink-0 bg-slate-800">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col">
                  <h4 className="font-bold text-sm text-white leading-tight">{item.name}</h4>
                  <span className="text-[11px] text-slate-400 font-medium">{item.role}</span>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <span key={i} className="text-[11px] text-yellow-500">★</span>
                    ))}
                  </div>
                </div>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed font-medium mt-3">
                "{item.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
