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
        <label className="block text-sm font-medium mb-3" style={{ color: '#475569' }}>Poziom szczerości</label>
        <div className="grid grid-cols-3 gap-2">
          {ROAST_LEVELS.map(level => (
            <button
              key={level.key}
              onClick={() => setRoastLevel(level.key)}
              className={`px-4 py-3 rounded-xl text-center transition-all text-sm font-medium ${
                roastLevel === level.key
                  ? 'ring-2 text-white'
                  : 'hover:bg-gray-50'
              }`}
              style={{
                background: roastLevel === level.key
                  ? 'linear-gradient(135deg, #F97316, #EA580C)'
                  : '#F8FAFC',
                borderColor: roastLevel === level.key ? '#F97316' : '#E2E8F0',
                borderWidth: 1,
                borderStyle: 'solid',
                color: roastLevel === level.key ? 'white' : '#475569',
              }}
            >
              <div className="font-semibold">{level.label}</div>
              <div className="text-[11px] mt-0.5" style={{ color: roastLevel === level.key ? 'rgba(255,255,255,0.8)' : '#94A3B8' }}>
                {level.subtitle}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Target Role */}
      <div>
        <label className="block text-sm font-medium mb-2" style={{ color: '#475569' }}>
          Stanowisko (opcjonalnie)
        </label>
        <input
          type="text"
          value={targetRole}
          onChange={e => setTargetRole(e.target.value)}
          placeholder="np. Programista Java, Księgowa, Project Manager..."
          className="w-full px-4 py-3 rounded-xl border text-sm transition-colors"
          style={{
            borderColor: '#E2E8F0',
            background: '#F8FAFC',
            color: '#334155',
          }}
        />
      </div>

      {/* Upload Zone */}
      <div
        onDragOver={e => { e.preventDefault(); setDragOver(true) }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !file && inputRef.current?.click()}
        className={`upload-zone ${dragOver ? 'drag-over' : ''} ${file ? 'has-file' : 'pulse'}`}
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
          <div className="flex flex-col items-center gap-4">
            <div className="inline-flex items-center gap-3 px-5 py-3 rounded-xl" style={{ background: '#F0FDF4' }}>
              <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
              <div className="text-left">
                <p className="font-medium text-sm text-green-800">{file.name}</p>
                <p className="text-xs" style={{ color: '#6B7280' }}>
                  {(file.size / 1024).toFixed(0)} KB
                </p>
              </div>
              <button
                onClick={(e) => { e.stopPropagation(); removeFile() }}
                className="p-1 rounded-full hover:bg-red-50 transition-colors"
              >
                <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <p className="text-xs" style={{ color: '#94A3B8' }}>Kliknij, aby zmienić plik</p>
          </div>
        ) : (
          <>
            <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5} style={{ color: '#94A3B8' }}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>
            <p className="font-medium mb-1" style={{ color: '#475569' }}>
              Upuść CV tutaj lub kliknij, aby wybrać plik
            </p>
            <p className="text-sm" style={{ color: '#94A3B8' }}>PDF, DOCX, TXT — maks. 10 MB</p>
          </>
        )}
      </div>

      {/* Submit */}
      <button
        onClick={handleSubmit}
        disabled={!file || isBusy}
        className="btn-primary w-full text-base py-4"
      >
        {isBusy ? (
          <>
            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Przetwarzanie...
          </>
        ) : (
          <>
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.746 3.746 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z" />
            </svg>
            Oceń CV
          </>
        )}
      </button>

      {/* Trust note */}
      <p className="text-center text-xs leading-relaxed" style={{ color: '#94A3B8' }}>
        Twoje CV jest analizowane lokalnie w przeglądarce.<br />
        Treść jest wysyłana do AI wyłącznie w celu analizy i nie jest przechowywana.
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
      text += content.items.map((item: any) => item.str).join(' ') + '\n'
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
