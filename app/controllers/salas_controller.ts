import DiaTrabalho from '#models/dia_trabalho'
import Sala from '#models/sala'
import type { HttpContext } from '@adonisjs/core/http'

export default class SalasController {
  async getByProfissionalId({ request, response, params }: HttpContext) {
    try {
      const profissionalId = await params.id

      const diaTrabalho = await DiaTrabalho.query()
        .where('profissional_id', profissionalId)
        .orderBy('updated_at', 'desc')
        .firstOrFail()

      const sala = await Sala.findOrFail(diaTrabalho.salaId)

      return response.sendSuccess(sala, request, 200)
    } catch (error) {
      throw error
    }
  }
}
