import { Context } from "@/Core/Contexts"
import { Entity } from "@/Core/Entities"
import { EntityRunner } from "@/Core/Runners"
import { PersonName, PersonNameMustContainFirstAndLastName, PersonNameRequired, PersonNameTooLong, PersonNameValidationFailed, ValidationFailed } from "../Components"

export class ValidatePersonNameSystem extends EntityRunner {
    private MAX_NAME_LENGTH = 200

    execute(ctx: Context, entity: Entity): Promise<void> | void {
        if (!entity.has("PersonName")) return

        const personName = entity.get(PersonName)

        const missingName = !personName.value
        const nameTooLong = personName.value.length > this.MAX_NAME_LENGTH
        const nameMustContainFirstAndLast = !this.containsFirstAndLastName(personName.value)

        if (missingName) {
            entity.add(new PersonNameRequired)
        }

        if (nameTooLong) {
            entity.add(new PersonNameTooLong(personName.value, this.MAX_NAME_LENGTH))
        }

        if (nameMustContainFirstAndLast) {
            entity.add(new PersonNameMustContainFirstAndLastName(personName.value))
        }

        if (missingName || nameTooLong || nameMustContainFirstAndLast) {
            entity.add(new PersonNameValidationFailed)
            ctx.add(new ValidationFailed)
        }
    }

    private containsFirstAndLastName(name: string): boolean {
        const parts = name.trim().split(/\s+/)
        return parts.length >= 2 && parts.every(part => part.length > 0)
    }
}
