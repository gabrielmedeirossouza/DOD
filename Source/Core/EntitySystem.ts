import { Context } from "./Context"
import { Entity } from "./Entity"

export abstract class EntitySystem {
    readonly type = "EntitySystem"
    abstract execute(ctx: Context, entity: Entity): Promise<void> | void
}
