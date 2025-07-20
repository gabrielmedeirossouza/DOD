import { Context, Entity, HttpEntityPresenter, validationError } from "@/Core"
import { PersonNameMustContainFirstAndLastName, PersonNameTooLong } from "../Components"

export class PersonNameValidationFailedPresenter extends HttpEntityPresenter {
    execute(_: Context, entity: Entity): Promise<void> | void {
        if (!entity.has("PersonNameValidationFailed")) return

        if (entity.has("PersonNameRequired")) {
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "PersonNameRequired",
                    "Person name is required."
                )
            )
        }

        if (entity.has("PersonNameTooLong")) {
            const personNameTooLong = entity.get(PersonNameTooLong)
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "PersonNameTooLong",
                    `Person name is too long: ${personNameTooLong.value} (max length: ${personNameTooLong.maxLength})`,
                    {
                        value: personNameTooLong.value,
                        maxLength: personNameTooLong.maxLength
                    }
                )
            )
        }

        if (entity.has("PersonNameMustContainFirstAndLastName")) {
            const personNameMustContain = entity.get(PersonNameMustContainFirstAndLastName)
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "PersonNameMustContainFirstAndLastName",
                    `Person name must contain first and last name: ${personNameMustContain.value}`,
                    {
                        value: personNameMustContain.value
                    }
                )
            )
        }
    }
}
