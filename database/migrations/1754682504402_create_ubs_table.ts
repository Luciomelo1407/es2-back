import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de Unidades Básicas de Saúde (UBS)
 * Define a estrutura principal para cadastro de estabelecimentos de saúde
 * Inclui relacionamento com endereços e validações específicas do setor
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'ubs'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela ubs no schema base
   * Define campos essenciais para identificação e gestão das unidades
   * Estabelece relacionamento foreign key com a tabela de endereços
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')

      // Código CNES obrigatório - identificador oficial nacional
      // Cadastro Nacional de Estabelecimentos de Saúde é único por unidade
      table.string('cnes').notNullable()
      
      // Nome oficial da UBS obrigatório para identificação
      // Campo essencial para denominação da unidade de saúde
      table.string('nome').notNullable()
      
      // Tipo de gestão obrigatório (municipal, estadual, federal, etc.)
      // Define o modelo administrativo da unidade
      table.string('gestao').notNullable()
      
      // Indicador de atendimento SUS com valor padrão true
      // Assume que a maioria das UBS atende pelo Sistema Único de Saúde
      // Campo obrigatório para controle de cobertura universal
      table.boolean('atende_sus').notNullable().defaultTo(true)

      // Chave estrangeira para relacionamento com endereços
      // Permite localização geográfica precisa da UBS
      // Configurada com CASCADE para manter integridade referencial
      table
        .integer('endereco_id')
        .references('id')
        .inTable('base.enderecos')
        .onUpdate('CASCADE')  // Atualiza automaticamente se o ID do endereço mudar
        .onDelete('CASCADE')  // Remove a UBS se o endereço for excluído

      // Timestamps para auditoria e controle temporal
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela ubs
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove a tabela e todos os relacionamentos do schema especificado
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}