import type { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import { RichText as PayloadRichText } from '@payloadcms/richtext-lexical/react'
import { cn } from '@/lib/utils'

export function RichText({
  data,
  className,
}: {
  data: SerializedEditorState | null | undefined
  className?: string
}) {
  if (!data?.root?.children?.length) return null
  return <PayloadRichText data={data} className={cn('prose-aciea', className)} />
}

/** Plain text excerpt from Lexical JSON (used for meta descriptions & search snippets). */
export function lexicalToPlainText(
  data: SerializedEditorState | null | undefined,
  max = 300,
): string {
  if (!data?.root) return ''
  const out: string[] = []
  const walk = (node: { text?: string; children?: unknown[] }) => {
    if (typeof node.text === 'string') out.push(node.text)
    node.children?.forEach((c) => walk(c as typeof node))
    if (out.join(' ').length > max) return
  }
  walk(data.root as never)
  return out.join(' ').replace(/\s+/g, ' ').trim().slice(0, max)
}
