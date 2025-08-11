import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class RegTemperatura extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare estoqueId: number

  @column()
  declare temperatura: number

  @column.dateTime()
  declare dataHora: DateTime

  @column()
  declare responsavel: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}