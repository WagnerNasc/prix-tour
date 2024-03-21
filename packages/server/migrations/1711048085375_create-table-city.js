/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('city', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    name: { type: 'varchar(100)', notNull: true },
    state: { type: 'varchar(100)', notNull: true },
    country: { type: 'varchar(100)', notNull: true },
    population_proper: { type: 'numeric' },
    iso: { type: 'bpchar(2)', notNull: true },
    is_capital: { type: 'bool', default: false },
    latitude: { type: 'numeric(9,6)', notNull: true },
    longitude: { type: 'numeric(9,6)', notNull: true },
    population: { type: 'numeric' },
    update_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
    deleted_at: { type: 'timestamp' },
  })

  pgm.createIndex('city', 'id', { unique: true })
}

exports.down = (pgm) => {
  pgm.dropTable('city')
}
