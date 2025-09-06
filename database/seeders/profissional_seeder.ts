import Profissional from '#models/profissional'
import Ubs from '#models/ubs'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import { DateTime } from 'luxon'

/**
 * Seeder para criação de usuário comum do sistema
 * Popula o banco com profissional não-administrador para testes
 * Depende da existência prévia de uma UBS no banco de dados
 */
export default class extends BaseSeeder {
  /**
   * Executa a criação de um usuário comum no sistema
   * Busca UBS existente e cria profissional com perfil não-administrativo
   * Gera token de acesso para facilitar testes de autenticação
   */
  async run() {
    // Busca a primeira UBS disponível no banco de dados
    // Assume que já existe pelo menos uma UBS criada (dependência de outro seeder)
    // Utiliza optional chaining para lidar com possível ausência de UBS
    const ubs = await Ubs.first()
    
    // Cria usuário comum com perfil não-administrativo
    // Representa profissional de saúde padrão do sistema
    const user = await Profissional.create({
      email: 'user@vacenf.com',              // Email de teste para usuário comum
      senha: '123',                          // Senha simples para ambiente de desenvolvimento
      nomeCompleto: 'User',                  // Nome genérico para identificação
      dataNascimento: DateTime.now(),        // Data atual como placeholder
      isAdmin: false,                        // Define como usuário não-administrador
      cbo: 'xxxxxxxx',                      // CBO placeholder - deve ser substituído em produção
      coren: 'asefaefa',                    // COREN placeholder - deve ser substituído
      ubsId: ubs?.id,                       // Vincula à UBS encontrada (usa optional chaining)
      cpf: '10020030040',                   // CPF de teste diferente do admin
    })
    
    // Gera token de acesso para o usuário criado
    // Facilita testes de autenticação com perfil não-administrativo
    // Permite validar fluxos específicos de usuários comuns
    await Profissional.accessTokens.create(user)
  }
}