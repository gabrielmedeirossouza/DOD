import { Context } from "./Context"

export abstract class ContextSystem {
    readonly type = "ContextSystem"
    abstract execute(ctx: Context): Promise<void> | void
}
