import type { HttpContext } from '@adonisjs/core/http'

import VacinaEstoque from '#models/vacina_estoque'

export default class VacinaEstoquesController {

    public async store({request, response}: HttpContext) {
        const body = request.body()
        
        const vacina_estoque = await VacinaEstoque.create(body)

        response.status(201) 

        return {
            data: vacina_estoque,
        }
    }
    
    public async index() {
        const vacina_estoques = await VacinaEstoque.all()
        
        return {
            data: vacina_estoques,
        }
    }

    public async show({params}: HttpContext) {
        const vacina_estoque = await VacinaEstoque.findOrFail(params.id)

        return {
            data: vacina_estoque,
        }
    }

    public async destroy({params}: HttpContext) {
        const vacina_estoque = await VacinaEstoque.findOrFail(params.id)

        await vacina_estoque.delete()
        return {
            message: "VacinaEstoque excluída",
            data: vacina_estoque,
        }
    }
    
    public async update({params, request}: HttpContext) {
        const body = request.body()

        const vacina_estoque = await VacinaEstoque.findOrFail(params.id)
        vacina_estoque.merge(body)

        await vacina_estoque.save()
        return {
            message: "VacinaEstoque atualizada",
            data: vacina_estoque,
        }

    }
}