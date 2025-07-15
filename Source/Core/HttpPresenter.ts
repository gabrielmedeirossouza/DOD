import { HttpResponse } from "./HttpResponse"

export interface HttpPresenter {
    present(response: HttpResponse): Promise<void> | void
}
