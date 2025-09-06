import type { HttpContext } from '@adonisjs/core/http'

import VacinaLote from '#models/vacina_lote'

export default class VacinaLotesController {

    /**
     * Cadastra um novo lote de vacinas no sistema
     * Registra informações específicas do lote incluindo fabricante, validade e características
     */
    public async store({request, response}: HttpContext) {
        // Obtém todos os dados do lote enviados na requisição
        // Inclui código do lote, validade, fabricante, tipo de vacina, etc.
        const body = request.body()
        
        // Cria o registro do lote com todas as informações de rastreabilidade
        const vacina_lote = await VacinaLote.create(body)

        // Define status HTTP 201 para indicar criação bem-sucedida do lote
        response.status(201) 

        return {
            data: vacina_lote,
        }
    }

    /**
     * Lista todos os lotes de vacinas cadastrados no sistema
     * Fornece catálogo completo para controle de qualidade e rastreabilidade
     */
    public async index() {
        // Busca todos os lotes sem carregamento de relações para performance
        // Adequado para relatórios de inventário e controle de validade
        const vacina_lotes = await VacinaLote.all()
        
        return {
            data: vacina_lotes,
        }
    }

    /**
     * Exibe um lote específico de vacina baseado no ID fornecido
     * Permite visualização detalhada das características do lote
     */
    public async show({params}: HttpContext) {
        // Localiza o lote pelo ID ou retorna erro 404 se não encontrado
        // Essencial para auditoria e controle de qualidade específico
        const vacina_lote = await VacinaLote.findOrFail(params.id)

        return {
            data: vacina_lote,
        }
    }

    /**
     * Remove um lote de vacina do sistema
     * Executa exclusão permanente do registro de lote
     */
    public async destroy({params}: HttpContext) {
        // Localiza o lote a ser excluído
        const vacina_lote = await VacinaLote.findOrFail(params.id)

        // Executa exclusão física do registro
        // Importante verificar se há estoques relacionados antes da exclusão
        await vacina_lote.delete()
        return {
            message: "VacinaLote excluído",
            data: vacina_lote,
        }
    }

    /**
     * Atualiza os dados de um lote de vacina existente
     * Permite correção de informações de rastreabilidade e características
     */
    public async update({params, request}: HttpContext) {
        // Extrai os dados de atualização da requisição
        const body = request.body()

        // Localiza o lote a ser modificado
        const vacina_lote = await VacinaLote.findOrFail(params.id)
        // Aplica as modificações preservando campos não alterados
        // Permite correções de validade, fabricante, código do lote, etc.
        vacina_lote.merge(body)

        // Persiste as alterações no banco de dados
        await vacina_lote.save()
        return {
            message: "VacinaLote atualizado",
            data: vacina_lote,
        }

    }
}