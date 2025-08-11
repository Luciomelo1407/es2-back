import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Profissional extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nomeCompleto: string

  @column()
  declare coren: string

  @column()
  declare cbo: string

  @column()
  declare idAdmin: boolean

  @column()
  declare email: string

  @column()
  declare senha: string

  @column.date()
  declare dataNascimento: DateTime

  @column()
  declare cpf: string

  @column()
  declare enderecoId: number

  @column()
  declare ubsId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}