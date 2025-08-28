import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Sala from './sala.js'
import VacinaEstoque from './vacina_estoque.js'
import RegTemperatura from './reg_temperatura.js'

export default class Estoque extends BaseModel {
  static table = 'base.estoques'

  @column({ isPrimary: true })
  declare id: number

  @column({ columnName: 'sala_id' })
  declare salaId: number

  @column()
  declare tipo: String

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Sala, {
    foreignKey: 'sala_id',
  })
  declare sala: BelongsTo<typeof Sala>

  @hasMany(() => VacinaEstoque)
  declare vacinaEstoque: HasMany<typeof VacinaEstoque>

  @hasMany(() => RegTemperatura)
  declare regTemperaturas: HasMany<typeof RegTemperatura>
}
