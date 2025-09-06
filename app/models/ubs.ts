import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Endereco from './endereco.js'
import Sala from './sala.js'
import Profissional from './profissional.js'

/**
 * Model representando as Unidades Básicas de Saúde (UBS)
 * Centraliza informações institucionais, localização e relacionamentos
 * com salas e profissionais que compõem a estrutura da unidade
 */
export default class Ubs extends BaseModel {
  // Define a tabela no schema base para organização estrutural do sistema
  static table = 'base.ubs'

  /**
   * Identificador único da UBS
   * Chave primária auto-incrementável
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Código CNES (Cadastro Nacional de Estabelecimentos de Saúde)
   * Identificador oficial único do estabelecimento no sistema nacional
   * Obrigatório para todas as unidades de saúde no Brasil
   */
  @column()
  declare cnes: string

  /**
   * Nome oficial da Unidade Básica de Saúde
   * Denominação pela qual a UBS é conhecida e identificada
   */
  @column()
  declare nome: string

  /**
   * Tipo de gestão da UBS
   * Define o modelo administrativo (municipal, estadual, federal, etc.)
   */
  @column()
  declare gestao: string

  /**
   * Indicador de atendimento pelo SUS
   * Determina se a unidade presta serviços pelo Sistema Único de Saúde
   */
  @column()
  declare atendeSus: boolean

  /**
   * Identificador do endereço da UBS
   * Permite valores undefined para UBS sem endereço cadastrado
   * Chave estrangeira opcional para flexibilidade no cadastro
   */
  @column()
  declare enderecoId: number | undefined

  /**
   * Relacionamento com o endereço da UBS
   * Utiliza foreignKey personalizada para mapear corretamente
   * Permite acesso às informações de localização da unidade
   */
  @belongsTo(() => Endereco, {
    foreignKey: 'endereco_id',
  })
  declare endereco: BelongsTo<typeof Endereco>

  /**
   * Relacionamento com as salas da UBS
   * Uma UBS pode conter múltiplas salas para diferentes serviços
   * Permite gestão completa da estrutura física
   */
  @hasMany(() => Sala)
  declare salas: HasMany<typeof Sala>

  /**
   * Relacionamento com os profissionais da UBS
   * Uma UBS pode ter vários profissionais de saúde vinculados
   * Essencial para gestão de recursos humanos
   */
  @hasMany(() => Profissional)
  declare profissionais: HasMany<typeof Profissional>

  /**
   * Timestamp de criação do registro
   * Automaticamente preenchido para controle de auditoria
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização
   * Automaticamente atualizado para rastreamento de modificações
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}