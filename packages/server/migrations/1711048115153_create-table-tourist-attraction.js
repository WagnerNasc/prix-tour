/* eslint-disable camelcase */

exports.shorthands = undefined

exports.up = (pgm) => {
  pgm.createTable('tourist_attraction', {
    id: { type: 'uuid', primaryKey: true, notNull: true },
    city_id: {
      type: 'uuid',
      notNull: true,
      references: '"city"',
      onDelete: 'cascade',
    },
    name: { type: 'varchar(255)', notNull: true },
    description: { type: 'text', notNull: true },
    latitude: { type: 'numeric(9,6)', notNull: true },
    longitude: { type: 'numeric(9,6)', notNull: true },
    deleted_at: { type: 'timestamp' },
    updated_at: { type: 'timestamp' },
    created_at: { type: 'timestamp', default: pgm.func('current_timestamp') },
  })

  pgm.createIndex('tourist_attraction', 'id', { unique: true })
  pgm.createIndex('tourist_attraction', 'city_id')
}

exports.down = (pgm) => {
  pgm.dropTable('tourist_attraction')
}
