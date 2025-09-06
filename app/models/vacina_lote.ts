import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import VacinaEstoque from './vacina_estoque.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

/**
 * Model representando lotes de vacinas no sistema de imunização
 * Centraliza informações essenciais sobre cada lote como validade,
 * fabricante, tipo e controle de abertura para gestão segura de imunobiológicos
 */
export default class VacinaLote extends BaseModel {
  // Define a tabela no schema base para organização do sistema de imunização
  static table = 'base.vacina_lotes'

  /**
   * Identificador único do lote de vacina
   * Chave primária auto-incrementável
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Código oficial do lote fornecido pelo fabricante
   * Mapeia para coluna 'cod_lote' seguindo convenção snake_case do banco
   * Essencial para rastreabilidade e controle de qualidade
   */
  @column({ columnName: 'cod_lote' })
  declare codLote: string

  /**
   * Data de validade do lote
   * Utiliza tipo date para controle preciso de vencimento
   * Crítico para segurança na aplicação de vacinas
   */
  @column.date()
  declare validade: DateTime

  /**
   * Identificador interno ou código de barras da vacina
   * Facilita identificação rápida e controle interno
   */
  @column()
  declare identificador: string

  /**
   * Sigla abreviada da vacina
   * Permite identificação rápida do tipo de imunobiológico
   * Útil em relatórios e interfaces simplificadas
   */
  @column()
  declare sigla: string

  /**
   * Nome completo da vacina
   * Denominação oficial do imunobiológico
   */
  @column()
  declare nome: string

  /**
   * Tipo ou categoria da vacina
   * Classifica o imunobiológico por grupo (viral, bacteriana, etc.)
   */
  @column()
  declare tipo: string

  /**
   * Nome do laboratório fabricante
   * Importante para rastreabilidade e controle de qualidade
   * Essencial em casos de recall ou investigações
   */
  @column()
  declare fabricante: string

  /**
   * Número total de doses no lote
   * Controle quantitativo para planejamento de campanhas
   * Permite cálculo de cobertura vacinal
   */
  @column()
  declare doses: number

  /**
   * Indicador se o frasco/lote foi aberto
   * Controla prazo de validade após abertura
   * Essencial para vacinas multidose e controle de desperdício
   */
  @column()
  declare aberta: boolean

  /**
   * Relacionamento com os registros de estoque
   * Um lote pode estar distribuído em múltiplos estoques
   * Permite rastreamento da localização das doses
   */
  @hasMany(() => VacinaEstoque, { foreignKey: 'vacinaId' })
  declare vacinaEstoques: HasMany<typeof VacinaEstoque>

  /**
   * Timestamp de criação do registro
   * Automaticamente preenchido para controle de entrada no sistema
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