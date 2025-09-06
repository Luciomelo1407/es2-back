import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de registros de temperatura
 * Define estrutura para monitoramento térmico de estoques sensíveis
 * Essencial para controle de qualidade de vacinas e medicamentos termolábeis
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'reg_temperaturas'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela reg_temperaturas no schema base
   * Define relacionamentos para rastreabilidade e controle de qualidade
   * Estabelece auditoria completa dos registros térmicos
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')

      // Relacionamento obrigatório com estoque monitorado
      // Unsigned garante valores positivos para chave estrangeira
      // NotNullable porque todo registro deve estar vinculado a um estoque
      // CASCADE mantém consistência quando estoques são alterados/removidos
      table
        .integer('estoque_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.estoques')
        .onUpdate('CASCADE')  // Atualiza automaticamente se ID do estoque mudar
        .onDelete('CASCADE')  // Remove registros se estoque for excluído

      // Valor da temperatura registrada como float obrigatório
      // Float permite precisão decimal essencial para controle térmico
      // Obrigatório pois é o dado principal do monitoramento
      // Suporta valores negativos e positivos conforme necessário
      table.float('temperatura').notNullable()

      // Relacionamento obrigatório com profissional responsável pelo registro
      // Unsigned e obrigatório para rastreabilidade e auditoria
      // CASCADE garante integridade quando profissionais são alterados/removidos
      // Permite identificar quem realizou cada medição
      table
        .integer('profissional_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.profissionais')
        .onUpdate('CASCADE')  // Atualiza automaticamente se ID do profissional mudar
        .onDelete('CASCADE')  // Remove registros se profissional for excluído

      // Timestamps para controle temporal preciso dos registros
      // Created_at registra momento exato da medição de temperatura
      // Updated_at permite rastrear possíveis correções nos dados
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela reg_temperaturas
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove todo histórico de monitoramento térmico do sistema
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}