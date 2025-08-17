import { Response, Request } from '@adonisjs/core/http'
import { DateTime } from 'luxon'

//Macro used to add the sendSuccess method into the class response
Response.macro('sendSuccess', function (this: Response, data: any, request: Request, status = 200) {
  // aqui pegamos o request via `this.ctx.request`
  return this.status(status).send({
    status,
    timeStamp: DateTime.now().toISO(),
    success: true,
    request_id: request.id(),
    result: data,
  })
})

// Response.macro('sendFail', function (this:Response, data:any,request:Request,status = 500){
//   return this.status(status).send({
//       status,
//       timeStamp: new Date().toISOString(),
//       success: false,
//       request_id: request.id(), //Diz que está errado mas tá certo
//       error:{
//
//       }
//     })
// })

// eslint-disable-next-line @typescript-eslint/no-shadow
Response.macro('sendFail', function (this: Response, data: any, request: Request, status = 500) {
  const timestamp = DateTime.now().toISO()
  const requestId = request.id()

  // Helper to create the error response body
  const createErrorResponse = (
    // eslint-disable-next-line @typescript-eslint/no-shadow
    status: number, // Status HTTP
    type: string,
    message: string,
    validationErrors: any[] = []
  ) => {
    return {
      status,
      timestamp,
      success: false,
      request_id: requestId,
      error: {
        type,
        code: status.toString(),
        message,
        ...(validationErrors.length > 0 && { validation_errors: validationErrors }),
      },
    }
  }

  // Criação do corpo da resposta de erro
  const errorResponse = createErrorResponse(
    status,
    data.code || 'INTERNAL_SERVER_ERROR',
    data.message || 'Erro',
    data.validationErrors || []
  )

  // Envia a resposta com status e corpo adequado
  return this.status(status).send(errorResponse)
})

declare module '@adonisjs/core/http' {
  interface Response {
    sendSuccess(data: any, request: Request, status?: number): any
    sendFail(data: any, request: Request, status?: number): any
  }
}
