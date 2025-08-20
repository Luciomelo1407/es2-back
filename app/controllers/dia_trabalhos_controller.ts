import type { HttpContext } from '@adonisjs/core/http'

import DiaTrabalho from '#models/dia_trabalho'

export default class DiaTrabalhosController {
  public async store({ request, response }: HttpContext) {
    const body = request.body()

    const dia_trabalho = await DiaTrabalho.create(body)

    response.status(201)

    return {
      data: dia_trabalho,
    }
  }

  public async index() {
    const dia_trabalhos = await DiaTrabalho.all()

    return {
      data: dia_trabalhos,
    }
  }

  public async show({ params }: HttpContext) {
    const dia_trabalho = await DiaTrabalho.findOrFail(params.id)

    return {
      data: dia_trabalho,
    }
  }

  public async destroy({ params }: HttpContext) {
    const dia_trabalho = await DiaTrabalho.findOrFail(params.id)

    await dia_trabalho.delete()
    return {
      message: 'DiaTrabalho excluído',
      data: dia_trabalho,
    }
  }

  public async update({ params, request }: HttpContext) {
    const body = request.body()

    const dia_trabalho = await DiaTrabalho.findOrFail(params.id)
    dia_trabalho.merge(body)

    await dia_trabalho.save()
    return {
      message: 'DiaTrabalho atualizado',
      data: dia_trabalho,
    }
  }
}
