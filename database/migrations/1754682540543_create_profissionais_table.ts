import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de profissionais de saúde
 * Define estrutura completa para cadastro de profissionais do sistema
 * Inclui dados pessoais, credenciais profissionais e relacionamentos com UBS
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'profissionais'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela profissionais no schema base
   * Define campos para identificação, autenticação e vinculação institucional
   * Estabelece relacionamentos com endereços e UBS com integridade referencial
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável obrigatória
      table.increments('id').notNullable()
      
      // Nome completo opcional para flexibilidade no cadastro inicial
      // Permite cadastro parcial e posterior complemento dos dados
      table.string('nome_completo').nullable()
      
      // COREN obrigatório - registro profissional específico de enfermagem
      // Cadastro obrigatório para validação da habilitação profissional
      table.string('coren').notNullable()
      
      // CBO obrigatório - Classificação Brasileira de Ocupações
      // Identifica a função/especialidade do profissional no sistema
      table.string('cbo').notNullable()
      
      // Email único obrigatório com limite de 254 caracteres (padrão RFC)
      // Usado para autenticação e comunicação, deve ser único no sistema
      table.string('email', 254).notNullable().unique()
      
      // Senha obrigatória para autenticação no sistema
      // Será hasheada antes do armazenamento por questões de segurança
      table.string('senha').notNullable()
      
      // Data de nascimento obrigatória para identificação e validações
      // Útil para controles de idade mínima e cálculos demográficos
      table.date('data_nascimento').notNullable()
      
      // CPF único obrigatório com 11 caracteres para identificação nacional
      // Documento fundamental para identificação no sistema brasileiro
      table.string('cpf', 11).notNullable().unique()
      
      // Flag de administrador com valor padrão false
      // Controla permissões especiais no sistema
      table.boolean('is_admin').defaultTo(false)

      // Relacionamento opcional com endereço pessoal do profissional
      // Unsigned para garantir valores positivos, nullable para flexibilidade
      // CASCADE mantém consistência quando endereços são alterados/removidos
      table
        .integer('endereco_id')
        .unsigned()
        .nullable()
        .references('id')
        .inTable('base.enderecos')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      // Relacionamento obrigatório com UBS de lotação
      // Unsigned e obrigatório pois todo profissional deve estar vinculado a uma UBS
      // CASCADE garante integridade quando UBS são alteradas/removidas
      table
        .integer('ubs_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.ubs')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')

      // Timestamp de criação obrigatório para auditoria
      table.timestamp('created_at').notNullable()
      
      // Timestamp de atualização nullable - só é preenchido quando há modificações
      table.timestamp('updated_at').nullable()
    })
  }

  /**
   * Executa a remoção da tabela profissionais
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove todos os dados e relacionamentos da tabela no schema
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}