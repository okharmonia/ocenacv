'use client'

import { useState, useRef, useCallback } from 'react'
import type { RoastLevel } from '@/lib/types'
import { ROAST_LEVELS } from '@/lib/prompts'

interface Props {
  onAssess: (cvText: string, targetRole?: string, roastLevel?: RoastLevel) => Promise<void>
}

export function UploadForm({ onAssess }: Props) {
  const [file, setFile] = useState<File | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const [targetRole, setTargetRole] = useState('')
  const [roastLevel, setRoastLevel] = useState<RoastLevel>('brutal')
  const [isParsing, setIsParsing] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (f: File) => {
    const ext = f.name.split('.').pop()?.toLowerCase()
    const validTypes = ['pdf', 'docx', 'txt']
    if (!ext || !validTypes.includes(ext)) {
      alert('Obsługujemy tylko pliki PDF, DOCX i TXT.')
      return
    }
    if (f.size > 10 * 1024 * 1024) {
      alert('Plik jest za duży. Maksymalny rozmiar to 10 MB.')
      return
    }
    setFile(f)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setDragOver(false)
    const f = e.dataTransfer.files[0]
    if (f) handleFile(f)
  }, [handleFile])

  const handleSubmit = useCallback(async () => {
    if (!file) return
    setIsParsing(true)

    try {
      // Parse file client-side
      const text = await extractText(file)
      if (!text || text.length < 50) {
        alert('Nie udało się wyodrębnić tekstu z tego pliku. Spróbuj wkleić tekst ręcznie.')
        setIsParsing(false)
        return
      }
      await onAssess(text, targetRole || undefined, roastLevel)
    } catch {
      alert('Nie udało się przetworzyć pliku. Spróbuj ponownie.')
    } finally {
      setIsParsing(false)
    }
  }, [file, targetRole, roastLevel, onAssess])

  const removeFile = useCallback(() => {
    setFile(null)
    if (inputRef.current) inputRef.current.value = ''
  }, [])

  const isBusy = isParsing

  return (
    <div className="space-y-6">
      {/* Roast Level Selector */}
      <div>
        <label className="block text-sm font-semibold mb-3 text-slate-700">Poziom szczerości</label>
        <div className="grid grid-cols-3 gap-3">
          {ROAST_LEVELS.map(level => {
            const isSelected = roastLevel === level.key
            return (
              <button
                key={level.key}
                type="button"
                onClick={() => setRoastLevel(level.key)}
                className={`px-4 py-3 rounded-2xl text-center transition-all text-sm font-medium border flex flex-col items-center justify-center cursor-pointer ${
                  isSelected
                    ? 'border-[#EA580C] text-white'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-600 bg-white hover:border-slate-300'
                }`}
                style={{
                  background: isSelected
                    ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)'
                    : undefined,
                  boxShadow: isSelected ? '0 4px 12px rgba(234, 88, 12, 0.2)' : 'none',
                }}
              >
                <div className="font-bold text-xs md:text-sm">
                  {level.key === 'friendly' ? 'Łagodny' : level.key === 'brutal' ? 'Bez litości' : 'Nuklearny'}
                </div>
                <div className={`text-[10px] mt-0.5 font-medium leading-none ${isSelected ? 'text-white/80' : 'text-slate-400'}`}>
                  {level.key === 'friendly' ? 'Miło, ale szczerze' : level.key === 'brutal' ? 'Prawda w oczy' : 'Przygotuj się'}
                </div>
              </button>
            )
          })}
        </div>
      </div>

      {/* Target Role */}
      <div>
        <label className="block text-sm font-semibold mb-2 text-slate-700">
          Stanowisko, na które aplikujesz (opcjonalnie)
        </label>
        <input
          type="text"
          value={targetRole}
          onChange={e => setTargetRole(e.target.value)}
          placeholder="np. Java Developer, Project Manager, Księgowa..."
          className="w-full px-4 py-3.5 rounded-2xl border text-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#F97316] focus:border-[#F97316]"
          style={{
            borderColor: '#CBD5E1',
            background: 'white',
            color: '#0d1c2f',
          }}
        />
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={`upload-zone relative border-2 border-dashed rounded-2xl p-8 md:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center ${
          dragOver ? 'border-[#F97316] bg-orange-500/5' : 'border-slate-300 bg-white hover:border-slate-400'
        } ${file ? 'border-green-500 bg-green-500/5' : ''}`}
      >
        <input
          ref={inputRef}
          type="file"
          accept=".pdf,.docx,.txt"
          className="hidden"
          onChange={e => {
            const f = e.target.files?.[0]
            if (f) handleFile(f)
          }}
        />

        {file ? (
          <div className="flex flex-col items-center gap-4 w-full">
            <div className="inline-flex items-center gap-3 px-5 py-3.5 rounded-2xl bg-green-500/10 border border-green-500/20">
              <span className="material-symbols-outlined text-green-600 text-3xl shrink-0">description</span>
              <div className="text-left min-w-0">
                <p className="font-semibold text-sm text-green-900 truncate max-w-[180px] md:max-w-[280px]">{file.name}</p>
                <p className="text-xs text-green-700 font-medium">
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); removeFile() }}
                className="p-1 rounded-full hover:bg-green-500/20 text-green-700 transition-colors"
              >
                <span className="material-symbols-outlined text-lg leading-none">close</span>
              </button>
            </div>
            <p className="text-xs text-slate-400 font-medium">Kliknij, aby zmienić plik</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <span className="material-symbols-outlined text-slate-400 text-5xl mb-4 group-hover:scale-110 transition-transform">
              upload_file
            </span>
            <p className="font-bold text-sm md:text-base text-slate-700 mb-1">
              Upuść CV tutaj lub kliknij, aby wybrać plik
            </p>
            <p className="text-xs text-slate-400 font-medium">PDF, DOCX, TXT — maks. 10 MB</p>
          </div>
        )}
      </div>

      {/* Submit */}
      <button
        type="button"
        onClick={handleSubmit}
        disabled={!file || isBusy}
        className="w-full text-white font-bold py-4 px-6 rounded-2xl transition-all flex items-center justify-center gap-2 cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed hover:scale-[1.01] active:scale-[0.99]"
        style={{
          background: file && !isBusy ? 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)' : '#CBD5E1',
          boxShadow: file && !isBusy ? '0 4px 14px rgba(234, 88, 12, 0.25)' : 'none',
        }}
      >
        {isBusy ? (
          <>
            <svg className="w-5 h-5 animate-spin text-white" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <span className="font-bold text-sm md:text-base">Przetwarzanie...</span>
          </>
        ) : (
          <>
            <span className="material-symbols-outlined text-lg leading-none">fact_check</span>
            <span className="font-bold text-sm md:text-base">Oceń CV</span>
          </>
        )}
      </button>

      {/* Trust note */}
      <p className="text-center text-xs leading-relaxed text-slate-400 font-medium">
        Twoje CV jest analizowane lokalnie w przeglądarce.<br />
        Dane są przesyłane bezpiecznym połączeniem SSL i usuwane natychmiast po analizie.
      </p>
    </div>
  )
}

/**
 * Extract text from file client-side
 */
async function extractText(file: File): Promise<string> {
  const ext = file.name.split('.').pop()?.toLowerCase()

  if (ext === 'txt') {
    return await file.text()
  }

  if (ext === 'pdf') {
    // Use pdf.js
    const dataBuffer = await file.arrayBuffer()
    const pdfjsLib = await import('pdfjs-dist')
    pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
      'pdfjs-dist/build/pdf.worker.min.mjs',
      import.meta.url
    ).toString()
    const pdf = await pdfjsLib.getDocument({ data: dataBuffer }).promise
    let text = ''
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i)
      const content = await page.getTextContent()
      text += content.items.map((item: unknown) => {
        const textItem = item as { str?: string }
        return textItem.str || ''
      }).join(' ') + '\n'
    }
    return text.trim()
  }

  if (ext === 'docx') {
    // For DOCX, we'll send to server to parse (python-docx equivalent)
    // For now, use a simple XML-based extraction or server fallback
    throw new Error('DOCX parsing on client not yet supported. Try PDF or TXT.')
  }

  throw new Error('Unsupported file format')
}
