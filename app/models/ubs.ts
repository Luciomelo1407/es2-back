import { DateTime } from 'luxon'
import { BaseModel, column , hasOne} from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'

export default class Ubs extends BaseModel {

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare cnes: string

  @column()
  declare nome: string

  @column()
  declare gestao: string

  @column()
  declare atendeSus: boolean

  @hasOne(() => Endereco)
  declare enderecoId: HasOne<typeof Endereco>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}