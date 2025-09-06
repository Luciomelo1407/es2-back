import type { HttpContext } from '@adonisjs/core/http'

import DiaTrabalho from '#models/dia_trabalho'
import Sala from '#models/sala'

export default class DiaTrabalhosController {
  /**
   * Cria um novo dia de trabalho associando um profissional a uma sala específica
   * Retorna o dia de trabalho criado junto com os dados da sala e seus estoques
   */
  public async store({ request, response }: HttpContext) {
    try {
      // Extrai apenas os IDs necessários da requisição para criar a associação
      const { profissionalId, salaId }: { profissionalId: number; salaId: number } = request.only([
        'profissionalId',
        'salaId',
      ])

      // Cria o registro do dia de trabalho estabelecendo a relação profissional-sala
      const dia_trabalho = await DiaTrabalho.create({
        profissionalId: profissionalId,
        salaId: salaId,
      })

      // Busca os dados completos da sala para retornar informações relevantes
      const sala = await Sala.findOrFail(salaId)
      // Carrega os estoques relacionados à sala para fornecer contexto completo ao cliente
      await sala.load('estoques')
      const estoques = sala.estoques

      // Retorna sucesso com todos os dados necessários para o cliente
      return response.sendSuccess({ dia_trabalho, sala, estoques }, request, 201)
    } catch (error) {
      // Propaga o erro para tratamento global
      throw error
    }
  }

  /**
   * Busca o dia de trabalho mais recente de um profissional específico
   * Retorna o dia de trabalho com os dados da sala e estoques associados
   */
  public async getById({ request, response, params }: HttpContext) {
    try {
      // Obtém o ID do profissional dos parâmetros da rota
      const id = await params.id
      console.log('paramsId = ', params.id)
      
      // Busca o dia de trabalho mais recente do profissional
      // Ordena por updated_at decrescente para pegar o mais atual
      // Precarrega a sala para evitar queries N+1
      const diaTrabalho = await DiaTrabalho.query()
        .where('profissional_id', id)
        .orderBy('updated_at', 'desc')
        .preload('sala')
        .firstOrFail()
      
      // Obtém a referência da sala já carregada
      const sala = diaTrabalho.sala
      // Carrega os estoques da sala para fornecer informações completas
      await sala.load('estoques')

      // Retorna apenas o dia de trabalho (sala e estoques já estão incluídos via relação)
      return response.sendSuccess({ diaTrabalho }, request, 200)
    } catch (error) {
      // Propaga o erro para tratamento global
      throw error
    }
  }

  /**
   * Lista todos os dias de trabalho cadastrados no sistema
   * Método simples para recuperação completa dos registros
   */
  public async index() {
    // Busca todos os registros sem filtros ou relações carregadas
    const dia_trabalhos = await DiaTrabalho.all()

    return {
      data: dia_trabalhos,
    }
  }

  /**
   * Exibe um dia de trabalho específico baseado no ID fornecido
   * Busca um registro individual para visualização detalhada
   */
  public async show({ params }: HttpContext) {
    // Busca o dia de trabalho pelo ID ou falha se não encontrar
    const dia_trabalho = await DiaTrabalho.findOrFail(params.id)

    return {
      data: dia_trabalho,
    }
  }

  /**
   * Remove um dia de trabalho específico do sistema
   * Operação de exclusão permanente do registro
   */
  public async destroy({ params }: HttpContext) {
    // Localiza o registro a ser excluído
    const dia_trabalho = await DiaTrabalho.findOrFail(params.id)

    // Executa a exclusão do registro no banco de dados
    await dia_trabalho.delete()
    return {
      message: 'DiaTrabalho excluído',
      data: dia_trabalho,
    }
  }

  /**
   * Atualiza os dados de um dia de trabalho existente
   * Permite modificação de campos específicos do registro
   */
  public async update({ params, request }: HttpContext) {
    // Obtém todos os dados enviados no corpo da requisição
    const body = request.body()

    // Localiza o registro a ser atualizado
    const dia_trabalho = await DiaTrabalho.findOrFail(params.id)
    // Mescla os dados novos com o registro existente, atualizando apenas campos modificados
    dia_trabalho.merge(body)

    // Persiste as alterações no banco de dados
    await dia_trabalho.save()
    return {
      message: 'DiaTrabalho atualizado',
      data: dia_trabalho,
    }
  }
}