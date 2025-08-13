import type { HttpContext } from '@adonisjs/core/http'

import Ub from '#models/ub'

export default class UbsController {

    public async store({request, response}: HttpContext) {
        const body = request.body()
        
        const ubs = await Ub.create(body)

        response.status(201) 

        return {
            data: ubs,
        }
    }
    
    public async index() {
        const ubss = await Ub.all()
        
        return {
            data: ubss,
        }
    }

    public async show({params}: HttpContext) {
        const ubs = await Ub.findOrFail(params.id)

        return {
            data: ubs,
        }
    }

    public async destroy({params}: HttpContext) {
        const ubs = await Ub.findOrFail(params.id)

        await ubs.delete()
        return {
            message: "UBS excluído",
            data: ubs,
        }
    }

    public async update({params, request}: HttpContext) {
        const body = request.body()

        const ubs = await Ub.findOrFail(params.id)
        ubs.merge(body)

        await ubs.save()
        return {
            message: "UBS atualizado",
            data: ubs,
        }

    }
}