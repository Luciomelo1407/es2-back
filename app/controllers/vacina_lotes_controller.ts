import type { HttpContext } from '@adonisjs/core/http'

import VacinaLote from '#models/vacina_lote'

export default class VacinaLotesController {

    public async store({request, response}: HttpContext) {
        const body = request.body()
        
        const vacina_lote = await VacinaLote.create(body)

        response.status(201) 

        return {
            data: vacina_lote,
        }
    }

    public async index() {
        const vacina_lotes = await VacinaLote.all()
        
        return {
            data: vacina_lotes,
        }
    }

    public async show({params}: HttpContext) {
        const vacina_lote = await VacinaLote.findOrFail(params.id)

        return {
            data: vacina_lote,
        }
    }

    public async destroy({params}: HttpContext) {
        const vacina_lote = await VacinaLote.findOrFail(params.id)

        await vacina_lote.delete()
        return {
            message: "VacinaLote excluído",
            data: vacina_lote,
        }
    }

    public async update({params, request}: HttpContext) {
        const body = request.body()

        const vacina_lote = await VacinaLote.findOrFail(params.id)
        vacina_lote.merge(body)

        await vacina_lote.save()
        return {
            message: "VacinaLote atualizado",
            data: vacina_lote,
        }

    }
}