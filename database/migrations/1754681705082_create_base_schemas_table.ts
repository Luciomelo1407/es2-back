import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected schemaName = 'base'

  async up() {
    this.schema.createSchema(this.schemaName)
  }

  async down() {
    this.schema.dropSchema(this.schemaName)
  }
}
