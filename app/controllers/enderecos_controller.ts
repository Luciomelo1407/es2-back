import type { HttpContext } from '@adonisjs/core/http'

import Endereco from '#models/endereco'

export default class EnderecosController {

    public async store({request, response}: HttpContext) {
        const body = request.body()
        
        const endereco = await Endereco.create(body)

        response.status(201) //Sucesso: Dado inserido 

        return {
            data: endereco,
        }
    }

    public async index() {
        const enderecos = await Endereco.all()
        
        return {
            data: enderecos,
        }
    }

    public async show({params}: HttpContext) {
        const endereco = await Endereco.findOrFail(params.id)

        return {
            data: endereco,
        }
    }

    public async destroy({params}: HttpContext) {
        const endereco = await Endereco.findOrFail(params.id)

        await endereco.delete()
        return {
            message: "Endereço excluído",
            data: endereco,
        }
    }

    public async update({params, request}: HttpContext) {
        const body = request.body()

        const endereco = await Endereco.findOrFail(params.id)
        endereco.merge(body)

        await endereco.save()
        return {
            message: "Endereço atualizado",
            data: endereco,
        }

    }
}