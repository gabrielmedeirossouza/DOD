import { ContextSystem } from "./ContextSystem"
import { HttpResponseHandler } from "./HttpPresenterHandler"

export abstract class HttpContextPresenter extends ContextSystem {
    constructor(
        protected presenter: HttpResponseHandler
    ) {
        super()
    }
}
