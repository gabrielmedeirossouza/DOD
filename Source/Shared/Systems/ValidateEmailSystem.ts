import { Context, Entity, EntitySystem } from "@/Core"
import { Email, EmailMalformed, EmailRequired, EmailTooLong, EmailValidationFailed, ValidationFailed } from "../Components"

export class ValidateEmailSystem extends EntitySystem {
    private EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    private EMAIL_MAX_LENGTH = 254

    execute(ctx: Context, entity: Entity) {
        if (!entity.has("Email")) return

        const email = entity.get(Email)

        const missingEmail = !email.value
        const emailTooLong = email.value.length > this.EMAIL_MAX_LENGTH
        const emailMalformed = !this.EMAIL_REGEX.test(email.value)

        if (missingEmail) {
            entity.add(new EmailRequired)
        }

        if (emailTooLong) {
            entity.add(new EmailTooLong(email.value, this.EMAIL_MAX_LENGTH))
        }

        if (emailMalformed) {
            entity.add(new EmailMalformed(email.value, this.EMAIL_REGEX))
        }

        if (missingEmail || emailTooLong || emailMalformed) {
            entity.add(new EmailValidationFailed)
            ctx.add(new ValidationFailed)
        }
    }
}
