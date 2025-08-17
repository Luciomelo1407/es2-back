import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Sala from './sala.js'
import VacinaLote from './vacina_lote.js'

export default class Estoque extends BaseModel {
  static table = 'base.estoques'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'sala_id'})
  declare salaId: number

  @belongsTo(() => Sala, {
    foreignKey: 'sala_id',
  })
  declare sala: BelongsTo<typeof Sala>

  @hasMany(() => VacinaLote)
  declare vacinaLotes: HasMany<typeof VacinaLote>

  @column()
  declare tipo: String

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}