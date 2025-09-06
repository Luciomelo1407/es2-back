import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import Profissional from '#models/profissional'
import Ubs from '#models/ubs'
import type { HasOne } from '@adonisjs/lucid/types/relations'

/**
 * Modelo que representa endereços no sistema
 * Estrutura reutilizável para armazenar informações de localização
 * Utilizado por profissionais e unidades básicas de saúde (UBS)
 */
export default class Endereco extends BaseModel {
  // Define explicitamente o schema e tabela no banco de dados
  static table = 'base.enderecos'

  /**
   * Identificador único do endereço
   * Chave primária que permite referenciamento por outras entidades
   */
  @column({ isPrimary: true })
  declare id: number

  /**
   * Código de Endereçamento Postal brasileiro
   * Utilizado para validação e preenchimento automático de dados
   */
  @column()
  declare cep: string

  /**
   * Unidade federativa (estado) do endereço
   * Componente essencial para localização geográfica
   */
  @column()
  declare estado: string

  /**
   * Município onde se localiza o endereço
   * Importante para relatórios regionais e logística
   */
  @column()
  declare cidade: string

  /**
   * Bairro ou distrito do endereço
   * Facilita localização mais precisa dentro da cidade
   */
  @column()
  declare bairro: string

  /**
   * Nome da rua, avenida ou logradouro
   * Identifica a via pública específica
   */
  @column()
  declare rua: string

  /**
   * Número do imóvel no logradouro
   * Campo opcional pois nem todos os locais possuem numeração
   */
  @column()
  declare numero: number | null

  /**
   * Informações adicionais do endereço
   * Campo opcional para apartamento, bloco, referências, etc.
   */
  @column()
  declare complemento: string | null

  /**
   * Relacionamento com profissional que possui este endereço
   * Permite acesso aos dados do profissional através do endereço
   */
  @hasOne(() => Profissional)
  declare profissional: HasOne<typeof Profissional>

  /**
   * Relacionamento com UBS que possui este endereço
   * Facilita localização das unidades de saúde
   */
  @hasOne(() => Ubs)
  declare ubs: HasOne<typeof Ubs>

  /**
   * Timestamp de criação do registro de endereço
   * Registra quando o endereço foi cadastrado no sistema
   */
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  /**
   * Timestamp da última atualização do endereço
   * Atualizado automaticamente quando há modificações nos dados
   * Útil para rastrear correções ou mudanças de endereço
   */
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}