/* eslint-disable @typescript-eslint/naming-convention */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate'

export const shorthands: ColumnDefinitions | undefined = undefined

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createConstraint('tourist_attraction', 'unique_lat_long', {
    unique: ['latitude', 'longitude'],
  })
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropConstraint('tourist_attraction', 'unique_lat_long')
}
