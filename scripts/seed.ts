/**
 * Idempotent CMS initialisation:
 *   pnpm seed
 * Creates/updates verified institutional content (FR + EN), media and an optional
 * first super administrator (SEED_ADMIN_EMAIL / SEED_ADMIN_PASSWORD).
 * Re-running it updates seeded documents without duplicating them.
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import { getPayload, type Payload } from 'payload'
import config from '../src/payload.config'
import { lexical } from './lexical'
import * as C from './seed-content'

const PHOTOS = path.resolve(process.cwd(), 'assets/source/photos')
const ctx = { skipAudit: true }

async function upsert<
  T extends
    | 'domains'
    | 'projects'
    | 'news'
    | 'partners'
    | 'faqs'
    | 'pages'
    | 'events'
    | 'team-members'
    | 'impact-metrics',
>(
  payload: Payload,
  collection: T,
  where: Record<string, unknown>,
  fr: Record<string, unknown>,
  en: Record<string, unknown>,
  status: 'published' | 'draft' = 'published',
) {
  const existing = await payload.find({
    collection,
    where: where as never,
    limit: 1,
    depth: 0,
    draft: true,
  })
  const common = { _status: status, reviewStatus: status === 'published' ? 'approved' : 'draft' }
  let id: number | string
  if (existing.docs[0]) {
    id = existing.docs[0].id
    await payload.update({
      collection,
      id,
      locale: 'fr',
      data: { ...fr, ...common } as never,
      context: ctx,
      draft: status === 'draft',
    })
  } else {
    const doc = await payload.create({
      collection,
      locale: 'fr',
      data: { ...fr, ...common } as never,
      context: ctx,
      draft: status === 'draft',
    })
    id = doc.id
  }
  await payload.update({
    collection,
    id,
    locale: 'en',
    data: { ...en, ...common } as never,
    context: ctx,
    draft: status === 'draft',
  })
  return id
}

async function seedMedia(payload: Payload) {
  const ids: Record<string, number> = {}
  for (const m of C.MEDIA) {
    const filePath = path.join(PHOTOS, m.file)
    if (!fs.existsSync(filePath)) {
      payload.logger.warn(`Missing photo ${m.file}, skipped`)
      continue
    }
    const existing = await payload.find({
      collection: 'media',
      where: { seedKey: { equals: m.key } } as never,
      limit: 1,
    })
    const data = {
      alt: m.alt.fr,
      caption: m.caption?.fr,
      provenance: m.provenance,
      showInGallery: !!m.gallery,
      credit: 'ACIEA',
      seedKey: m.key,
    }
    let id: number
    if (existing.docs[0]) {
      id = existing.docs[0].id as number
      await payload.update({
        collection: 'media',
        id,
        locale: 'fr',
        data: data as never,
        context: ctx,
      })
    } else {
      const doc = await payload.create({
        collection: 'media',
        locale: 'fr',
        data: data as never,
        filePath,
        context: ctx,
      })
      id = doc.id as number
    }
    await payload.update({
      collection: 'media',
      id,
      locale: 'en',
      data: { alt: m.alt.en, caption: m.caption?.en } as never,
      context: ctx,
    })
    ids[m.key] = id
  }
  return ids
}

/** Imports one photo (idempotent, keyed by file name). */
async function ensureMedia(
  payload: Payload,
  file: string,
  alt: { fr: string; en: string },
  gallery = false,
) {
  const filePath = path.join(PHOTOS, file)
  if (!fs.existsSync(filePath)) return undefined
  const key = `file:${file}`
  const existing = await payload.find({
    collection: 'media',
    where: { seedKey: { equals: key } } as never,
    limit: 1,
  })
  const data = {
    alt: alt.fr,
    provenance: 'official',
    showInGallery: gallery,
    credit: 'ACIEA',
    seedKey: key,
  }
  const id = existing.docs[0]
    ? (
        await payload.update({
          collection: 'media',
          id: existing.docs[0].id,
          locale: 'fr',
          data: data as never,
          context: ctx,
        })
      ).id
    : (
        await payload.create({
          collection: 'media',
          locale: 'fr',
          data: data as never,
          filePath,
          context: ctx,
        })
      ).id
  await payload.update({
    collection: 'media',
    id,
    locale: 'en',
    data: { alt: alt.en } as never,
    context: ctx,
  })
  return id as number
}

async function main() {
  const payload = await getPayload({ config })
  payload.logger.info('Seeding ACIEA content…')

  // 1. Admin
  const email = process.env.SEED_ADMIN_EMAIL
  const password = process.env.SEED_ADMIN_PASSWORD
  if (email && password) {
    const found = await payload.find({
      collection: 'users',
      where: { email: { equals: email } },
      limit: 1,
    })
    if (!found.docs[0]) {
      await payload.create({
        collection: 'users',
        data: { email, password, name: 'Super administrateur', role: 'superadmin' },
        context: ctx,
      })
      payload.logger.info(`Super administrator created: ${email}`)
    }
  } else {
    payload.logger.info('No SEED_ADMIN_EMAIL/SEED_ADMIN_PASSWORD: create the first user at /admin.')
  }

  // 2. Media
  const media = await seedMedia(payload)

  // 3. Settings
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'fr',
    context: ctx,
    data: {
      organizationName: C.SETTINGS.organizationName.fr,
      shortName: 'ACIEA',
      tagline: C.SETTINGS.tagline.fr,
      description: C.SETTINGS.description.fr,
      legalStatus: C.SETTINGS.legalStatus.fr,
      country: C.SETTINGS.country.fr,
      address: C.SETTINGS.address.fr,
      dataController: C.SETTINGS.dataController.fr,
      defaultMetaTitle: C.SETTINGS.defaultMetaTitle.fr,
      defaultMetaDescription: C.SETTINGS.defaultMetaDescription.fr,
      logo: media.logo,
      foundedYear: 2024,
      email: C.SETTINGS.email,
      phone: C.SETTINGS.phone,
      city: 'Ouagadougou',
      // City-level position of Ouagadougou (not a street address).
      hqLatitude: 12.3714,
      hqLongitude: -1.5197,
      socials: [
        { platform: 'facebook', url: C.FB_URL, verified: true },
        { platform: 'linkedin', url: C.LINKEDIN_URL, verified: true },
      ],
      dataRetentionMonths: 24,
      englishValidated: false,
    },
  })
  await payload.updateGlobal({
    slug: 'site-settings',
    locale: 'en',
    context: ctx,
    data: {
      organizationName: C.SETTINGS.organizationName.en,
      tagline: C.SETTINGS.tagline.en,
      description: C.SETTINGS.description.en,
      legalStatus: C.SETTINGS.legalStatus.en,
      country: C.SETTINGS.country.en,
      address: C.SETTINGS.address.en,
      dataController: C.SETTINGS.dataController.en,
      defaultMetaTitle: C.SETTINGS.defaultMetaTitle.en,
      defaultMetaDescription: C.SETTINGS.defaultMetaDescription.en,
    },
  })

  // 4. Domains
  const domainIds: Record<string, number | string> = {}
  for (const [i, d] of C.DOMAINS.entries()) {
    const shared = { slug: d.slug, icon: d.icon, order: i + 1 }
    domainIds[d.slug] = await upsert(
      payload,
      'domains',
      { slug: { equals: d.slug } },
      {
        ...shared,
        title: d.title.fr,
        summary: d.summary.fr,
        body: lexical(d.body.fr),
        focusPoints: d.points.fr.map((text) => ({ text })),
      },
      {
        title: d.title.en,
        summary: d.summary.en,
        body: lexical(d.body.en),
        focusPoints: d.points.en.map((text) => ({ text })),
      },
    )
  }

  // 5. Partner
  const g = C.GWP_PARTNER
  const gwpId = await upsert(
    payload,
    'partners',
    { slug: { equals: g.slug } },
    {
      slug: g.slug,
      name: g.name.fr,
      acronym: g.acronym.fr,
      website: g.website,
      category: g.category,
      agreementType: g.agreementType.fr,
      agreementDate: g.agreementDate,
      description: g.description.fr,
      collaborationAreas: g.areas.fr.map((text) => ({ text })),
      sourceUrl: g.sourceUrl,
      order: 1,
    },
    {
      name: g.name.en,
      acronym: g.acronym.en,
      agreementType: g.agreementType.en,
      description: g.description.en,
      collaborationAreas: g.areas.en.map((text) => ({ text })),
    },
  )

  for (const [i, op] of C.OTHER_PARTNERS.entries()) {
    await upsert(
      payload,
      'partners',
      { slug: { equals: op.slug } },
      {
        slug: op.slug,
        name: op.name.fr,
        category: 'institutional',
        description: op.description.fr,
        order: 2 + i,
      },
      { name: op.name.en, description: op.description.en },
    )
  }

  // 6. News
  const newsIds: Record<string, number | string> = {}
  for (const n of C.NEWS) {
    newsIds[n.slug] = await upsert(
      payload,
      'news',
      { slug: { equals: n.slug } },
      {
        slug: n.slug,
        title: n.title.fr,
        excerpt: n.excerpt.fr,
        content: lexical(n.content.fr),
        category: n.category,
        publishedAt: n.publishedAt,
        coverImage: n.cover ? media[n.cover] : undefined,
        sourceUrl: n.sourceUrl,
        authorName: 'ACIEA',
        reviewNotes: n.reviewNote,
      },
      { title: n.title.en, excerpt: n.excerpt.en, content: lexical(n.content.en) },
      n.draft ? 'draft' : 'published',
    )
  }

  // 7. Projects
  const P = C.PROJECTS
  const saagdoId = await upsert(
    payload,
    'projects',
    { slug: { equals: P.saagdo.slug } },
    {
      slug: P.saagdo.slug,
      status: P.saagdo.status,
      featured: true,
      domains: P.saagdo.domains.map((s) => domainIds[s]),
      title: P.saagdo.title.fr,
      excerpt: P.saagdo.excerpt.fr,
      context: lexical(P.saagdo.context.fr),
      objectives: P.saagdo.objectives.fr.map((text) => ({ text })),
      targetAudience: P.saagdo.audience.fr,
      activities: P.saagdo.activities.fr,
      achievements: P.saagdo.achievements.fr,
      location: {
        scope: P.saagdo.scope,
        country: 'Afrique de l’Ouest',
        coordinatesVerified: false,
      },
      partners: [gwpId],
      relatedNews: [newsIds['protocole-accord-gwp-afrique-de-l-ouest']],
      links: [{ label: 'Annonce officielle du GWP-AO', url: C.GWP_URL }],
    },
    {
      title: P.saagdo.title.en,
      excerpt: P.saagdo.excerpt.en,
      context: lexical(P.saagdo.context.en),
      objectives: P.saagdo.objectives.en.map((text) => ({ text })),
      targetAudience: P.saagdo.audience.en,
      activities: P.saagdo.activities.en,
      achievements: P.saagdo.achievements.en,
      links: [{ label: 'Official GWP-WA announcement', url: C.GWP_URL_EN }],
    },
  )
  await upsert(
    payload,
    'projects',
    { slug: { equals: P.camp.slug } },
    {
      slug: P.camp.slug,
      status: P.camp.status,
      featured: true,
      domains: P.camp.domains.map((s) => domainIds[s]),
      coverImage: media.camp,
      gallery: [media.camp, media.reboisement, media.plantation].filter(Boolean),
      title: P.camp.title.fr,
      excerpt: P.camp.excerpt.fr,
      context: lexical(P.camp.context.fr),
      objectives: P.camp.objectives.fr.map((text) => ({ text })),
      targetAudience: P.camp.audience.fr,
      activities: P.camp.activities.fr,
      achievements: P.camp.achievements.fr,
      startDate: P.camp.startDate,
      endDate: P.camp.endDate,
      // Coordinates intentionally left empty until validated by ACIEA.
      location: {
        scope: P.camp.scope,
        locality: P.camp.locality,
        // Commune-level position of Komsilga (Kadiogo), source: Wikipedia.
        region: C.KOMSILGA.region,
        country: 'Burkina Faso',
        latitude: C.KOMSILGA.latitude,
        longitude: C.KOMSILGA.longitude,
        coordinatesVerified: true,
      },
      relatedNews: [newsIds['camp-vacances-eco-citoyen-komsilga-2025']],
    },
    {
      title: P.camp.title.en,
      excerpt: P.camp.excerpt.en,
      context: lexical(P.camp.context.en),
      objectives: P.camp.objectives.en.map((text) => ({ text })),
      targetAudience: P.camp.audience.en,
      activities: P.camp.activities.en,
      achievements: P.camp.achievements.en,
    },
  )
  // Unpublished template to help editors document further projects.
  await upsert(
    payload,
    'projects',
    { slug: { equals: 'modele-fiche-projet' } },
    {
      slug: 'modele-fiche-projet',
      status: 'planned',
      title: 'Modèle de fiche projet — à dupliquer',
      excerpt:
        'Modèle non publié : dupliquez cette fiche, complétez chaque onglet avec des informations validées, puis soumettez-la à relecture.',
      objectives: [{ text: 'Objectif 1 (à compléter)' }],
      activities: [{ title: 'Activité (à compléter)', description: 'Description' }],
      achievements: [
        { text: 'Réalisation — cocher « vérifiée » uniquement avec une source', verified: false },
      ],
      location: { scope: 'local', country: 'Burkina Faso', coordinatesVerified: false },
    },
    { title: 'Project sheet template — duplicate me', excerpt: 'Unpublished template.' },
    'draft',
  )
  void saagdoId

  // Reforestation / National Tree Day 2025 (documented by the official page).
  const R = C.REFORESTATION
  await upsert(
    payload,
    'projects',
    { slug: { equals: R.slug } },
    {
      slug: R.slug,
      status: 'completed',
      featured: true,
      domains: [domainIds['biodiversite'], domainIds['education-engagement']],
      coverImage: media.reboisement,
      gallery: [media.reboisement, media.plantation, media.arbre].filter(Boolean),
      title: R.title.fr,
      excerpt: R.excerpt.fr,
      context: lexical(R.context.fr),
      achievements: R.achievements.fr,
      targetAudience: 'Membres et jeunes de l’Alliance.',
      location: { scope: 'national', country: 'Burkina Faso', coordinatesVerified: false },
    },
    {
      title: R.title.en,
      excerpt: R.excerpt.en,
      context: lexical(R.context.en),
      achievements: R.achievements.en,
      targetAudience: 'Members and young people of the Alliance.',
    },
  )

  // WaterAid meeting: published with month precision (exact day not documented).
  const W = C.WATERAID_NEWS
  await upsert(
    payload,
    'news',
    { slug: { equals: W.slug } },
    {
      slug: W.slug,
      title: W.title.fr,
      excerpt: W.excerpt.fr,
      content: lexical(W.content.fr),
      category: 'institutional',
      publishedAt: W.publishedAt,
      datePrecision: 'month',
      coverImage: media.wateraid,
      sourceUrl: C.FB_URL,
      authorName: 'ACIEA',
      reviewNotes: 'Jour exact non documenté : date affichée au mois (mai 2025).',
    },
    { title: W.title.en, excerpt: W.excerpt.en, content: lexical(W.content.en) },
  )

  // Executive office (confirmed by ACIEA). Any other profile is unpublished.
  for (const [i, m] of C.TEAM.entries()) {
    const photo = m.file
      ? await ensureMedia(payload, m.file, {
          fr: `Portrait de ${m.name}`,
          en: `Portrait of ${m.name}`,
        })
      : null
    if (photo && m.focal) {
      await payload.update({
        collection: 'media',
        id: photo,
        data: { focalX: m.focal.x, focalY: m.focal.y },
        context: ctx,
      })
    }
    await upsert(
      payload,
      'team-members',
      { name: { equals: m.name } },
      {
        name: m.name,
        position: m.position.fr,
        group: 'executive',
        photo,
        consentToPublish: true,
        order: i + 1,
        reviewNotes: m.file ? '' : 'Portrait à fournir.',
      },
      { position: m.position.en },
    )
  }
  const others = await payload.find({
    collection: 'team-members',
    where: {
      and: [
        { name: { not_in: C.TEAM.map((m) => m.name) } },
        { consentToPublish: { equals: true } },
      ],
    },
    limit: 200,
    depth: 0,
  })
  for (const doc of others.docs) {
    await payload.update({
      collection: 'team-members',
      id: doc.id,
      data: { consentToPublish: false },
      context: ctx,
    })
  }

  // Documented counts (sources: official Facebook page, GWP-WA announcement).
  for (const [i, m] of C.METRICS.entries()) {
    await upsert(
      payload,
      'impact-metrics',
      { order: { equals: i + 1 } },
      {
        label: m.label.fr,
        value: m.value,
        period: m.period.fr,
        icon: m.icon,
        order: i + 1,
        sourceUrl: m.sourceUrl,
        verifiedBy: 'Comptage d’après les publications officielles, confirmé par l’ACIEA',
        verificationDate: '2026-10-22T12:00:00.000Z',
      },
      { label: m.label.en, period: m.period.en },
    )
  }

  // 8. Events (past, documented)
  await upsert(
    payload,
    'events',
    { slug: { equals: 'camp-vacances-eco-citoyen-2025' } },
    {
      slug: 'camp-vacances-eco-citoyen-2025',
      title: 'Camp Vacances Éco-Citoyen 2025',
      summary: 'Sept jours de formation et d’action pour les jeunes à Komsilga.',
      startDate: '2025-09-02T08:00:00.000Z',
      endDate: '2025-09-08T18:00:00.000Z',
      location: 'Komsilga, Burkina Faso',
      format: 'in-person',
      coverImage: media.camp,
      relatedNews: newsIds['camp-vacances-eco-citoyen-komsilga-2025'],
    },
    {
      title: 'Eco-Citizen Holiday Camp 2025',
      summary: 'Seven days of training and action for young people in Komsilga.',
      location: 'Komsilga, Burkina Faso',
    },
  )
  await upsert(
    payload,
    'events',
    { slug: { equals: 'signature-protocole-gwp-ao' } },
    {
      slug: 'signature-protocole-gwp-ao',
      title: 'Signature du protocole d’accord ACIEA – GWP Afrique de l’Ouest',
      summary:
        'Signature au Secrétariat du GWP-AO à Ouagadougou d’un protocole d’accord autour de l’eau, du climat et de l’innovation numérique.',
      startDate: '2026-07-03T09:00:00.000Z',
      location: 'Secrétariat du GWP-AO, Ouagadougou',
      format: 'in-person',
      relatedNews: newsIds['protocole-accord-gwp-afrique-de-l-ouest'],
    },
    {
      title: 'Signing of the ACIEA – GWP West Africa MoU',
      summary:
        'Signing at the GWP-WA Secretariat in Ouagadougou of an MoU on water, climate and digital innovation.',
      location: 'GWP-WA Secretariat, Ouagadougou',
    },
  )

  // 9. FAQs
  for (const [i, f] of C.FAQS.entries()) {
    await upsert(
      payload,
      'faqs',
      { and: [{ scope: { equals: f.scope } }, { order: { equals: i } }] },
      { question: f.q.fr, answer: f.a.fr, scope: f.scope, order: i },
      { question: f.q.en, answer: f.a.en },
    )
  }

  // 10. Legal pages
  for (const p of C.PAGES) {
    await upsert(
      payload,
      'pages',
      { slug: { equals: p.slug } },
      { slug: p.slug, title: p.title.fr, intro: p.intro.fr, content: lexical(p.content.fr) },
      { title: p.title.en, intro: p.intro.en, content: lexical(p.content.en) },
    )
  }

  // 11. Page globals
  const H = C.HOMEPAGE
  const published = { _status: 'published' as const }
  await payload.updateGlobal({
    slug: 'homepage',
    locale: 'fr',
    context: ctx,
    data: {
      ...published,
      hero: {
        eyebrow: H.hero.eyebrow.fr,
        title: H.hero.title.fr,
        subtitle: H.hero.subtitle.fr,
        image: media.arbre,
        mosaic: [media.camp, media.reboisement, media.cndd].filter(Boolean),
      },
      intro: {
        eyebrow: H.intro.eyebrow.fr,
        title: H.intro.title.fr,
        text: H.intro.text.fr,
        mission: H.intro.mission.fr,
        image: media.plantation,
        secondaryImage: media.mairie,
      },
      saagdo: { title: H.saagdo.title.fr, text: H.saagdo.text.fr },
      cta: { title: H.cta.title.fr, text: H.cta.text.fr },
    } as never,
  })
  await payload.updateGlobal({
    slug: 'homepage',
    locale: 'en',
    context: ctx,
    data: {
      ...published,
      hero: { eyebrow: H.hero.eyebrow.en, title: H.hero.title.en, subtitle: H.hero.subtitle.en },
      intro: {
        eyebrow: H.intro.eyebrow.en,
        title: H.intro.title.en,
        text: H.intro.text.en,
        mission: H.intro.mission.en,
      },
      saagdo: { title: H.saagdo.title.en, text: H.saagdo.text.en },
      cta: { title: H.cta.title.en, text: H.cta.text.en },
    } as never,
  })

  const A = C.ABOUT
  const president = await payload.find({
    collection: 'team-members',
    where: { name: { equals: C.TEAM[0]!.name } },
    limit: 1,
    depth: 0,
  })
  const aboutFr = {
    ...published,
    hero: {
      eyebrow: A.hero.eyebrow.fr,
      title: A.hero.title.fr,
      subtitle: A.hero.subtitle.fr,
      image: media.camp,
    },
    presentation: lexical(A.presentation.fr),
    presentationImage: media.arbre,
    historyIntro: lexical(A.historyIntro.fr),
    milestones: A.milestones.map((m) => ({
      date: m.date,
      datePrecision: m.precision,
      title: m.title.fr,
      description: m.description?.fr,
      sourceUrl: m.sourceUrl,
    })),
    mission: A.mission.fr,
    vision: A.vision.fr,
    values: A.values.map((v) => ({
      title: v.title.fr,
      description: v.description.fr,
      icon: v.icon,
    })),
    commitments: A.commitments.fr.map((text) => ({ text })),
    governance: lexical(A.governance.fr),
    presidentMessage: {
      enabled: true,
      text: C.PRESIDENT_MESSAGE.fr,
      author: president.docs[0]?.id ?? null,
    },
  }
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'fr',
    context: ctx,
    data: aboutFr as never,
  })
  const aboutCurrent = await payload.findGlobal({ slug: 'about-page', locale: 'fr', depth: 0 })
  await payload.updateGlobal({
    slug: 'about-page',
    locale: 'en',
    context: ctx,
    data: {
      ...published,
      hero: { eyebrow: A.hero.eyebrow.en, title: A.hero.title.en, subtitle: A.hero.subtitle.en },
      presentation: lexical(A.presentation.en),
      historyIntro: lexical(A.historyIntro.en),
      // Array rows keep their ids so that only localized fields change.
      milestones: (aboutCurrent.milestones ?? []).map((row, i) => ({
        ...row,
        title: A.milestones[i]?.title.en,
        description: A.milestones[i]?.description?.en,
      })),
      mission: A.mission.en,
      vision: A.vision.en,
      values: (aboutCurrent.values ?? []).map((row, i) => ({
        ...row,
        title: A.values[i]?.title.en,
        description: A.values[i]?.description.en,
      })),
      commitments: (aboutCurrent.commitments ?? []).map((row, i) => ({
        ...row,
        text: A.commitments.en[i],
      })),
      governance: lexical(A.governance.en),
      presidentMessage: { ...aboutCurrent.presidentMessage, text: C.PRESIDENT_MESSAGE.en },
    } as never,
  })

  const S = C.SAAGDO
  const cards = (
    list: {
      icon: string
      title: { fr: string; en: string }
      description: { fr: string; en: string }
    }[],
    l: 'fr' | 'en',
  ) => list.map((c) => ({ icon: c.icon, title: c.title[l], description: c.description[l] }))
  await payload.updateGlobal({
    slug: 'saagdo-page',
    locale: 'fr',
    context: ctx,
    data: {
      ...published,
      hero: { eyebrow: S.hero.eyebrow.fr, title: S.hero.title.fr, subtitle: S.hero.subtitle.fr },
      problemIntro: S.problemIntro.fr,
      problems: cards(S.problems, 'fr'),
      solutionIntro: S.solutionIntro.fr,
      components: cards(S.components, 'fr'),
      flow: cards(S.flow, 'fr'),
      partnershipText: S.partnershipText.fr,
      partnershipSourceUrl: C.GWP_URL,
      platformUrl: '',
      showDemo: true,
    } as never,
  })
  const saagdoCurrent = await payload.findGlobal({ slug: 'saagdo-page', locale: 'fr', depth: 0 })
  const relocalize = (rows: { id?: string | null }[] | null | undefined, src: typeof S.problems) =>
    (rows ?? []).map((row, i) => ({
      ...row,
      title: src[i]?.title.en,
      description: src[i]?.description.en,
    }))
  await payload.updateGlobal({
    slug: 'saagdo-page',
    locale: 'en',
    context: ctx,
    data: {
      ...published,
      hero: { eyebrow: S.hero.eyebrow.en, title: S.hero.title.en, subtitle: S.hero.subtitle.en },
      problemIntro: S.problemIntro.en,
      problems: relocalize(saagdoCurrent.problems, S.problems),
      solutionIntro: S.solutionIntro.en,
      components: relocalize(saagdoCurrent.components, S.components),
      flow: relocalize(saagdoCurrent.flow, S.flow),
      partnershipText: S.partnershipText.en,
    } as never,
  })

  payload.logger.info('Seed completed.')
  process.exit(0)
}

main().catch((error) => {
  console.error(error)
  process.exit(1)
})
