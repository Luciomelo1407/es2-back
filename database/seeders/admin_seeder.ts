import Profissional from '#models/profissional'
import Ubs from '#models/ubs'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    const trx = await db.transaction()
    try {
      const ubs = await Ubs.create(
        {
          cnes: 'xxxx',
          nome: 'xxxxxx',
          gestao: 'gestao',
          atendeSus: true,
        },
        { client: trx }
      )

      const admin = await Profissional.create(
        {
          email: 'admin@example.com',
          senha: 'admin',
          nomeCompleto: 'admin',
          dataNascimento: DateTime.now(),
          isAdmin: true,
          cbo: 'xxxx',
          coren: 'xxxxxx',
          ubsId: ubs.id,
          cpf: 'lalalalal',
        },
        { client: trx }
      )

      await trx.commit()
      await Profissional.accessTokens.create(admin)
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }
}
