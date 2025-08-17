import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sala from './sala.js'
import Profissional from './profissional.js'

export default class DiaTrabalho extends BaseModel {
  static table = 'base.dia_trabalhos'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'profissional_id'})
  declare profissionalId: number

  @belongsTo(() => Profissional, {
    foreignKey: 'profissional_id',
  })
  declare profissional: BelongsTo<typeof Profissional>

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