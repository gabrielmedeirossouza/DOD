import { HttpResponse, HttpResponseData } from "./HttpResponse"

export interface HttpPresenterHandler {
    accumulate(response: HttpResponseData): void
    handle(responseCallback: (accumulated: HttpResponseData[]) => HttpResponse): Promise<void> | void
}
