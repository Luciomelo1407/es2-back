import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Sala extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare numero: number

  @column()
  declare tamanho: number  // float

  @column()
  declare acessibilidade: boolean

  @column()
  declare paredeLavavel: boolean

  @column()
  declare pisoLavavel: boolean

  @column()
  declare portaLavavel: boolean

  @column()
  declare janelaLavavel: boolean

  @column()
  declare tetoLavavel: boolean

  @column()
  declare pja: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}