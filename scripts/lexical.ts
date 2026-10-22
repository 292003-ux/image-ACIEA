/**
 * Minimal Markdown-like → Lexical JSON converter used by the seed script.
 * Supports: "## " / "### " headings, "- " bullet lists, "> " quotes,
 * **bold** and [label](https://url) inline links, blank-line paragraphs.
 */
type Node = Record<string, unknown>

const base = { format: '', indent: 0, version: 1, direction: 'ltr' as const }

function textNode(text: string, format = 0): Node {
  return { type: 'text', text, format, style: '', mode: 'normal', detail: 0, version: 1 }
}

function inline(src: string): Node[] {
  const out: Node[] = []
  const re = /\*\*(.+?)\*\*|\[(.+?)\]\((https?:\/\/[^\s)]+)\)/g
  let last = 0
  let m: RegExpExecArray | null
  while ((m = re.exec(src))) {
    if (m.index > last) out.push(textNode(src.slice(last, m.index)))
    if (m[1]) out.push(textNode(m[1], 1))
    else if (m[2] && m[3]) {
      out.push({
        type: 'link',
        ...base,
        fields: { url: m[3], newTab: true, linkType: 'custom' },
        children: [textNode(m[2])],
      })
    }
    last = m.index + m[0].length
  }
  if (last < src.length) out.push(textNode(src.slice(last)))
  return out
}

export function lexical(markdown: string) {
  const blocks = markdown.trim().split(/\n\s*\n/)
  const children: Node[] = []
  for (const block of blocks) {
    const lines = block.split('\n').map((l) => l.trim())
    if (lines.every((l) => l.startsWith('- '))) {
      children.push({
        type: 'list',
        ...base,
        listType: 'bullet',
        tag: 'ul',
        start: 1,
        children: lines.map((l, i) => ({
          type: 'listitem',
          ...base,
          value: i + 1,
          children: inline(l.slice(2)),
        })),
      })
    } else if (lines[0]?.startsWith('### ')) {
      children.push({
        type: 'heading',
        ...base,
        tag: 'h3',
        children: inline(lines.join(' ').slice(4)),
      })
    } else if (lines[0]?.startsWith('## ')) {
      children.push({
        type: 'heading',
        ...base,
        tag: 'h2',
        children: inline(lines.join(' ').slice(3)),
      })
    } else if (lines[0]?.startsWith('> ')) {
      children.push({
        type: 'quote',
        ...base,
        children: inline(lines.map((l) => l.replace(/^>\s?/, '')).join(' ')),
      })
    } else {
      children.push({
        type: 'paragraph',
        ...base,
        textFormat: 0,
        children: inline(lines.join(' ')),
      })
    }
  }
  return { root: { type: 'root', ...base, children } } as never
}
