import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reg_temperaturas'
  protected schemaName = 'base'

  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('estoque_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.estoques')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.float('temperatura').notNullable()

      table
        .integer('profissional_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.profissionais')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}
