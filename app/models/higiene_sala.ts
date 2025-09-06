import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Sala from './sala.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

/**
 * Modelo que registra atividades de higienização realizadas nas salas
 * Fundamental para controle de qualidade e compliance com protocolos sanitários
 */
export default class HigieneSala extends BaseModel {
  // Define explicitamente o schema e tabela no banco de dados
  static table = 'base.higiene_salas'
  
  /**
   * Identificador único do registro de higiene
   * Chave primária para rastreamento individual das atividades
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Identificador da sala que foi higienizada
   * Chave estrangeira que vincula a atividade ao local específico
   */
  @column({ columnName: 'sala_id'})
  declare salaId: number

  /**
   * Relacionamento com a sala onde a higienização foi realizada
   * Permite acesso aos detalhes do ambiente e seus recursos
   * Facilita relatórios de conformidade por localização
   */
  @belongsTo(() => Sala, {
    foreignKey: 'sala_id',
  })
  declare sala: BelongsTo<typeof Sala>

  /**
   * Timestamp de criação do registro de higiene
   * Registra automaticamente quando a atividade foi documentada
   * Serve como data/hora de referência para a higienização realizada
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização do registro
   * Atualizado automaticamente quando há modificações no registro
   * Útil para rastrear correções ou complementos de informações
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}