import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de dias de trabalho
 * Define estrutura para registro de atividades profissionais por sala
 * Tabela pivot que conecta profissionais às salas onde exercem atividades
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'dia_trabalhos'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela dia_trabalhos no schema base
   * Define relacionamentos obrigatórios entre profissionais e salas
   * Permite rastreamento de onde e quando profissionais trabalham
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')

      // Relacionamento obrigatório com profissional que trabalha
      // Unsigned garante valores positivos para chave estrangeira
      // NotNullable porque todo dia de trabalho deve ter profissional definido
      // CASCADE mantém consistência quando profissionais são alterados/removidos
      table
        .integer('profissional_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.profissionais')
        .onUpdate('CASCADE')  // Atualiza automaticamente se ID do profissional mudar
        .onDelete('CASCADE')  // Remove registro se profissional for excluído

      // Relacionamento obrigatório com sala onde o trabalho é realizado
      // Unsigned e obrigatório para localização precisa da atividade
      // CASCADE garante integridade quando salas são alteradas/removidas
      table
        .integer('sala_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('base.salas')
        .onUpdate('CASCADE')  // Atualiza automaticamente se ID da sala mudar
        .onDelete('CASCADE')  // Remove registro se sala for excluída

      // Timestamps para controle temporal das atividades
      // Created_at registra quando o dia de trabalho foi iniciado/registrado
      // Updated_at permite rastrear modificações nos registros
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela dia_trabalhos
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove todos os registros de dias de trabalho e relacionamentos
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}