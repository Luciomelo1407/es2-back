import DiaTrabalho from '#models/dia_trabalho'
import Sala from '#models/sala'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalasController {
  /**
   * Busca a sala onde o profissional está atualmente trabalhando
   * Retorna a sala mais recente baseada no último dia de trabalho registrado
   */
  async getByProfissionalId({ request, response, params }: HttpContext) {
    try {
      // Obtém o ID do profissional dos parâmetros da rota
      const profissionalId = await params.id

      // Busca o dia de trabalho mais recente do profissional
      // Ordena por updated_at decrescente para obter a atribuição atual
      const diaTrabalho = await DiaTrabalho.query()
        .where('profissional_id', profissionalId)
        .orderBy('updated_at', 'desc')
        .firstOrFail()

      // Localiza a sala associada ao dia de trabalho mais recente
      // Permite identificar onde o profissional está atualmente alocado
      const sala = await Sala.findOrFail(diaTrabalho.salaId)

      return response.sendSuccess(sala, request, 200)
    } catch (error) {
      // Propaga erro para tratamento global
      throw error
    }
  }
  
  /**
   * Cria uma nova sala no sistema
   * Estabelece um novo ambiente de trabalho para atividades de saúde
   */
  public async store({ request, response }: HttpContext) {
    // Obtém todos os dados da sala enviados na requisição
    const body = request.body()

    // Cria o novo registro de sala com as especificações fornecidas
    const sala = await Sala.create(body)

    // Define status HTTP 201 para indicar criação bem-sucedida
    response.status(201)

    return {
      data: sala,
    }
  }

  /**
   * Lista todas as salas cadastradas no sistema
   * Fornece visão geral de todos os ambientes de trabalho disponíveis
   */
  public async index() {
    // Busca todas as salas sem carregamento de relações para performance
    // Adequado para seleção de salas e listagens gerais
    const salas = await Sala.all()

    return {
      data: salas,
    }
  }

  /**
   * Exibe uma sala específica baseada no ID fornecido
   * Permite visualização detalhada de um ambiente específico
   */
  public async show({ params }: HttpContext) {
    // Localiza a sala pelo ID ou retorna erro 404 se não encontrada
    // Essencial para páginas de detalhamento e configuração de ambientes
    const sala = await Sala.findOrFail(params.id)

    return {
      data: sala,
    }
  }

  /**
   * Remove uma sala do sistema
   * Executa exclusão permanente do ambiente de trabalho
   */
  public async destroy({ params }: HttpContext) {
    // Localiza a sala a ser excluída
    const sala = await Sala.findOrFail(params.id)

    // Executa exclusão física do registro
    // Importante considerar impacto em estoques e dias de trabalho relacionados
    await sala.delete()
    return {
      message: "Sala excluído",
      data: sala,
    }
  }

  /**
   * Atualiza os dados de uma sala existente
   * Permite modificação das características e configurações do ambiente
   */
  public async update({ params, request }: HttpContext) {
    // Extrai os dados de atualização da requisição
    const body = request.body()

    // Localiza a sala a ser modificada
    const sala = await Sala.findOrFail(params.id)
    // Aplica as modificações preservando campos não alterados
    // Permite atualizações de capacidade, equipamentos, localização, etc.
    sala.merge(body)

    // Persiste as alterações no banco de dados
    await sala.save()
    return {
      message: "Sala atualizado",
      data: sala,
    }

  }
}