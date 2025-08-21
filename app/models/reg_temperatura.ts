import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Profissional from './profissional.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Estoque from './estoque.js'

export default class RegTemperatura extends BaseModel {
  static table = 'base.reg_temperaturas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare temperatura: number

  @column()
  declare profissionalId: number

  @belongsTo(() => Profissional)
  declare profissional: BelongsTo<typeof Profissional>

  @column({ columnName: 'estoque_id' })
  declare estoqueId: number

  @belongsTo(() => Estoque, {
    foreignKey: 'estoque_id',
  })
  declare estoque: BelongsTo<typeof Estoque>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
