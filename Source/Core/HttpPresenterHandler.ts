import { HttpResponse, HttpResponseData } from "./HttpResponse"

export interface HttpResponseHandler {
    accumulate(response: HttpResponseData): void
    handle(responseCallback: (accumulated: HttpResponseData[]) => HttpResponse): Promise<void> | void
}
