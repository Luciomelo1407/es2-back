import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de tokens de acesso para autenticação
 * Define estrutura para gerenciamento de sessões e autorização de usuários
 * Suporta diferentes tipos de tokens com controle de permissões e expiração
 */
export default class extends BaseSchema {
  // Nome da tabela padrão do AdonisJS para tokens de acesso
  protected tableName = 'auth_access_tokens'

  /**
   * Executa a criação da tabela auth_access_tokens
   * Define estrutura completa para sistema de autenticação baseado em tokens
   * Inclui controle de permissões, expiração e rastreamento de uso
   */
  async up() {
    this.schema.createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')
      
      // Relacionamento polimórfico com entidade autenticável (profissionais)
      // Unsigned e obrigatório para identificar o proprietário do token
      // CASCADE DELETE remove tokens quando profissional é excluído
      table
        .integer('tokenable_id')
        .notNullable()
        .unsigned()
        .references('id')
        .inTable('base.profissionais')
        .onDelete('CASCADE')  // Remove tokens órfãos automaticamente

      // Tipo do token obrigatório (API, bearer, session, etc.)
      // Permite diferentes estratégias de autenticação no mesmo sistema
      // Essencial para classificação e tratamento específico por tipo
      table.string('type').notNullable()
      
      // Nome opcional do token para identificação pelo usuário
      // Útil para tokens nomeados (ex: "Mobile App", "Desktop Client")
      // Facilita gerenciamento de múltiplos tokens por usuário
      table.string('name').nullable()
      
      // Hash do token obrigatório - valor criptografado armazenado
      // Nunca armazena o token em texto plano por segurança
      // Usado para validação durante autenticação
      table.string('hash').notNullable()
      
      // Permissões do token em formato texto (JSON serializado)
      // Define quais ações o portador do token pode executar
      // Implementa controle granular de autorização
      table.text('abilities').notNullable()
      
      // Timestamp de criação para auditoria
      table.timestamp('created_at')
      
      // Timestamp de última atualização
      table.timestamp('updated_at')
      
      // Timestamp opcional do último uso do token
      // Permite identificar tokens inativos e implementar políticas de limpeza
      // Útil para análise de padrões de uso e segurança
      table.timestamp('last_used_at').nullable()
      
      // Timestamp opcional de expiração do token
      // Permite implementar tokens com validade limitada
      // Melhora segurança forçando renovação periódica
      table.timestamp('expires_at').nullable()
    })
  }

  /**
   * Executa a remoção da tabela auth_access_tokens
   * Método de rollback que remove toda infraestrutura de autenticação
   * Invalida todos os tokens existentes no sistema
   */
  async down() {
    this.schema.dropTable(this.tableName)
  }
}