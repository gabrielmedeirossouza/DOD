import { Context } from "./Core"
import { Age, AgeValidationFailedPresenter, ConsoleHttpPresenterHandler, Email, EmailValidationFailedPresenter, PersonName, PersonNameValidationFailedPresenter, ValidateAgeSystem, ValidateEmailSystem, ValidatePersonNameSystem, ValidationFailedPresenter } from "./Shared"
import { UpdatedStudentPresenter, UpdateStudentSystem } from "./Features/Student"

const { ctx, user, guardian } = Context.create("student", "user", "guardian")

user.add(new PersonName("Gabriel Medeiros Souza"))
user.add(new Email("gabriel@mail.com"))
user.add(new Age(27))

guardian.add(new PersonName("Edmar Aparecida de Oliveira Medeiros Souza"))
guardian.add(new Email("edmar@mail.com"))
guardian.add(new Age(55))

const presenterHandler = new ConsoleHttpPresenterHandler()

ctx.addSystem(
    new ValidatePersonNameSystem,
    new ValidateEmailSystem,
    new ValidateAgeSystem,
    new UpdateStudentSystem,
    new AgeValidationFailedPresenter(presenterHandler),
    new PersonNameValidationFailedPresenter(presenterHandler),
    new EmailValidationFailedPresenter(presenterHandler),
    new ValidationFailedPresenter(presenterHandler),
    new UpdatedStudentPresenter(presenterHandler)
)
ctx.execute()
