import { Age, Email, PersonName } from "@/Shared"
import { StudentUpdatedTag } from "../Tags"
import { Context, HttpContextPresenter, HttpResponse, HttpStatus } from "@/Core"

export class UpdatedStudentPresenter extends HttpContextPresenter {
    execute(ctx: Context): Promise<void> | void {
        const student = ctx.getEntity("student")
        if (!student.has(StudentUpdatedTag)) return

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
                guardian: {
                    name: guardian.get(PersonName).value,
                    email: guardian.get(Email).value,
                    age: guardian.attemptGet(Age)?.value
                }
            }
        }

        this.presenter.handle(() => dto)
    }
}
