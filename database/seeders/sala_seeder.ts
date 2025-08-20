import Estoque from '#models/estoque'
import Sala from '#models/sala'
import VacinaEstoque from '#models/vacina_estoque'
import VacinaLote from '#models/vacina_lote'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()
    try {
      const sala = await Sala.create({ id: 0 }, { client: trx })

      const estoque = await Estoque.create(
        {
          tipo: 'caixa termica',
          salaId: sala.id,
        },
        { client: trx }
      )

      const vacinaLote = await VacinaLote.create(
        {
          codLote: 'seagasegas',
          validade: DateTime.fromSQL('2025-08-19 17:10:30.329 -0300'),
          sigla: 'sefasefas',
          nome: 'sefeiasuhefas',
          tipo: 'asefasefas',
          fabricante: 'sefhasefiuase',
        },
        { client: trx }
      )

      const vacina_estoque = await VacinaEstoque.create(
        { quantidade: 10, vacinaId: vacinaLote.id, estoqueId: estoque.id },
        { client: trx }
      )

      await trx.commit()
    } catch (error) {
      console.log('deu merda')
      await trx.rollback()
      throw error
    }
  }
}
