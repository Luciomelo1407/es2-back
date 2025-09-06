import type { HttpContext } from '@adonisjs/core/http'
import Profissional from '#models/profissional'

export default class AuthController {
  /**
   * Realiza a autenticação do profissional no sistema
   * Verifica as credenciais fornecidas e gera um token de acesso para sessões futuras
   */
  async login({ request, response }: HttpContext) {
    try {
      console.log('USUARIO AUTENTICADO')
      
      // Extrai apenas os campos necessários da requisição para evitar dados desnecessários
      const { email, password } = request.only(['email', 'password'])

      // Utiliza o método do modelo para verificar se as credenciais são válidas
      // Este método provavelmente faz hash da senha e compara com o banco de dados
      const profissional = await Profissional.verifyCredentials(email, password)

      // Gera um token de acesso para o profissional autenticado
      // Este token será usado para autenticar requisições futuras
      const access_token = await Profissional.accessTokens.create(profissional)

      // Verifica se o profissional existe após a verificação de credenciais
      // Esta verificação parece redundante, pois verifyCredentials já deveria falhar se inválido
      if (!profissional) {
        return response.sendFail('Profissional não cadastrado.', request)
      }

      // Retorna sucesso com o token e os dados do profissional
      return response.sendSuccess({ profissional, access_token }, request)
    } catch (error) {
      // Propaga o erro para ser tratado por um middleware global de erro
      throw error
    }
  }

  /**
   * Método para registro de novos profissionais no sistema
   * Atualmente não implementado (método vazio)
   */
  async signIn({ request, response }: HttpContext) {
    return
  }

  /**
   * Realiza o logout do profissional, invalidando o token de acesso atual
   * Remove a sessão ativa do usuário do sistema
   */
  async logout({ auth, response }: HttpContext) {
    try {
      // Verifica se existe uma sessão de autenticação ativa
      await auth.check()

      if (auth.user) {
        // Invalida o token atual do usuário, removendo sua capacidade de fazer requisições autenticadas
        await auth.use('api').invalidateToken()

        return response.ok({
          message: 'Successfully logged out.',
        })
      }

      // Retorna erro se não há usuário logado para fazer logout
      return response.unauthorized({ message: 'User is not logged in' })
    } catch (error) {
      // Trata erros internos durante o processo de logout
      return response.internalServerError({ message: 'Failed to log out' })
    }
  }

  /**
   * Retorna as informações do usuário autenticado atual
   * Utilizado para verificar se o usuário ainda está logado e obter seus dados
   */
  async me({ auth, response, request }: HttpContext) {
    try {
      // Verifica se o token de autenticação é válido e se o usuário está logado
      await auth.check()

      if (auth.user) {
        // Retorna os dados do usuário autenticado usando o método padronizado de resposta de sucesso
        return response.sendSuccess(auth.user, request, 200)
      }

      // Retorna erro se não há usuário autenticado na sessão atual
      return response.unauthorized({ message: 'Usuário não autenticado' })
    } catch (error) {
      // Trata falhas de autenticação como erro de autorização
      return response.unauthorized({ message: 'Falha de altenticação' })
    }
  }
}