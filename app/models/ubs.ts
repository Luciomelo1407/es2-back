import { DateTime } from 'luxon'
import { BaseModel, column , belongsTo, hasMany} from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'
import Sala from './sala.js'
import Profissional from './profissional.js'

export default class Ubs extends BaseModel {
  static table = 'base.ubs'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cnes: string

  @column()
  declare nome: string

  @column()
  declare gestao: string

  @column({ columnName: 'atende_sus' })
  declare atendeSus: boolean

  @column({ columnName: 'endereco_id'})
  declare enderecoId: number

  @belongsTo(() => Endereco, {
    foreignKey: 'endereco_id',
  })
  declare endereco: BelongsTo<typeof Endereco>

  @hasMany(() => Sala)
  declare salas: HasMany<typeof Sala>

  @hasMany(() => Profissional)
  declare profissionais: HasMany<typeof Profissional>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}