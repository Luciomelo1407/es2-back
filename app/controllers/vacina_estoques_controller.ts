import type { HttpContext } from '@adonisjs/core/http'

import VacinaEstoque from '#models/vacina_estoque'
import db from '@adonisjs/lucid/services/db'
import VacinaLote from '#models/vacina_lote'
import { DateTime } from 'luxon'

export default class VacinaEstoquesController {
  public async store({ request, response }: HttpContext) {
    const trx = await db.transaction()
    try {
      const {
        codLote,
        validade,
        sigla,
        nome,
        tipo,
        fabricante,
        doses,
        quantidade,
        estoqueId,
      }: {
        codLote: string
        validade: string
        sigla: string
        nome: string
        tipo: string
        fabricante: string
        doses: number
        quantidade: number
        estoqueId: number
      } = request.only([
        'codLote',
        'validade',
        'sigla',
        'nome',
        'tipo',
        'fabricante',
        'doses',
        'quantidade',
        'estoqueId',
      ])

      const vacinaLote = await VacinaLote.create(
        {
          codLote: codLote,
          sigla: sigla,
          validade: DateTime.fromFormat(validade, 'dd/MM/yyyy'),
          nome: nome,
          tipo: tipo,
          fabricante: fabricante,
          doses: doses,
        },
        { client: trx }
      )
      const vacinaEstoque = await VacinaEstoque.create(
        {
          estoqueId: estoqueId,
          quantidade: quantidade,
          vacinaId: vacinaLote.id,
        },
        { client: trx }
      )

      trx.commit()
      return response.sendSuccess({ vacinaLote, vacinaEstoque }, request, 201)
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async index() {
    const vacina_estoques = await VacinaEstoque.all()

    return {
      data: vacina_estoques,
    }
  }

  public async show({ params }: HttpContext) {
    const vacina_estoque = await VacinaEstoque.findOrFail(params.id)

    return {
      data: vacina_estoque,
    }
  }

  public async destroy({ params }: HttpContext) {
    const vacina_estoque = await VacinaEstoque.findOrFail(params.id)

    await vacina_estoque.delete()
    return {
      message: 'VacinaEstoque excluída',
      data: vacina_estoque,
    }
  }

  public async update({ params, request }: HttpContext) {
    const body = request.body()

    const vacina_estoque = await VacinaEstoque.findOrFail(params.id)
    vacina_estoque.merge(body)

    await vacina_estoque.save()
    return {
      message: 'VacinaEstoque atualizada',
      data: vacina_estoque,
    }
  }
}
