import { Context } from "@/Core/Contexts"
import { HttpController, HttpControllerAssertion } from "@/Core/Controllers"
import { AgeValidationFailedPresenter, EmailValidationFailedPresenter, PersonNameValidationFailedPresenter, ValidationFailedPresenter } from "@/Shared/Presenters"
import { UpdatedStudentPresenter } from "./Presenters"
import { HttpPresenterHandler } from "@/Core/Presenters"
import { ValidateAgeSystem, ValidateEmailSystem, ValidatePersonNameSystem } from "@/Shared/Systems"
import { UpdateStudentSystem } from "./Systems"
import { Age, Email, PersonName } from "@/Shared/Components"

export class UpdateStudentController extends HttpController {
    constructor(
        private presenterHandler: HttpPresenterHandler
    ) {
        super()
    }

    async handle(data: any): Promise<void> {
        const { ctx, user, guardian } = Context.create("user", "guardian")

        const assertion = new HttpControllerAssertion(ctx, this.presenterHandler)

        assertion.assertObject(ctx, "user", data.user)
        assertion.assertString(user, "name", data.user.name)
        assertion.assertString(user, "email", data.user.email)
        assertion.assertNumber(user, "age", data.user.age)

        assertion.assertObject(ctx, "guardian", data.guardian)
        assertion.assertString(guardian, "name", data.guardian.name)
        assertion.assertString(guardian, "email", data.guardian.email)
        assertion.assertNumber(guardian, "age", data.guardian.age, true)


        if (!assertion.verify()) return

        user.add(new PersonName(data.user.name))
        user.add(new Email(data.user.email))
        user.add(new Age(data.user.age))

        guardian.add(new PersonName(data.guardian.name))
        guardian.add(new Email(data.guardian.email))

        if (data.guardian.age !== undefined)
            guardian.add(new Age(data.guardian.age))

        ctx.addSystem(
            new ValidatePersonNameSystem,
            new ValidateEmailSystem,
            new ValidateAgeSystem,
            new UpdateStudentSystem,
        )

        ctx.addSystem(
            new AgeValidationFailedPresenter(this.presenterHandler),
            new PersonNameValidationFailedPresenter(this.presenterHandler),
            new EmailValidationFailedPresenter(this.presenterHandler),
            new ValidationFailedPresenter(this.presenterHandler),
            new UpdatedStudentPresenter(this.presenterHandler)
        )

        ctx.execute()
    }
}
