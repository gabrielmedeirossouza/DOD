import { Context } from "./Context"

export interface System {
    execute(ctx: Context): Promise<void> | void
}
