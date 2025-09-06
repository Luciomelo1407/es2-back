import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de estoques
 * Define estrutura para controle de armazenamento de materiais e medicamentos
 * Vincula estoques às salas específicas para localização precisa dos insumos
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'estoques'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela estoques no schema base
   * Define relacionamento obrigatório com salas e classificação por tipo
   * Estabelece integridade referencial com CASCADE para consistência
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')

      // Relacionamento obrigatório com sala onde o estoque está localizado
      // Unsigned garante valores positivos para a chave estrangeira
      // NotNullable porque todo estoque deve ter localização definida
      // CASCADE mantém consistência quando salas são alteradas ou removidas
      table
        .integer('sala_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.salas')
        .onUpdate('CASCADE')  // Atualiza automaticamente se ID da sala mudar
        .onDelete('CASCADE')  // Remove estoque se a sala for excluída

      // Tipo de estoque obrigatório para classificação dos materiais
      // Permite categorização (medicamentos, vacinas, materiais, equipamentos)
      // Essencial para organização e controle diferenciado por categoria
      table.string('tipo').notNullable()

      // Timestamps para auditoria e controle temporal
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela estoques
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove todos os registros de estoque e seus relacionamentos
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}