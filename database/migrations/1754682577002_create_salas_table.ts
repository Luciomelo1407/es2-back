import { BaseSchema } from '@adonisjs/lucid/schema'

/**
 * Migration para criação da tabela de salas das UBS
 * Define estrutura para controle de condições estruturais e sanitárias
 * Foca em aspectos de acessibilidade, higienização e adequação para saúde
 */
export default class extends BaseSchema {
  // Nome da tabela a ser criada no banco de dados
  protected tableName = 'salas'
  // Schema onde a tabela será criada para organização
  protected schemaName = 'base'

  /**
   * Executa a criação da tabela salas no schema base
   * Define campos para avaliação estrutural e condições de higiene
   * Estabelece controles obrigatórios com valores padrão conservadores
   */
  async up() {
    this.schema.withSchema(this.schemaName).createTable(this.tableName, (table) => {
      // Chave primária auto-incrementável
      table.increments('id')

      // Tamanho da sala em metros quadrados como float nullable
      // Permite medições precisas e valores decimais para metragem
      // Nullable para salas sem medição ainda realizada
      table.float('tamanho').nullable()
      
      // Indicador de acessibilidade com valor padrão false
      // Conservador: assume não-acessível até comprovação contrária
      // Força verificação explícita de adequação para pessoas com deficiência
      table.boolean('acessibilidade').notNullable().defaultTo(false)
      
      // Condição de lavabilidade da parede com padrão false
      // Controle rigoroso para procedimentos de desinfecção
      // Essencial para manutenção da assepsia em ambientes de saúde
      table.boolean('parede_lavavel').notNullable().defaultTo(false)
      
      // Condição de lavabilidade do piso com padrão false
      // Fundamental para limpeza e controle de infecções
      // Piso adequado é crítico para segurança sanitária
      table.boolean('piso_lavavel').notNullable().defaultTo(false)
      
      // Condição de lavabilidade da porta com padrão false
      // Importante para controle de contaminação entre ambientes
      // Facilita protocolos de higienização completa
      table.boolean('porta_lavavel').notNullable().defaultTo(false)
      
      // Condição de lavabilidade da janela com padrão false
      // Contribui para manutenção da qualidade ambiental
      // Permite limpeza adequada para controle de vetores
      table.boolean('janela_lavavel').notNullable().defaultTo(false)
      
      // Condição de lavabilidade do teto com padrão false
      // Completa avaliação estrutural de capacidade de limpeza
      // Importante para prevenção de contaminação aérea
      table.boolean('teto_lavavel').notNullable().defaultTo(false)
      
      // Presença de pia com valor padrão false
      // Essencial para higienização das mãos pelos profissionais
      // Fundamental para cumprimento de protocolos de segurança
      table.boolean('pia').notNullable().defaultTo(false)

      // Timestamps para auditoria e controle temporal
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  /**
   * Executa a remoção da tabela salas
   * Método de rollback que desfaz completamente a criação da tabela
   * Remove todos os dados estruturais das salas do schema
   */
  async down() {
    this.schema.withSchema(this.schemaName).dropTable(this.tableName)
  }
}