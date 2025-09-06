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

// Configuração do AuthFinder para autenticação
// Define email como identificador único e senha como campo de autenticação
// Utiliza o algoritmo scrypt para hash das senhas
const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'senha',
})

/**
 * Modelo que representa um profissional de saúde no sistema
 * Integra autenticação, dados pessoais, vínculos institucionais e atividades
 */
export default class Profissional extends compose(BaseModel, AuthFinder) {
  // Define explicitamente o schema e tabela no banco de dados
  static table = 'base.profissionais'

  /**
   * Identificador único do profissional
   * Chave primária utilizada em relacionamentos e autenticação
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Nome completo do profissional de saúde
   * Informação essencial para identificação e comunicação
   */
  @column()
  declare nomeCompleto: string

  /**
   * Número do Conselho Regional de Enfermagem
   * Registro profissional obrigatório para enfermeiros
   * Essencial para validação de qualificação profissional
   */
  @column()
  declare coren: string

  /**
   * Código da Classificação Brasileira de Ocupações
   * Identifica a função específica do profissional no sistema de saúde
   */
  @column()
  declare cbo: string

  /**
   * Flag que indica se o profissional possui privilégios administrativos
   * Controla acesso a funcionalidades de gestão e configuração
   */
  @column()
  declare isAdmin: boolean

  /**
   * Endereço eletrônico do profissional
   * Utilizado como identificador único para autenticação
   */
  @column()
  declare email: string

  /**
   * Senha criptografada do profissional
   * Não serializada nas respostas por segurança
   * Processada automaticamente pelo AuthFinder com hash scrypt
   */
  @column({ serializeAs: null })
  declare senha: string

  /**
   * Data de nascimento do profissional
   * Armazenada como date para cálculos de idade e validações
   */
  @column.date({ columnName: 'data_nascimento' })
  declare dataNascimento: DateTime

  /**
   * Cadastro de Pessoa Física
   * Documento de identificação único no Brasil
   */
  @column()
  declare cpf: string

  /**
   * Identificador do endereço residencial do profissional
   * Campo opcional pois nem todos os profissionais precisam informar
   */
  @column({ columnName: 'endereco_id' })
  declare enderecoId: number | undefined

  /**
   * Relacionamento com o endereço do profissional
   * Facilita acesso aos dados de localização para relatórios regionais
   */
  @belongsTo(() => Endereco, {
    foreignKey: 'endereco_id',
  })
  declare endereco: BelongsTo<typeof Endereco>

  /**
   * Identificador da Unidade Básica de Saúde onde o profissional trabalha
   * Define o vínculo institucional principal
   */
  @column({ columnName: 'ubs_id' })
  declare ubsId: number

  /**
   * Relacionamento com a UBS do profissional
   * Permite acesso aos dados da unidade de saúde e sua gestão
   */
  @belongsTo(() => Ubs, {
    foreignKey: 'ubs_id',
  })
  declare ubs: BelongsTo<typeof Ubs>

  /**
   * Relacionamento com os dias de trabalho do profissional
   * Mantém histórico completo de alocações em salas de trabalho
   * Fundamental para controle de escala e produtividade
   */
  @hasMany(() => DiaTrabalho)
  declare diasTrabalho: HasMany<typeof DiaTrabalho>

  /**
   * Relacionamento com registros de temperatura realizados pelo profissional
   * Rastreia responsabilidade individual pelo monitoramento térmico
   * Importante para auditoria e controle de qualidade
   */
  @hasMany(() => RegTemperatura)
  declare regsTemperaturas: HasMany<typeof RegTemperatura>

  /**
   * Timestamp de criação do registro do profissional
   * Registra quando o profissional foi cadastrado no sistema
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização dos dados do profissional
   * Rastreia modificações no perfil e informações pessoais
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  /**
   * Provedor de tokens de acesso para autenticação API
   * Permite geração e validação de tokens para sessões autenticadas
   */
  static accessTokens = DbAccessTokensProvider.forModel(Profissional)
}