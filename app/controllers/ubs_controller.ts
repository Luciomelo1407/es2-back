import type { HttpContext } from '@adonisjs/core/http'

import Ubs from '#models/ubs'

export default class UbsController {

    /**
     * Cadastra uma nova Unidade Básica de Saúde (UBS) no sistema
     * Registra informações essenciais da unidade incluindo dados do SUS e gestão
     */
    public async store({request, response}: HttpContext) {
        // Extrai apenas os campos específicos necessários para criar uma UBS
        // Filtra dados para garantir que apenas informações válidas sejam processadas
        const body = request.only(['nome', 'cnes', 'atende_sus', 'gestao', 'endereco_id'])
        
        // Cria o registro da UBS com as informações institucionais
        const ubs = await Ubs.create(body)

        // Define status HTTP 201 para indicar criação bem-sucedida da unidade
        response.status(201) 

        return {
            data: ubs,
        }
    }
    
    /**
     * Lista todas as Unidades Básicas de Saúde cadastradas no sistema
     * Fornece catálogo completo das unidades de saúde disponíveis
     */
    public async index() {
        // Busca todas as UBS sem filtros ou relações para listagem geral
        // Adequado para seleção de unidades e relatórios administrativos
        const ubss = await Ubs.all()
        
        return {
            data: ubss,
        }
    }

    /**
     * Exibe uma UBS específica baseada no ID fornecido
     * Permite visualização detalhada de uma unidade de saúde individual
     */
    public async show({params}: HttpContext) {
        // Localiza a UBS pelo ID ou retorna erro 404 se não encontrada
        // Essencial para páginas de detalhamento e gestão de unidades
        const ubs = await Ubs.findOrFail(params.id)

        return {
            data: ubs,
        }
    }

    /**
     * Remove uma UBS do sistema
     * Executa exclusão permanente da unidade de saúde
     */
    public async destroy({params}: HttpContext) {
        // Localiza a UBS a ser excluída
        const ubs = await Ubs.findOrFail(params.id)

        // Executa exclusão física do registro
        // Importante considerar impacto em profissionais, salas e outros recursos vinculados
        await ubs.delete()
        return {
            message: "UBS excluída",
            data: ubs,
        }
    }

    /**
     * Atualiza os dados de uma UBS existente
     * Permite modificação das informações institucionais e administrativas
     */
    public async update({params, request}: HttpContext) {
        // Obtém todos os dados de atualização da requisição
        const body = request.body()

        // Localiza a UBS a ser modificada
        const ubs = await Ubs.findOrFail(params.id)
        // Aplica as modificações preservando campos não alterados
        // Permite atualizações de nome, CNES, tipo de gestão, etc.
        ubs.merge(body)

        // Persiste as alterações no banco de dados
        await ubs.save()
        return {
            message: "UBS atualizada",
            data: ubs,
        }

    }
}