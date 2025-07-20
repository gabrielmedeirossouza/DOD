import { Context, HttpContextPresenter, HttpStatus } from "@/Core"

export class ValidationFailedPresenter extends HttpContextPresenter {
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
                    code: "ValidationFailed",
                    message: `Validation failed: ${accumulatedCodes}.`,
                    details: accumulated
                }
            }
        })
    }
}
