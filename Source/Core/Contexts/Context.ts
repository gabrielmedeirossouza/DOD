import { SystemRunner } from "../Runners/SystemRunner"
import { Entity } from "../Entities/Entity"
import { EntityRunner } from "../Runners/EntityRunner"

export type ContextCreateResult<T extends string[]> =
    {
        ctx: Context
    }
    &
    {
        [K in T[number]]: Entity
    }

export class Context extends Entity {
    private entities: Map<string, Entity> = new Map()
    private systems: (EntityRunner | SystemRunner)[] = []

    private constructor(name: string) {
        super(name)
    }

    getEntity(name: string): Entity {
        const entity = this.entities.get(name)
        if (!entity) {
            throw new Error(`Entity with name "${name}" does not exist.`)
        }
        return entity
    }

    attemptGetEntity(name: string): Entity | undefined {
        return this.entities.get(name)
    }

    addEntity(entity: Entity): void {
        if (this.entities.has(entity.name)) {
            throw new Error(`Entity with name "${entity.name}" already exists.`)
        }
        this.entities.set(entity.name, entity)
    }

    removeEntity(name: string): void {
        if (!this.entities.has(name)) {
            throw new Error(`Entity with name "${name}" does not exist.`)
        }
        this.entities.delete(name)
    }

    hasEntity(name: string): boolean {
        return this.entities.has(name)
    }

    addSystem(...systems: (EntityRunner | SystemRunner)[]): void {
        this.systems.push(...systems)
    }

    async execute(): Promise<void> {
        for (const system of this.systems) {
            if (system.type === "system_runner") {
                await system.execute(this)
                continue
            }

            for (const entity of this.entities.values()) {
                await system.execute(this, entity)
            }
        }

        this.systems = []
    }

    static create<T extends string[]>(...entityNames: T): ContextCreateResult<T> {
        const context = new Context("Context")
        context.addEntity(context)

        for (const name of entityNames) {
            const entity = new Entity(name)
            context.entities.set(name, entity)
        }

        return {
            ctx: context,
            ...Object.fromEntries(context.entities)
        } as ContextCreateResult<typeof entityNames>
    }
}
