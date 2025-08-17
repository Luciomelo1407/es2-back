/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const EnderecosController = () => import('#controllers/enderecos_controller')
const UbsController = () => import('#controllers/ubs_controller')
const ProfissionaisController = () => import('#controllers/profissionais_controller')
const VacinaLotesController = () => import('#controllers/vacina_lotes_controller')
const SalasController = () => import('#controllers/salas_controller')
const EstoquesController = () => import('#controllers/estoques_controller')
const DiaTrabalhosController = () => import('#controllers/dia_trabalhos_controller')
const RegTemperaturasController = () => import('#controllers/reg_temperaturas_controller')
const VacinaEstoquesController = () => import('#controllers/vacina_estoques_controller')
const HigieneSalasController = () => import('#controllers/higiene_salas_controller')
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {

  router.resource('/enderecos', EnderecosController).apiOnly()
  router.resource('/ubs', UbsController).apiOnly()
  router.resource('/profissionais', ProfissionaisController).apiOnly()
  router.resource('/vacina_lotes', VacinaLotesController).apiOnly()
  router.resource('/salas', SalasController).apiOnly()
  router.resource('/estoques', EstoquesController).apiOnly()
  router.resource('/dia_trabalhos', DiaTrabalhosController).apiOnly()
  router.resource('/reg_temperaturas', RegTemperaturasController).apiOnly()
  router.resource('/vacina_estoques', VacinaEstoquesController).apiOnly()
  router.resource('/higiene_salas', HigieneSalasController).apiOnly()

}).prefix('/api')

router.post('/login', [AuthController,'login'])

router.group(() => {
  router.get('/me', [AuthController,'me'])
  router.post('/logout', [AuthController,'logout'])
}).prefix('/auth')
