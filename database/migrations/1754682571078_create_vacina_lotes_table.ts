import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'vacina_lotes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('cod_lote').notNullable()
      table.date('validade').notNullable()
      table.string('identificador').notNullable()
      table.string('sigla').notNullable()
      table.string('nome').notNullable()
      table.string('tipo').notNullable()
      table.string('fabricante').notNullable()
      table.integer('doses').notNullable().defaultTo(1)
      table.boolean('aberta').notNullable().defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}