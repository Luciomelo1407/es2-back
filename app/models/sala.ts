import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Ubs from './ubs.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import DiaTrabalho from './dia_trabalho.js'
import HigieneSala from './higiene_sala.js'
import Estoque from './estoque.js'

export default class Sala extends BaseModel {
  static table = 'base.salas'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare tamanho: number | null // float

  @column()
  declare acessibilidade: boolean

  @column({ columnName: 'parede_lavavel' })
  declare paredeLavavel: boolean

  @column({ columnName: 'piso_lavavel' })
  declare pisoLavavel: boolean

  @column({ columnName: 'porta_lavavel' })
  declare portaLavavel: boolean

  @column({ columnName: 'janela_lavavel' })
  declare janelaLavavel: boolean

  @column({ columnName: 'teto_lavavel' })
  declare tetoLavavel: boolean

  @column()
  declare pja: boolean

  @column({ columnName: 'ubs_id' })
  declare ubsId: number

  @belongsTo(() => Ubs, {
    foreignKey: 'ubs_id',
  })
  declare ubs: BelongsTo<typeof Ubs>

  @hasMany(() => Estoque)
  declare estoques: HasMany<typeof Estoque>

  @hasMany(() => DiaTrabalho)
  declare diasTrabalho: HasMany<typeof DiaTrabalho>

  @hasMany(() => HigieneSala)
  declare higienesSala: HasMany<typeof HigieneSala>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
