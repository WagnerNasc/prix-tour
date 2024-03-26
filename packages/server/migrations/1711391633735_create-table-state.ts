/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('state', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    name: { type: 'varchar(100)', notNull: true },
    code: { type: 'bpchar(2)', notNull: true },
    country_id: { type: 'uuid', notNull: true },
    update_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp' },
  })

  pgm.createConstraint(
    {
      schema: 'public',
      name: 'country',
    },
    'country_id_fk',
    {
      foreignKeys: {
        columns: 'id',
        references: 'public.country(id)',
      },
    },
  )
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('state')
}
