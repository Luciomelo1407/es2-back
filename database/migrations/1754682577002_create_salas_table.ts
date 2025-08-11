import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'salas'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('numero').notNullable()
      table.float('tamanho').notNullable()
      table.boolean('acessibilidade').notNullable().defaultTo(false)
      table.boolean('parede_lavavel').notNullable().defaultTo(false)
      table.boolean('piso_lavavel').notNullable().defaultTo(false)
      table.boolean('porta_lavavel').notNullable().defaultTo(false)
      table.boolean('janela_lavavel').notNullable().defaultTo(false)
      table.boolean('teto_lavavel').notNullable().defaultTo(false)
      table.boolean('pja').notNullable().defaultTo(false)

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}