import type { HttpContext } from '@adonisjs/core/http'

import Profissional from '#models/profissional'
import { DateTime } from 'luxon'

export default class ProfissionaisController {
  public async store({ request, response }: HttpContext) {
    try {
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

      const accessToken = await Profissional.accessTokens.create(profissional)

      return response.sendSuccess({ profissional, accessToken }, request, 201)
    } catch (error) {
      throw error
    }
  }

  public async index() {
    const profissionals = await Profissional.all()

    return {
      data: profissionals,
    }
  }

  public async show({ params }: HttpContext) {
    const profissional = await Profissional.findOrFail(params.id)

    return {
      data: profissional,
    }
  }

  public async destroy({ params }: HttpContext) {
    const profissional = await Profissional.findOrFail(params.id)

    await profissional.delete()
    return {
      message: 'Profissional excluído',
      data: profissional,
    }
  }

  public async update({ params, request }: HttpContext) {
    const body = request.body()

    const profissional = await Profissional.findOrFail(params.id)
    profissional.merge(body)

    await profissional.save()
    return {
      message: 'Profissional atualizado',
      data: profissional,
    }
  }
}
