import { Context } from "@/Core/Contexts"
import { Entity } from "@/Core/Entities"
import { validationError } from "@/Core/Miscellaneous"
import { HttpEntityPresenterRunner } from "@/Core/Runners"
import { PersonNameMustContainFirstAndLastName, PersonNameTooLong } from "../Components"

export class PersonNameValidationFailedPresenter extends HttpEntityPresenterRunner {
    execute(_: Context, entity: Entity): Promise<void> | void {
        if (!entity.has("PersonNameValidationFailed")) return

        if (entity.has("PersonNameRequired")) {
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "person_name_required",
                    "Person name is required."
                )
            )
        }

        if (entity.has("PersonNameTooLong")) {
            const personNameTooLong = entity.get(PersonNameTooLong)
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "person_name_too_long",
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
                    "person_name_must_contain_first_and_last_name",
                    `Person name must contain first and last name: ${personNameMustContain.value}`,
                    {
                        value: personNameMustContain.value
                    }
                )
            )
        }
    }
}
