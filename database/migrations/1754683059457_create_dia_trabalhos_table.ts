import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'dia_trabalhos'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table
        .integer('profissional_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('profissionais')
        .onDelete('CASCADE')

      table
        .integer('sala_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('salas')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}