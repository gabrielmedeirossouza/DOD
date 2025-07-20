import { HttpResponseHandler } from "../../Core/HttpPresenterHandler"
import { HttpResponse, HttpResponseData } from "../../Core/HttpResponse"

export class ConsoleHttpPresenterHandler implements HttpResponseHandler {
    private accumulated: HttpResponseData[] = [];

    accumulate(response: HttpResponseData): void {
        this.accumulated.push(response);
    }

    handle(responseCallback: (accumulated: HttpResponseData[]) => HttpResponse): Promise<void> | void {
        const response = responseCallback(this.accumulated);
        this.accumulated = [];
        console.log("[HTTP Response]")
        console.log(JSON.stringify(response, null, 4))
    }
}
