import { Context } from "@/Core/Contexts"
import { Entity } from "@/Core/Entities"
import { validationError } from "@/Core/Miscellaneous"
import { HttpEntityPresenterRunner } from "@/Core/Runners"
import { EmailMalformed, EmailTooLong } from "../Components"

export class EmailValidationFailedPresenter extends HttpEntityPresenterRunner {
    execute(_: Context, entity: Entity): Promise<void> | void {
        if (!entity.has("EmailValidationFailed")) return

        if (entity.has("EmailRequired")) {
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "email_required",
                    "Email is required."
                )
            )
        }

        if (entity.has("EmailTooLong")) {
            const emailTooLong = entity.get(EmailTooLong)
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "email_too_long",
                    `Email is too long: ${emailTooLong.value} (max length: ${emailTooLong.maxLength})`,
                    {
                        value: emailTooLong.value,
                        maxLength: emailTooLong.maxLength
                    }
                )
            )
        }

        if (entity.has("EmailMalformed")) {
            const emailMalformed = entity.get(EmailMalformed)
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "email_malformed",
                    `Email is malformed: ${emailMalformed.value} (pattern: ${emailMalformed.pattern})`,
                    {
                        value: emailMalformed.value,
                        pattern: emailMalformed.pattern.toString()
                    }
                )
            )
        }
    }
}
