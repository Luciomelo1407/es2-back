import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, hasMany } from '@adonisjs/lucid/orm'
import Ubs from './ubs.js'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import DiaTrabalho from './dia_trabalho.js'
import HigieneSala from './higiene_sala.js'
import Estoque from './estoque.js'

/**
 * Model representando as salas dentro das Unidades Básicas de Saúde (UBS)
 * Gerencia informações estruturais, condições de higiene e relacionamentos
 * com estoques, dias de trabalho e registros de limpeza
 */
export default class Sala extends BaseModel {
  // Define a tabela no schema base para organização estrutural do banco
  static table = 'base.salas'

  /**
   * Identificador único da sala
   * Chave primária auto-incrementável
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Tamanho da sala em metros quadrados
   * Permite valores nulos para salas sem medição definida
   * Utiliza tipo float para precisão nas medidas
   */
  @column()
  declare tamanho: number | null // float

  /**
   * Indicador de acessibilidade da sala
   * Determina se a sala atende aos padrões de acessibilidade
   */
  @column()
  declare acessibilidade: boolean

  /**
   * Condição de lavabilidade da parede
   * Mapeia para coluna 'parede_lavavel' seguindo convenção snake_case do banco
   * Importante para controle de higienização
   */
  @column({ columnName: 'parede_lavavel' })
  declare paredeLavavel: boolean

  /**
   * Condição de lavabilidade do piso
   * Essencial para procedimentos de limpeza e desinfecção
   */
  @column({ columnName: 'piso_lavavel' })
  declare pisoLavavel: boolean

  /**
   * Condição de lavabilidade da porta
   * Contribui para o controle de contaminação entre ambientes
   */
  @column({ columnName: 'porta_lavavel' })
  declare portaLavavel: boolean

  /**
   * Condição de lavabilidade da janela
   * Importante para manutenção da qualidade do ambiente
   */
  @column({ columnName: 'janela_lavavel' })
  declare janelaLavavel: boolean

  /**
   * Condição de lavabilidade do teto
   * Completa a avaliação estrutural de limpeza da sala
   */
  @column({ columnName: 'teto_lavavel' })
  declare tetoLavavel: boolean

  /**
   * Presença de pia na sala
   * Fundamental para procedimentos de higienização das mãos
   */
  @column()
  declare pia: boolean

  /**
   * Identificador da UBS à qual a sala pertence
   * Chave estrangeira para relacionamento hierárquico
   */
  @column({ columnName: 'ubs_id' })
  declare ubsId: number

  /**
   * Relacionamento com a UBS proprietária
   * Utiliza foreignKey customizada para mapear corretamente
   * Permite acesso às informações da unidade de saúde
   */
  @belongsTo(() => Ubs, {
    foreignKey: 'ubs_id',
  })
  declare ubs: BelongsTo<typeof Ubs>

  /**
   * Relacionamento com os estoques da sala
   * Uma sala pode conter múltiplos estoques de materiais/medicamentos
   */
  @hasMany(() => Estoque)
  declare estoques: HasMany<typeof Estoque>

  /**
   * Relacionamento com os dias de trabalho na sala
   * Rastreia quando a sala é utilizada para atividades
   */
  @hasMany(() => DiaTrabalho)
  declare diasTrabalho: HasMany<typeof DiaTrabalho>

  /**
   * Relacionamento com os registros de higienização
   * Permite controle histórico da limpeza e desinfecção da sala
   */
  @hasMany(() => HigieneSala)
  declare higienesSala: HasMany<typeof HigieneSala>

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