import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import Estoque from './estoque.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import VacinaLote from './vacina_lote.js'

/**
 * Model representando o controle de estoque de vacinas
 * Tabela pivot que conecta vacinas/lotes com estoques específicos
 * Permite rastreamento de quantidade e localização de vacinas
 */
export default class VacinaEstoque extends BaseModel {
  // Define a tabela no schema base para organização do sistema de imunização
  static table = 'base.vacina_estoques'

  /**
   * Identificador único do registro de estoque de vacina
   * Chave primária auto-incrementável
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Identificador da vacina/lote
   * Mapeia para coluna 'vacina_id' seguindo convenção snake_case do banco
   * Chave estrangeira para relacionamento com lotes de vacinas
   */
  @column({ columnName: 'vacina_id' })
  declare vacinaId: number

  /**
   * Identificador do estoque onde a vacina está armazenada
   * Mapeia para coluna 'estoque_id' para localização física
   * Chave estrangeira para relacionamento com locais de armazenamento
   */
  @column({ columnName: 'estoque_id' })
  declare estoqueId: number

  /**
   * Quantidade de doses disponíveis no estoque
   * Controle numérico essencial para gestão de imunização
   * Permite monitoramento de disponibilidade para campanhas
   */
  @column()
  declare quantidade: number

  /**
   * Timestamp de criação do registro
   * Automaticamente preenchido para controle de entrada no estoque
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização
   * Automaticamente atualizado para rastreamento de movimentações
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  /**
   * Relacionamento com o estoque onde a vacina está armazenada
   * Utiliza foreignKey customizada para mapear corretamente
   * Permite acesso às informações do local de armazenamento
   */
  @belongsTo(() => Estoque, {
    foreignKey: 'estoque_id',
  })
  declare estoque: BelongsTo<typeof Estoque>

  /**
   * Relacionamento com o lote específico da vacina
   * Conecta ao modelo VacinaLote para rastreamento completo
   * Essencial para controle de validade e procedência das doses
   */
  @belongsTo(() => VacinaLote, { foreignKey: 'vacinaId' })
  declare vacinaLote: BelongsTo<typeof VacinaLote>
}