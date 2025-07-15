import { Age, Email, GuardianTag, PersonName, StudentTag, StudentUpdatedTag, UserTag } from "@/Components";

export class UpdateStudentSystem implements System {
    @With(StudentTag)
    async execute(entity: Entity, state: State) {
        const studentDto: Record<any, any> = {
            user: {},
            guardian: {}
        }

        for (const child of state.em.getBuffer(entity, ChildReference)) {
            if (state.em.hasComponent(child.value, UserTag)) {
                studentDto.user.name = state.em.getComponent(child.value, PersonName).value
                studentDto.user.email = state.em.getComponent(child.value, Email).value
                studentDto.user.age = state.em.getComponent(child.value, Age).value
            }

            if (state.em.hasComponent(child.value, GuardianTag)) {
                studentDto.guardian.name = state.em.getComponent(child.value, PersonName).value
                studentDto.guardian.email = state.em.getComponent(child.value, Email).value

                if (state.em.hasComponent(child.value, Age)) {
                    studentDto.guardian.age = state.em.getComponent(child.value, Age).value
                }

            }
        }

        await new Promise((resolve) => {
            setTimeout(() => {
                resolve({})
            }, 1000)
        })

        state.em.addComponent(entity, new StudentUpdatedTag)

        console.log(`Estudante criado com sucesso!`)
        console.log(studentDto)
    }
}
