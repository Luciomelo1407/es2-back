import type { HttpContext } from '@adonisjs/core/http'

import HigieneSala from '#models/higiene_sala'

export default class HigieneSalasController {
    public async store({request, response}: HttpContext) {
        const body = request.body()
        
        const higiene_sala = await HigieneSala.create(body)

        response.status(201) 

        return {
            data: higiene_sala,
        }
    }

    public async index() {
        const higiene_salas = await HigieneSala.all()
        
        return {
            data: higiene_salas,
        }
    }

    public async show({params}: HttpContext) {
        const higiene_sala = await HigieneSala.findOrFail(params.id)

        return {
            data: higiene_sala,
        }
    }

    public async destroy({params}: HttpContext) {
        const higiene_sala = await HigieneSala.findOrFail(params.id)

        await higiene_sala.delete()
        return {
            message: "HigieneSala excluída",
            data: higiene_sala,
        }
    }

    public async update({params, request}: HttpContext) {
        const body = request.body()

        const higiene_sala = await HigieneSala.findOrFail(params.id)
        higiene_sala.merge(body)

        await higiene_sala.save()
        return {
            message: "HigieneSala atualizada",
            data: higiene_sala,
        }

    }
}