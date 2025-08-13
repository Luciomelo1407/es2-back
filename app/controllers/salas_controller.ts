import type { HttpContext } from '@adonisjs/core/http'

import Sala from '#models/sala'

export default class SalasController {

    public async store({request, response}: HttpContext) {
        const body = request.body()
        
        const sala = await Sala.create(body)

        response.status(201) 

        return {
            data: sala,
        }
    }

    public async index() {
        const salas = await Sala.all()
        
        return {
            data: salas,
        }
    }

    public async show({params}: HttpContext) {
        const sala = await Sala.findOrFail(params.id)

        return {
            data: sala,
        }
    }

    public async destroy({params}: HttpContext) {
        const sala = await Sala.findOrFail(params.id)

        await sala.delete()
        return {
            message: "Sala excluído",
            data: sala,
        }
    }

    public async update({params, request}: HttpContext) {
        const body = request.body()

        const sala = await Sala.findOrFail(params.id)
        sala.merge(body)

        await sala.save()
        return {
            message: "Sala atualizado",
            data: sala,
        }

    }
}