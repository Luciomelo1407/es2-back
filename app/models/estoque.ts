import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Sala from './sala.js'
import VacinaEstoque from './vacina_estoque.js'
import RegTemperatura from './reg_temperatura.js'

/**
 * Modelo que representa um local de armazenamento de vacinas
 * Central para controle de inventário e monitoramento de condições de conservação
 */
export default class Estoque extends BaseModel {
  // Define explicitamente o schema e tabela no banco de dados
  static table = 'base.estoques'

  /**
   * Identificador único do estoque
   * Chave primária para referenciamento em outras tabelas
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Identificador da sala onde o estoque está localizado
   * Chave estrangeira que estabelece a localização física do armazenamento
   */
  @column({ columnName: 'sala_id' })
  declare salaId: number

  /**
   * Categoria ou especificação do tipo de estoque
   * Ex: refrigerador, freezer, temperatura ambiente
   * Define as condições de conservação do local
   */
  @column()
  declare tipo: String

  /**
   * Timestamp de criação do estoque
   * Registra quando o local de armazenamento foi cadastrado
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização do estoque
   * Atualizado automaticamente quando há modificações na configuração
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Relacionamento com a sala que contém este estoque
   * Permite acesso aos dados da localização e contexto do armazenamento
   */
  @belongsTo(() => Sala, {
    foreignKey: 'sala_id',
  })
  declare sala: BelongsTo<typeof Sala>

  /**
   * Relacionamento com as vacinas armazenadas neste estoque
   * Representa o inventário atual de vacinas com suas respectivas quantidades
   * Fundamental para controle de disponibilidade e movimentação
   */
  @hasMany(() => VacinaEstoque)
  declare vacinaEstoque: HasMany<typeof VacinaEstoque>

  /**
   * Relacionamento com os registros de temperatura deste estoque
   * Mantém histórico completo das condições térmicas para compliance
   * Essencial para garantir a eficácia das vacinas armazenadas
   */
  @hasMany(() => RegTemperatura)
  declare regTemperaturas: HasMany<typeof RegTemperatura>
}