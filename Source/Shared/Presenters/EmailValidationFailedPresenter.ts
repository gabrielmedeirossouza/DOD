import { Context, Entity, HttpEntityPresenter, validationError } from "@/Core"
import { EmailMalformed, EmailTooLong } from "../Components"

export class EmailValidationFailedPresenter extends HttpEntityPresenter {
    execute(_: Context, entity: Entity): Promise<void> | void {
        if (!entity.has("EmailValidationFailed")) return

        if (entity.has("EmailRequired")) {
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "EmailRequired",
                    "Email is required."
                )
            )
        }

        if (entity.has("EmailTooLong")) {
            const emailTooLong = entity.get(EmailTooLong)
            this.presenter.accumulate(
                validationError(
                    entity.name,
                    "EmailTooLong",
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
                    "EmailMalformed",
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
