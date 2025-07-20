import { HttpResponseHandler } from "./HttpPresenterHandler"
import { EntitySystem } from "./EntitySystem"

export abstract class HttpPresenter extends EntitySystem {
    constructor(
        protected presenter: HttpResponseHandler
    ) {
        super()
    }
}
