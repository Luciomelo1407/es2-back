import type { HttpContext } from '@adonisjs/core/http'

import Endereco from '#models/endereco'

export default class EnderecosController {

    /**
     * Cria um novo endereço no sistema
     * Recebe os dados do endereço via requisição e persiste no banco de dados
     */
    public async store({request, response}: HttpContext) {
        // Obtém todos os dados enviados no corpo da requisição
        // Assume que o modelo Endereco validará os campos obrigatórios
        const body = request.body()
        
        // Cria o novo registro de endereço com os dados fornecidos
        const endereco = await Endereco.create(body)

        // Define manualmente o status HTTP 201 (Created) para indicar criação bem-sucedida
        response.status(201) 

        return {
            data: endereco,
        }
    }

    /**
     * Lista todos os endereços cadastrados no sistema
     * Retorna uma coleção completa sem filtros ou paginação
     */
    public async index() {
        // Busca todos os registros de endereço do banco de dados
        const enderecos = await Endereco.all()
        
        return {
            data: enderecos,
        }
    }

    /**
     * Exibe um endereço específico baseado no ID fornecido
     * Utilizado para visualização detalhada de um registro individual
     */
    public async show({params}: HttpContext) {
        // Busca o endereço pelo ID ou lança exceção se não encontrar
        // findOrFail garante que uma resposta 404 seja retornada para IDs inválidos
        const endereco = await Endereco.findOrFail(params.id)

        return {
            data: endereco,
        }
    }

    /**
     * Remove um endereço específico do sistema
     * Executa exclusão permanente do registro do banco de dados
     */
    public async destroy({params}: HttpContext) {
        // Localiza o endereço a ser excluído, falhando se não existir
        const endereco = await Endereco.findOrFail(params.id)

        // Executa a exclusão física do registro
        await endereco.delete()
        return {
            message: "Endereço excluído",
            data: endereco,
        }
    }

    /**
     * Atualiza os dados de um endereço existente
     * Permite modificação parcial ou completa dos campos do registro
     */
    public async update({params, request}: HttpContext) {
        // Extrai todos os dados enviados na requisição de atualização
        const body = request.body()

        // Localiza o endereço a ser atualizado
        const endereco = await Endereco.findOrFail(params.id)
        // Mescla os novos dados com o registro existente
        // Apenas os campos presentes no body serão atualizados
        endereco.merge(body)

        // Persiste as alterações no banco de dados
        await endereco.save()
        return {
            message: "Endereço atualizado",
            data: endereco,
        }

    }
}