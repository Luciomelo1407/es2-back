import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de lotes de vacinas
 * Define estrutura completa para controle de imunobiológicos no sistema
 * Inclui dados de rastreabilidade, validade e controle de abertura de frascos
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'vacina_lotes'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela vacina_lotes no schema base
   * Define campos essenciais para gestão segura de imunobiológicos
   * Estabelece controles de qualidade e rastreabilidade obrigatórios
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')

      // Código do lote obrigatório fornecido pelo fabricante
      // Essencial para rastreabilidade e controle de qualidade
      table.string('cod_lote').notNullable()
      
      // Data de validade obrigatória para controle de vencimento
      // Crítica para segurança na aplicação de vacinas
      table.date('validade').notNullable()
      
      // Identificador interno opcional (código de barras, etc.)
      // Flexibilidade para diferentes sistemas de identificação
      table.string('identificador').nullable()
      
      // Sigla obrigatória da vacina para identificação rápida
      // Facilita reconhecimento em relatórios e interfaces
      table.string('sigla').notNullable()
      
      // Nome completo obrigatório da vacina
      // Denominação oficial do imunobiológico
      table.string('nome').notNullable()
      
      // Tipo obrigatório para classificação da vacina
      // Categoriza por grupo (viral, bacteriana, combinada, etc.)
      table.string('tipo').notNullable()
      
      // Fabricante obrigatório para controle de procedência
      // Fundamental para rastreabilidade e investigações
      table.string('fabricante').notNullable()
      
      // Número de doses com valor padrão 1
      // Controle quantitativo para planejamento de campanhas
      // Padrão 1 para vacinas monodose, ajustável para multidose
      table.integer('doses').notNullable().defaultTo(1)
      
      // Indicador de abertura com valor padrão false
      // Controla prazo de validade após abertura do frasco
      // Essencial para vacinas multidose e controle de desperdício
      table.boolean('aberta').notNullable().defaultTo(false)

      // Timestamps para auditoria e controle temporal
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela vacina_lotes
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove todos os dados de lotes de vacinas do schema
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}