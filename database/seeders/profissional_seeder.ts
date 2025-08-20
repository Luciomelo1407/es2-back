import Profissional from '#models/profissional'
import Ubs from '#models/ubs'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const ubs = await Ubs.first()
    const user = await Profissional.create({
      email: 'czb@example.com',
      senha: '123',
      nomeCompleto: 'carlos',
      dataNascimento: DateTime.now(),
      isAdmin: false,
      cbo: 'xxxxssef',
      coren: 'asefaefa',
      ubsId: ubs?.id,
      cpf: 'sdfasefase',
    })
    await Profissional.accessTokens.create(user)
  }
}
