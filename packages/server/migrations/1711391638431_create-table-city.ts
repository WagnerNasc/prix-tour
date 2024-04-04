/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable('city', {
    id: {
      type: 'uuid',
      primaryKey: true,
      notNull: true,
    },
    name: { type: 'varchar(100)', notNull: true },
    state_id: {
      type: 'uuid',
      notNull: true,
    },
    is_capital: { type: 'bool', default: false },
    latitude: { type: 'numeric(9,6)', notNull: true },
    longitude: { type: 'numeric(9,6)', notNull: true },
    population: { type: 'numeric' },
    update_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp' },
  })

  pgm.createConstraint(
    {
      schema: 'public',
      name: 'city',
    },
    'city_state_id_fk',
    {
      foreignKeys: {
        columns: 'state_id',
        references: 'public.state(id)',
      },
    },
  )
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable('city')
}
