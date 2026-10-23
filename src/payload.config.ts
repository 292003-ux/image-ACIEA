import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { nodemailerAdapter } from '@payloadcms/email-nodemailer'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { en } from '@payloadcms/translations/languages/en'
import { fr } from '@payloadcms/translations/languages/fr'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { isEditorOrAbove } from './access/roles'
import { collections } from './collections'
import { globals } from './globals'
import { purgeExpiredSubmissionsTask } from './jobs/purgeExpiredSubmissions'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

if (process.env.NODE_ENV === 'production' && (process.env.PAYLOAD_SECRET ?? '').length < 32) {
  // Fail fast rather than run with a weak signing secret.
  throw new Error('PAYLOAD_SECRET must be set to a random string of at least 32 characters.')
}

const smtpConfigured = Boolean(process.env.SMTP_HOST && process.env.SMTP_FROM)

export default buildConfig({
  serverURL,
  secret: process.env.PAYLOAD_SECRET || 'dev-only-secret-change-me-dev-only-secret',
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' — ACIEA Admin',
      robots: 'noindex, nofollow',
    },
    dateFormat: 'dd/MM/yyyy HH:mm',
    // No third-party avatar service (Gravatar) — keeps the CSP strict and protects privacy.
    avatar: 'default',
    components: {
      graphics: {
        Logo: '/components/admin/admin-brand#AdminLogo',
        Icon: '/components/admin/admin-brand#AdminIcon',
      },
      beforeLogin: ['/components/admin/admin-brand#AdminLoginPanel'],
      beforeDashboard: ['/components/admin/admin-brand#AdminWelcome'],
      beforeNavLinks: ['/components/admin/admin-brand#AdminNavBrand'],
      afterNavLinks: ['/components/admin/admin-brand#AdminViewSiteLink'],
    },
    importMap: { baseDir: path.resolve(dirname) },
  },
  collections,
  globals,
  editor: lexicalEditor(),
  localization: {
    locales: [
      { code: 'fr', label: 'Français' },
      { code: 'en', label: 'English' },
    ],
    defaultLocale: 'fr',
    fallback: true,
  },
  i18n: {
    supportedLanguages: { fr, en },
    fallbackLanguage: 'fr',
  },
  db: postgresAdapter({
    pool: { connectionString: process.env.DATABASE_URL || '' },
    migrationDir: path.resolve(dirname, 'migrations'),
    // Schema push is for local prototyping only; production relies on versioned migrations.
    push: process.env.PAYLOAD_DB_PUSH === 'true',
  }),
  email: smtpConfigured
    ? nodemailerAdapter({
        defaultFromAddress: process.env.SMTP_FROM as string,
        defaultFromName: process.env.SMTP_FROM_NAME || 'ACIEA',
        transportOptions: {
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT || 587),
          secure: process.env.SMTP_SECURE === 'true',
          auth: process.env.SMTP_USER
            ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASSWORD }
            : undefined,
        },
      })
    : undefined,
  upload: {
    limits: { fileSize: 15 * 1024 * 1024 },
    abortOnLimit: true,
  },
  graphQL: { disable: true },
  cors: [serverURL],
  csrf: [serverURL],
  sharp,
  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
  jobs: {
    tasks: [purgeExpiredSubmissionsTask],
    access: {
      queue: ({ req }) => isEditorOrAbove(req.user),
      run: ({ req }) => isEditorOrAbove(req.user),
      cancel: ({ req }) => isEditorOrAbove(req.user),
    },
    // Runs scheduled publications and maintenance tasks in long-running (Docker/VPS) deployments.
    autoRun:
      process.env.PAYLOAD_DISABLE_AUTORUN === 'true'
        ? []
        : [
            { cron: '* * * * *', queue: 'default', limit: 20 },
            { cron: '*/10 * * * *', queue: 'maintenance', limit: 5 },
          ],
    shouldAutoRun: () => process.env.NEXT_PHASE !== 'phase-production-build',
  },
  telemetry: false,
})
