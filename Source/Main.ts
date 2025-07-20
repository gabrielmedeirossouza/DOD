import { Context } from "./Core"
import { Age, ConsoleHttpPresenterHandler, Email, PersonName, ValidateEmailSystem } from "./Shared"
import { UpdatedStudentPresenter, UpdateStudentSystem } from "./Features/Student"

const { ctx, user, guardian } = Context.create("student", "user", "guardian")

user.add(new PersonName("Gabriel Medeiros Souza"))
user.add(new Email("gabriel@mail.com"))
user.add(new Age(27))

guardian.add(new PersonName("Edmar Aparecida de Oliveira Medeiros Souza"))
guardian.add(new Email("edmar@mail.com"))
guardian.add(new Age(55))

ctx.addSystem(
    new UpdateStudentSystem,
    new ValidateEmailSystem,
    new UpdatedStudentPresenter(new ConsoleHttpPresenterHandler)
)
ctx.execute()
