import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Profissional from './profissional.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Estoque from './estoque.js'

/**
 * Model para registros de temperatura
 * Gerencia os dados de controle térmico associados a profissionais e estoques
 * Utiliza o schema 'base' para organização da estrutura do banco de dados
 */
export default class RegTemperatura extends BaseModel {
  // Define a tabela específica no schema base para melhor organização do banco
  static table = 'base.reg_temperaturas'

  /**
   * Identificador único do registro de temperatura
   * Chave primária auto-incrementável
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Valor da temperatura registrada
   * Armazena a medição térmica em formato numérico
   */
  @column()
  declare temperatura: number

  /**
   * Identificador do profissional responsável pelo registro
   * Chave estrangeira para rastreabilidade e auditoria
   */
  @column()
  declare profissionalId: number

  /**
   * Relacionamento com o modelo Profissional
   * Permite acesso aos dados do profissional que realizou o registro
   */
  @belongsTo(() => Profissional)
  declare profissional: BelongsTo<typeof Profissional>

  /**
   * Identificador do estoque monitorado
   * Mapeia para a coluna 'estoque_id' no banco de dados
   */
  @column({ columnName: 'estoque_id' })
  declare estoqueId: number

  /**
   * Relacionamento com o modelo Estoque
   * Utiliza foreignKey customizada para mapear corretamente a coluna do banco
   * Permite identificar qual estoque teve sua temperatura registrada
   */
  @belongsTo(() => Estoque, {
    foreignKey: 'estoque_id',
  })
  declare estoque: BelongsTo<typeof Estoque>

  /**
   * Timestamp de criação do registro
   * Automaticamente preenchido na criação para controle temporal
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização
   * Automaticamente atualizado a cada modificação para auditoria
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}