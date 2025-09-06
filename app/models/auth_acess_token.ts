import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

/**
 * Modelo para gerenciamento de tokens de acesso de autenticação
 * Utilizado pelo sistema de autenticação API do AdonisJS para controle de sessões
 */
export default class AuthAcessToken extends BaseModel {
  /**
   * Identificador único do token de acesso
   * Chave primária auto-incrementável para rastreamento individual
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Timestamp de criação do token
   * Registra automaticamente quando o token foi gerado
   * Útil para auditoria e controle de validade temporal
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização do token
   * Atualizado automaticamente a cada modificação no registro
   * Permite rastreamento de atividade e uso do token
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}