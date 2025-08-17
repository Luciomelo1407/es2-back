import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Sala from './sala.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class HigieneSala extends BaseModel {
  static table = 'base.higiene_salas'
  
  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'sala_id'})
  declare salaId: number

  @belongsTo(() => Sala, {
    foreignKey: 'sala_id',
  })
  declare sala: BelongsTo<typeof Sala>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}