import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Endereco from '#models/endereco'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Ubs from './ubs.js'
import DiaTrabalho from './dia_trabalho.js'
import RegTemperatura from './reg_temperatura.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'senha',
})

export default class Profissional extends compose(BaseModel, AuthFinder) {
  static table = 'base.profissionais'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nomeCompleto: string

  @column()
  declare coren: string

  @column()
  declare cbo: string

  @column()
  declare isAdmin: boolean

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column.date({ columnName: 'data_nascimento' })
  declare dataNascimento: DateTime

  @column()
  declare cpf: string

  @column({ columnName: 'endereco_id' })
  declare enderecoId: number | undefined

  @belongsTo(() => Endereco, {
    foreignKey: 'endereco_id',
  })
  declare endereco: BelongsTo<typeof Endereco>

  @column({ columnName: 'ubs_id' })
  declare ubsId: number

  @belongsTo(() => Ubs, {
    foreignKey: 'ubs_id',
  })
  declare ubs: BelongsTo<typeof Ubs>

  @hasMany(() => DiaTrabalho)
  declare diasTrabalho: HasMany<typeof DiaTrabalho>

  @hasMany(() => RegTemperatura)
  declare regsTemperaturas: HasMany<typeof RegTemperatura>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(Profissional)
}
