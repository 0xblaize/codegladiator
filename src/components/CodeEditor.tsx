import { Braces, Play, RotateCcw } from 'lucide-react'

type CodeEditorProps = {
  code: string
  canSubmit: boolean
  onChange: (code: string) => void
  onSubmit: () => void
  onResetCode: () => void
}

export function CodeEditor({ code, canSubmit, onChange, onSubmit, onResetCode }: CodeEditorProps) {
  const lineCount = Math.max(code.split('\n').length, 1)

  return (
    <section className="liquid-glass overflow-hidden rounded-[1.75rem]" aria-labelledby="editor-title">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex size-9 items-center justify-center rounded-xl bg-cyan-300/15 text-cyan-200"><Braces size={17} /></div>
          <div><h2 id="editor-title" className="text-sm font-semibold text-white">Your solution</h2><p className="text-xs text-white/45">TypeScript · local editor</p></div>
        </div>
        <span className="rounded-full border border-amber-200/20 bg-amber-200/10 px-3 py-1.5 text-[11px] font-medium text-amber-100">Sandbox judge · simulated</span>
      </div>
      <div className="flex min-h-[280px] bg-[#07090d]/90 py-5 font-mono text-[13px] leading-6 sm:min-h-[330px]">
        <div className="w-12 shrink-0 select-none pr-3 text-right text-white/20" aria-hidden="true">{Array.from({ length: lineCount }, (_, index) => <div key={index}>{index + 1}</div>)}</div>
        <label className="sr-only" htmlFor="solution-code">TypeScript solution</label>
        <textarea id="solution-code" value={code} onChange={(event) => onChange(event.target.value)} spellCheck={false} className="code-editor-scrollbar min-h-[240px] flex-1 resize-none bg-transparent pr-5 text-cyan-50 outline-none placeholder:text-white/20 sm:min-h-[290px]" />
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-white/10 px-5 py-4">
        <button className="inline-flex min-h-11 items-center gap-2 rounded-full px-3 text-sm text-white/55 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70" type="button" onClick={onResetCode}><RotateCcw size={15} /> Reset code</button>
        <button className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-black transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:bg-white/15 disabled:text-white/35 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white" type="button" onClick={onSubmit} disabled={!canSubmit}><Play size={15} fill="currentColor" /> {canSubmit ? 'Submit solution' : 'Check in to submit'}</button>
      </div>
    </section>
  )
}
