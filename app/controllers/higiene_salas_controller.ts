import type { HttpContext } from '@adonisjs/core/http'

import HigieneSala from '#models/higiene_sala'

export default class HigieneSalasController {
    /**
     * Registra uma nova atividade de higiene realizada em uma sala
     * Cria um registro de controle para rastreabilidade das práticas de higienização
     */
    public async store({request, response}: HttpContext) {
        // Obtém todos os dados da atividade de higiene enviados na requisição
        // Inclui informações como data, produtos utilizados, responsável, etc.
        const body = request.body()
        
        // Cria o novo registro de higiene da sala no sistema
        const higiene_sala = await HigieneSala.create(body)

        // Define status HTTP 201 para indicar criação bem-sucedida do registro
        response.status(201) 

        return {
            data: higiene_sala,
        }
    }

    /**
     * Lista todos os registros de higiene de salas cadastrados no sistema
     * Fornece histórico completo das atividades de higienização realizadas
     */
    public async index() {
        // Busca todos os registros de higiene sem filtros ou paginação
        // Útil para relatórios e auditorias de práticas de higiene
        const higiene_salas = await HigieneSala.all()
        
        return {
            data: higiene_salas,
        }
    }

    /**
     * Exibe um registro específico de higiene de sala baseado no ID fornecido
     * Permite visualização detalhada de uma atividade de higienização específica
     */
    public async show({params}: HttpContext) {
        // Localiza o registro específico de higiene ou retorna erro 404
        // Essencial para auditoria e controle de qualidade das práticas
        const higiene_sala = await HigieneSala.findOrFail(params.id)

        return {
            data: higiene_sala,
        }
    }

    /**
     * Remove um registro de higiene de sala do sistema
     * Executa exclusão permanente do histórico de higienização
     */
    public async destroy({params}: HttpContext) {
        // Localiza o registro de higiene a ser excluído
        const higiene_sala = await HigieneSala.findOrFail(params.id)

        // Executa a exclusão física do registro
        // Importante considerar se exclusão é apropriada para dados de auditoria
        await higiene_sala.delete()
        return {
            message: "HigieneSala excluída",
            data: higiene_sala,
        }
    }

    /**
     * Atualiza os dados de um registro de higiene existente
     * Permite correção ou complemento das informações de higienização
     */
    public async update({params, request}: HttpContext) {
        // Extrai os dados de atualização da requisição
        const body = request.body()

        // Localiza o registro de higiene a ser modificado
        const higiene_sala = await HigieneSala.findOrFail(params.id)
        // Aplica as modificações aos campos especificados
        // Preserva dados não alterados do registro original
        higiene_sala.merge(body)

        // Persiste as alterações no banco de dados
        await higiene_sala.save()
        return {
            message: "HigieneSala atualizada",
            data: higiene_sala,
        }

    }
}