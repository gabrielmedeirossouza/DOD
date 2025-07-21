import { Context } from "../Contexts/Context"
import { Entity } from "../Entities/Entity"

export abstract class EntityRunner {
    readonly type = "entity_runner"
    abstract execute(ctx: Context, entity: Entity): Promise<void> | void
}
