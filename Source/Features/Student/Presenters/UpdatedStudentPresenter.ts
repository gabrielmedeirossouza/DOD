import { Context } from "@/Core/Contexts"
import { removeUndefined } from "@/Core/Miscellaneous"
import { HttpResponse, HttpStatus } from "@/Core/Presenters"
import { HttpSystemPresenterRunner } from "@/Core/Runners"
import { Age, Email, PersonName } from "@/Shared/Components"

export class UpdatedStudentPresenter extends HttpSystemPresenterRunner {
    execute(ctx: Context): Promise<void> | void {
        if (!ctx.has("StudentUpdated")) return

        const user = ctx.getEntity("user")
        const guardian = ctx.getEntity("guardian")

        const dto: HttpResponse = {
            status: HttpStatus.OK,
            data: {
                user: {
                    name: user.get(PersonName).value,
                    email: user.get(Email).value,
                    age: user.get(Age).value
                },
                guardian: removeUndefined({
                    name: guardian.get(PersonName).value,
                    email: guardian.get(Email).value,
                    age: guardian.attemptGet(Age)?.value
                })
            }
        }

        this.presenter.handle(() => dto)
    }
}
