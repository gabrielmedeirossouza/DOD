import './Globals'
import { Age, Email, PersonName } from "./Shared/Components"
import { Context } from "./Core/Context"
import { UpdateStudentSystem } from "./Features/Student/Systems"
import { ConsoleHttpPresenterHandler } from "./Shared/Presenters"
import { UpdatedStudentPresenter } from "./Features/Student/Presenters"

const { ctx, user, guardian } = Context.create("student", "user", "guardian")

user.add(new PersonName("Gabriel Medeiros Souza"))
user.add(new Email("gabriel@mail.com"))
user.add(new Age(27))

guardian.add(new PersonName("Edmar Aparecida de Oliveira Medeiros Souza"))
guardian.add(new Email("edmar@mail.com"))
guardian.add(new Age(55))

ctx.addSystem(new UpdateStudentSystem)
ctx.addSystem(new UpdatedStudentPresenter(new ConsoleHttpPresenterHandler))
ctx.executeSystems()
