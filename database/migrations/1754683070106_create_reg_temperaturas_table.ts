import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'reg_temperaturas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('estoque_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('estoques')
        .onDelete('CASCADE')

      table.float('temperatura').notNullable()
      table.dateTime('data_hora').notNullable()

      table
        .integer('responsavel')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profissionais')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}