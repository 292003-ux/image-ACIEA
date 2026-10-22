import { describe, expect, it } from 'vitest'
import { lexical } from '../../scripts/lexical'

describe('seed markdown → lexical', () => {
  it('builds headings, lists, links and bold text', () => {
    const doc = lexical(
      '## Titre\n\nTexte **gras** et [lien](https://example.org).\n\n- un\n- deux',
    ) as {
      root: {
        children: { type: string; tag?: string; children: { type: string; format?: number }[] }[]
      }
    }
    const [h, p, list] = doc.root.children
    expect(h?.type).toBe('heading')
    expect(h?.tag).toBe('h2')
    expect(p?.children.some((c) => c.type === 'link')).toBe(true)
    expect(p?.children.some((c) => c.format === 1)).toBe(true)
    expect(list?.type).toBe('list')
    expect(list?.children).toHaveLength(2)
  })
})
