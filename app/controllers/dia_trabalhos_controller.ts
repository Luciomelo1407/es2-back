import type { HttpContext } from '@adonisjs/core/http'

import DiaTrabalho from '#models/dia_trabalho'
import Sala from '#models/sala'

export default class DiaTrabalhosController {
  public async store({ request, response }: HttpContext) {
    try {
      const { profissionalId, salaId }: { profissionalId: number; salaId: number } = request.only([
        'profissionalId',
        'salaId',
      ])

      const dia_trabalho = await DiaTrabalho.create({
        profissionalId: profissionalId,
        salaId: salaId,
      })

      const sala = await Sala.findOrFail(salaId)
      await sala.load('estoques')
      const estoques = sala.estoques

      return response.sendSuccess({ dia_trabalho, sala, estoques }, request, 201)
    } catch (error) {
      throw error
    }
  }

  public async getById({ request, response, params }: HttpContext) {
    try {
      const id = await params.id
      console.log('paramsId = ', params.id)
      const diaTrabalho = await DiaTrabalho.query()
        .where('profissional_id', id)
        .orderBy('updated_at', 'desc')
        .preload('sala')
        .firstOrFail()
      const sala = diaTrabalho.sala
      await sala.load('estoques')

      return response.sendSuccess({ diaTrabalho }, request, 200)
    } catch (error) {
      throw error
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
