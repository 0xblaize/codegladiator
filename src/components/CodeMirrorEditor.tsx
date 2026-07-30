'use client'

import { useMemo } from 'react'
import CodeMirror from '@uiw/react-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'

type CodeMirrorEditorProps = { value: string; onChange: (value: string) => void }

export function CodeMirrorEditor({ value, onChange }: CodeMirrorEditorProps) {
  const extensions = useMemo(() => [javascript({ typescript: true })], [])
  return <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#090b10]"><div className="flex items-center justify-between border-b border-white/10 px-4 py-3 text-xs"><span className="font-medium text-white/70">TypeScript solution</span><span className="text-amber-100/70">Local editor</span></div><CodeMirror value={value} height="320px" theme={oneDark} extensions={extensions} onChange={onChange} basicSetup={{ lineNumbers: true, foldGutter: false, autocompletion: true }} /></div>
}
