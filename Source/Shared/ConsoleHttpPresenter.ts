import { HttpPresenter } from "../Core/HttpPresenter"
import { HttpResponse } from "../Core/HttpResponse"

export class ConsoleHttpPresenter implements HttpPresenter {
    present(response: HttpResponse) {
        console.log("[HTTP Response]")
        console.log(JSON.stringify(response, null, 4))
    }
}
