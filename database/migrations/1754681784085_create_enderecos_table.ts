import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'enderecos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('cep').notNullable()
      table.string('estado').notNullable()
      table.string('cidade').notNullable()
      table.string('bairro').notNullable()
      table.string('rua').notNullable()
      table.string('numero').notNullable()
      table.string('complemento').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}