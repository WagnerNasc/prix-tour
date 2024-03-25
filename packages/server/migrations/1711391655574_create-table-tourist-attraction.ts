/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('tourist_attraction', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    city_id: {
      type: 'uuid',
      notNull: true,
      references: '"city"',
      onDelete: 'CASCADE',
    },
    name: { type: 'varchar(255)', notNull: true },
    description: { type: 'text', notNull: true },
    latitude: { type: 'numeric(9,6)', notNull: true },
    longitude: { type: 'numeric(9,6)', notNull: true },
    updated_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp' },
  })

  pgm.createIndex('tourist_attraction', 'city_id')
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('tourist_attraction')
}
