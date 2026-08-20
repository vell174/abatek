import { Pool } from 'pg';

let pool: Pool | null = null;
let schemaReady: Promise<void> | null = null;

export function getDbPool(): Pool | null {
  const { databaseUrl } = useRuntimeConfig();
  if (!databaseUrl) return null;
  if (!pool) {
    pool = new Pool({ connectionString: databaseUrl, max: 5 });
  }
  return pool;
}

export function ensureSchema(db: Pool): Promise<void> {
  if (!schemaReady) {
    schemaReady = db
      .query(
        `CREATE TABLE IF NOT EXISTS requests (
          id BIGSERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          phone TEXT NOT NULL,
          email TEXT NOT NULL DEFAULT '',
          message TEXT NOT NULL DEFAULT '',
          page TEXT NOT NULL DEFAULT '',
          page_title TEXT NOT NULL DEFAULT '',
          mail_status TEXT NOT NULL DEFAULT 'pending',
          mail_attempts INT NOT NULL DEFAULT 0,
          mail_error TEXT NOT NULL DEFAULT '',
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        );
        ALTER TABLE requests ADD COLUMN IF NOT EXISTS page_title TEXT NOT NULL DEFAULT ''`,
      )
      .then(() => undefined)
      .catch((error) => {
        schemaReady = null;
        throw error;
      });
  }
  return schemaReady;
}
