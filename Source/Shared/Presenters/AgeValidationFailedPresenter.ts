import { Context } from "@/Core/Contexts"
import { Entity } from "@/Core/Entities"
import { HttpEntityPresenterRunner } from "@/Core/Runners"
import { AgeOutOfRange } from "../Components"
import { validationError } from "@/Core/Miscellaneous"

export class AgeValidationFailedPresenter extends HttpEntityPresenterRunner {
    execute(_: Context, entity: Entity): Promise<void> | void {
        if (!entity.has("AgeValidationFailed")) return

        if (entity.has("AgeOutOfRange")) {
            const ageOutOfRange = entity.get(AgeOutOfRange)
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "age_out_of_range",
                    `Age out of range: ${ageOutOfRange.value} (min: ${ageOutOfRange.min}, max: ${ageOutOfRange.max})`,
                    {
                        value: ageOutOfRange.value,
                        min: ageOutOfRange.min,
                        max: ageOutOfRange.max
                    }
                )
            )
        }
    }
}
