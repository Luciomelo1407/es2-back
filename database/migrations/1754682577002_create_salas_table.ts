import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'salas'
  protected schemaName = 'base'

  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      table.increments('id')

      table.float('tamanho').nullable()
      table.boolean('acessibilidade').notNullable().defaultTo(false)
      table.boolean('parede_lavavel').notNullable().defaultTo(false)
      table.boolean('piso_lavavel').notNullable().defaultTo(false)
      table.boolean('porta_lavavel').notNullable().defaultTo(false)
      table.boolean('janela_lavavel').notNullable().defaultTo(false)
      table.boolean('teto_lavavel').notNullable().defaultTo(false)
      table.boolean('pia').notNullable().defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}
