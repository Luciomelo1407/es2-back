import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profissionais'
  protected schemaName = 'base'

  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.increments('id').notNullable()
      table.string('nome_completo').nullable()
      table.string('coren').notNullable()
      table.string('cbo').notNullable()
      table.string('email', 254).notNullable().unique()
      table.string('senha').notNullable()
      table.date('data_nascimento').notNullable()
      table.string('cpf', 11).notNullable().unique()

      table
        .integer('endereco_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.enderecos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table
        .integer('ubs_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.ubs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}