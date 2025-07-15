import { Entity } from "./Entity"
import { HttpPresenter } from "./HttpPresenter"
import { State } from "./State"
import { System } from "./System"

export abstract class PresenterSystem implements System {
    constructor(
        protected presenter: HttpPresenter
    ) {}

    abstract execute(entity: Entity, state: State): Promise<void> | void
}
