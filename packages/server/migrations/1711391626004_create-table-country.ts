/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('country', {
    id: {
      type: 'uuid',
      primaryKey: true,
      notNull: true,
    },
    name: { type: 'varchar(70)', notNull: true },
    code: { type: 'bpchar(2)', notNull: true },
    update_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp' },
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('country')
}
