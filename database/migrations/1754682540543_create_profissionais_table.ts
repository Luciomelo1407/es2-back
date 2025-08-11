import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'profissionais'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
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
        .inTable('enderecos')
        .onDelete('CASCADE')

      table
        .integer('ubs_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('ubs')
        .onDelete('CASCADE')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').nullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}