import RegTemperatura from '#models/reg_temperatura'

export class TemperaturaService {
  // Your code here
  static async getTemperatura(estoqueIds: number[]) {
    const regTemperaturas: RegTemperatura[] = []
    for (const estoqueId of estoqueIds) {
      const temperatura = await RegTemperatura.query()
        .orderBy('updated_at', 'desc')
        .where('estoque_id', estoqueId)
        .first()
      if (temperatura) {
        regTemperaturas.push(temperatura)
      }
    }
    return regTemperaturas
  }
}
