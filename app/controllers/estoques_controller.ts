import type { HttpContext } from '@adonisjs/core/http'

import Estoque from '#models/estoque'

export default class EstoquesController {
    public async store({request, response}: HttpContext) {
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

    public async show({params}: HttpContext) {
        const estoque = await Estoque.findOrFail(params.id)

        return {
            data: estoque,
        }
    }

    public async destroy({params}: HttpContext) {
        const estoque = await Estoque.findOrFail(params.id)

        await estoque.delete()
        return {
            message: "Estoque excluído",
            data: estoque,
        }
    }

    public async update({params, request}: HttpContext) {
        const body = request.body()

        const estoque = await Estoque.findOrFail(params.id)
        estoque.merge(body)

        await estoque.save()
        return {
            message: "Estoque atualizado",
            data: estoque,
        }

    }
}