import { Age, Email, PersonName } from "@/Shared"
import { StudentUpdatedTag } from "../Tags"

export class UpdateStudentSystem implements System {
    async execute(ctx: Context) {
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

        const student = ctx.getEntity("student")
        student.add(new StudentUpdatedTag)

        console.log(`Estudante criado com sucesso!`)
        console.log(studentDto)
    }
}
