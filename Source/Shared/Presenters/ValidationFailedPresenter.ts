import { Context } from "@/Core/Contexts"
import { HttpStatus } from "@/Core/Presenters"
import { HttpSystemPresenterRunner } from "@/Core/Runners"

export class ValidationFailedPresenter extends HttpSystemPresenterRunner {
    execute(ctx: Context): Promise<void> | void {
        if (!ctx.has("ValidationFailed")) return

        this.presenter.handle((accumulated) => {
            const accumulatedCodes = accumulated.map(item => {
                if (!item?.code || !item?.entity) throw new Error("Validation error must be valid.")

                return `${item.entity}:${item.code}`
            }).join(", ")

            return {
                status: HttpStatus.BadRequest,
                data: {
                    code: "validation_failed",
                    message: `Validation failed: ${accumulatedCodes}.`,
                    details: accumulated
                }
            }
        })
    }
}
