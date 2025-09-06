import type { HttpContext } from '@adonisjs/core/http'

import VacinaEstoque from '#models/vacina_estoque'
import db from '@adonisjs/lucid/services/db'
import VacinaLote from '#models/vacina_lote'
import { DateTime } from 'luxon'

export default class VacinaEstoquesController {
  /**
   * Registra um novo lote de vacinas no estoque
   * Cria simultaneamente o lote e sua entrada no estoque usando transação para consistência
   */
  public async store({ request, response }: HttpContext) {
    // Inicia transação para garantir atomicidade entre criação do lote e entrada no estoque
    const trx = await db.transaction()
    try {
      // Extrai e tipifica os dados necessários para criar lote e estoque
      const {
        codLote,
        validade,
        sigla,
        nome,
        tipo,
        fabricante,
        doses,
        quantidade,
        estoqueId,
      }: {
        codLote: string
        validade: string
        sigla: string
        nome: string
        tipo: string
        fabricante: string
        doses: number
        quantidade: number
        estoqueId: number
      } = request.only([
        'codLote',
        'validade',
        'sigla',
        'nome',
        'tipo',
        'fabricante',
        'doses',
        'quantidade',
        'estoqueId',
      ])

      // Cria o registro do lote de vacina com suas características
      // Converte a data de validade do formato brasileiro para DateTime
      const vacinaLote = await VacinaLote.create(
        {
          codLote: codLote,
          sigla: sigla,
          validade: DateTime.fromFormat(validade, 'dd/MM/yyyy'),
          nome: nome,
          tipo: tipo,
          fabricante: fabricante,
          doses: doses,
        },
        { client: trx }
      )
      
      // Cria a entrada no estoque vinculando o lote ao local de armazenamento
      const vacinaEstoque = await VacinaEstoque.create(
        {
          estoqueId: estoqueId,
          quantidade: quantidade,
          vacinaId: vacinaLote.id,
        },
        { client: trx }
      )

      // Confirma a transação se ambas operações foram bem-sucedidas
      trx.commit()
      return response.sendSuccess({ vacinaLote, vacinaEstoque }, request, 201)
    } catch (error) {
      // Desfaz todas as operações em caso de erro
      await trx.rollback()
      throw error
    }
  }

  /**
   * Busca uma entrada específica de vacina no estoque usando IDs da vacina e do estoque
   * Utilizado para verificar se uma vacina específica existe em um estoque determinado
   */
  public async getByIds({ request, response, params }: HttpContext) {
    try {
      // Extrai os IDs compostos dos parâmetros da rota
      const vacinaId = params.vacinaId
      const estoqueId = params.estoqueId

      // Busca a entrada específica usando ambos os IDs como filtro
      const vacinaEstoque = await VacinaEstoque.query()
        .where('vacina_id', vacinaId)
        .where('estoque_id', estoqueId)
        .firstOrFail()

      console.log(vacinaEstoque)

      return response.sendSuccess(vacinaEstoque, request, 200)
    } catch (error) {
      throw error
    }
  }

  /**
   * Realiza transferência de vacinas entre estoques diferentes
   * Operação complexa que atualiza quantidades e cria registros conforme necessário
   */
  public async transferir({ request, response, params }: HttpContext) {
    // Utiliza transação para garantir consistência da transferência
    const trx = await db.transaction()
    try {
      let resultado = null
      const vacinaEstoqueId = params.id
      const { quantidade, estoqueDestinoId } = request.only(['quantidade', 'estoqueDestinoId'])
      console.log('DEBUGG', vacinaEstoqueId)
      
      // Localiza o estoque de origem e carrega informações do lote
      const vacinaEstoqueAtual = await VacinaEstoque.findOrFail(vacinaEstoqueId)
      await vacinaEstoqueAtual.load('vacinaLote')
      vacinaEstoqueAtual.useTransaction(trx)
      
      // Se a quantidade transferida é igual ao total, remove o registro de origem
      if (vacinaEstoqueAtual.quantidade === quantidade) {
        await vacinaEstoqueAtual.delete()
      } else {
        // Caso contrário, apenas reduz a quantidade no estoque de origem
        vacinaEstoqueAtual.quantidade = vacinaEstoqueAtual.quantidade - quantidade
        await vacinaEstoqueAtual.save()
      }

      // Verifica se já existe entrada da mesma vacina no estoque de destino
      const vacinaEstoqueDestino = await VacinaEstoque.query()
        .where('vacina_id', vacinaEstoqueAtual.vacinaId)
        .where('estoque_id', estoqueDestinoId)
        .first()

      if (vacinaEstoqueDestino) {
        // Se existe, incrementa a quantidade existente
        vacinaEstoqueDestino?.useTransaction(trx)
        vacinaEstoqueDestino.quantidade = vacinaEstoqueDestino.quantidade + quantidade
        await vacinaEstoqueDestino.save()
        resultado = vacinaEstoqueDestino
      } else {
        // Se não existe, cria nova entrada no estoque de destino
        const newVacinaEstoqueDestino = await VacinaEstoque.create(
          {
            vacinaId: vacinaEstoqueAtual.vacinaId,
            estoqueId: estoqueDestinoId,
            quantidade: quantidade,
          },
          { client: trx }
        )
        resultado = newVacinaEstoqueDestino
      }

      await trx.commit()

      return response.sendSuccess(resultado, request, 200)
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  /**
   * Lista todas as entradas de vacinas em estoque do sistema
   * Fornece visão geral de todo o inventário de vacinas
   */
  public async index() {
    // Busca todas as entradas sem carregamento de relações
    const vacina_estoques = await VacinaEstoque.all()

    return {
      data: vacina_estoques,
    }
  }

  /**
   * Exibe uma entrada específica de vacina no estoque
   * Visualização detalhada de um registro individual
   */
  public async show({ params }: HttpContext) {
    // Localiza a entrada específica no estoque
    const vacina_estoque = await VacinaEstoque.findOrFail(params.id)

    return {
      data: vacina_estoque,
    }
  }

  /**
   * Remove ou reduz quantidade de vacinas do estoque
   * Operação inteligente que pode remover registro ou apenas decrementar quantidade
   */
  public async destroy({ params, request, response }: HttpContext) {
    // Utiliza transação para operações que podem afetar múltiplos registros
    const trx = await db.transaction()
    try {
      const id = params.id
      const { quantidade } = request.only(['quantidade'])
      const vacinaEstoque = await VacinaEstoque.findOrFail(id)
      vacinaEstoque.useTransaction(trx)

      if (vacinaEstoque.quantidade === quantidade) {
        // Se quantidade a remover é igual ao total, verifica se deve excluir o lote
        await vacinaEstoque.load('vacinaLote')
        const vacinaLote = vacinaEstoque.vacinaLote
        await vacinaLote.load('vacinaEstoques')
        const vacinaLoteEstoques = vacinaLote.vacinaEstoques
        
        // Filtra outros estoques que ainda possuem este lote
        const vacinaEstoqueRestante = vacinaLoteEstoques.filter((element) => {
          element.id != vacinaEstoque.id
        })

        await vacinaEstoque.delete()
        
        // Se não há mais este lote em nenhum estoque, remove o lote completamente
        if (vacinaEstoqueRestante.length < 1) {
          vacinaLote.useTransaction(trx)
          await vacinaLote.delete()
        }
      } else {
        // Se quantidade é parcial, apenas reduz a quantidade no estoque
        vacinaEstoque.quantidade = vacinaEstoque.quantidade - quantidade
        await vacinaEstoque.save()
      }

      await trx.commit()
      return response.sendSuccess(null, request, 200)
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  /**
   * Atualiza os dados de uma entrada de vacina no estoque
   * Permite modificação de quantidades e outras informações do registro
   */
  public async update({ params, request }: HttpContext) {
    // Extrai dados de atualização da requisição
    const body = request.body()

    // Localiza a entrada no estoque a ser modificada
    const vacina_estoque = await VacinaEstoque.findOrFail(params.id)
    // Aplica as modificações preservando campos não alterados
    vacina_estoque.merge(body)

    // Persiste as alterações no banco de dados
    await vacina_estoque.save()
    return {
      message: 'VacinaEstoque atualizada',
      data: vacina_estoque,
    }
  }
}