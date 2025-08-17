import type { HttpContext } from '@adonisjs/core/http'
import Profissional from '#models/profissional'

export default class AuthController {

  async login({ request, response }: HttpContext) {
    try {
        const { email, password } = request.only(['email', 'password'])

        const profissional = await Profissional.verifyCredentials(email, password)

        if (!profissional) {
            // Retorna uma falha se o profissional não for encontrado
            return response.sendFail("Profissional não cadastrado.", request)
        }

        const accessToken = await Profissional.accessTokens.create(profissional)

        // Retorna sucesso com o token e os dados do profissional
        return response.sendSuccess({ accessToken, profissional }, request)
    } catch (error) {
        throw error
    }
  }

    async logout({ auth, response }: HttpContext) {
        try {
            await auth.check()

            if (auth.user) {
            await auth.use('api').invalidateToken()

            return response.ok({
                message: 'Successfully logged out.'
            })
            }

            return response.unauthorized({ message: 'User is not logged in' })
        } catch (error) {
            return response.internalServerError({ message: 'Failed to log out' })
        }
    }

    async me({ auth, response }: HttpContext) {
        try {
            await auth.check()

            if (auth.user) {
                return response.ok(auth.user)
            }

            return response.unauthorized({ message: 'Usuário não autenticado' })

        } catch (error) {
            return response.unauthorized({ message: 'Falha de altenticação' })
        }
    }
}