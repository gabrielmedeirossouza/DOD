import { Context } from "../Contexts/Context"

export abstract class SystemRunner {
    readonly type = "system_runner"
    abstract execute(ctx: Context): Promise<void> | void
}
