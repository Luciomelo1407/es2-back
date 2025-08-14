import type { HttpContext } from '@adonisjs/core/http'

import Ubs from '#models/ubs'

export default class UbsController {

    public async store({request, response}: HttpContext) {
        const body = request.only(['nome', 'cnes', 'atende_sus', 'gestao', 'endereco_id'])
        
        const ubs = await Ubs.create(body)

        response.status(201) 

        return {
            data: ubs,
        }
    }
    
    public async index() {
        const ubss = await Ubs.all()
        
        return {
            data: ubss,
        }
    }

    public async show({params}: HttpContext) {
        const ubs = await Ubs.findOrFail(params.id)

        return {
            data: ubs,
        }
    }

    public async destroy({params}: HttpContext) {
        const ubs = await Ubs.findOrFail(params.id)

        await ubs.delete()
        return {
            message: "UBS excluída",
            data: ubs,
        }
    }

    public async update({params, request}: HttpContext) {
        const body = request.body()

        const ubs = await Ubs.findOrFail(params.id)
        ubs.merge(body)

        await ubs.save()
        return {
            message: "UBS atualizada",
            data: ubs,
        }

    }
}