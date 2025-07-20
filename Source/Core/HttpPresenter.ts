import { Context } from "./Context"
import { HttpResponseHandler } from "./HttpPresenterHandler"
import { System } from "./System"

export abstract class HttpPresenter implements System {
    constructor(
        protected presenter: HttpResponseHandler
    ) {}

    abstract execute(ctx: Context): Promise<void> | void
}
