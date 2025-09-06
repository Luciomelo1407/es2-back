import Profissional from '#models/profissional'
import Ubs from '#models/ubs'
import { BaseSeeder } from '@adonisjs/lucid/seeders'
import db from '@adonisjs/lucid/services/db'
import { DateTime } from 'luxon'

/**
 * Seeder para criação de dados iniciais do sistema
 * Popula o banco com UBS e usuário administrador padrão
 * Essencial para inicialização e primeiros acessos ao sistema
 */
export default class extends BaseSeeder {
  /**
   * Executa a criação dos dados iniciais do sistema
   * Cria UBS modelo e usuário administrador com transação para consistência
   * Gera token de acesso inicial para facilitar primeiro login
   */
  async run() {
    // Inicia transação para garantir consistência dos dados relacionados
    // Se qualquer operação falhar, todas são desfeitas automaticamente
    const trx = await db.transaction()
    
    try {
      // Cria UBS modelo com dados placeholder
      // Serve como base inicial para testes e configuração do sistema
      const ubs = await Ubs.create(
        {
          cnes: 'xxxx',              // CNES placeholder - deve ser substituído em produção
          nome: 'xxxxxx',            // Nome placeholder para UBS de teste
          gestao: 'Gestao',          // Tipo de gestão genérico
          atendeSus: true,           // Assume atendimento SUS como padrão
        },
        { client: trx }              // Executa dentro da transação
      )

      // Cria usuário administrador padrão do sistema
      // Permite acesso inicial para configuração e gestão
      const admin = await Profissional.create(
        {
          email: 'admin@vacenf.com',           // Email padrão do administrador
          senha: '123',                        // Senha simples para ambiente de desenvolvimento
          nomeCompleto: 'admin',               // Nome identificador do administrador
          dataNascimento: DateTime.now(),      // Data atual como placeholder
          isAdmin: true,                       // Define como administrador do sistema
          cbo: 'xxxx',                        // CBO placeholder - deve ser substituído
          coren: 'xxxxxx',                    // COREN placeholder - deve ser substituído
          ubsId: ubs.id,                      // Vincula ao UBS criado acima
          cpf: '00100200300',                 // CPF de teste (formato válido mas fictício)
        },
        { client: trx }                       // Executa dentro da transação
      )

      // Confirma todas as operações da transação
      // Garante que UBS e administrador sejam criados em conjunto
      await trx.commit()
      
      // Gera token de acesso para o administrador criado
      // Facilita primeiro login sem necessidade de autenticação manual
      // Executado fora da transação pois já tem dados confirmados
      await Profissional.accessTokens.create(admin)
      
    } catch (error) {
      // Desfaz todas as operações em caso de erro
      // Mantém banco em estado consistente mesmo com falhas
      await trx.rollback()
      
      // Repassa erro para tratamento superior
      throw error
    }
  }
}