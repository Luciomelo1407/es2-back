import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de endereços
 * Define a estrutura para armazenamento de informações de localização
 * das UBS e outros estabelecimentos do sistema de saúde
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'enderecos'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela enderecos no schema base
   * Define todos os campos necessários para registro completo de endereços
   * Estabelece validações e restrições apropriadas para cada campo
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')

      // CEP com limite de 8 caracteres, permite nulo para flexibilidade
      // Útil para localidades onde o CEP pode não estar disponível
      table.string('cep', 8).nullable()
      
      // Estado obrigatório para identificação da unidade federativa
      // Campo essencial para organização territorial do sistema
      table.string('estado').notNullable()
      
      // Cidade obrigatória para localização municipal precisa
      // Fundamental para distribuição geográfica dos serviços
      table.string('cidade').notNullable()
      
      // Bairro obrigatório para segmentação urbana
      // Importante para organização territorial local
      table.string('bairro').notNullable()
      
      // Nome da rua obrigatório para localização específica
      // Campo base para endereçamento completo
      table.string('rua').notNullable()
      
      // Número do endereço obrigatório como integer
      // Permite ordenação numérica e validação de formato
      table.integer('numero').notNullable()
      
      // Complemento opcional para informações adicionais
      // Flexibilidade para apartamentos, salas, blocos, etc.
      table.string('complemento').nullable()

      // Timestamps para auditoria e controle temporal
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela enderecos
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove a tabela do schema especificado
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}