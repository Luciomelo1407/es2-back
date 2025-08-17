import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Profissional from '#models/profissional'
import Ubs from '#models/ubs'
import type { HasOne } from '@adonisjs/lucid/types/relations'

export default class Endereco extends BaseModel {
  static table = 'base.enderecos'

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
  declare numero: number | null

  @column()
  declare complemento: string | null

  @hasOne(() => Profissional)
  declare profissional: HasOne<typeof Profissional>

  @hasOne(() => Ubs)
  declare ubs: HasOne<typeof Ubs>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}