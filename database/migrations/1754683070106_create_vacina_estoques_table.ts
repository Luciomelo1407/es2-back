import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de estoque de vacinas
 * Tabela pivot que conecta lotes de vacinas com locais de armazenamento
 * Define controle quantitativo e localização precisa de imunobiológicos
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'vacina_estoques'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela vacina_estoques no schema base
   * Define relacionamentos N:N entre vacinas e estoques com controle quantitativo
   * Estabelece chave primária composta para evitar duplicações
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Identificador único auto-incrementável para facilitar referências
      table.increments('id')

      // Relacionamento obrigatório com lote específico da vacina
      // Unsigned garante valores positivos para chave estrangeira
      // NotNullable porque todo estoque deve estar vinculado a um lote
      // CASCADE mantém consistência quando lotes são alterados/removidos
      table
        .integer('vacina_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.vacina_lotes')
        .onUpdate('CASCADE')  // Atualiza automaticamente se ID do lote mudar
        .onDelete('CASCADE')  // Remove estoque se lote for excluído

      // Relacionamento obrigatório com local de armazenamento
      // Unsigned e obrigatório para localização precisa das doses
      // CASCADE garante integridade quando estoques são alterados/removidos
      table
        .integer('estoque_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.estoques')
        .onUpdate('CASCADE')  // Atualiza automaticamente se ID do estoque mudar
        .onDelete('CASCADE')  // Remove registro se estoque for excluído

      // Quantidade de doses disponíveis no estoque como integer obrigatório
      // Controle numérico essencial para gestão de campanhas de vacinação
      // Permite cálculo de disponibilidade e planejamento de distribuição
      table.integer('quantidade').notNullable()

      // Chave primária composta para garantir unicidade da combinação
      // Impede registros duplicados da mesma vacina no mesmo estoque
      // Força a atualização da quantidade em vez de criar novos registros
      table.primary(['vacina_id', 'estoque_id'])

      // Timestamps para auditoria e controle de movimentação
      // Created_at registra entrada inicial das doses no estoque
      // Updated_at rastreia modificações nas quantidades
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela vacina_estoques
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove todo controle de estoque de vacinas do sistema
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}