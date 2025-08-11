import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ubs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('cnes').notNullable()
      table.string('nome').notNullable()
      table.string('gestao').notNullable()
      table.boolean('atende_sus').notNullable().defaultTo(true)

      table
        .integer('endereco_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('enderecos')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}