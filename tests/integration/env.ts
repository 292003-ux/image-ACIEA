// Integration tests run against a dedicated database (never the dev/prod one).
process.env.DATABASE_URL =
  process.env.TEST_DATABASE_URL || 'postgres://aciea:aciea_dev@localhost:5432/aciea_test'
process.env.PAYLOAD_SECRET = 'integration-test-secret-0123456789abcdef'
process.env.PAYLOAD_DB_PUSH = 'true'
process.env.PAYLOAD_DISABLE_AUTORUN = 'true'
process.env.SMTP_HOST = ''
process.env.MEDIA_DIR = 'test-results/media'
process.env.PRIVATE_UPLOADS_DIR = 'test-results/private'
