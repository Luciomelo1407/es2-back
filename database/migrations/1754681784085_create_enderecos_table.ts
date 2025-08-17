import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'
  protected schemaName = 'base'

  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('cep', 8).nullable()
      table.string('estado').notNullable()
      table.string('cidade').notNullable()
      table.string('bairro').notNullable()
      table.string('rua').notNullable()
      table.integer('numero').notNullable()
      table.string('complemento').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}