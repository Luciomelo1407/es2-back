import type { HttpContext } from '@adonisjs/core/http'

import Profissional from '#models/profissional';

export default class AuthController {
    public async register({ request }: HttpContext) {
        const data = request.only(["username", "email", "senha"]);

        const profissional = await Profissional.create(data);

        return profissional;
    }

    public async login({ request, response, auth }: HttpContext) {
        const { email, senha } = request.only(['email', 'senha'])

        try {
            // 1. Encontra o usuário e verifica a senha
            const profissional = await Profissional.verifyCredentials(email, senha)

            // 2. Faz o login e gera um novo token de acesso
            const token = await auth.authenticateUsing(['api'])

            return response.ok(token)
        } catch (error) {
            // O 'verifyCredentials' lança um erro se as credenciais forem inválidas
            return response.badRequest({
                message: 'Credenciais inválidas. Verifique seu e-mail e senha.',
            })
        }
    }
}