import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration responsável pela criação do schema 'base'
 * Estabelece a estrutura organizacional fundamental do banco de dados
 * Agrupa tabelas relacionadas ao sistema de saúde em um namespace específico
 */
export default class extends BaseSchema {
  // Define o nome do schema a ser criado para organização lógica das tabelas
  protected schemaName = 'base'

  /**
   * Executa a criação do schema no banco de dados
   * Método executado durante o processo de migração (migration up)
   * Cria o namespace 'base' para abrigar as tabelas do sistema
   */
  async up() {
    // Cria o schema utilizando o nome definido na propriedade schemaName
    this.schema.createSchema(this.schemaName)
  }

  /**
   * Executa a remoção do schema do banco de dados
   * Método executado durante o processo de rollback (migration down)
   * Remove completamente o schema e todas as suas tabelas
   */
  async down() {
    // Remove o schema e todo seu conteúdo do banco de dados
    this.schema.dropSchema(this.schemaName)
  }
}