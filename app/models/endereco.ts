import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Endereco extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cep: string

  @column()
  declare estado: string

  @column()
  declare cidade: string

  @column()
  declare bairro: string

  @column()
  declare rua: string

  @column()
  declare numero: string

  @column()
  declare complemento: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}