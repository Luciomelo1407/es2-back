import type { HttpContext } from '@adonisjs/core/http'

import Profissional from '#models/profissional'
import { DateTime } from 'luxon'
import DiaTrabalho from '#models/dia_trabalho'

export default class ProfissionaisController {
  /**
   * Cadastra um novo profissional de saúde no sistema
   * Cria o registro completo e gera automaticamente um token de acesso para autenticação
   */
  public async store({ request, response }: HttpContext) {
    try {
      // Extrai e tipifica os dados específicos necessários para criar um profissional
      // Utiliza destructuring com tipos explícitos para garantir validação de entrada
      const {
        nomeCompleto,
        coren,
        cbo,
        isAdmin,
        email,
        senha,
        dataNascimento,
        cpf,
        enderecoId,
      }: {
        nomeCompleto: string
        coren: string
        cbo: string
        isAdmin: boolean
        email: string
        senha: string
        dataNascimento: DateTime
        cpf: string
        enderecoId: number
      } = request.only([
        'nomeCompleto',
        'coren',
        'cbo',
        'isAdmin',
        'email',
        'senha',
        'dataNascimento',
        'cpf',
        'enderecoId',
      ])

      // Cria o registro do profissional com todos os dados obrigatórios
      // O modelo provavelmente aplicará hash na senha e outras validações
      const profissional = await Profissional.create({
        nomeCompleto: nomeCompleto,
        coren: coren,
        cbo: cbo,
        email: email,
        senha: senha,
        dataNascimento: dataNascimento,
        cpf: cpf,
        enderecoId: enderecoId,
        isAdmin: isAdmin,
      })

      // Gera automaticamente um token de acesso para o profissional recém-criado
      // Facilita o fluxo de cadastro + login imediato
      const accessToken = await Profissional.accessTokens.create(profissional)

      // Retorna tanto os dados do profissional quanto o token para uso imediato
      return response.sendSuccess({ profissional, accessToken }, request, 201)
    } catch (error) {
      // Propaga erro para tratamento global (ex: validação de email único)
      throw error
    }
  }

  /**
   * Lista todos os profissionais cadastrados no sistema
   * Fornece visão geral de todos os usuários da plataforma
   */
  public async index() {
    // Busca todos os profissionais sem carregamento de relações para performance
    // Adequado para listagens simples e seleção de profissionais
    const profissionals = await Profissional.all()

    return {
      data: profissionals,
    }
  }

  /**
   * Exibe um profissional específico baseado no ID fornecido
   * Utilizado para visualização de perfil individual
   */
  public async show({ params }: HttpContext) {
    // Localiza o profissional pelo ID ou retorna erro 404 se não encontrado
    // Essencial para páginas de perfil e detalhamento de usuário
    const profissional = await Profissional.findOrFail(params.id)

    return {
      data: profissional,
    }
  }

  /**
   * Remove um profissional do sistema
   * Executa exclusão permanente do usuário e todos os dados associados
   */
  public async destroy({ params }: HttpContext) {
    // Localiza o profissional a ser excluído
    const profissional = await Profissional.findOrFail(params.id)

    // Executa exclusão física do registro
    // Importante considerar impacto em registros relacionados (dias de trabalho, etc.)
    await profissional.delete()
    return {
      message: 'Profissional excluído',
      data: profissional,
    }
  }

  /**
   * Atualiza os dados de um profissional existente
   * Permite modificação do perfil e informações cadastrais
   */
  public async update({ params, request }: HttpContext) {
    // Obtém todos os dados enviados na requisição de atualização
    const body = request.body()

    // Localiza o profissional a ser atualizado
    const profissional = await Profissional.findOrFail(params.id)
    // Aplica as modificações preservando campos não alterados
    // O modelo deve validar campos únicos como email e COREN
    profissional.merge(body)

    // Persiste as alterações no banco de dados
    await profissional.save()
    return {
      message: 'Profissional atualizado',
      data: profissional,
    }
  }
}