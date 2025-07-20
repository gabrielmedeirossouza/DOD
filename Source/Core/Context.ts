export type ContextCreateResult<T extends string[]> =
    {
        ctx: Context
    }
    &
    {
        [K in T[number]]: Entity
    }

export class Context {
    private entities: Map<string, Entity> = new Map()
    private systems: System[] = []

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

    addSystem(system: System): void {
        this.systems.push(system)
    }

    async executeSystems(): Promise<void> {
        for (const system of this.systems) {
            await system.execute(this)
        }
    }

    static create<T extends string[]>(...entityNames: T): ContextCreateResult<T> {
        const context = new Context()
        for (const name of entityNames) {
            const entity = new Entity(context.entities.size + 1, name)
            context.entities.set(name, entity)
        }

        return {
            ctx: context,
            ...Object.fromEntries(context.entities)
        } as ContextCreateResult<typeof entityNames>
    }
}
