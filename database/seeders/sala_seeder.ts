import Estoque from '#models/estoque'
import Sala from '#models/sala'
import VacinaEstoque from '#models/vacina_estoque'
import VacinaLote from '#models/vacina_lote'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

/**
 * Seeder para criação de estrutura de vacinação inicial
 * Popula o banco com sala, estoque e lote de vacina para testes
 * Estabelece cadeia completa de armazenamento e controle de imunobiológicos
 */
export default class extends BaseSeeder {
  /**
   * Executa a criação da infraestrutura de vacinação
   * Cria sequência dependente: Sala -> Estoque -> Lote -> Controle de Estoque
   * Utiliza transação para garantir consistência entre entidades relacionadas
   */
  async run() {
    // Inicia transação para garantir criação atômica de toda a estrutura
    // Se qualquer etapa falhar, toda a operação é desfeita
    const trx = await db.transaction()
    
    try {
      // Cria sala com ID fixo 0 para facilitar referências em testes
      // Sala básica sem especificações detalhadas (campos opcionais não preenchidos)
      const sala = await Sala.create({ id: 0 }, { client: trx })

      // Cria estoque tipo "Caixa Termica" vinculado à sala
      // Simula equipamento específico para armazenamento de vacinas
      // Tipo indica condições especiais de temperatura controlada
      const estoque = await Estoque.create(
        {
          tipo: 'Caixa Termica',        // Equipamento adequado para imunobiológicos
          salaId: sala.id,              // Vincula ao local físico específico
        },
        { client: trx }                 // Executa dentro da transação
      )

      // Cria lote de vacina COVID-19 da Pfizer com dados realistas
      // Estabelece controle completo de rastreabilidade e validade
      const vacinaLote = await VacinaLote.create(
        {
          codLote: 'ABC123456',                                    // Código de lote simulado mas realístico
          validade: DateTime.fromSQL('2025-08-19 17:10:30.329 -0300'), // Data de validade específica com timezone
          sigla: 'PFZ',                                           // Abreviação reconhecível da Pfizer
          nome: 'Pfizer-BioNTech',                               // Nome oficial da vacina
          tipo: 'mRNA',                                          // Tipo tecnológico específico
          fabricante: 'Pfizer',                                  // Fabricante oficial
          doses: 2,                                              // Esquema vacinal de duas doses
        },
        { client: trx }                                          // Executa dentro da transação
      )

      // Cria registro de controle de estoque conectando lote ao local
      // Estabelece quantidade inicial disponível para aplicação
      const vacina_estoque = await VacinaEstoque.create(
        { 
          quantidade: 10,                // 10 doses disponíveis inicialmente
          vacinaId: vacinaLote.id,      // Vincula ao lote específico criado
          estoqueId: estoque.id         // Localiza no estoque da caixa térmica
        },
        { client: trx }                 // Executa dentro da transação
      )

      // Confirma todas as operações da transação
      // Garante criação completa da estrutura de vacinação
      await trx.commit()
      
    } catch (error) {
      // Desfaz todas as operações em caso de falha
      // Mantém banco consistente evitando dados parciais
      await trx.rollback()
      
      // Propaga erro para tratamento superior
      throw error
    }
  }
}