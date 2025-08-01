import { Context } from "@/Core/Contexts"
import { Entity } from "@/Core/Entities"
import { EntityRunner } from "@/Core/Runners"
import { Age, AgeOutOfRange, AgeValidationFailed, ValidationFailed } from "../Components"

export class ValidateAgeSystem extends EntityRunner {
    private AGE_MIN = 16
    private AGE_MAX = 120

    execute(ctx: Context, entity: Entity) {
        if (!entity.has("Age")) return

        const age = entity.get(Age)

        const ageOutOfRange = age.value < this.AGE_MIN || age.value > this.AGE_MAX

        if (ageOutOfRange) {
            entity.add(new AgeOutOfRange(age.value, this.AGE_MIN, this.AGE_MAX))
            entity.add(new AgeValidationFailed)
            ctx.add(new ValidationFailed)
        }
    }
}
