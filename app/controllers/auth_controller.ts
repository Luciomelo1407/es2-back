import type { HttpContext } from '@adonisjs/core/http'
import Profissional from '#models/profissional'

export default class AuthController {
  async login({ request, response }: HttpContext) {
    try {
      console.log('USUARIO AUTENTICADO')
      const { email, password } = request.only(['email', 'password'])

      const profissional = await Profissional.verifyCredentials(email, password)

      const access_token = await Profissional.accessTokens.create(profissional)

      if (!profissional) {
        return response.sendFail('Profissional não cadastrado.', request)
      }

      // Retorna sucesso com o token e os dados do profissional
      return response.sendSuccess({ profissional, access_token }, request)
    } catch (error) {
      throw error
    }
  }

  async signIn({ request, response }: HttpContext) {
    return
  }

  async logout({ auth, response }: HttpContext) {
    try {
      await auth.check()

      if (auth.user) {
        await auth.use('api').invalidateToken()

        return response.ok({
          message: 'Successfully logged out.',
        })
      }

      return response.unauthorized({ message: 'User is not logged in' })
    } catch (error) {
      return response.internalServerError({ message: 'Failed to log out' })
    }
  }

  async me({ auth, response, request }: HttpContext) {
    try {
      await auth.check()

      if (auth.user) {
        return response.sendSuccess(auth.user, request, 200)
      }

      return response.unauthorized({ message: 'Usuário não autenticado' })
    } catch (error) {
      return response.unauthorized({ message: 'Falha de altenticação' })
    }
  }
}
