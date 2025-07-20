import { HttpResponseHandler } from "./HttpPresenterHandler"
import { EntitySystem } from "./EntitySystem"

export abstract class HttpEntityPresenter extends EntitySystem {
    constructor(
        protected presenter: HttpResponseHandler
    ) {
        super()
    }
}
