export enum HttpStatus {
    OK = 200,
    Created = 201,
    BadRequest = 400,
    Unauthorized = 401,
    Forbidden = 403,
    NotFound = 404,
    InternalServerError = 500,
}

export type HttpResponseData = Record<string, any>

export interface HttpResponse {
    status: HttpStatus
    data: HttpResponseData
}
