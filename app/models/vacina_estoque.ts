import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Estoque from './estoque.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import VacinaLote from './vacina_lote.js'

export default class VacinaEstoque extends BaseModel {
  static table = 'base.vacina_estoques'

  @column({ isPrimary: true, columnName: 'vacina_id' })
  declare vacinaId: number

  @column({ isPrimary: true, columnName: 'estoque_id' })
  declare estoqueId: number

  @column()
  declare quantidade: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Estoque, {
    foreignKey: 'estoque_id',
  })
  declare estoque: BelongsTo<typeof Estoque>

  @belongsTo(() => VacinaLote, { foreignKey: 'vacinaId' })
  declare vacinaLotes: BelongsTo<typeof VacinaLote>
}
