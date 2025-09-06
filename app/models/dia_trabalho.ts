import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Sala from './sala.js'
import Profissional from './profissional.js'

/**
 * Modelo que representa a atribuição de um profissional a uma sala específica
 * Controla a alocação diária dos profissionais de saúde aos ambientes de trabalho
 */
export default class DiaTrabalho extends BaseModel {
  // Define explicitamente o schema e tabela no banco de dados
  static table = 'base.dia_trabalhos'

  /**
   * Identificador único do registro de dia de trabalho
   * Chave primária para rastreamento individual das atribuições
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Identificador do profissional alocado
   * Chave estrangeira que referencia a tabela de profissionais
   */
  @column({ columnName: 'profissional_id' })
  declare profissionalId: number

  /**
   * Relacionamento com o modelo Profissional
   * Permite acesso aos dados completos do profissional através da relação
   */
  @belongsTo(() => Profissional, {
    foreignKey: 'profissional_id',
  })
  declare profissional: BelongsTo<typeof Profissional>

  /**
   * Identificador da sala de trabalho atribuída
   * Chave estrangeira que define onde o profissional está alocado
   */
  @column()
  declare salaId: number

  /**
   * Relacionamento com o modelo Sala
   * Facilita o acesso aos detalhes da sala e seus recursos (estoques, equipamentos)
   */
  @belongsTo(() => Sala)
  declare sala: BelongsTo<typeof Sala>

  /**
   * Timestamp de criação da atribuição
   * Registra quando a alocação foi estabelecida
   * Importante para controle de histórico e auditoria
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização da atribuição
   * Atualizado automaticamente quando há mudanças na alocação
   * Útil para rastrear remanejamentos e alterações de turno
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}