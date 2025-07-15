import { Class } from "./Helpers"
import { Component } from "./Component";
import { ComponentStores } from "./EntityManager";
import { Entity } from "./Entity";

export class EntityQueryBuilder {
    private readonly requiredComponents: string[] = []
    private readonly excludedComponents: string[] = []

    constructor(
        private readonly componentStores: ComponentStores
    ) { }

    with<T extends Class<Component>[]>(...requiredClassComponents: T): this {
        const requiredComponents = requiredClassComponents.map(rcc => rcc.name)

        this.requiredComponents.push(...requiredComponents)

        return this
    }

    without<T extends Class<Component>[]>(...excludedClassComponents: T): this {
        const excludedComponents = excludedClassComponents.map(ecc => ecc.name)

        this.excludedComponents.push(...excludedComponents)

        return this
    }

    query(): Entity[] {
        const queryResult: Entity[] = []

        for (const [entity, componentStore] of Array.from(this.componentStores.entries())) {
            const componentsMatchAllRequiredComponents =
                this.requiredComponents.every(rc => componentStore.has(rc))

            const componentsDoNotMatchAnyExcludedComponents =
                this.excludedComponents.every(ec => !componentStore.has(ec))

            if (
                componentsMatchAllRequiredComponents &&
                componentsDoNotMatchAnyExcludedComponents
            ) {
                queryResult.push(entity)
            }
        }

        return queryResult
    }
}