import { Context } from "@/Core/Contexts"
import { SystemRunner } from "@/Core/Runners"
import { Age, Email, PersonName } from "@/Shared/Components"
import { StudentUpdated } from "../Components"

export class UpdateStudentSystem extends SystemRunner {
    async execute(ctx: Context) {
        if (ctx.has("ValidationFailed")) return

        const user = ctx.getEntity("user")
        const guardian = ctx.getEntity("guardian")

        const studentDto = {
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

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, 1000)
        })

        ctx.add(new StudentUpdated)

        console.log(`Estudante criado com sucesso!`)
        console.log(studentDto)
    }
}
