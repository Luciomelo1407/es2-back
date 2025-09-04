import Profissional from '#models/profissional'
import Ubs from '#models/ubs'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

export default class extends BaseSeeder {
  async run() {
    // Write your database queries inside the run method
    const ubs = await Ubs.first()
    const user = await Profissional.create({
      email: 'user@vacenf.com',
      senha: '123',
      nomeCompleto: 'User',
      dataNascimento: DateTime.now(),
      isAdmin: false,
      cbo: 'xxxxxxxx',
      coren: 'asefaefa',
      ubsId: ubs?.id,
      cpf: '10020030040',
    })
    await Profissional.accessTokens.create(user)
  }
}
