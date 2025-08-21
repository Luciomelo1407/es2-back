import type { HttpContext } from '@adonisjs/core/http'

import RegTemperatura from '#models/reg_temperatura'

export default class RegTemperaturasController {
  public async store({ request, response }: HttpContext) {
    const temperaturas: RegTemperatura[] = request.body()
    // console.log(request)
    console.log(temperaturas)

    const reg_temperatura = await RegTemperatura.createMany(temperaturas)

    response.sendSuccess(reg_temperatura, request, 201)

    return {
      data: reg_temperatura,
    }
  }

  public async index() {
    const reg_temperaturas = await RegTemperatura.all()

    return {
      data: reg_temperaturas,
    }
  }

  public async show({ params }: HttpContext) {
    const reg_temperatura = await RegTemperatura.findOrFail(params.id)

    return {
      data: reg_temperatura,
    }
  }

  public async destroy({ params }: HttpContext) {
    const reg_temperatura = await RegTemperatura.findOrFail(params.id)

    await reg_temperatura.delete()
    return {
      message: 'RegTemperatura excluído',
      data: reg_temperatura,
    }
  }

  public async update({ params, request }: HttpContext) {
    const body = request.body()

    const reg_temperatura = await RegTemperatura.findOrFail(params.id)
    reg_temperatura.merge(body)

    await reg_temperatura.save()
    return {
      message: 'RegTemperatura atualizado',
      data: reg_temperatura,
    }
  }
}
