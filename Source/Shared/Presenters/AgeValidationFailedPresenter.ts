import { Context, Entity, HttpEntityPresenter } from "@/Core"
import { AgeOutOfRange } from "../Components"

export class AgeValidationFailedPresenter extends HttpEntityPresenter {
    execute(_: Context, entity: Entity): Promise<void> | void {
        if (!entity.has("AgeValidationFailed")) return

        if (entity.has("AgeOutOfRange")) {
            const ageOutOfRange = entity.get(AgeOutOfRange)
            this.presenter.accumulate({
                entity: entity.name,
                code: "AgeOutOfRange",
                message: `Age out of range: ${ageOutOfRange.value} (min: ${ageOutOfRange.min}, max: ${ageOutOfRange.max})`,
                value: ageOutOfRange.value,
                min: ageOutOfRange.min,
                max: ageOutOfRange.max
            })
        }
    }
}
