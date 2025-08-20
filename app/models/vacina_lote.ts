import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class VacinaLote extends BaseModel {
  static table = 'base.vacina_lotes'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'cod_lote' })
  declare codLote: string

  @column.date()
  declare validade: DateTime

  @column()
  declare identificador: string

  @column()
  declare sigla: string

  @column()
  declare nome: string

  @column()
  declare tipo: string

  @column()
  declare fabricante: string

  @column()
  declare doses: number

  @column()
  declare aberta: boolean

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
