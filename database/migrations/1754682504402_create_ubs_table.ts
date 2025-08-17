import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'ubs'
  protected schemaName = 'base'

  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('cnes').notNullable()
      table.string('nome').notNullable()
      table.string('gestao').notNullable()
      table.boolean('atende_sus').notNullable().defaultTo(true)

      table
        .integer('endereco_id')
        .references('id')
        .inTable('base.enderecos')
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