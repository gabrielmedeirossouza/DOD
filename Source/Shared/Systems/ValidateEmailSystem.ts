import { Context, Entity, EntitySystem } from "@/Core"

export class ValidateEmailSystem extends EntitySystem {
    execute(_: Context, entity: Entity) {
        if (!entity.has("Email")) return
        console.log("Validating email for entity:", entity.name)
    }
}
