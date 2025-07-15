import { Age, Email, GuardianTag, PersonName, StudentUpdatedTag, UserTag } from "@/Components"

export class UpdatedStudentPresenterSystem extends PresenterSystem {
    @With(StudentUpdatedTag)
    execute(entity: Entity, state: State): Promise<void> | void {
        const dto: HttpResponse = {
            status: HttpStatus.OK,
            data: {
                user: {},
                guardian: {}
            }
        }

        for (const child of state.em.getBuffer(entity, ChildReference)) {
            if (state.em.hasComponent(child.value, UserTag)) {
                const name = state.em.getComponent(child.value, PersonName)
                const email = state.em.getComponent(child.value, Email)
                const age = state.em.getComponent(child.value, Age)

                dto.data.user = {
                    name: name.value,
                    email: email.value,
                    age: age.value
                }
            }

            if (state.em.hasComponent(child.value, GuardianTag)) {
                const name = state.em.getComponent(child.value, PersonName)
                const email = state.em.getComponent(child.value, Email)

                dto.data.guardian = {
                    name: name.value,
                    email: email.value,
                }

                if (state.em.hasComponent(child.value, Age)) {
                    const age = state.em.getComponent(child.value, Age)
                    dto.data.guardian.age = age.value
                }
            }
        }

        this.presenter.present(dto)
    }
}
