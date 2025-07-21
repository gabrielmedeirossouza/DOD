import { UpdateStudentController } from "./Features/Student"
import { ConsoleHttpPresenterHandler } from "./Shared/Infra"

const controller = new UpdateStudentController(new ConsoleHttpPresenterHandler)

controller.handle({
    user: {
        name: "Gabriel Medeiros Souza",
        email: "gabriel@mail.com",
        age: 27
    },
    guardian: {
        name: "Edmar Aparecida de Oliveira Medeiros Souza",
        email: "edmar@mail.com",
        age: 55
    }
})

