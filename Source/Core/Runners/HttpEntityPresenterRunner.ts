import { HttpPresenterHandler } from "../Presenters/HttpPresenterHandler"
import { EntityRunner } from "./EntityRunner"

export abstract class HttpEntityPresenterRunner extends EntityRunner {
    constructor(
        protected presenter: HttpPresenterHandler
    ) {
        super()
    }
}
