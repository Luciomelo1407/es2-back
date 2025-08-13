import type { HttpContext } from '@adonisjs/core/http'

import Profissional from '#models/profissional'

export default class ProfissionaisController {

    public async store({request, response}: HttpContext) {
        const body = request.body()
        
        const profissional = await Profissional.create(body)

        response.status(201) 

        return {
            data: profissional,
        }
    }

    public async index() {
        const profissionals = await Profissional.all()
        
        return {
            data: profissionals,
        }
    }

    public async show({params}: HttpContext) {
        const profissional = await Profissional.findOrFail(params.id)

        return {
            data: profissional,
        }
    }

    public async destroy({params}: HttpContext) {
        const profissional = await Profissional.findOrFail(params.id)

        await profissional.delete()
        return {
            message: "Profissional excluído",
            data: profissional,
        }
    }

    public async update({params, request}: HttpContext) {
        const body = request.body()

        const profissional = await Profissional.findOrFail(params.id)
        profissional.merge(body)

        await profissional.save()
        return {
            message: "Profissional atualizado",
            data: profissional,
        }

    }
}