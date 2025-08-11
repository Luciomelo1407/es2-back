import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class VacinaEstoque extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()//{ isPrimary: true })
  declare vacinaId: number

  @column()//{ isPrimary: true })
  declare estoqueId: number

  @column()
  declare quantidade: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}