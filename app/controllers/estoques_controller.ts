import type { HttpContext } from '@adonisjs/core/http'

import Estoque from '#models/estoque'
import RegTemperatura from '#models/reg_temperatura'
import { TemperaturaService } from '#services/temperatura_service'

export default class EstoquesController {
  public async getBySalaId({ request, response, params }: HttpContext) {
    try {
      const salaId = await params.id
      const estoques = await Estoque.query().preload('vacinaEstoque').where('sala_id', salaId)
      const estoqueId: number[] = []
      for (const estoque of estoques) {
        estoqueId.push(estoque.id)
        for (const vacinaEstoque of estoque.vacinaEstoque) {
          await vacinaEstoque.load('vacinaLote')
        }
      }
      const temperatura = await TemperaturaService.getTemperatura(estoqueId)
      return response.sendSuccess({ estoques, temperatura }, request, 200)
    } catch (error) {
      throw error
    }
  }
  public async getById({ request, response, params }: HttpContext) {
    const estoqueId = await params.id
    try {
      const estoque = await Estoque.findOrFail(estoqueId)
      await estoque.load('vacinaEstoque')

      for (const vacina of estoque.vacinaEstoque) {
        await vacina.load('vacinaLotes')
      }
      const temperatura = await RegTemperatura.query()
        .orderBy('updated_at', 'desc')
        .where('estoque_id', estoqueId)
        .firstOrFail()
      return response.sendSuccess({ estoque, temperatura }, request, 200)
    } catch (error) {
      throw error
    }
  }
  public async store({ request, response }: HttpContext) {
    const body = request.body()

    const estoque = await Estoque.create(body)

    response.status(201)

    return {
      data: estoque,
    }
  }

  public async index() {
    const estoques = await Estoque.all()

    return {
      data: estoques,
    }
  }

  public async show({ params }: HttpContext) {
    const estoque = await Estoque.findOrFail(params.id)

    return {
      data: estoque,
    }
  }

  public async destroy({ params }: HttpContext) {
    const estoque = await Estoque.findOrFail(params.id)

    await estoque.delete()
    return {
      message: 'Estoque excluído',
      data: estoque,
    }
  }

  public async update({ params, request }: HttpContext) {
    const body = request.body()

    const estoque = await Estoque.findOrFail(params.id)
    estoque.merge(body)

    await estoque.save()
    return {
      message: 'Estoque atualizado',
      data: estoque,
    }
  }
}
