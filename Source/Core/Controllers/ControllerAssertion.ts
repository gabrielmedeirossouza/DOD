import { ValidationFailed } from "@/Shared/Components"
import { Context } from "../Contexts"
import { HttpPresenterHandler } from "../Presenters"
import { validationError } from "../Miscellaneous"
import { Entity } from "../Entities"
import { ValidationFailedPresenter } from "@/Shared/Presenters"

export class ControllerAssertion {
    constructor(
        private ctx: Context,
        private presenterHandler: HttpPresenterHandler
    ) {}

    assertString(entity: Entity, field: string, value: any, optional = false): void {
        if (this.getCorrectTypeName(value) !== "string") {
            if (optional && value === undefined) return

            this.ctx.add(new ValidationFailed)

            this.presenterHandler.accumulate(
                validationError(
                    entity.name,
                    "field_not_string",
                    `Expected ${field} to be a string, but received ${this.getCorrectTypeName(value)}`,
                    {
                        field,
                        expected: "string",
                        received: this.getCorrectTypeName(value)
                    }
                )
            )
        }
    }

    assertNumber(entity: Entity, field: string, value: any, optional = false): void {
        if (this.getCorrectTypeName(value) !== "number") {
            if (optional && value === undefined) return

            this.ctx.add(new ValidationFailed)

            this.presenterHandler.accumulate(
                validationError(
                    entity.name,
                    "field_not_number",
                    `Expected ${field} to be a number, but received ${this.getCorrectTypeName(value)}`,
                    {
                        field,
                        expected: "number",
                        received: this.getCorrectTypeName(value)
                    }
                )
            )
        }
    }

    assertBoolean(entity: Entity, field: string, value: any, optional = false): void {
        if (this.getCorrectTypeName(value) !== "boolean") {
            if (optional && value === undefined) return

            this.ctx.add(new ValidationFailed)

            this.presenterHandler.accumulate(
                validationError(
                    entity.name,
                    "field_not_boolean",
                    `Expected ${field} to be a boolean, but received ${this.getCorrectTypeName(value)}`,
                    {
                        field,
                        expected: "boolean",
                        received: this.getCorrectTypeName(value)
                    }
                )
            )
        }
    }

    assertObject(entity: Entity, field: string, value: any, optional = false): void {
        if (this.getCorrectTypeName(value) !== "object") {
            if (optional && value === undefined) return

            this.ctx.add(new ValidationFailed)

            this.presenterHandler.accumulate(
                validationError(
                    entity.name,
                    "field_not_object",
                    `Expected ${field} to be an object, but received ${this.getCorrectTypeName(value)}`,
                    {
                        field,
                        expected: "object",
                        received: this.getCorrectTypeName(value)
                    }
                )
            )
        }
    }

    assertArray(entity: Entity, field: string, value: any, optional = false): void {
        if (this.getCorrectTypeName(value) !== "array") {
            if (optional && value === undefined) return

            this.ctx.add(new ValidationFailed)

            this.presenterHandler.accumulate(
                validationError(
                    entity.name,
                    "field_not_array",
                    `Expected ${field} to be an array, but received ${this.getCorrectTypeName(value)}`,
                    {
                        field,
                        expected: "array",
                        received: this.getCorrectTypeName(value)
                    }
                )
            )
        }
    }

    verify() {
        if (this.ctx.has("ValidationFailed")) {
            this.ctx.addSystem(new ValidationFailedPresenter(this.presenterHandler))
            this.ctx.execute()
            return false
        }

        return true
    }

    private getCorrectTypeName(value: any): string {
        if (value === null) return "null"
        if (Array.isArray(value)) return "array"
        return typeof value
    }
}
