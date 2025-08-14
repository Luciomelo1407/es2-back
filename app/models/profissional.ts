import { DateTime } from 'luxon'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasOne, scope } from '@adonisjs/lucid/orm'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import Endereco from '#models/endereco'
import { type HasOne } from '@adonisjs/lucid/types/relations'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class Profissional extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nomeCompleto: string

  @column()
  declare coren: string

  @column()
  declare cbo: string

  @column()
  declare idAdmin: boolean

  @column()
  declare email: string

  @column({ serializeAs: null })
  declare senha: string

  @column()
  declare token: string | null

  @column.date()
  declare dataNascimento: DateTime

  @column()
  declare cpf: string

  @hasOne(() => Endereco)
  declare enderecoId: HasOne<typeof Endereco>

  @column()
  declare ubsId: number  

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  static accessTokens = DbAccessTokensProvider.forModel(Profissional)
}