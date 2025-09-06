import type { HttpContext } from '@adonisjs/core/http'

import RegTemperatura from '#models/reg_temperatura'

export default class RegTemperaturasController {
  /**
   * Registra múltiplas leituras de temperatura simultaneamente no sistema
   * Otimizado para receber dados em lote de dispositivos de monitoramento
   */
  public async store({ request, response }: HttpContext) {
    // Recebe um array de objetos de temperatura da requisição
    // Permite inserção em lote para eficiência em sistemas IoT
    const temperaturas: RegTemperatura[] = request.body()
    // console.log(request)
    // Log para monitoramento e debug das temperaturas recebidas
    console.log(temperaturas)

    // Utiliza createMany para inserção otimizada de múltiplos registros
    // Mais eficiente que múltiplas chamadas create() individuais
    const reg_temperatura = await RegTemperatura.createMany(temperaturas)

    // Envia resposta de sucesso com os dados criados
    response.sendSuccess(reg_temperatura, request, 201)

    return {
      data: reg_temperatura,
    }
  }

  /**
   * Lista todos os registros de temperatura do sistema
   * Fornece histórico completo das medições realizadas
   */
  public async index() {
    // Busca todos os registros sem filtros ou paginação
    // Adequado para relatórios e análises de tendências térmicas
    const reg_temperaturas = await RegTemperatura.all()

    return {
      data: reg_temperaturas,
    }
  }

  /**
   * Exibe um registro específico de temperatura baseado no ID fornecido
   * Permite visualização detalhada de uma medição individual
   */
  public async show({ params }: HttpContext) {
    // Localiza o registro específico ou retorna erro 404
    // Útil para auditoria e investigação de eventos térmicos
    const reg_temperatura = await RegTemperatura.findOrFail(params.id)

    return {
      data: reg_temperatura,
    }
  }

  /**
   * Remove um registro de temperatura do sistema
   * Executa exclusão permanente do histórico de medição
   */
  public async destroy({ params }: HttpContext) {
    // Localiza o registro a ser excluído
    const reg_temperatura = await RegTemperatura.findOrFail(params.id)

    // Executa exclusão física do registro
    // Importante considerar se exclusão é apropriada para dados de compliance
    await reg_temperatura.delete()
    return {
      message: 'RegTemperatura excluído',
      data: reg_temperatura,
    }
  }

  /**
   * Atualiza os dados de um registro de temperatura existente
   * Permite correção de medições ou adição de informações complementares
   */
  public async update({ params, request }: HttpContext) {
    // Extrai os dados de atualização da requisição
    const body = request.body()

    // Localiza o registro a ser modificado
    const reg_temperatura = await RegTemperatura.findOrFail(params.id)
    // Aplica as modificações preservando dados não alterados
    // Útil para corrigir timestamps ou adicionar observações
    reg_temperatura.merge(body)

    // Persiste as alterações no banco de dados
    await reg_temperatura.save()
    return {
      message: 'RegTemperatura atualizado',
      data: reg_temperatura,
    }
  }
}