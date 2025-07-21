import { SystemRunner } from "./SystemRunner"
import { HttpPresenterHandler } from "../Presenters/HttpPresenterHandler"

export abstract class HttpSystemPresenterRunner extends SystemRunner {
    constructor(
        protected presenter: HttpPresenterHandler
    ) {
        super()
    }
}
