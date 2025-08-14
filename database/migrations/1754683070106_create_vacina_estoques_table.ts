import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vacina_estoques'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('vacina_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('vacina_lotes')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('estoque_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('estoques')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.integer('quantidade').notNullable()

      table.primary(['vacina_id', 'estoque_id'])

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}