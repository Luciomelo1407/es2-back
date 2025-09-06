import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de higienização de salas
 * Define estrutura para registro histórico de limpeza e desinfecção
 * Essencial para controle sanitário e cumprimento de protocolos de segurança
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'higiene_salas'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela higiene_salas no schema base
   * Define relacionamento com salas para controle de higienização
   * Utiliza timestamps como registro temporal dos procedimentos
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')

      // Relacionamento obrigatório com sala higienizada
      // Unsigned garante valores positivos para chave estrangeira
      // NotNullable porque todo registro deve estar vinculado a uma sala
      // CASCADE mantém consistência quando salas são alteradas/removidas
      table
        .integer('sala_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.salas')
        .onUpdate('CASCADE')  // Atualiza automaticamente se ID da sala mudar
        .onDelete('CASCADE')  // Remove registros se sala for excluída

      // Timestamps para controle temporal dos procedimentos de higiene
      // Created_at registra momento exato da higienização realizada
      // Essencial para rastreamento de frequência e conformidade com protocolos
      // Updated_at permite correções ou atualizações nos registros
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela higiene_salas
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove todo histórico de higienização das salas do sistema
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}