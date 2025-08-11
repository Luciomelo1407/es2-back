import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Ub extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cnes: string

  @column()
  declare nome: string

  @column()
  declare gestao: string

  @column()
  declare atendeSus: boolean

  @column()
  declare enderecoId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}