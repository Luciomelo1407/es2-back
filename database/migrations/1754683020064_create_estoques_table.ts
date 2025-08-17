import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'estoques'
  protected schemaName = 'base'

  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('sala_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.salas')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.string('tipo').notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}