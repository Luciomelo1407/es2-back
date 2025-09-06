import type { HttpContext } from '@adonisjs/core/http'

import Estoque from '#models/estoque'
import RegTemperatura from '#models/reg_temperatura'
import { TemperaturaService } from '#services/temperatura_service'

export default class EstoquesController {
  /**
   * Busca todos os estoques de uma sala específica com suas vacinas e temperaturas
   * Retorna dados completos incluindo informações de temperatura de múltiplos estoques
   */
  public async getBySalaId({ request, response, params }: HttpContext) {
    try {
      // Obtém o ID da sala dos parâmetros da rota
      const salaId = await params.id
      
      // Busca estoques da sala precarregando as vacinas para evitar queries N+1
      const estoques = await Estoque.query().preload('vacinaEstoque').where('sala_id', salaId)
      
      // Coleta os IDs dos estoques para buscar informações de temperatura
      const estoqueId: number[] = []
      for (const estoque of estoques) {
        estoqueId.push(estoque.id)
        // Para cada vacina no estoque, carrega os lotes associados
        // Necessário para ter informações completas sobre as vacinas armazenadas
        for (const vacinaEstoque of estoque.vacinaEstoque) {
          await vacinaEstoque.load('vacinaLote')
        }
      }
      
      // Utiliza serviço especializado para obter dados de temperatura de todos os estoques
      // Centraliza a lógica de temperatura em um serviço dedicado
      const temperatura = await TemperaturaService.getTemperatura(estoqueId)
      
      return response.sendSuccess({ estoques, temperatura }, request, 200)
    } catch (error) {
      // Propaga erro para tratamento global
      throw error
    }
  }
  
  /**
   * Busca um estoque específico com todas as suas vacinas, lotes e temperatura mais recente
   * Fornece visão detalhada de um estoque individual incluindo histórico de temperatura
   */
  public async getById({ request, response, params }: HttpContext) {
    // Extrai o ID do estoque dos parâmetros
    const estoqueId = await params.id
    try {
      // Localiza o estoque específico e carrega suas vacinas
      const estoque = await Estoque.findOrFail(estoqueId)
      await estoque.load('vacinaEstoque')

      // Para cada vacina no estoque, carrega informações detalhadas dos lotes
      // Essencial para rastreabilidade e controle de qualidade das vacinas
      for (const vacina of estoque.vacinaEstoque) {
        await vacina.load('vacinaLotes')
      }
      
      // Busca o registro de temperatura mais recente do estoque
      // Ordena por updated_at decrescente para pegar a medição mais atual
      const temperatura = await RegTemperatura.query()
        .orderBy('updated_at', 'desc')
        .where('estoque_id', estoqueId)
        .firstOrFail()
        
      return response.sendSuccess({ estoque, temperatura }, request, 200)
    } catch (error) {
      // Propaga erro para tratamento global
      throw error
    }
  }
  
  /**
   * Cria um novo estoque no sistema
   * Estabelece um novo local de armazenamento para vacinas
   */
  public async store({ request, response }: HttpContext) {
    // Obtém todos os dados enviados na requisição
    const body = request.body()

    // Cria o novo registro de estoque
    const estoque = await Estoque.create(body)

    // Define status HTTP 201 para indicar criação bem-sucedida
    response.status(201)

    return {
      data: estoque,
    }
  }

  /**
   * Lista todos os estoques cadastrados no sistema
   * Fornece visão geral de todos os locais de armazenamento
   */
  public async index() {
    // Busca todos os estoques sem carregamento de relações para performance
    const estoques = await Estoque.all()

    return {
      data: estoques,
    }
  }

  /**
   * Exibe um estoque específico baseado no ID fornecido
   * Visualização básica de um estoque individual sem relações carregadas
   */
  public async show({ params }: HttpContext) {
    // Localiza o estoque pelo ID ou retorna erro 404 se não encontrado
    const estoque = await Estoque.findOrFail(params.id)

    return {
      data: estoque,
    }
  }

  /**
   * Remove um estoque específico do sistema
   * Executa exclusão permanente do local de armazenamento
   */
  public async destroy({ params }: HttpContext) {
    // Localiza o estoque a ser excluído
    const estoque = await Estoque.findOrFail(params.id)

    // Executa a exclusão física do registro
    await estoque.delete()
    return {
      message: 'Estoque excluído',
      data: estoque,
    }
  }

  /**
   * Atualiza os dados de um estoque existente
   * Permite modificação das informações do local de armazenamento
   */
  public async update({ params, request }: HttpContext) {
    // Extrai os dados de atualização da requisição
    const body = request.body()

    // Localiza o estoque a ser atualizado
    const estoque = await Estoque.findOrFail(params.id)
    // Mescla os novos dados com o registro existente
    estoque.merge(body)

    // Persiste as alterações no banco de dados
    await estoque.save()
    return {
      message: 'Estoque atualizado',
      data: estoque,
    }
  }
}